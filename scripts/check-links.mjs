#!/usr/bin/env node
// Link checker for constants/sections.ts.
//
// Reads the resource list as text rather than importing it, so the script stays
// a dependency-free `node scripts/check-links.mjs` with no TypeScript loader.
// The file is machine-uniform, so a regex over `title:`/`href:` pairs is exact.
//
//   pnpm check:links
//   pnpm check:links --section "Learning Resources"
//   pnpm check:links --json > report.json
//
// Run it through pnpm: the script raises Node's response header limit, since
// some hosts send more than its 16 KB default and fetch fails on them.
//
// Exit code 1 means at least one link is genuinely broken. Responses that only
// mean a script was turned away - 401, 403 and 429, and redirect loops through
// a sign-in page - are reported as INCONCLUSIVE and never fail the run: plenty
// of these hosts reject any non-browser client.

import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'constants', 'sections.ts');

// A floor, not an exact count: the dataset only grows, and this exists to
// catch a parse that silently matched almost nothing.
const MIN_EXPECTED_LINKS = 300;

const CONCURRENCY = 8;
const TIMEOUT_MS = 20_000;
// Sent verbatim: a plain fetch UA is refused by Cloudflare-fronted hosts, which
// would report healthy links as broken.
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const sectionFilter = (() => {
  const i = args.indexOf('--section');
  return i === -1 ? null : args[i + 1];
})();

function parseResources(source) {
  const sections = [];
  let current = null;

  // Section titles sit at four-space indentation, resource titles at eight.
  const sectionTitle = /^ {4}title: '(.+)',$/;
  const linkTitle = /^ {8}title: '(.+)',$/;
  const linkHref = /^ {8}href: '(.+)',$/;

  let pendingTitle = null;
  for (const line of source.split('\n')) {
    const section = line.match(sectionTitle);
    if (section) {
      current = { title: unquote(section[1]), links: [] };
      sections.push(current);
      continue;
    }
    const title = line.match(linkTitle);
    if (title) {
      pendingTitle = unquote(title[1]);
      continue;
    }
    const href = line.match(linkHref);
    if (href && pendingTitle && current) {
      current.links.push({ title: pendingTitle, href: href[1] });
      pendingTitle = null;
    }
  }

  // The regexes above are anchored to the file's indentation, which Prettier
  // keeps uniform. If that ever changes, the parse degrades into finding fewer
  // links rather than failing — so assert it found a plausible number instead
  // of quietly reporting that a handful of links are all healthy.
  const linkCount = sections.reduce(
    (total, section) => total + section.links.length,
    0
  );
  if (sections.length === 0 || linkCount < MIN_EXPECTED_LINKS) {
    throw new Error(
      `Parsed only ${linkCount} link(s) in ${sections.length} section(s) from ` +
        `${SOURCE}. The file's shape has changed and the regexes in ` +
        `parseResources() no longer match it.`
    );
  }

  return sections;
}

// Titles in the source are single-quoted, so an apostrophe is backslash-escaped.
const unquote = (value) => value.replace(/\\'/g, "'");

async function request(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': USER_AGENT,
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

// What a live page answers when it will not show itself to a script: a
// sign-in or challenge page (401), a bot wall (403), a rate limit (429).
const BLOCKED = new Set([401, 403, 429]);

export async function check(link, send = request) {
  const started = Date.now();
  try {
    // HEAD first, as it is cheap. Anything short of success is retried as a
    // GET: plenty of hosts answer HEAD with 404, 405 or 500, or not at all,
    // for pages that load fine.
    let response = await send(link.href, 'HEAD').catch(() => null);
    if (!response?.ok) {
      response = await send(link.href, 'GET');
    }

    const finalUrl = response.url || link.href;
    const redirected = normalize(finalUrl) !== normalize(link.href);
    const result = {
      ...link,
      status: response.status,
      finalUrl,
      redirected,
      ms: Date.now() - started,
    };

    if (BLOCKED.has(response.status)) {
      return {
        ...result,
        verdict: 'INCONCLUSIVE',
        note: 'blocked: bot protection or sign-in',
      };
    }
    if (!response.ok) {
      return { ...result, verdict: 'BROKEN' };
    }
    return {
      ...result,
      verdict: redirected ? 'REDIRECT' : 'OK',
    };
  } catch (error) {
    // A client without cookies can bounce between a site and its sign-in page
    // until fetch gives up, where a browser, keeping the cookies, gets through.
    if (error.cause?.message === 'redirect count exceeded') {
      return {
        ...link,
        status: null,
        verdict: 'INCONCLUSIVE',
        note: 'redirect loop, likely through a sign-in page',
        ms: Date.now() - started,
      };
    }
    return {
      ...link,
      status: null,
      verdict: 'BROKEN',
      note: error.name === 'AbortError' ? 'timeout' : error.message,
      ms: Date.now() - started,
    };
  }
}

// Ignore a trailing slash and the http/https split when deciding whether a URL
// actually moved, so cosmetic normalisation is not reported as a redirect.
const normalize = (url) =>
  url.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();

async function pool(items, worker, limit) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(runners);
  return results;
}

// Run only when invoked directly, so the tests can import check() without
// setting off a request to every link in the dataset.
async function main() {
  const source = await readFile(SOURCE, 'utf8');
  const sections = parseResources(source).filter(
    (section) => !sectionFilter || section.title === sectionFilter
  );

  if (sections.length === 0) {
    console.error(
      sectionFilter
        ? `No section titled ${JSON.stringify(sectionFilter)} in ${SOURCE}.`
        : `No resources parsed out of ${SOURCE}.`
    );
    process.exit(2);
  }

  const report = [];
  for (const section of sections) {
    const results = await pool(section.links, check, CONCURRENCY);
    report.push({ section: section.title, results });
  }

  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    const symbol = {
      OK: '  ok  ',
      REDIRECT: ' moved',
      INCONCLUSIVE: '  ??  ',
      BROKEN: 'BROKEN',
    };
    for (const { section, results } of report) {
      console.log(`\n${section}`);
      for (const r of results) {
        const status = r.status ?? '---';
        let line = `  [${symbol[r.verdict]}] ${status} ${r.title} — ${r.href}`;
        if (r.verdict === 'REDIRECT') line += `\n           → ${r.finalUrl}`;
        if (r.note) line += ` (${r.note})`;
        console.log(line);
      }
    }
  }

  const flat = report.flatMap((r) => r.results);
  const broken = flat.filter((r) => r.verdict === 'BROKEN');
  const moved = flat.filter((r) => r.verdict === 'REDIRECT');
  const unknown = flat.filter((r) => r.verdict === 'INCONCLUSIVE');

  if (!asJson) {
    console.log(
      `\n${flat.length} links: ${flat.length - broken.length - moved.length - unknown.length} ok, ` +
        `${moved.length} redirected, ${unknown.length} inconclusive, ${broken.length} broken`
    );
  }

  process.exit(broken.length > 0 ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
