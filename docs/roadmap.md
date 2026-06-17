# koko Roadmap

This roadmap reflects the current MVP direction.

## Phase 0: Bootstrap

- Initialize TypeScript and pnpm.
- Add Commander CLI entrypoint.
- Add `pnpm dev` and `pnpm typecheck`.

## Phase 1: Database Foundation

- Add Drizzle and SQLite setup.
- Define the `entries` table.
- Generate and apply migrations.

## Phase 2: Capture

- Implement `koko memo "..."`.
- Implement `koko memo`.
- Implement `koko memo --tag "..."`.
- Implement `koko journal "..."`.
- Implement `koko journal`.

## Phase 3: Tasks

- Implement `koko task "..."`.
- Support `--d`, `--t`, `--tag`, `--today`, `--week`, and `--all`.
- Store new tasks as `pending`.
- Sort tasks by due date.

## Phase 4: Tags

- Implement `koko tag "..."`.
- Support `--memo` and `--task` filters.
- Keep tag search as exact tag matching, not body search.

## Phase 5: Brief

- Implement `koko brief`.
- Show overdue tasks, today's tasks, due soon tasks, recent memos, and recent journals.

## Out of Scope

- Task completion flow
- Reminder integrations
- AI classification
- Embedding search
- Full-text body search
- Slack or email notification
- Sync across devices
- GUI or web app

## Future AI Layer

AI can be added later as a separate enhancement layer. It should not change the core storage model until the MVP is stable.
