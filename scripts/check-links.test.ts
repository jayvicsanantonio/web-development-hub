// Covers how the link checker classifies what a server sends back, with the
// network replaced by canned responses: a live page must never be reported
// broken just because the server mishandles HEAD or walls off scripts.
import { describe, it, expect } from 'vitest';
import { check } from './check-links.mjs';

const LINK = { title: 'Example', href: 'https://example.com/' };

type Reply = Response | Error;

/** A stand-in for the network: one reply per method, recording each call. */
function server(replies: { HEAD: Reply; GET?: Reply }) {
  const calls: string[] = [];
  const send = async (_url: string, method: 'HEAD' | 'GET') => {
    calls.push(method);
    const reply = replies[method];
    if (!reply) throw new Error(`unexpected ${method}`);
    if (reply instanceof Error) throw reply;
    return reply;
  };
  return { send, calls };
}

const status = (code: number) => new Response(null, { status: code });

// What fetch throws when the server's redirects never settle.
const redirectLoop = () =>
  Object.assign(new TypeError('fetch failed'), {
    cause: new Error('redirect count exceeded'),
  });

describe('a live page', () => {
  it('is ok when HEAD succeeds, without a second request', async () => {
    const { send, calls } = server({ HEAD: status(200) });
    expect((await check(LINK, send)).verdict).toBe('OK');
    expect(calls).toEqual(['HEAD']);
  });

  it.each([404, 405, 500, 501])(
    'is ok when HEAD answers %i but GET succeeds',
    async (code) => {
      // Kaggle answers HEAD with 404 and HackerRank with 500, for pages that
      // load fine.
      const { send, calls } = server({ HEAD: status(code), GET: status(200) });
      expect((await check(LINK, send)).verdict).toBe('OK');
      expect(calls).toEqual(['HEAD', 'GET']);
    }
  );

  it('is ok when HEAD fails outright but GET succeeds', async () => {
    const { send } = server({
      HEAD: new TypeError('fetch failed'),
      GET: status(200),
    });
    expect((await check(LINK, send)).verdict).toBe('OK');
  });
});

describe('a page the checker cannot see', () => {
  it.each([401, 403, 429])(
    'is inconclusive, not broken, on %i',
    async (code) => {
      // Unsplash's bot challenge answers 401; Cloudflare's answers 403.
      const { send } = server({ HEAD: status(code), GET: status(code) });
      expect((await check(LINK, send)).verdict).toBe('INCONCLUSIVE');
    }
  );

  it('is inconclusive when its redirects loop', async () => {
    // Google's docs bounce a cookieless client through sign-in and back.
    const { send } = server({ HEAD: redirectLoop(), GET: redirectLoop() });
    const result = await check(LINK, send);
    expect(result.verdict).toBe('INCONCLUSIVE');
    expect(result.note).toMatch(/redirect loop/);
  });
});

describe('a dead page', () => {
  it('is broken when GET fails too', async () => {
    const { send } = server({ HEAD: status(404), GET: status(404) });
    expect((await check(LINK, send)).verdict).toBe('BROKEN');
  });

  it('is broken when the host does not answer at all', async () => {
    const unreachable = Object.assign(new TypeError('fetch failed'), {
      cause: Object.assign(new Error('getaddrinfo ENOTFOUND'), {
        code: 'ENOTFOUND',
      }),
    });
    const { send } = server({ HEAD: unreachable, GET: unreachable });
    expect((await check(LINK, send)).verdict).toBe('BROKEN');
  });
});

describe('a moved page', () => {
  it('reports where it went', async () => {
    const moved = status(200);
    Object.defineProperty(moved, 'url', {
      value: 'https://example.org/new-home',
    });
    const { send } = server({ HEAD: moved });
    const result = await check(LINK, send);
    expect(result.verdict).toBe('REDIRECT');
    expect(result.finalUrl).toBe('https://example.org/new-home');
  });
});
