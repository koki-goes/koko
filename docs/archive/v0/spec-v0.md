# koko CLI v0 Specification

## Goal

作業中に頭に浮かんだメモ、タスク、日記をCLIから即保存し、あとで一覧・検索できるローカルファーストなツールを作る。

## Tech Stack

- Language: TypeScript
- Runtime: Node.js
- CLI Framework: Commander.js
- Database: SQLite
- ORM: Drizzle ORM
- SQLite Driver: better-sqlite3
- Package Manager: pnpm

Commander.js はCLI引数・オプション・ヘルプ表示を扱う。Drizzle は SQLite と better-sqlite3 でのDB操作に使う。better-sqlite3 は同期APIでCLI用途に向いている。

## Commands

本文や tag 名はクオートで囲って入力する。
本文を指定した場合はエントリを作成し、本文を指定しない場合はその command の type に対応する過去のエントリを一覧表示する。
`--tag` は作成時には tag 付与、一覧時には tag 絞り込みとして使う。

### memo

```bash
koko memo "教科書を読む" --tag "研究"
koko memo
koko memo --tag "研究"
```

メモを保存する。
`--tag` はオプションで指定できる。tag は1つだけ指定できる。
`koko memo` は memo のみを新しい順で一覧表示する。
`koko memo --tag "研究"` は `研究` tag の memo のみを一覧表示する。

### journal

```bash
koko journal "今日の日記を書く"
koko journal
```

日記を保存する。
`koko journal` は journal のみを新しい順で一覧表示する。

### task

```bash
koko task "PRを出す" --d 0630 --t 17:00 --tag "仕事"
koko task
koko task --tag "仕事"
koko task --today
koko task --week
koko task --all
```

タスクを作成・一覧表示する。
期限があるものは期限が近い順に並べる。
`--d` と `--t` は期限日時の入力に使う。
`--all` を指定しない場合は `pending` の task のみを表示する。
`--tag` を指定した場合は、指定 tag の task のみを一覧表示する。

### tag

```bash
koko tag "研究"
koko tag "研究" --memo
koko tag "研究" --task
```

保存済みエントリを tag 単位で一覧表示する。
オプション指定なしでは全 type を対象にする。
各 `--memo` `--task` で type を絞り込める。

### brief

```bash
koko brief
koko brief --week
koko brief --month
```

今日やること、期限切れ、近日中の task、recent memos、recent journals を表示する。
デフォルトでは実行時点以降に関係する情報を中心に表示する。
`recent memos` は直近7日、`recent journals` は直近3日を対象にする。

## Data Model

```ts
type EntryType = "memo" | "task" | "journal";

type Entry = {
  id: string;
  type: EntryType;
  body: string;
  status: "pending" | "done" | "archived" | null;
  dueAt: Date | null;
  tag: string | null;
  createdAt: Date;
  updatedAt: Date;
};
```

## Database Tables

tag は1 entry につき1つだけ保持する。DBでは `entries.tag` に保存する。

### entries

| column | type | note |
|---|---|---|
| id | text | primary key |
| type | text | memo / task / journal |
| body | text | required |
| tag | text | optional |
| status | text | pending / done / archived, null for memo and journal |
| due_at | integer | Unix timestamp, task only |
| created_at | integer | Unix timestamp |
| updated_at | integer | Unix timestamp |

## Brief Output Concept

```text
Morning Briefing

Today

- PRを出す
- 山田さんに返信

Overdue

- 履歴書を直す

Due Soon

- 金曜 17:00 PRを出す

Recent Memos

- SQLite FTS5について調べる [研究]
- 教科書を読む [研究]

Recent Journals

- 今日は設計の方向性が見えてきた
```

表示優先順位:

1. overdue tasks
2. today tasks
3. due soon tasks
4. recent memos
5. recent journals

## Runtime Storage

SQLite database file: `data/koko.db`

Drizzle migrations: `drizzle/`
