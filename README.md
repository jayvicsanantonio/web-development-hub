# Web Development Hub

A curated directory of web development links, live at
[webdevhub.link](https://webdevhub.link): documentation, courses, tools,
frameworks, communities, blogs and newsletters, grouped into five sections -
Learning Resources, Developer Tools, Frameworks and Libraries, Communities, and
Blogs and Newsletters.

Visitors can search every resource at once, narrow a page by tag, bookmark
resources and switch between light and dark themes. Bookmarks and the theme
are kept in the visitor's own browser; there are no accounts.

Keyboard shortcuts (`Cmd` on macOS, `Ctrl` elsewhere):

| Shortcut | Action |
| --- | --- |
| `Cmd+K` | Focus search (`/` or `F` too, when not typing in a field) |
| `Cmd+F` | Open or close the tag filter |
| `Cmd+B` | Go to bookmarks |
| `Cmd+H` | Go home |
| `Cmd+Shift+L` | Switch between light and dark |
| `Esc` | Clear the search |

It is a Next.js 15 static export served by Cloudflare Workers, with no server
runtime and no database.

## Getting Started

### Prerequisites

This project uses [pnpm](https://pnpm.io/) for package management and [fnm](https://github.com/Schniz/fnm) for Node.js version management:

- Install pnpm: `brew install pnpm` (or visit https://pnpm.io/installation for other methods)
- Install fnm: `brew install fnm` (or visit https://github.com/Schniz/fnm#installation for other methods)

### Setup

1. Use fnm to automatically select the correct Node.js version:

```bash
fnm use
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Every section and resource lives in `constants/sections.ts`, so adding or
editing a resource is a data-only change. Before making one, read
[AGENTS.md](AGENTS.md): it holds the commands, the architecture and the
conventions - permanent resource ids, retired hrefs, bundled icons - for people
and coding agents alike.

## Checks

Run these before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

`pnpm test:e2e` runs the Playwright suite against the static export, served
through wrangler the way production serves it. It builds the export itself;
install its browser once with `pnpm exec playwright install chromium`.

Every resource is an external link, so links break without anything in this
repository changing. `pnpm check:links` checks them all, and
`.github/workflows/check-links.yml` runs it every Monday, opening or commenting
on a `link-rot` issue when a link is genuinely broken.

## Deployment

The site is a static export (`next build` with `output: 'export'`) served by
Cloudflare Workers from `out/`. There is no server runtime: `wrangler.jsonc`
declares no `main`, only static assets.

Cloudflare **Workers Builds** is connected to this repository and does the
deploying:

| Environment | Trigger | URL |
| --- | --- | --- |
| Preview | Any branch / pull request | `<branch>-web-development-hub.hi-00e.workers.dev` |
| Production | Push to `main` | [webdevhub.link](https://webdevhub.link) |

A preview publishes a Worker *version*, not a deployment, so it cannot shift
production traffic. Preview URLs are commented on each pull request.

`.github/workflows/ci.yml` does not deploy. It runs lint, typecheck, Vitest and
the Playwright smoke suite on every pull request and every push to `main`.
Workers Builds does not wait for it, so two repository settings, neither
visible in code, are what keep a broken commit out of production:

- A ruleset on `main` requiring a pull request whose `build` check has passed.
- The Workers Builds build command set to `pnpm build:checked`, which runs lint,
  typecheck and Vitest before building, so a commit that fails them gets no
  version at all. Playwright needs a browser and runs only in CI.

To deploy by hand: `pnpm preview` serves the built export locally through
wrangler, `pnpm upload` uploads a version without shifting traffic, and
`pnpm deploy` deploys to production.
