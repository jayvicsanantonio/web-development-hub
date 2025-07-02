# Web Development Hub - Agent Guide

## Project Overview

The Web Development Hub is a Next.js-based web application that serves as a comprehensive resource for web development. The project features sections for blogs, communities, developer tools, frameworks and libraries, and learning resources. Built with modern web technologies, it provides a clean, responsive interface for users to access various web development resources.

## Codebase Structure

```
web-development-hub/
├── app/                    # Next.js App Router pages and routes
│   ├── blogs/              # Blog section
│   ├── communities/        # Communities section
│   ├── developer-tools/    # Developer tools section
│   ├── favorites/          # Favorites section
│   ├── frameworks-and-libraries/ # Frameworks and libraries section
│   ├── learning-resources/ # Learning resources section
│   ├── globals.css         # Global CSS styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Root page component
├── components/             # Reusable UI components
│   └── ui/                 # UI component library
├── constants/              # Application constants
├── contexts/               # React context providers
├── docs/                   # Documentation files
├── lib/                    # Utility functions and shared code
├── public/                 # Static assets
├── scripts/                # Build and utility scripts
└── ...                     # Configuration files
```

## Coding Conventions & Style Guides

### General Code Style

- **Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)** for all JavaScript/TypeScript code, including React components and modules
- **React component file names must use PascalCase** (e.g., `UserCard.tsx`, not `user-card.tsx`)
- **Prefer named exports** for all components and utilities
- **DO NOT** add code comments

### TypeScript

- Use TypeScript for all new code
- Follow strict typing (`"strict": true` in tsconfig.json)
- Use interfaces for object typing
- Use type aliases for complex types
- Use enums for fixed sets of values

### Project Structure & Architecture

- **Use Next.js (`v15.4.0` or latest stable)** for the application framework
- Follow Next.js conventions for file/folder structure
- Use the **App Router** for routing and layouts
- **Correctly determine server vs. client components**:
  - Use server components by default for data-fetching and logic-heavy pages
  - Use client components only when interactivity, hooks, or browser APIs are required

### Styling & UI

- **Tailwind CSS `v4.0`** is required for all styling. NEVER use v3
  - Configure Tailwind according to the new v4 CSS-first configuration approach
  - Use Tailwind utility classes in JSX/TSX for styling elements
- **Shadcn UI (latest CLI and components)** for prebuilt UI components
  - Use the new CLI (`npx shadcn init` and `npx shadcn add`) for adding and updating components
  - Ensure Tailwind and Shadcn UI are integrated (CLI will handle config updates)
  - Prefer Shadcn UI components for common UI patterns (e.g., Drawer, Pagination, Carousel)

### Forms & Validation

- **React Hook Form `v7.57.0`** for form state management and validation
  - Use the latest APIs and features for form control and error handling
- **Zod `v3.25.67`** for schema validation
  - Define all validation schemas with Zod
  - Integrate Zod schemas with React Hook Form for type-safe, declarative validation

### State Management

- **Use React Context** for global or shared state
  - Avoid third-party state management libraries unless a clear need arises
  - Keep context providers minimal and focused

### Naming Conventions

- **Files and Directories**: Use kebab-case for files and directories (except React components)
- **Components**: Use PascalCase for component names and files
- **Functions**: Use camelCase for function names
- **Constants**: Use UPPERCASE_SNAKE_CASE for constant values
- **Types and Interfaces**: Use PascalCase for type and interface names

## Dependencies & Environments

### Core Dependencies

- **Next.js**: v15.4.0 (required) - Framework for server-rendered React applications
- **React**: v19.1.0 - JavaScript library for building user interfaces
- **TypeScript**: v5+ - Typed superset of JavaScript
- **Tailwind CSS**: v4.0 (required) - Utility-first CSS framework

### UI Libraries

- **Shadcn UI**: Latest CLI (Aug 2024+) - Component library for building accessible interfaces
- **Radix UI**: Various components for accessible UI elements
- **Lucide React**: v0.488.0 - Icon library

