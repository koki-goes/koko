# koko CLI Command Reference

現時点の仕様に基づくコマンド一覧とオプション一覧。

## Input Rules

- 本文と `tag` 名はクオートで囲って入力する。
- 本文を指定した場合はエントリを作成する。
- 本文を指定しない場合は、その command の type に対応する過去のエントリを一覧表示する。
- `--tag` は作成時には tag 付与、一覧時には tag 絞り込みとして使う。
- `--tag` は1つだけ指定できる。
- `--d` と `--t` は日時入力に使う。

## Basic Commands

| command | purpose | example |
|---|---|---|
| `memo` | メモを保存・一覧表示 | `koko memo "教科書を読む" --tag "研究"` |
| `journal` | 日記を保存・一覧表示 | `koko journal "今日の日記を書く"` |
| `task` | タスクを保存・一覧表示 | `koko task "PRを出す" --d 0630 --t 17:00 --tag "仕事"` |
| `tag` | tag 単位で絞り込み表示 | `koko tag "研究"` |
| `brief` | 今日・近日の情報を集約表示 | `koko brief` |

## List Commands

| command | behavior |
|---|---|
| `koko memo` | memo のみを新しい順で表示 |
| `koko memo --tag "研究"` | `研究` tag の memo を表示 |
| `koko journal` | journal のみを新しい順で表示 |
| `koko task` | `pending` の task を表示 |
| `koko task --tag "仕事"` | `仕事` tag の `pending` task を表示 |
| `koko task --today` | 今日の task を表示 |
| `koko task --week` | 今週の task を表示 |
| `koko task --all` | 完了済みを含む task を表示 |
## Option Reference

| option | meaning | used by |
|---|---|---|
| `--tag "<name>"` | 作成時は tag 付与、一覧時は tag 絞り込み | `memo`, `task` |
| `--d <date>` | 日付指定 | `task` |
| `--t <time>` | 時刻指定 | `task` |
| `--today` | 今日に絞る | `task` |
| `--week` | 今週に絞る | `task`, `brief` |
| `--all` | 完了済みも含めて表示 | `task` |
| `--month` | 月単位の brief を表示 | `brief` |
| `--memo` | tag 検索を memo に限定 | `tag` |
| `--task` | tag 検索を task に限定 | `tag` |

## Notes

- `tag` は本文検索ではなく tag 一致の一覧表示。
- `--tags` は使わない。tag 関連のオプション名は `--tag` に統一する。
- task の完了フローはまだ仕様未定で、現在のMVP対象外。
- `brief` の `recent memos` は直近7日、`recent journals` は直近3日を表示する。
- `brief` は `today` / `overdue` / `due soon` / `recent memos` / `recent journals` を集約表示する。
