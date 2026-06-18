# koko v0 Implementation Status

This document summarizes what exists in the current implementation.

## Project Setup

- TypeScript project using Node.js ESM
- Commander.js CLI entrypoint
- `pnpm dev`, `pnpm build`, and `pnpm typecheck` scripts
- global CLI support through the `koko` package bin

## Database

- SQLite database at `data/koko.db`
- Drizzle schema in `src/db/schema.ts`
- migrations in `drizzle/`
- repository functions in `src/db/repository.ts`

## Capture Commands

- `koko memo "..."`
- `koko memo`
- `koko memo --tag "..."`
- `koko journal "..."`
- `koko journal`

## Task Commands

- `koko task "..."`
- `koko task --tag "..."`
- `koko task --today`
- `koko task --week`
- `koko task --all`
- task creation stores `status = "pending"`
- task lists are sorted by due date

## Tag Command

- `koko tag "..."`
- `koko tag "..." --memo`
- `koko tag "..." --task`
- tag lookup is exact tag matching

## Brief Command

- `koko brief`
- `koko brief --week`
- `koko brief --month`
- shows overdue tasks, today's tasks, due soon tasks, recent memos, and recent journals
