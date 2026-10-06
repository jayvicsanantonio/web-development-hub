# AGENTS.md

Guidance for anyone working in this repository, human or coding agent. It is
the one instruction file: `CLAUDE.md` imports it, and other agents read it
directly.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the static export to `out/`
- `pnpm build:checked` - Lint, type-check and run Vitest, then build. The
  Workers Builds build command (see Deployment below)
- `pnpm lint` - Run ESLint over the whole repo (flat config, warnings fail);
  `pnpm lint --fix` applies the automatic fixes
- `pnpm format` - Format with Prettier (`pnpm format:check` reports without
  writing)
- `pnpm typecheck` - Type-check without emitting
- `pnpm test` - Run the Vitest suite once (`pnpm test:watch` to rerun on change)
- `pnpm test:e2e` - Playwright smoke tests. It builds the export and serves it
  through wrangler itself, except outside CI when a server is already
  listening on port 8788: that one is tested as it is, without a rebuild.
  Install the browser once with `pnpm exec playwright install chromium`, or
  point `PLAYWRIGHT_CHROMIUM_PATH` at a Chromium already on the machine
- `pnpm icons` - Rebuild the icon bundle (see Icons below). Builds, dev starts
  and test runs already do this, so it is only needed mid-session
- `pnpm check:links` - Check every resource URL in `constants/sections.ts` (add
  `--section "Learning Resources"` to scope it, `--json` for machine output).
  Exits non-zero only on genuinely broken links. Responses that only mean a
  script was turned away (401/403/429, and redirect loops through a sign-in
  page) are reported as inconclusive. `.github/workflows/check-links.yml` runs
  it every Monday and opens, or comments on, a `link-rot` issue when a link is
  broken; it can also be run by hand from the Actions tab

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
- Each route is a server component that exports its own `metadata` (the home
  page uses the root layout's defaults); the interactive part is a client
  component it renders (e.g.
  `app/[section]/page.tsx` renders `components/category-page.tsx`). Keeping a
  route `'use client'` costs it its metadata, so the whole site shares one
  title
- Props passed to a client component are serialised into the page's payload.
  The client bundle already holds the dataset, so pass an identifier (the
  section page and the home page's previews pass a slug) rather than the
  resources themselves
- Components are server components by default. Mark one `'use client'` only
  when it needs state, effects, event handlers or browser APIs

### Component Organization
- `/components/ui/` holds the building blocks and the site chrome: the shadcn
  primitives, resource cards and grids, the search box and filter panel, the
  footer, and the navigation (its desktop and mobile renderers in
  `navigation/`)
- `/components/` root holds the bodies routes render: `category-page`,
  `search-wrapper` and `section-preview-grid`
- shadcn/ui supplies the primitives in `/components/ui/` (the text input
  today); add or update them with the shadcn CLI, which reads
  `components.json`
- A confirmation is a native `<dialog>` opened with `showModal()`, as the
  bookmarks page's Clear All is: the browser makes the page behind it inert,
  moves focus in and back out, and closes it on Escape, and a rule in
  `app/globals.css` keeps the page from scrolling while one is open. jsdom
  lacks `showModal()` and `close()`; `vitest.setup.ts` stubs them to keep the
  open state only, so focus and inertness are tested in `e2e/`
- Tailwind CSS for styling with CSS custom properties for theming
- The root layout provides `BookmarksProvider` and `SearchProvider`;
  `LayoutWrapper` mounts the keyboard shortcuts and the navigation chrome
  around every page. `VerticalNavigation` chooses the side rail's sections
  from the list the current page renders, and renders the one tag filter
  panel for both layouts; the desktop search bar and the mobile bar each have
  a `FilterButton` that only opens it. The mobile menu always links every
  section page
- `SearchWrapper` swaps the home page's content for grouped results while a
  query or a tag is active

### State Management
- React Context for global state, with each provider kept small:
  - `BookmarksProvider` - the saved resource ids, resolved against the
    dataset so a bookmark shows the current entry. It reads them through
    `lib/bookmarks-store.ts`, which keeps localStorage as the source of truth:
    every change applies to what storage holds now, other tabs' changes
    arrive through the `storage` event, and an entry that no longer resolves
    stays stored rather than being dropped
  - `SearchProvider` - the query, the selected tags and the filter panel's
    state. It holds the request, not the answer: each view filters its own
    list with `filterResources()` from `lib/utils/search.ts`. Views render
    from `deferredQuery`, never `searchQuery` (that one is for the input), and
    `ResourceGrid` is memoised, so a keystroke re-renders no cards until the
    deferred filter has a new list for them
- The theme is not React state. The blocking script in `app/layout.tsx`
  resolves it before first paint, and `toggleTheme()` in `lib/theme.ts` flips
  whatever the page currently shows
- Hooks that wire up site behaviour (`useKeyboardShortcuts`) live in
  `/hooks/`; small hooks that read browser state (`useIntersectionObserver`,
  `useIsMac`) in `/lib/hooks/`

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
- Every resource has a permanent `id` (lowercase words joined by hyphens).
  Bookmarks are stored by it and a card's DOM id is built from it, so never
  change or reuse one, even when the title or href changes. A new resource
  takes its id from its title
- When a resource's `href` changes, add the old href to
  `constants/retired-hrefs.ts`, mapped to the resource's id: bookmarks saved
  before ids existed are stored by href and find their resource through it
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
- Markup a page repeats hundreds of times gets one `@utility` in
  `app/globals.css` rather than a long class list per element; the resource
  card's `tag-chip` is the example
- Leave layer promotion to the browser: no `transform-gpu` or `will-change` on
  elements that are not animating, and name the properties a transition
  covers on anything rendered once per resource
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
- The build command lives in the Cloudflare dashboard, not in this repo, and
  should be `pnpm build:checked`: lint, typecheck and Vitest, then the build.
  A commit that fails them then gets no version, preview or production. The
  Worker's own config - assets, routes, custom domain - still comes from
  `wrangler.jsonc`, so only the build step is dashboard state
- `.github/workflows/ci.yml` deploys nothing. It runs lint, typecheck,
  Vitest, the static-export check and the Playwright suite on every pull
  request and every push to `main`. Workers Builds does not wait for it:
  every push to `main` deploys, and CI on `main` runs alongside that deploy
  rather than before it. CI gates production only when a ruleset on `main`
  requires a pull request whose `build` check has passed. That ruleset is
  repository settings, like the build command, and neither shows in code
- The Playwright suite runs only in CI, since Workers Builds has no browser,
  so only the ruleset keeps an end-to-end failure out of production
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
