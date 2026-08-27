# Repository Guidelines

Use this quick reference to align contributions with the Web Development Hub setup.

## Project Structure & Module Organization
Main app code lives under `app/` using the Next.js App Router; feature folders like `blogs/`, `communities/`, and `developer-tools/` pair page entry points with co-located UI. Shared components sit in `components/` (Shadcn UI primitives in `components/ui/`). Cross-cutting constants, contexts, and hooks live in `constants/`, `contexts/`, and `hooks/`. Drop reusable utilities into `lib/`. Static assets belong in `public/`, and long-form docs stay in `docs/`.

## Build, Test, and Development Commands
Run `pnpm install` after updating dependencies. `pnpm dev` launches the Turbopack dev server. `pnpm build` compiles for production, while `pnpm start` serves the build. Use `pnpm lint` and `pnpm typecheck` before every PR; pair with `pnpm lint --fix` for automated cleanup. Cloudflare workflows rely on `pnpm preview`, `pnpm deploy`, and `pnpm upload`. Generate or refresh worker types with `pnpm cf-typegen`.

## Coding Style & Naming Conventions
Write all code in TypeScript with strict types. Follow the ESLint checks configured in `eslint.config.mjs` (flat config; `next lint` was removed in Next 16, so `pnpm lint` runs `eslint` directly). Components belong to PascalCase files, shared modules use kebab-case, functions use camelCase, and constants use UPPER_SNAKE_CASE. Style exclusively with Tailwind CSS v4 utilities and Shadcn UI tokens; avoid inline styles unless necessary.

## Testing Guidelines
There is currently **no test suite and no CI** in this repository. The automated gates are `pnpm lint` (ESLint, with `@typescript-eslint/no-unused-vars` enabled) and `pnpm typecheck` (`tsc --noEmit`); `pnpm build` is the final check. Run all three before pushing, and verify UI changes manually in the browser.

If you add a runner, Vitest plus React Testing Library is the intended direction: colocate `*.test.ts`/`*.test.tsx` beside the implementation, add the `test` script, and update this section. The highest-value first test is a pure assertion that every `SECTIONS[].links[].title` resolves to its own section and that all resource `href`s are unique — both classes of drift have caused user-visible bugs here.

## Commit & Pull Request Guidelines
Write commits in imperative tense (e.g. `feat: add frameworks index cards`). Keep changes scoped and run lint/build before pushing. PRs must describe the change, link relevant issues, list manual or automated tests, and include screenshots or clips for UI updates. Confirm dependencies remain on the mandated versions and request review promptly.

## Configuration & Environment Notes
Use `fnm use` to match the required Node.js version (`>=18`). Manage packages with pnpm only. Store secrets in `.dev.vars` and access them via Next.js environment conventions. Tailwind CSS v4 uses the CSS-first approach—adjust design tokens and theme layers inside `app/globals.css`, update component presets through `components.json`, and restart `pnpm dev` after making changes.
