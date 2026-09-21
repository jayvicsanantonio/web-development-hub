# AGENTS.md

Guidance for anyone working in this repository, human or coding agent. It is
the one instruction file: `CLAUDE.md` imports it, and other agents read it
directly.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the static export to `out/`
- `pnpm lint` - Run ESLint over the whole repo (flat config, warnings fail);
  `pnpm lint --fix` applies the automatic fixes
- `pnpm format` - Format with Prettier
- `pnpm typecheck` - Type-check without emitting
- `pnpm test` - Run the Vitest suite once (`pnpm test:watch` to rerun on change)
- `pnpm test:e2e` - Playwright smoke tests against the built export via wrangler
- `pnpm icons` - Rebuild the icon bundle (see Icons below). Builds, dev starts
  and test runs already do this, so it is only needed mid-session
- `pnpm check:links` - Check every resource URL in `constants/sections.ts` (add
  `--section "Learning Resources"` to scope it, `--json` for machine output).
  Exits non-zero only on genuinely broken links. Responses that only mean a
  script was turned away (401/403/429, and redirect loops through a sign-in
  page) are reported as inconclusive

Run `pnpm lint`, `pnpm typecheck` and `pnpm test` before every pull request.

### Cloudflare Deployment
- `pnpm preview` - Build and serve the static export locally via `wrangler dev`
- `pnpm deploy` - Build and deploy the static export to Cloudflare Workers
- `pnpm upload` - Build and upload a new version without shifting traffic
- `pnpm cf-typegen` - Generate Cloudflare environment types

### Environment
- Node 22.x, as `engines` in `package.json` and `.node-version` require;
  `fnm use` selects it
- **pnpm** only. Always use `pnpm install`, `pnpm add`, etc.

## Architecture

### Next.js App Router Structure
- Uses Next.js 15 with App Router in `/app` directory
- Each route has its own directory with `page.tsx`. The five section pages
  share one: `app/[section]/page.tsx` generates a static page per section in
  `SECTIONS`, with `dynamicParams` off so any other path is the 404 page
- Global layout in `app/layout.tsx` with providers, font configuration and the
  blocking script that applies the theme before first paint
- Each route is a server component that exports its own `metadata`; the
  interactive part is a client component it renders (e.g.
  `app/[section]/page.tsx` renders `components/category-page.tsx`). Keeping a
  route `'use client'` costs it its metadata, so the whole site shares one
  title
- Components are server components by default. Mark one `'use client'` only
  when it needs state, effects, event handlers or browser APIs

### Component Organization
- UI components in `/components/ui/` following atomic design patterns
- Shared components in `/components/` root
- Uses shadcn/ui component library with Radix UI primitives; add or update
  components with the shadcn CLI, which reads `components.json`
- Tailwind CSS for styling with CSS custom properties for theming
- `LayoutWrapper` provides `SearchProvider` and the navigation chrome around
  every page. `VerticalNavigation` chooses the section list for the current
  page and renders the one tag filter panel for both layouts; the desktop
  search bar and the mobile bar each have a `FilterButton` that only opens it
- `SearchWrapper` swaps the home page's content for grouped results while a
  query or a tag is active

### State Management
- React Context for global state, with each provider kept small:
  - `BookmarksProvider` - the saved hrefs, persisted to localStorage and
    resolved against the dataset, so a bookmark shows the current entry
  - `SearchProvider` - the query, the selected tags and the filter panel's
    state. It holds the request, not the answer: each view filters its own
    list with `filterResources()` from `lib/utils/search.ts`
- The theme is not React state. The blocking script in `app/layout.tsx`
  resolves it before first paint, and `toggleTheme()` in `lib/theme.ts` flips
  whatever the page currently shows
- Custom hooks in `/hooks/`; smaller presentational ones in `/lib/hooks/`

### Data Layer
- `constants/sections.ts` is the single source of truth: five sections and
  every resource, checked against `Section` from `lib/types.ts` via `satisfies`
- Anything derivable from it must be derived, not copied. Section titles come
  from `SECTION_TITLES`, a section from `sectionBySlug()`, every resource with
  its section from `ALL_RESOURCES`, and the filterable tags from `ALL_TAGS`.
  The sitemap and the e2e route list read `SECTIONS` too, so adding a section
  is a data-only change
- Every resource and section carries its own Iconify `icon`. The field is
  required, so an entry without one fails typecheck
- Shared shapes (`Section`, `ResourceLink`, `Resource`) live in
  `lib/types.ts`; do not redeclare them per file
- Utility functions in `/lib/utils/` and `/lib/utils.ts`

### Icons
- Icons are bundled at build time; nothing is fetched from Iconify at runtime.
  `scripts/build-icons.mjs` finds every `'prefix:name'` icon literal in the
  source, takes those icons from the installed `@iconify-json/*` sets, and
  writes `lib/icon-bundle.js` (generated, not committed)
- `next.config.mjs` and `vitest.config.mts` run it on load. A name no
  installed set has fails the build and names the icon; browse the sets at
  https://icon-sets.iconify.design. The dev server builds the bundle once at
  start, so after adding a new icon name mid-session run `pnpm icons`
- Import `Icon` from `@/lib/icons`, which registers the bundle. The default
  `@iconify/react` build fetches from Iconify's API, and ESLint rejects it
- Using an icon set that is not installed yet means adding its
  `@iconify-json/<prefix>` package

### Styling System
- Tailwind CSS 4.x, configured CSS-first: design tokens and theme layers live
  in `app/globals.css`, with CSS variables for theming. Style with Tailwind
  utilities and the shadcn tokens; avoid inline styles unless necessary
- Font stack: Inter (sans) + JetBrains Mono (monospace)
- Responsive design with mobile-first approach

### Performance
- The whole site is a static export: every page is prerendered HTML
- Icons render into that HTML from the build-time bundle, so none pop in
- Response and caching headers configured in `public/_headers`

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
- `public/sw.js` is not a working service worker. It removes itself: browsers
  that registered a worker at that path pick it up on their next update check,
  and it clears this origin's caches and unregisters

### TypeScript Configuration
- Strict mode enabled with path aliases (`@/*` maps to root)
- Target ES2017 with bundler module resolution
- Incremental compilation for faster builds

## Conventions

### Code Style
- TypeScript with strict types throughout
- ESLint (`eslint.config.mjs`, extending `next/core-web-vitals`) and Prettier
  (`.prettierrc`) are the enforced style; lint fails on any warning
- File names are kebab-case (`resource-card.tsx`); hooks in `hooks/` are named
  after the hook (`useKeyboardShortcuts.ts`). Components are PascalCase,
  functions camelCase, constants UPPER_SNAKE_CASE
- Start each file with a short comment saying what it does. Comment the why
  rather than the what, and keep comments evergreen: describe the code as it
  is, not how it changed

### Testing
- Vitest and React Testing Library for unit and component tests; Playwright
  for end-to-end flows in `e2e/`
- Name tests `*.test.ts` or `*.test.tsx` and put them beside the file they
  cover
- Keep tests deterministic. Cover data transforms, context providers and user
  flows; when a bug is fixed, add the test that would have caught it
- When adding new tooling, document its command in this file

### Commits and Pull Requests
- Write commits in the imperative (e.g. `feat: add frameworks index cards`),
  and keep each change scoped. Run lint and the build before pushing
- Pull requests describe the change, link relevant issues, list the manual or
  automated tests, and include screenshots or clips for UI changes
