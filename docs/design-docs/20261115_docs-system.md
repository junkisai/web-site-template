---
title: ドキュメントを specs・architecture・design-docs・runbooks・transcripts に分ける
date: 2026-11-15
status: review
author:
pr:
---

> **状態について。** 移行の作業は、ユーザーの依頼（2026-11-15）に沿ってすでに行った。依頼に書かれていなかった細部は、移行を進めた AI エージェントが決めた（[依頼になく、移行で決めたこと](#依頼になく移行で決めたこと)）。エージェントは design doc を自分で承認しないので、ユーザーがこの細部を確かめるまで `review` に置く。確かめたら、実装 PR を `pr` に入れて `implemented` にする。

## 概要

今の仕様を `specs/` に、今の構成と規約を `architecture/` に、手順を `runbooks/` に置き、`design-docs/` は設計判断の記録だけにする。design doc の凍結は記録の凍結であって、仕様の凍結ではないことを、AGENTS.md と各ディレクトリの README に書く。

## 背景

- `design-docs/` に、仕様・実装の設計・技術的な判断が混ざっていた。今の仕様を知るには、凍結した design doc とコードを突き合わせるしかなかった
- design doc は実装後に凍結するルールだった。そのため AI エージェントが過去の design doc を今の変えられない仕様として読み、仕様の変更を断ったり、過去の設計にこだわったりした
- 旧 `design-docs/README.md` は「なぜ spec ではなく design doc なのか」として、仕様を別に書かない方針をとっていた
- 旧 `docs/README.md` は、無いディレクトリ（`references/`）を挙げ、すべての文書に `YYYYMMDD_` を付ける規則を書いていた。一方で transcripts は `YYYY-MM-DD-` を使っていた

## ゴール

- [x] 5 種類の責務とライフサイクルが、`docs/README.md` と各ディレクトリの README に書いてある
- [x] 今の仕様を、design doc を読まずに `specs/` で確かめられる
- [x] 既存の design doc の判断・背景・捨てた案・やらないことが残っている
- [x] エージェントの運用ルール（情報源の扱い・仕様変更の扱い・自己承認の禁止）が AGENTS.md にある
- [x] `docs/`・README・AGENTS.md・`apps/site/README.md` の相対リンクが切れていない
- [x] アプリのコード・依存・lint の設定・ビルドの設定を変えていない。`CLAUDE.md` は `AGENTS.md` へのシンボリックリンクのまま

## やらないこと

- ADR・RFC・PRD・Blueprint の専用ディレクトリは作らない。重要な技術判断の背景と代替案は design doc に書く（依頼で決まった方針）
- アプリのコード・依存・lint の設定・ビルドの設定は変えない。見つけた不整合は、specs の「未確認事項」と移行の報告に残す
- web-app-template のドキュメントは変えない。依頼にあった `20260906_db-turso-to-cloudflare-d1-requirements.md` は、このリポジトリには無く（Git の履歴にも無い）、web-app-template にある

## 対象の仕様

サイトの仕様は変えない。今の仕様を、既存の design doc・README・AGENTS.md・コードの注釈から次の specs に書き出した。意図を確かめられない振る舞いは、本文に入れず「未確認事項」に置いた。

- [specs/site.md](../specs/site.md)
- [specs/page-metadata.md](../specs/page-metadata.md)
- [specs/motion.md](../specs/motion.md)
- [specs/web-font.md](../specs/web-font.md)
- [specs/web-analytics.md](../specs/web-analytics.md)

## 設計

### 5 つの種類

種類・責務・ライフサイクル・ファイル名は依頼のとおりにした。今の定義は [docs/README.md](../README.md) にある。

### 移行の対応

| 移行前 | 移行後 | 中身 |
| --- | --- | --- |
| `architecture/20260819_directory-structure.md` | [architecture/directory-structure.md](../architecture/directory-structure.md) | 日付を外した。スタイルの節を `styling.md` に分けた。まだ無いディレクトリ・説明のための例・今あるファイルを区別した。テストランナーが無いことを書いた |
| （旧 directory-structure の「スタイルの書き方」） | [architecture/styling.md](../architecture/styling.md) | 規約はそのまま。`panda.config.ts` の今の設定と、`data-reveal` に `RevealOnScroll` が要ることを足した。例の `color: 'accentText'`（無いトークン）を `accent` に直した |
| （なし） | [architecture/overview.md](../architecture/overview.md) | コードと設定から書き起こした。旧 README の「環境変数と secret はありません」と TypeScript 6 の据え置きをここに移した |
| `design-docs/20261031_web-site-template.md` | （同じ名前） | 仕様を specs に、規約を architecture に、手順を runbooks に移し、設計の記録として組み直した。背景・当時のゴール・やらないこと・判断の理由・捨てた案は残した。「対象の仕様」「トレードオフ」の節を足した |
| `design-docs/README.md` | （同じ名前） | specs との違い、凍結するのは記録であって仕様ではないこと、`approved` はユーザーだけが進めることを書いた |
| `design-docs/_template.md` | （同じ名前） | 「対象の仕様」「トレードオフ」の節を足した |
| `runbooks/20260825_minimum-release-age.md` | [runbooks/minimum-release-age.md](../runbooks/minimum-release-age.md) | 日付を外した。例を `better-auth`（このリポジトリの依存ではない）から `astro` に変えた |
| README の Setup・Development・Lint / Format | [runbooks/development.md](../runbooks/development.md) | ビルドと preview のコマンドを足した |
| README の Deploy | [runbooks/deploy.md](../runbooks/deploy.md) | `wrangler.jsonc` の注釈にある独自ドメイン・プレビューの手順と、design doc のゴールにあった `--dry-run` を足した |
| README と design doc の「テンプレートから作ったら」 | [runbooks/start-from-template.md](../runbooks/start-from-template.md) | specs を直す行と、必要になったらやること（`noindex`・OGP 画像・サイト名・favicon）を足した |
| `docs/README.md` | （同じ名前） | 5 種類の定義・読み分け・食い違いの扱い・命名に書き直した。無い `references/` を外した |
| `AGENTS.md` | （同じ名前） | 情報源の扱いと変更の進め方を足した。依存の向きの図を architecture とコードに合わせた |
| `transcripts/README.md`・`_template.md` | （同じ名前） | 原則として書き換えないこと、決定の正本ではないことを書いた。命名・メタ情報・本文の構成は変えていない |
| （なし） | [specs/](../specs/README.md) の README・`_template.md`・各 spec | 新しく作った |

旧ファイル名の日付（`20260819`・`20260825`）は、このリポジトリの最初のコミット（2026-10-31）より前で、このリポジトリの中では由来を確かめられない。日付は旧ファイル名としてこの表と Git の履歴（`git log --follow`）に残る。

### 依頼になく、移行で決めたこと

1. スタイルの規約を `directory-structure.md` から `architecture/styling.md` に分けた。置き場所の規約と独立して読めるようにするため
2. README の手順（セットアップ・開発・デプロイ・テンプレートから作ったとき）を `runbooks/` に移し、README には入口と主なコマンドだけを残した
3. specs は、design doc に挙がっていた「中身に依存しない仕組み」に沿って、サイト全体・メタ情報・動き・書体・アクセス解析の 5 つに分けた
4. 凍結した design doc に後から加えてよいもの（`superseded` と後継へのリンク、`pr`、リンク切れ、明らかな誤字）を決めた
5. AGENTS.md の規約の要約は残し、正本は architecture であること、食い違ったら architecture に合わせて AGENTS.md を直すことを書いた
6. `architecture/` と `runbooks/` には README を置かず、`docs/README.md` に一覧を持たせた（依頼の目標の構成どおり）
7. この移行自体を design doc に残し、`review` に置いた

## 検討した他の案

| 案 | 採らなかった理由 |
| --- | --- |
| design doc を Living Document にして、仕様が変わるたびに書き換える | 「いつ何を決めたか」が消える（旧 `design-docs/README.md` が凍結の理由に挙げていたこと）。仕様と判断の記録を分ければ、どちらも失わない |
| ADR などの専用ディレクトリを足す | 依頼で採らないと決まっていた。背景と代替案は、design doc の「検討した他の案」と「トレードオフ」で残せる |
| AGENTS.md の規約の要約を消し、architecture へのリンクだけにする | エージェントが毎回読む場所から規約が消え、architecture を開かずに書かれたコードは lint で止まるものしか止まらなくなる。重複は「正本は architecture」と書いて扱う |
| README の手順を README に残す | 手順の正本が README と runbooks に分かれ、どちらを直すか迷う |
| specs に作った日時を付ける（`YYYYMMDDHHmm_<feature>.md`） | 移行の途中で一度この名前にしたが、ユーザーの判断で日付なしに戻した。仕様が変わったら文書を増やさずに中身を書き直す運用なので、1 つの機能に spec は 1 つで、日付で区別する必要がない。日付は作った日しか表さず、凍結した記録や古い仕様と読み違えるおそれもある |

## トレードオフ

- 実装のたびに、specs・architecture・runbooks を同じ変更の中で直す手間が増える。直し忘れても lint では気づけず、レビューで見ることになる
- specs には意図を確かめられたものだけを書いたので、意図がわからない振る舞いは各 spec の「未確認事項」に残っている。決まるまでは、その部分の仕様は specs だけでは決まらない
- README から手順を移したので、GitHub のリポジトリのトップから手順を読むには、リンクを 1 つたどることになる

## 影響範囲

- 名前を変えた 2 ファイル（directory-structure・minimum-release-age）へのリンクを、README.md・AGENTS.md・`apps/site/README.md`・design-docs で張り替えた。外からこれらの旧パスに直接リンクしていれば切れる
- ユーザーのスキル `design-doc` は、`docs/design-docs/README.md` と `_template.md` を規約として読むので、新しい status の扱いに従う。ただし、スキル本文の「恒常的な規約は architecture 文書へ」には specs が出てこない
- web-app-template は旧体系のまま

## 未決事項

- [ ] 「依頼になく、移行で決めたこと」の 1〜7 でよいか（ユーザーの確認）