### Form Handling

- **React Hook Form**: v7.57.0 (required) - Form state management
- **Zod**: v3.25.67 (required) - Schema validation

### Development Tools

- **ESLint**: v9+ - Linting utility
- **Wrangler**: v4.12.0 - Cloudflare Workers CLI

### Environment Setup

1. **Node.js**: >=18.0.0 (use fnm for version management)
2. **Package Manager**: pnpm
3. **Development Server**: Next.js with Turbopack

### Environment Variables

Environment variables are stored in `.dev.vars` and should be used according to Next.js conventions.

### Testing Protocols

While specific testing frameworks are not currently visible in the package.json, follow these best practices:

- Write unit tests for utility functions
- Write component tests for UI components
- Write integration tests for page flows
- Follow Test-Driven Development (TDD) when appropriate
- Keep test files adjacent to the files they test with a `.test.ts` or `.test.tsx` extension
- **Write and maintain comprehensive tests** for all components, hooks, and business logic

## Pull Request (PR) & Contribution Guidelines

### PR Process

1. Create a feature branch from `main`
2. Make your changes following the style guide
3. Ensure all linting passes (`pnpm lint`)
4. Ensure all tests pass
5. Verify all dependencies are at required versions
6. Create a PR with a descriptive title and detailed description
7. Request reviews from appropriate team members

### PR Template

PRs should include:
- Description of changes
- Issue number(s) addressed
- Screenshots/videos for UI changes
- Testing completed
- Checklist of done items

### Code Review Guidelines

- Review PRs promptly
- Provide constructive feedback
- Focus on code quality, performance, and maintainability
- Approve once all comments are addressed

## Common Issues & Troubleshooting

### Next.js Build Issues

- **Issue**: Build failing with module resolution errors
  **Solution**: Check path aliases in tsconfig.json and ensure they're correct

- **Issue**: Hydration errors in development
  **Solution**: Ensure server and client rendering are consistent, particularly with date/time handling

### Dependency Issues

- **Issue**: Incompatible package versions
  **Solution**: Check pnpm-lock.yaml for version conflicts and resolve using pnpm overrides

- **Issue**: Node.js version incompatibilities
  **Solution**: Use `fnm use` to ensure the correct Node.js version is active

### Library Version Deviations

If any deviations from the required library versions are needed:
- Document the deviation with clear justification in code comments or README
- Get approval before implementing any deviation
- Update relevant documentation to reflect the change

### Core Technologies Reference

| Purpose          | Library/Tool    | Latest Stable Version (as of June 24, 2025) |
| ---------------- | --------------- | ------------------------------------------- |
| Framework        | Next.js         | 15.4.0                                      |
| Styling          | Tailwind CSS    | 4.0                                         |
| UI Components    | Shadcn UI       | Latest CLI (Aug 2024+)                      |
| Forms            | React Hook Form | 7.57.0                                      |
| Validation       | Zod             | 3.25.67                                     |
| State Management | React Context   | (built-in)                                  |

## Tool-Specific Instructions

### pnpm (v8+)

- Install dependencies: `pnpm install`
- Add a dependency: `pnpm add <package-name>`
- Add a dev dependency: `pnpm add -D <package-name>`
- Run scripts: `pnpm <script-name>`

### fnm (Fast Node Manager)

- Use project Node.js version: `fnm use`
- Install specific Node.js version: `fnm install <version>`

### Next.js (v15.3.4)

- Development server: `pnpm dev`
- Production build: `pnpm build`
- Start production server: `pnpm start`

### Cloudflare Deployment

- Preview deployment: `pnpm preview`
- Deploy to Cloudflare: `pnpm deploy`
- Upload assets: `pnpm upload`
- Generate Cloudflare types: `pnpm cf-typegen`

### ESLint (v9+)

- Run linting: `pnpm lint`
- Fix linting issues automatically: `pnpm lint --fix`

### TypeScript (v5+)

- Type checking is integrated into the Next.js build process
- For standalone type checking: `pnpm tsc --noEmit`
