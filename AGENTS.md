# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` contains the Next.js App Router source (`src/app/page.tsx`, `src/app/layout.tsx`) and global styles (`src/app/globals.css`).
- `src/components/` holds shared UI; shadcn primitives live in `src/components/ui` and custom wrappers live in `src/components/custom`.
- `src/hooks/` contains reusable React hooks.
- `src/lib/` contains utilities and shared helpers.
- `convex/` contains Convex functions, schema, HTTP endpoints, and cron jobs.
- `public/` holds static assets served at the site root.
- `.next/` is build output (do not edit or commit).
- `.next-docs/` stores the local Next.js docs index for agent guidance.
- Configuration lives in `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, and `components.json`.
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

### Next.js & React Deployment
> IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning for any Next.js tasks.
- Use the local Next.js docs index at the end of this file for deployment guidance.
- Keep deployment steps consistent with the repo's `pnpm build` and `pnpm start` workflow.

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

### UI/UX
- Shadcn UI is already installed; use it as the primary source of UI primitives and patterns.
- Use the Shadcn theme tokens and semantic CSS variables (e.g., `primary`, `bg-primary`, `text-muted-foreground`) for colors; do not introduce ad-hoc palettes or hard-coded values.
- Do not edit components under `src/components/ui`; they are synced regularly and local changes will be overwritten. Update them only via the Shadcn CLI sync/import flow, except for minimal fixes to newly imported files when they fail to build.
- For customizations to a Shadcn component, create a corresponding file under `src/components/custom` that wraps and re-exports the `src/components/ui` component via pass-through props, keeping a mirrored structure.
- Larger UI pieces must be composed from these primitives and customized via `className`/variants rather than modifying the base UI components.
- Use `cn` from `src/lib/utils` to merge `className` values instead of manual string concatenation.
- Keep variants consistent with shadcn patterns (CVA `variant`/`size` semantics and naming).
- Prefer `asChild` (Radix Slot) when swapping the root element to avoid extra wrappers and style drift.
- Preserve shadcn/Radix state selectors (`data-[state]`, `data-[disabled]`, etc.) when styling interaction states.
- Keep UI imports consistent with the project aliases (e.g., `@/components/ui`, `@/components/custom`) to avoid relative-path drift.
- Keep theme/config choices aligned with `components.json`; do not introduce a parallel design system.
- If a newly imported shadcn file has errors, you may apply minimal fixes to that new file; otherwise resolve API mismatches by syncing via the shadcn CLI or aligning the dependency version.

### Frontend Interfaces
> IMPORTANT: Read {.agents/skills/frontend-design/SKILL.md} before any frontend interface work.
- Read the skill before building or styling any frontend interfaces (pages, components, layouts, dashboards, landing pages, or UI polish work).

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
- Prefer atomic commits: one cohesive unit of functionality/module/work per commit; avoid mixing unrelated changes, but don't split a single cohesive unit across multiple commits.
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

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output AGENTS.md<!-- NEXT-AGENTS-MD-END -->
