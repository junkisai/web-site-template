# docs

このリポジトリのドキュメント置き場。人間と AI エージェントのどちらが読んでも、**プロダクトの目的・今の要件・今の構成・過去の設計判断・操作の手順を取り違えない**状態を目指す。

## 5 つの種類

| 置き場所 | 答える問い | 何の正本か | ライフサイクル | ファイル名 |
| --- | --- | --- | --- | --- |
| [product.md](product.md) | このプロダクトは何のためにあるか（全体の Why） | プロダクト全体の目的・対象・課題・提供価値・成功条件・非ゴール・原則 | Living Document。目的や方向が変わったら直す | `product.md` の 1 つだけ |
| [prds/](prds/README.md) | 各機能は何のためにあり、今何を満たすべきか（機能の Why と What） | 機能ごとの目的・要件・今有効な振る舞い・受け入れ条件 | Living Document。実装と同じ変更の中で直す | `<feature>.md` |
| [architecture/](#architecture) | 今、どう組まれているか。どう書くか（今の How） | 技術の構成・機能を支える仕組み・置き場所・依存の向き・命名・スタイルの規約・技術上の制約 | Living Document。構成や規約と同じ変更の中で直す | `<topic>.md` |
| [runbooks/](#runbooks) | どう操作するか | 開発・運用の手順 | Living Document。手順と同じ変更の中で直す | `<operation>.md` |
| [transcripts/](transcripts/README.md) | 誰が何を話したか | 会話・ヒアリング・録音の原記録 | 原則として書き換えない | `YYYY-MM-DD-<topic>.md` |

機能の要件は、機能ごとに 1 つの PRD として [prds/](prds/README.md) に書く。ADR・RFC・Blueprint のような判断の記録の置き場所は作らない。判断の理由と、検討して捨てた案は、その変更の PR の本文とコミットに書く。

2026-11-15 に `docs/specs/` を `docs/prds/` に移し、機能の目的・背景・ゴールも PRD に書くようにした。あわせて `product.md` を足し、PRD にあった実現方法の説明を architecture に移した。2026-11-22 の決定で、設計判断の記録を置いていた `docs/design-docs/` を廃止した。

### PR・コミットと architecture は別のもの

- **PR の本文とコミットは、当時の判断と、それを選んだ理由。** あとから書き換えないので、時間が経つと今の構成とずれていく
- **architecture は、今の How。** 今使っている技術・構成・規約を、PR やコミットにしか書いていない状態にしない。PR で決めた実現方法は、同じ PR の中で architecture に書く

## 読み分け

- **プロダクト全体の目的・対象・方向を知りたいときは product.md を読む**
- **今の機能の要件と振る舞いを知りたいときは prds を読む。** PR やコミットは書いた時点の判断の記録で、今の要件の正本ではない
- **今の構成と規約を知りたいときは architecture を読む。** 依存の向きの大半は `.oxlintrc.json` で、色と書体のトークンは `panda.config.ts` の型で機械的に守らせている
- **なぜ今の形なのかを知りたいときは、その箇所を変えたコミットと PR を読む。** 捨てた案や「この先もやらない」は当時の判断で、変更を断る根拠ではない。前提が変われば選び直してよい
- **手を動かす手順は runbooks を読む**
- **会話の記録は transcripts を読む。** 会話で決まったことは、product.md・prds・architecture・runbooks に書いて初めて有効になる

### どこに書くか

| 書きたいこと | 置き場所 |
| --- | --- |
| プロダクト全体の目的・対象・提供価値・成功条件・非ゴール・原則 | [product.md](product.md) |
| 機能の目的・背景・ゴール・振る舞い・要件・受け入れ条件 | [prds/](prds/README.md) |
| セキュリティ・プライバシー・データの扱いの要件 | [prds/](prds/README.md)（技術の言葉が混ざってもよい） |
| 外から観測できる契約（`<head>` に出す値など） | [prds/](prds/README.md)。専用の契約の文書ができたら、そちらを正本にして PRD からリンクする |
| 使っている技術・設定・ファイルの置き場所・機能を支える仕組み・技術上の制約 | [architecture/](#architecture) |
| 技術を選んだ理由・捨てた案・トレードオフ | その変更の PR の本文とコミット |
| セットアップ・デプロイ・設定を変える手順 | [runbooks/](#runbooks) |

### 食い違いを見つけたら

- **過去の PR やコミットと product.md・prds・architecture が違うのは不整合ではない。** PR やコミットは当時の記録で、今を表すのは product.md・prds・architecture のほう
- **Living Document（product.md・prds・architecture・runbooks）どうし、または Living Document とコードが違うときは、どちらかに黙って寄せない。** どちらが意図された状態かを確かめてから直す。確かめられないものは、その PRD の「未確認事項」に書く
- **コードにあるからといって、意図された要件とは限らない。** 根拠（PR やコミット・README・コードの注釈・ユーザーの確認）がないものを PRD の本文に書かず、「実装から読み取れる現状」に書く

## 変更と文書の流れ

```text
会話（transcripts）
  → 関連する PRD・architecture（目的や方向に関わるなら product.md も）を読む
  → 実装
  → prds・architecture・runbooks（目的や提供価値が変わるなら product.md も）を今の状態に直す
  → 判断の理由と捨てた案を、PR の本文とコミットに書く
```

- **過去の PR やコミットに残った判断、今の PRD、architecture の既定の方針は、ユーザーの新しい要求で変えたり見直したりしてよい。** 過去の判断と違う変更を頼まれたら、それを新しい検討の起点にする。ただし、安全性や技術的な制約を黙って無視してよいという意味ではない
- **まだ実装していない案を PRD に書かない。** PRD は、実装と同じ変更の中で直す

## 共通の書き方

- **同じ情報を 2 か所に書かない。** 正本を 1 つに決めて、他からはリンクする
- **日付をファイル名に付けるのは、書き換えない記録（transcripts）だけ。** Living Document（product.md・prds・architecture・runbooks）は、変わったら文書を増やさずに中身を書き直すので、同じ名前のまま残るよう日付を付けない
- ファイル名は英小文字の kebab-case。`README.md`（その置き場所の説明と一覧）と `_template.md`（新しく書くときのひな形）だけは例外
- 本文は日本語で書く

## 一覧

### product

- [product.md](product.md) — テンプレート全体の目的・対象・課題・提供価値・成功条件・スコープと非ゴール・原則

### prds

[prds/README.md](prds/README.md) の一覧にある。

### architecture

- [overview.md](architecture/overview.md) — 全体の構成（何で作り、どう配るか）・機能を支える仕組み・開発の道具・構成上の制約
- [directory-structure.md](architecture/directory-structure.md) — `apps/site` の置き場所の規約（判断フロー・各層の責務・依存の向き・lint で守らせていること・命名）
- [styling.md](architecture/styling.md) — スタイルの書き方（Panda CSS の設定・トークン・繰り返し出てくる見た目・動きの仕組みと書き方）

### runbooks

- [development.md](runbooks/development.md) — 手元で開発する（セットアップ・Git フック・開発サーバー・ビルド・lint と整形）
- [deploy.md](runbooks/deploy.md) — Cloudflare Workers にデプロイする（独自ドメイン・PR ごとのプレビュー）
- [start-from-template.md](runbooks/start-from-template.md) — テンプレートから新しいサイトを作ったときに変えるもの
- [minimum-release-age.md](runbooks/minimum-release-age.md) — 公開から 7 日未満のバージョンを入れる（pnpm・Renovate の設定と例外の書き方）

### transcripts

[transcripts/README.md](transcripts/README.md) の一覧にある。
