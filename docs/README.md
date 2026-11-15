# docs

このリポジトリのドキュメント置き場。人間と AI エージェントのどちらが読んでも、**今の仕様・今の構成・過去の設計判断・操作の手順を取り違えない**状態を目指す。

## 5 つの種類

| ディレクトリ | 答える問い | 何の正本か | ライフサイクル | ファイル名 |
| --- | --- | --- | --- | --- |
| [specs/](specs/README.md) | 今、何を満たすべきか | 機能の振る舞い・制約・受け入れ条件 | Living Document。実装と同じ変更の中で直す | `<feature>.md` |
| [architecture/](#architecture) | 今、どう組まれているか。どう書くか | 構成・置き場所・依存の向き・命名・スタイルの規約 | Living Document。構成や規約と同じ変更の中で直す | `<topic>.md` |
| [design-docs/](design-docs/README.md) | なぜそう作ったか。どう作るか | 設計の判断・捨てた案・トレードオフ | 複数の作り方を比べて選ぶ変更の、実装前に書く。実装後は原則として凍結する | `YYYYMMDD_<topic>.md` |
| [runbooks/](#runbooks) | どう操作するか | 開発・運用の手順 | Living Document。手順と同じ変更の中で直す | `<operation>.md` |
| [transcripts/](transcripts/README.md) | 誰が何を話したか | 会話・ヒアリング・録音の原記録 | 原則として書き換えない | `YYYY-MM-DD-<topic>.md` |

ADR・RFC・PRD・Blueprint のような専用のディレクトリは作らない。重要な技術判断の背景と、検討して捨てた案は design doc に書く。

## 読み分け

- **今の仕様を知りたいときは specs を読む。** design doc は書いた時点の判断の記録で、今の仕様の正本ではない
- **今の構成と規約を知りたいときは architecture を読む。** 依存の向きの大半は `.oxlintrc.json` で、色と書体のトークンは `panda.config.ts` の型で機械的に守らせている
- **なぜ今の形なのかを知りたいときは design doc を読む。** 捨てた案や「この先もやらない」は当時の判断で、変更を断る根拠ではない。前提が変われば選び直してよい
- **手を動かす手順は runbooks を読む**
- **会話の記録は transcripts を読む。** 会話で決まったことは、specs・architecture・runbooks・design doc に書いて初めて有効になる

### 食い違いを見つけたら

- **design doc と specs・architecture が違うのは不整合ではない。** design doc は当時の記録で、今を表すのは specs と architecture のほう
- **Living Document どうし、または Living Document とコードが違うときは、どちらかに黙って寄せない。** どちらが意図された状態かを確かめてから直す。確かめられないものは、その spec の「未確認事項」に書く
- **コードにあるからといって、意図された仕様とは限らない。** 根拠（design doc・README・コードの注釈・ユーザーの確認）がないものを specs の本文に書かない

## 変更と文書の流れ

```text
会話（transcripts） → 検討と承認（design doc） → 実装 → specs・architecture・runbooks を今の状態に直す → design doc を implemented にして凍結
```

- 仕様は変えてよい。過去の design doc と違う変更を頼まれたら、それを新しい検討の起点にする
- **まだ実装していない案を specs に書かない。** 実装前の変更案は、design doc の「対象の仕様」に書く
- design doc が要るかどうかの基準と status の進め方は [design-docs/README.md](design-docs/README.md) にある

## 共通の書き方

- **同じ情報を 2 か所に書かない。** 正本を 1 つに決めて、他からはリンクする
- **日付をファイル名に付けるのは、凍結する文書（design-docs・transcripts）だけ。** Living Document（specs・architecture・runbooks）は、変わったら文書を増やさずに中身を書き直すので、同じ名前のまま残るよう日付を付けない
- ファイル名は英小文字の kebab-case。`README.md`（その置き場所の説明と一覧）と `_template.md`（新しく書くときのひな形）だけは例外
- 本文は日本語で書く

## 一覧

### specs

[specs/README.md](specs/README.md) の一覧にある。

### architecture

- [overview.md](architecture/overview.md) — 全体の構成（何で作り、どう配るか）・開発の道具・構成上の制約
- [directory-structure.md](architecture/directory-structure.md) — `apps/site` の置き場所の規約（判断フロー・各層の責務・依存の向き・lint で守らせていること・命名）
- [styling.md](architecture/styling.md) — スタイルの書き方（Panda CSS の設定・トークン・繰り返し出てくる見た目・動き）

### design-docs

[design-docs/README.md](design-docs/README.md) の一覧にある。

### runbooks

- [development.md](runbooks/development.md) — 手元で開発する（セットアップ・Git フック・開発サーバー・ビルド・lint と整形）
- [deploy.md](runbooks/deploy.md) — Cloudflare Workers にデプロイする（独自ドメイン・PR ごとのプレビュー）
- [start-from-template.md](runbooks/start-from-template.md) — テンプレートから新しいサイトを作ったときに変えるもの
- [minimum-release-age.md](runbooks/minimum-release-age.md) — 公開から 7 日未満のバージョンを入れる（pnpm・Renovate の設定と例外の書き方）

### transcripts

[transcripts/README.md](transcripts/README.md) の一覧にある。
