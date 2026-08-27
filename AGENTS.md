# Repository Guidelines

Use this quick reference to align contributions with the Web Development Hub setup.

## Project Structure & Module Organization
Main app code lives under `app/` using the Next.js App Router; feature folders like `blogs/`, `communities/`, and `developer-tools/` pair page entry points with co-located UI. Shared components sit in `components/` (Shadcn UI primitives in `components/ui/`). Cross-cutting constants, contexts, and hooks live in `constants/`, `contexts/`, and `hooks/`. Drop reusable utilities into `lib/`. Static assets belong in `public/`, and long-form docs stay in `docs/`. Add new tests next to the file they cover (e.g. `app/foo/Button.test.tsx`).

## Build, Test, and Development Commands
Run `pnpm install` after updating dependencies. `pnpm dev` launches the Turbopack dev server. `pnpm build` compiles for production, while `pnpm start` serves the build. Use `pnpm lint` before every PR; pair with `pnpm lint --fix` for automated cleanup. Cloudflare workflows rely on `pnpm preview`, `pnpm deploy`, and `pnpm upload`. Generate or refresh worker types with `pnpm cf-typegen`.

## Coding Style & Naming Conventions
Write all code in TypeScript with strict types. Follow the Airbnb style guide and ESLint checks enforced by `next lint`. Components belong to PascalCase files, shared modules use kebab-case, functions use camelCase, and constants use UPPER_SNAKE_CASE. Style exclusively with Tailwind CSS v4 utilities and Shadcn UI tokens; avoid inline styles unless necessary.

## Testing Guidelines
Prefer component tests with React Testing Library and Vitest (add scripts as needed) plus targeted unit tests for utilities. Name files `*.test.tsx` or `*.test.ts` and colocate beside the implementation. Keep tests deterministic and cover critical data transforms, context providers, and user flows. When adding new tooling, document command usage in this file.

## Commit & Pull Request Guidelines
Write commits in imperative tense (e.g. `feat: add frameworks index cards`). Keep changes scoped and run lint/build before pushing. PRs must describe the change, link relevant issues, list manual or automated tests, and include screenshots or clips for UI updates. Confirm dependencies remain on the mandated versions and request review promptly.

## Configuration & Environment Notes
Use `fnm use` to match the required Node.js version (`>=18`). Manage packages with pnpm only. Store secrets in `.dev.vars` and access them via Next.js environment conventions. Tailwind CSS v4 uses the CSS-first approach—adjust design tokens and theme layers inside `app/globals.css`, update component presets through `components.json`, and restart `pnpm dev` after making changes.
