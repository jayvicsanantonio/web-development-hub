# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm preview` - Serve the built static export locally (see below)
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Type-check without emitting
- `pnpm test` - Run the Vitest suite once (`pnpm test:watch` to rerun on change)
- `pnpm test:e2e` - Playwright smoke tests against the built export via wrangler
- `pnpm check:links` - Check every resource URL in `constants/sections.ts` (add
  `--section "Learning Resources"` to scope it, `--json` for machine output).
  Exits non-zero only on genuinely broken links; 403/429 bot-protection
  responses are reported as inconclusive
- `fnm use` - Use correct Node.js version (requires fnm)

### Cloudflare Deployment
- `pnpm preview` - Build and serve the static export locally via `wrangler dev`
- `pnpm deploy` - Build and deploy the static export to Cloudflare Workers
- `pnpm upload` - Build and upload a new version without shifting traffic
- `pnpm cf-typegen` - Generate Cloudflare environment types

### Package Management
This project uses **pnpm** exclusively for package management. Always use `pnpm install`, `pnpm add`, etc.

## Architecture

### Next.js App Router Structure
- Uses Next.js 15 with App Router in `/app` directory
- Each route has its own directory with `page.tsx` (e.g., `/blogs/page.tsx`)
- Global layout in `app/layout.tsx` with providers and font configuration
- SEO metadata configured at layout level with OpenGraph and Twitter cards

### Component Organization
- UI components in `/components/ui/` following atomic design patterns
- Shared components in `/components/` root
- Uses shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with CSS custom properties for theming

### State Management
- React Context for global state:
  - `BookmarksProvider` - manages user bookmarks
  - `ThemeProvider` - handles light/dark theme switching
- Custom hooks in `/hooks/` for reusable logic
- Form handling with React Hook Form + Zod validation

### Data Layer
- Static data in `/lib/data/` with TypeScript definitions
- Resource mappings and category types in `/lib/types.ts`
- Utility functions in `/lib/utils/` and `/lib/utils.ts`

### Styling System
- Tailwind CSS 4.x with custom design tokens
- CSS variables for theming in `app/globals.css`
- Font stack: Inter (sans) + JetBrains Mono (monospace)
- Responsive design with mobile-first approach

### Performance Optimizations
- Image optimization with WebP/AVIF formats
- Package import optimization for @iconify/react
- Service worker registration for PWA capabilities
- Response and caching headers configured in public/_headers

### Deployment
- `next build` with `output: 'export'` emits a fully static site to `out/`
- Cloudflare Workers serves `out/` as static assets; `wrangler.jsonc` declares
  no `main`, so there is no Worker script and no server runtime
- Cloudflare **Workers Builds** owns deployment. It is connected to this
  repository directly and builds every push: `main` deploys to
  `webdevhub.link`, and any other branch is uploaded as a Worker version whose
  commit and branch preview URLs are posted to the pull request by the
  `cloudflare-workers-and-pages` bot
- Preview URLs are `<branch>-web-development-hub.hi-00e.workers.dev`. A version
  is not a deployment, so a preview cannot shift production traffic
- The build command lives in the Cloudflare dashboard, not in this repo. The
  Worker's own config - assets, routes, custom domain - still comes from
  `wrangler.jsonc`, so only the build step is dashboard state
- `.github/workflows/ci.yml` deploys nothing. It is the test gate: lint,
  typecheck, Vitest, the static-export check and the Playwright suite. Workers
  Builds runs none of these, so a red CI job is the only thing standing
  between a broken commit and production
- Security headers live in `public/_headers`, which Workers parses natively

### TypeScript Configuration
- Strict mode enabled with path aliases (`@/*` maps to root)
- Target ES2017 with bundler module resolution
- Incremental compilation for faster builds