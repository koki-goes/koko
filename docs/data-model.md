# koko Data Model

The current MVP uses a single `entries` table. Each row represents a memo, journal, or task.

## Entry Types

```ts
type EntryType = "memo" | "task" | "journal";
type EntryStatus = "pending" | "done" | "archived";
```

Rules:

- `memo` stores quick notes.
- `journal` stores diary-style entries.
- `task` stores actionable items.
- `memo` and `journal` use `status = null`.
- `task` uses `status = "pending"` when created.
- `task` may use `dueAt`.

## entries Table

| column | type | note |
|---|---|---|
| `id` | text | primary key |
| `type` | text | `memo` / `task` / `journal` |
| `body` | text | required content |
| `tag` | text | optional single tag |
| `status` | text | `pending` / `done` / `archived`, task only |
| `due_at` | integer | task due datetime |
| `created_at` | integer | creation datetime |
| `updated_at` | integer | last update datetime |

## Tag Rules

The MVP supports one tag per entry. Tags are stored directly on `entries.tag`.

`core/tag.ts` owns tag normalization:

- trim whitespace
- treat empty input as `undefined`
- do not split comma-separated values

If multiple tags are needed later, introduce a separate migration and move tags into a join table.
