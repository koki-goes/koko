# koko Architecture

This project is a local-first TypeScript CLI. The codebase is organized so command parsing, business rules, and database access stay separate.

## Directory Structure

```text
src/
  index.ts
  cli/
  commands/
  core/
  db/
  utils/
```

- `src/index.ts`: CLI entrypoint. It imports the Commander program and calls `program.parse()`.
- `src/cli/program.ts`: owns Commander setup, global metadata, and command registration.
- `src/commands/`: owns one file per CLI command. Commands parse options, call repository/core functions, and print output.
- `src/core/`: owns shared product logic such as tag parsing and output formatting.
- `src/db/`: owns SQLite/Drizzle setup, schema definitions, and repository operations.
- `src/utils/`: reserved for low-level helpers such as IDs and human-readable errors.

## Data Flow

User input flows through these layers:

```text
koko command -> cli/program.ts -> commands/* -> core/db -> terminal output
```

For example, `koko memo "read book" --tag "study"` is registered in `cli/program.ts`, handled by `commands/memo.ts`, normalized with `core/tag.ts`, saved through `db/repository.ts`, and stored in SQLite.

## Repository Boundary

Command files should not write raw SQL or import Drizzle tables directly. Database operations should go through `db/repository.ts`.

This keeps command files small and makes future changes safer. If the schema changes, most command code should not need to change.

## Current MVP Scope

The current MVP includes `memo`, `journal`, `task`, `tag`, and `brief`. Task completion, `reminder`, GUI, web sync, and AI features are intentionally out of scope for now.
