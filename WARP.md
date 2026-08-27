# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project type: Next.js 15 (App Router) with TypeScript and Tailwind CSS v4, configured for Cloudflare deployment via OpenNext.

Commands
- Setup
  - fnm use
  - pnpm install
- Develop
  - pnpm dev  # Next dev with Turbopack
- Build and run
  - pnpm build
  - pnpm start
- Lint
  - pnpm lint
- Cloudflare (OpenNext)
  - pnpm preview  # Build and preview locally with OpenNext Cloudflare
  - pnpm deploy   # Build and deploy to Cloudflare
  - pnpm upload   # Build and upload bundle (without switching traffic)
  - pnpm cf-typegen  # Generate Cloudflare env types (wrangler types --env-interface CloudflareEnv)
- Tests
  - No test script is currently defined in package.json

Environment notes
- Node: engines requires >= 18. Use fnm use to select the correct version.
- Package manager: pnpm is used exclusively (see README and CLAUDE.md).

High-level architecture and structure
- App Router entry and global layout
  - app/layout.tsx is the root layout: sets fonts (Inter, JetBrains Mono), global SEO metadata, viewport, and wraps the app with providers.
  - Providers used globally:
    - ThemeProvider (contexts/theme-context.tsx): toggles light/dark theme, persists to localStorage, applies the `dark` class to documentElement.
    - BookmarksProvider (contexts/bookmarks-context.tsx): manages a list of bookmarked resources, persisted to localStorage; restores icon names by mapping titles through lib/data/resource-mappings.ts and constants/sections.ts.
  - ServiceWorkerRegistration (components/service-worker-registration.tsx) is mounted in layout to register public/sw.js and prompt for updates.
  - LayoutWrapper (components/ui/layout-wrapper.tsx): wraps page content with SearchProvider and the persistent navigation chrome.

- Navigation, search, and filtering
  - Search context lives in contexts/search-context.tsx and is provided by LayoutWrapper. It:
    - Builds a flat resource index from constants/sections.ts.
    - Supports free-text search across title/description/section and tag filtering via hooks/useFilter.ts.
    - Tracks a filter panel state and current category; resets on route change.
  - SearchWrapper (components/search-wrapper.tsx) conditionally renders grouped search results by section when a query or tags are active; otherwise renders children (the normal page).
  - lib/utils/navigation.ts computes the section nav model and helpers (DEFAULT_NAV_ITEMS, createSearchNavItems, scrollToSection) used by the desktop/mobile navigation components.
  - Navigation UI:
    - components/ui/navigation/desktop-navigation.tsx and mobile-navigation.tsx render the section list and quick actions (home, bookmarks, theme toggle). They consume ThemeProvider and BookmarksProvider.
    - components/ui/navigation-item.tsx renders individual nav items.

- Data model and content
  - The primary content comes from constants/sections.ts: a curated list of resources grouped into top-level sections. Each resource has title, href, description, and optional tags.
  - lib/data/resource-mappings.ts maps well-known resource names to icon identifiers and also groups titles by rubric for display.
  - lib/types.ts defines CategoryType used in app/page.tsx and routes.

- Pages and composition
  - app/page.tsx builds the home view using SECTIONS-derived data and re-usable components (e.g., ResourceCard, ResourceGrid). Individual category pages live under app/<category>/page.tsx and follow the same data source.
  - Shared UI lives under components/ui/ (e.g., hero-banner, resource-card, inputs, navigation components). Styling leverages Tailwind and small utilities in lib/utils.ts (cn helper). Additional UI behavior helpers exist in lib/utils/resource-card.ts and lib/hooks/*.

- Styling and assets
  - Tailwind CSS v4 is enabled via @tailwindcss/postcss (postcss.config.mjs). Global styles are in app/globals.css with CSS variables for theme tokens.
  - Images and PWA assets live in public/ (including public/sw.js and public/offline.html).

- Performance and deployment configuration
  - next.config.mjs:
    - experimental.optimizePackageImports for @iconify/react.
    - Compression enabled; strict caching headers for static assets; basic security headers.
    - Images configured for AVIF/WebP and sized breakpoints; SVG allowed (with CSP sandboxing for images).
    - In development, automatically initializes OpenNext Cloudflare integration.
  - Cloudflare workflows are provided via package.json scripts using @opennextjs/cloudflare and wrangler types.

Assistant-specific notes from CLAUDE.md (applicable here)
- Use pnpm for all package operations.
- The architecture relies on App Router, context providers (Theme, Bookmarks, Search), Tailwind v4, and shadcn/Radix-based components.

Important references
- README.md: quick start (fnm use, pnpm install, pnpm dev) and Next.js basics.
- CLAUDE.md: command list and architecture overview that matches the current codebase.
