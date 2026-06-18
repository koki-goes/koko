# koko

`koko` is a local-first CLI for quickly capturing memos, journals, and tasks from the terminal.

This repository is the `v0` implementation. It supports fast capture, simple listing, tag-based filtering, and a morning brief.

## Features

- Save memos
- Save journals
- Save tasks with optional due date and time
- Filter by single tag
- View a brief of overdue, today, and upcoming tasks, plus recent memos and journals

## Tech Stack

- TypeScript
- Node.js
- Commander.js
- SQLite
- Drizzle ORM
- better-sqlite3

## Setup

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm typecheck
```

Run the CLI with:

```bash
pnpm dev --help
```

## Install As CLI

Build the package and link it globally:

```bash
pnpm build
pnpm link --global .
```

After that, you can run:

```bash
koko memo "Read textbook" --tag "study"
koko task "Open PR" --d 0630 --t 17:00
koko brief
```

To remove the global link later:

```bash
pnpm unlink --global koko
```

## Commands

Create and list memos:

```bash
pnpm dev memo "Read textbook" --tag "study"
pnpm dev memo
pnpm dev memo --tag "study"
```

Create and list journals:

```bash
pnpm dev journal "Today I made progress"
pnpm dev journal
```

Create and list tasks:

```bash
pnpm dev task "Open PR" --d 0630 --t 17:00 --tag "work"
pnpm dev task
pnpm dev task --today
pnpm dev task --week
pnpm dev task --all
```

Filter by tag:

```bash
pnpm dev tag "study"
pnpm dev tag "study" --memo
pnpm dev tag "work" --task
```

Show the brief:

```bash
pnpm dev brief
pnpm dev brief --week
pnpm dev brief --month
```

## Notes

- Quote body text and tag values.
- `--tag` accepts one tag only.
- The local SQLite database is stored at `data/koko.db`.

## Project Docs

- `docs/spec-v0.md`
- `docs/commands.md`
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/roadmap.md`
