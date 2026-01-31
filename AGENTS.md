# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains the Next.js App Router source (`app/page.tsx`, `app/layout.tsx`) and global styles (`app/globals.css`).
- `public/` holds static assets served at the site root.
- `.next/` is build output (do not edit or commit).
- Configuration lives in `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `postcss.config.mjs`.
- TypeScript path alias `@/*` maps to the repo root.

## Build, Test, and Development Commands
Use `pnpm` (see `packageManager` in `package.json`).
- `pnpm dev`: run the local Next.js dev server at `http://localhost:3000`.
- `pnpm build`: create a production build in `.next/`.
- `pnpm start`: run the production server from a build.
- `pnpm lint`: run ESLint (Next.js core-web-vitals + TypeScript rules).
If you use npm/yarn, run the equivalent `npm run <script>`.

## Coding Style & Naming Conventions
- TypeScript + React with the App Router; follow Next.js file conventions (`page.tsx`, `layout.tsx`, route folders under `app/`).
- Stick to existing formatting (2-space indentation in JSON/TS/TSX files). No Prettier config is present.
- Use PascalCase for React components and camelCase for variables/functions.
- Prefer Tailwind utility classes in JSX; keep shared styles in `app/globals.css`.

## Development Conventions & Best Practices
- Server-side first: prefer Server Components (no `use client`); only use Client Components when required.
- Keep Client Components at leaf nodes; move interactivity down instead of marking parents as client.
- It's acceptable to split components to preserve Server Component benefits.

## Testing Guidelines
- No test framework is configured yet. If you add tests, include the runner in `package.json` and document how to run them here and in `README.md`.
- Place tests near the code they cover (e.g., `app/<route>/__tests__/...`) or adopt a project-wide pattern and keep it consistent.

## Commit & Pull Request Guidelines
- Git history currently contains a single commit ("Initial commit from Create Next App"), so no established convention exists yet.
- Use short, imperative commit subjects (e.g., "Add landing hero copy"). Optional: Conventional Commits (`feat:`, `fix:`) if the team adopts it.
- Commit workflow (must pass before committing):
  - `pnpm lint` for code quality checks.
  - `pnpm build` to ensure the build succeeds.
  - If lint/build fails, fix issues and re-run until green.
  - Then `git add -A` and `git commit -m "<message>"`.
- Prefer atomic commits: one logical change per commit; avoid mixing refactors and feature changes in the same commit.
- Stage only the files related to the change (`git add <path>`); split unrelated edits into separate commits even if that increases commit count.
- Commit message format (Scheme A):
  - `<type>: <summary>`
  - Allowed `type`: `feat|fix|refactor|style|docs|test|chore|perf|build|ci|revert`
  - `summary` should be short, imperative, and start with a verb (<= 72 chars). For English, capitalize the first letter after the colon; Chinese is OK as-is.
  - Avoid vague messages like "update" or "wip".
- PRs should include a clear description, link related issues, and provide screenshots or short clips for UI changes.

## Security & Configuration Tips
- Store secrets in `.env.local` (do not commit). Validate new env vars in code and document required keys.
- Avoid committing generated files (`.next/`, `node_modules/`).
