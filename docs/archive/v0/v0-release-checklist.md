# v0 Release Checklist

Use this checklist before calling the current MVP `v0`.

## Setup Checks

- `pnpm install` completes successfully
- `pnpm db:generate` completes successfully
- `pnpm db:migrate` completes successfully
- `pnpm typecheck` passes
- `pnpm dev --help` shows the expected command list

## Command Checks

- `pnpm dev memo "test memo"` saves a memo
- `pnpm dev memo` lists saved memos
- `pnpm dev memo --tag "test"` filters memos by tag
- `pnpm dev journal "test journal"` saves a journal
- `pnpm dev journal` lists saved journals
- `pnpm dev task "test task"` saves a task without due date
- `pnpm dev task "test due task" --d 0630 --t 17:00 --tag "work"` saves a due task
- `pnpm dev task` lists pending tasks in due-date order
- `pnpm dev task --today` filters today tasks
- `pnpm dev task --week` filters weekly tasks
- `pnpm dev task --all` includes non-pending tasks if present
- `pnpm dev tag "work"` lists entries with the tag
- `pnpm dev tag "work" --memo` lists tagged memos only
- `pnpm dev tag "work" --task` lists tagged tasks only
- `pnpm dev brief` renders all sections without crashing
- `pnpm dev brief --month` renders the wider-range brief without crashing

## Data Checks

- data persists across repeated CLI runs
- memo and journal rows store `status = null`
- task rows store `status = "pending"` when created
- task rows store `due_at` correctly when `--d` and `--t` are used
- single-tag behavior is consistent across create and filter flows

## UX Checks

- empty states are understandable
- invalid date input returns a human-readable error
- `task` list format is `due -> body -> tag`
- `brief` output is readable in a normal terminal width

## Release Decision

Ship `v0` only if:

- the command checks above pass manually
- the docs match the actual behavior
- there is no known data-loss bug in normal CLI usage
