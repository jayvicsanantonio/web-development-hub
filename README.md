This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

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
the Playwright smoke suite on every pull request. Workers Builds runs only the
build, so CI is what catches anything a successful build would not.

To deploy by hand: `pnpm preview` serves the built export locally through
wrangler, `pnpm upload` uploads a version without shifting traffic, and
`pnpm deploy` deploys to production.
