# Repository Guidelines

## Project Structure & Module Organization

Product and CLI behavior live in `docs/spec-v0.md` and the command summary lives in `docs/commands.md`. Architecture notes live in `docs/architecture.md`, and the current data model lives in `docs/data-model.md`.

Keep code organized by responsibility:

- `src/index.ts`: CLI entrypoint only
- `src/cli/`: Commander program setup
- `src/commands/`: one file per CLI command
- `src/db/`: Drizzle schema, SQLite client, repository functions
- `src/core/`: parsing, filtering, formatting, briefing logic
- `src/utils/`: shared low-level helpers when needed
- `tests/`: future CLI and persistence tests

Keep docs in `docs/` and avoid mixing design notes into `src/`.

## Contributor Workflow

This project is also a deliberate software engineering practice environment for the repository owner. Default to a coaching role: explain what to build, why it is structured that way, and show code examples the owner can type themselves. Do not directly edit implementation files unless the owner explicitly asks for coding help in the repository.

When giving guidance, prefer:

- small, sequential tasks
- copyable code snippets
- brief explanations of tradeoffs
- review-oriented feedback on the owner's code

## Build, Test, and Development Commands

Use `pnpm` for all package management.

- `pnpm install`: install dependencies
- `pnpm dev --help`: run the local CLI help
- `pnpm typecheck`: type-check without building
- `pnpm db:generate`: generate Drizzle migrations
- `pnpm db:migrate`: apply Drizzle migrations
- `pnpm test`: placeholder today; replace with the real test runner once tests exist

If you add a new recurring workflow, expose it through a `scripts` entry in `package.json`.

## Coding Style & Naming Conventions

Use TypeScript with ES modules. Prefer small modules, explicit types at public boundaries, and Zod validation for CLI input. Use 2-space indentation and keep files ASCII unless existing content requires otherwise.

Naming:

- files: `kebab-case.ts`
- functions/variables: `camelCase`
- types/interfaces: `PascalCase`
- constants: `UPPER_SNAKE_CASE` only when truly constant

## Testing Guidelines

No test framework is configured yet. When adding one, put tests under `tests/` or next to source as `*.test.ts`, and cover command parsing, date parsing, and SQLite persistence. Prefer deterministic tests with isolated temp databases.

## Commit & Pull Request Guidelines

There is no established commit history yet, so start with short imperative commit messages, for example: `Add task list command` or `Define entries schema`.

PRs should include:

- a concise summary of behavior changes
- linked issue or spec section when relevant
- test notes (`pnpm test`, type-check, or manual CLI checks)
- sample CLI usage for user-facing changes

## Security & Configuration Tips

Do not commit local SQLite database files, `.env` files, or generated caches. Keep repository changes aligned with the spec unless the PR explicitly updates the spec first.
