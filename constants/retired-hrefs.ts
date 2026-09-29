// Hrefs that resources in SECTIONS used to have, each mapped to the id of the
// resource it now belongs to. Bookmarks saved before resources had ids were
// stored by href, so this is how a saved href whose resource has since moved
// still finds it. When a resource's href changes, add the old one here.
//
// Retired resources with no successor are deliberately absent: a bookmark of
// one stays in storage without being shown, and an entry added here later
// brings it back.
export const RETIRED_HREFS: Record<string, string> = {
  // The same resource at a new address.
  'https://cursor.sh/': 'cursor',
  'https://designgurus.com/': 'design-gurus',
  'https://developers.google.com/web/tools/lighthouse': 'lighthouse',
  'https://developers.openai.com/codex/cli': 'codex-docs',
  'https://developers.openai.com/codex/sdk': 'codex-sdk',
  'https://docs.claude.com/': 'claude-docs',
  'https://epicreact.dev/': 'epic-react',
  'https://fresh.deno.dev/': 'deno-fresh',
  'https://gitlab.com/': 'gitlab',
  'https://greatfrontend.com/': 'great-frontend',
  'https://kit.svelte.dev/': 'sveltekit',
  'https://leerob.io/': 'lee-robinson',
  'https://netlify.com/': 'netlify',
  'https://paulirish.com/': 'paul-irish',
  'https://qwik.builder.io/': 'qwik',
  'https://rachelandrew.co.uk/blog/': 'rachel-andrew',
  'https://sanity.io/': 'sanity',
  'https://sarah.dev/': 'sarah-drasner',
  'https://tanstack.com/query/': 'tanstack-query',
  'https://testingjavascript.com/': 'testing-javascript',
  'https://turbo.build/pack': 'turbopack',
  'https://turbo.build/repo': 'turborepo',
  'https://v0.dev/': 'v0',
  'https://vitejs.dev/': 'vite',
  'https://webdev.to/': 'web-dev',
  'https://wesbos.com/': 'wes-bos',
  'https://www.anthropic.com/claude-code': 'claude-code',
  'https://www.codesmith.io/blog': 'codesmith',
  'https://www.mongodb.com/atlas/database': 'mongodb-atlas',
  'https://www.robinrendle.com/': 'robin-rendle',
  'https://xstate.js.org/': 'xstate',

  // Renamed, or replaced in place by its successor.
  'https://frontendmasters.com/': 'master-dev',
  'https://google-gemini.github.io/gemini-cli/': 'antigravity-cli',
  'https://learnwithjason.dev/': 'codetv',
  'https://www.learnwithjason.dev/': 'codetv',
  'https://www.framer.com/motion/': 'motion',
  'https://windsurf.com/': 'devin-desktop',
};
