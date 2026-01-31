# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` contains the Next.js App Router source (`src/app/page.tsx`, `src/app/layout.tsx`) and global styles (`src/app/globals.css`).
- `src/components/` holds shared UI; shadcn primitives live in `src/components/ui` and custom wrappers live in `src/components/custom`.
- Except for Next.js default folder names, create new components (including page components) under mirrored paths in `src/components/`.
- Create server actions under mirrored paths in `src/actions/`, and only promote a path when it is used by more than two components.
- `src/hooks/` contains reusable React hooks.
- `src/lib/` contains utilities and shared helpers.
- `convex/` contains Convex functions, schema, HTTP endpoints, and cron jobs.
- `public/` holds static assets served at the site root.
- `.next/` is build output (do not edit or commit).
- `.next-docs/` stores the local Next.js docs index for agent guidance.
- Configuration lives in `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, and `components.json`.
- TypeScript path alias `@/*` maps to the repo root.

## Product Docs
- PRD index: `docs/prd.md`
- Product summary: We are building a "trustworthy output system" for creators and small teams that detects AI traces with explainable risk insights, humanizes content with goal-driven rewriting, and progressively trains a personal agent so outputs sound consistently like the author.
- Agents MUST read `docs/prd.md` to understand the product before any product-related work.

## Build, Test, and Development Commands
Use `pnpm` (see `packageManager` in `package.json`).
- `pnpm dev`: run the local Next.js dev server at `http://localhost:3000`.
- `pnpm build`: create a production build in `.next/`.
- `pnpm start`: run the production server from a build.
- `pnpm lint`: run Ultracite checks (Biome-based linting without fixes).
- `pnpm format`: run Ultracite fixes (format + safe fixes).
- `pnpm fix`: run Ultracite fixes (format + safe fixes). Use with `pnpm lint`.
- After changing `package.json`, run `pnpm install`.
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

### Page & Routing Plan
- Keep `/` as the SEO-first landing page that introduces the product and its core modules (AI Content Detector, Humanizer, Personal Agent training).
- Place the landing page under `src/app/(home)/` (route group) to keep home-specific structure isolated.
- Use semantic, hierarchical routes for feature content and deeper pages (e.g., `/detector`, `/humanizer`, `/agents`).
- Favor category-to-detail nesting for deeper content, similar to `/animal` and `/animal/cat`.
- Prefer short, descriptive slugs over query-only navigation; keep route names noun-based and consistent.
- This section will expand with agreed routing conventions and feature planning details as the product evolves.

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
  - `pnpm fix` then `pnpm lint` for Ultracite fixes + checks.
  - `pnpm build` to ensure the deploy build succeeds.
  - If Ultracite or deploy checks fail, do not commit unless the user explicitly requests it.
  - If lint/build fails, fix issues and re-run until green.
  - IMPORTANT: Do not use `git add -A` unless explicitly requested; stage specific paths only.
  - Then `git add <paths>` and `git commit -m "<message>"`.
- After completing a functional module (an atomic, user-visible unit of work), run the commit workflow and create a commit before starting the next module, unless the user explicitly asks not to commit.
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


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm dlx ultracite fix` before committing to ensure compliance.
