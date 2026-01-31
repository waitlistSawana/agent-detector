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

### Convex Development
> IMPORTANT: Read {convex/docs/convex_rules.mdx} before any Convex-related work.
- Read the imported rules before any Convex-related work (functions, schema, HTTP endpoints, pagination, cron jobs, or storage).
- Treat Convex as a reactive database: queries are TypeScript in `convex/` and re-run when their data changes; rely on reactive updates instead of manual polling.
- Keep queries read-only and use mutations for writes; group related writes in a single mutation for transactional consistency.
- Keep `npx convex dev` running during development; it syncs `convex/` code, enforces schema changes, and regenerates types in `convex/_generated`.
- Check in `convex/_generated` so typechecking works without running the CLI.
- Await all promises in Convex functions; use argument validators and access control for every public function.
- Define HTTP endpoints in `convex/http.ts` with `httpAction` and register exact paths explicitly.
- Prefer queries/mutations over actions; use actions only for external side effects.
- Avoid `.filter` on database queries; use indexes or pagination for large result sets; avoid `.collect` on unbounded queries.
- Use helper functions to share logic and minimize `ctx.runQuery`/`ctx.runMutation` overhead.
- Only schedule or call internal functions via `ctx.scheduler` / `ctx.run*` from internal function references.
- Register public vs internal functions correctly (`query/mutation/action` vs `internalQuery/internalMutation/internalAction`) and call them via `api`/`internal` function references.
- Keep schema rules in `convex/schema.ts` and follow index naming/order conventions.
- Use supported validators (`v.int64()` for int64, `v.record()` for records) and always declare `args` and `returns` (use `v.null()` for no return).
- Use pagination with `paginationOptsValidator` and `.paginate()` for large lists.
- Use cron jobs in `convex/crons.ts` with `cronJobs`, and reference internal functions via `internal`.
- Use storage via `ctx.storage.getUrl()` and `_storage` system table; do not use deprecated metadata APIs.

### TypeScript (Convex)
> IMPORTANT: Read {convex/docs/best-practices/typescript.mdx} before TypeScript-related Convex work.
- Read the imported rules before working on Convex TypeScript migration, schemas, helpers, or client typing.
- Keep Convex functions in `.ts` and keep `convex/tsconfig.json` in sync with project expectations.
- Define a schema to unlock full typing for `ctx.db` and use generated `Doc`/`Id` types.
- Prefer validator inference (`Infer`) and `WithoutSystemFields` when shaping types across server/client.
- Use `FunctionReturnType` and `UsePaginatedQueryReturnType` for client types derived from API functions.

## Testing Guidelines
- No test framework is configured yet. If you add tests, include the runner in `package.json` and document how to run them here and in `README.md`.
- Place tests near the code they cover (e.g., `app/<route>/__tests__/...`) or adopt a project-wide pattern and keep it consistent.

## Commit & Pull Request Guidelines
- Git history currently contains a single commit ("Initial commit from Create Next App"), so no established convention exists yet.
- Use short, imperative commit subjects (e.g., "Add landing hero copy"). Optional: Conventional Commits (`feat:`, `fix:`) if the team adopts it.
- Commit workflow (MUST pass before committing):
  - `pnpm lint` for code quality checks.
  - `pnpm build` to ensure the build succeeds.
  - If lint/build fails, fix issues and re-run until green.
  - IMPORTANT: Do not use `git add -A` unless explicitly requested; stage specific paths only.
  - Then `git add <paths>` and `git commit -m "<message>"`.
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
