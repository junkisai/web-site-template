# サイト全体

このテンプレートから作るサイト（LP・キャンペーンページ・会社や個人のサイトなど）全体が満たすこと。個々の機能は [PRD の一覧](README.md#一覧) の各ファイルにある。

## 概要・提供価値

文章と画像が中心のサイトを、閲覧者のブラウザに機能に要るものだけを届ける形で配る。JS が動かない環境でも、ページの内容はすべて読める。テンプレートの利用者は、ログインや DB を持たないサイトを、使わない仕組みを消す作業から始めずに作り始められる。

## 背景・解決する課題

- ログインと DB のある Web アプリ用の [web-app-template](https://github.com/junkisai/web-app-template) から文章と画像が中心のサイトを作ると、使わないものを消す作業から始まり、静的に書き出しても React のランタイムがページに届いた（[product.md の「解決する課題」](../product.md#解決する課題)）
- サイトは軽さがそのまま成果に効き、初回表示が遅いと読まれる前に離脱される、というのがこのテンプレートの前提（同）。前提を裏付ける数値は、このリポジトリには無い（[product.md の「未確認事項・仮説」](../product.md#未確認事項仮説)）

## 対象ユーザー・スコープ

- 対象ユーザー・役割: サイトの閲覧者。テンプレートからサイトを作る開発者
- 対象の画面・URL: サイトのすべてのページ（今あるページは[ページ](#ページ)の表）
- できる操作: 閲覧者はページを読み、ページの中のリンクをたどる
- 対象の範囲: ページの配り方・ページの一覧・言語・画面幅・ブラウザで動く JS・外部への接続
- 対象外: ログイン・DB・管理画面。テンプレートを作ったときに「この先もやらない。要るなら web-app-template から作る」と決めた（[テンプレートを作ったときの記録の「やらないこと」](https://github.com/junkisai/web-site-template/blob/aaa2cbbdb77e2447ac00427379344e434e7ee40a/docs/design-docs/20261031_web-site-template.md#やらないこと)）。テンプレートから引き継いだ既定の方針で、ユーザーが明示的に求めれば見直してよい（[product.md の「スコープ・非ゴール」](../product.md#スコープ非ゴール)）

## ゴール・成功条件

- 閲覧者が、JS が動かない環境でも、ページの内容をすべて読める
- 閲覧者のブラウザに届く JS と外部への接続が、[業務ルール・制約](#業務ルール制約)の範囲に収まっている
- 表示の速さや離脱率などの測定指標は決まっていない

## 振る舞い

### 配り方

- ページの内容は、公開（デプロイ）した時点で決まる。リクエストや閲覧者によって組み立て直したり、出し分けたりしない。どう実現しているかは [architecture/overview.md の「システムの形」](../architecture/overview.md#システムの形)にある

### ページ

| URL | 内容 |
| --- | --- |
| `/` | 仮のトップページ。テンプレートから作ったサイトでは置き換える |

### 言語

- ページの言語は日本語で、HTML にも日本語と書く（`<html lang="ja">`）

### 画面幅

- 幅 900px 以上を PC、900px 未満をスマホとして、2 段で組む。間の段は持たない

### JS が動かないとき

- **JS が動かなくても、すべての内容が見える。** JS で足すのは動きと計測だけで、内容を見せるのに JS は要らない

## 業務ルール・制約

### ブラウザで動く JS

- 閲覧者のブラウザで動く JS は、ページの機能に要るものだけにする。UI フレームワーク（React など）のランタイムは届けない
- テンプレートの時点でブラウザで動く JS は、動きを出すかの判定と、画面に入った要素を出す処理の 2 つ（[motion.md](motion.md)）。トークンを入れたときは、ページビューを数えるビーコンが加わる（[web-analytics.md](web-analytics.md)）

### 外部への接続

- 閲覧者のブラウザが外のドメインから読み込むのは、ページビューを数えるビーコンだけ。それもトークンを入れたときだけ（[web-analytics.md](web-analytics.md)）
- 書体はサイトと同じドメインから配る（[web-font.md](web-font.md)）

## 状態遷移

なし

## 例外・境界条件

- JS が動かない → 動きは出ず、内容はすべて見える（[motion.md](motion.md)）
- 幅がちょうど 900px → PC として組む
- 存在しない URL → 何を返すかは決まっていない（[未確認事項](#未確認事項)）

## 受け入れ条件

- テンプレートの状態でビルドした出力に `.js` のファイルが無く、`<script>` はすべて HTML の中に書かれている
- Web Analytics のトークンが空のとき、出力の HTML に外のドメインを指す `<script>`・`<link>` が無い
- JS を切ったブラウザで開いても、すべての内容が見える
- 幅 900px を境に、字の大きさと余白がスマホ用と PC 用で切り替わる
- 出力の HTML の `<html>` に `lang="ja"` がある

## 実装から読み取れる現状・未確認事項

### 実装から読み取れる現状

- **ログイン・DB・管理画面のほかに、フォームの送信・CMS からのデータ取得・リクエストごとのサーバーの処理も無い。** フォームとサーバーの処理、CMS は、テンプレートを作ったときに、今はやらない（要るサイトで、そのとき作り方を決める）とした（[テンプレートを作ったときの記録の「やらないこと」](https://github.com/junkisai/web-site-template/blob/aaa2cbbdb77e2447ac00427379344e434e7ee40a/docs/design-docs/20261031_web-site-template.md#やらないこと)）。この先も持たないと決めたものではない。要るようになったときに今の構成を保つか変えるかは、[architecture/overview.md の「構成上の制約」](../architecture/overview.md#構成上の制約)で扱う
- **存在しない URL への応答。** 配信の設定は「404 のページを返す」だが、404 のページは無い（[architecture/overview.md の「存在しない URL」](../architecture/overview.md#存在しない-url)）。2026-11-15 に手元で Workers の実行環境を立ち上げて確かめたところ、ステータス 404 と空の本文が返った。本番の Cloudflare で同じかは確かめていない

### 未確認事項

- **404 のページを用意するか。** 存在しない URL に何を返すべきかは決まっていない
- **`robots.txt`・`sitemap.xml` を出すか。** 置き場所（`public/`）の規約だけがあり、出すかどうかは決まっていない
- **対応するブラウザと端末の範囲。** どこにも決めていない

## 関連資料

- Product: [product.md](../product.md)
- Architecture: [overview.md](../architecture/overview.md)（システムの形・機能を支える仕組み・構成上の制約）、[styling.md](../architecture/styling.md)（画面幅の切り替えの書き方）
- Runbooks: [start-from-template.md](../runbooks/start-from-template.md)（仮のトップページを置き換える）
- 関連する PRD: [page-metadata.md](page-metadata.md)・[motion.md](motion.md)・[web-font.md](web-font.md)・[web-analytics.md](web-analytics.md)
- 根拠となる実装: `apps/site/src/pages/index.astro`、`apps/site/src/components/layout/base-layout.astro`、`apps/site/wrangler.jsonc`、`apps/site/panda.config.ts` の `theme.breakpoints`
