---
title: Astro・Panda CSS・Cloudflare Workers で作る Web サイトのテンプレート
date: 2026-10-31
status: implemented
author:
pr:
---

## 概要

LP・キャンペーンページ・会社や個人のサイトのような、**ログインも DB も無い Web サイト**を始めるためのテンプレート。Astro の静的出力でページを作り、スタイルは Panda CSS で書き、Cloudflare Workers の静的アセットとして配る。ブラウザに JS を送らない構成と、置き場所・依存の向き・命名の規約を、最初から lint で守らせる。

## 背景

**[web-app-template](https://github.com/junkisai/web-app-template) は、ログインと DB を持つ Web アプリが前提。** TanStack Start（React）・Better Auth・D1・管理画面が入っている。文章と画像が中心のサイトをそこから作ると、使わないものを消す作業から始まり、静的に書き出しても React のランタイムがページに届く。

**サイトは軽さがそのまま成果に効く。** 初回表示が遅いと読まれる前に離脱される。ブラウザに JS を送らない土台を最初に用意しておけば、中身を作り始めてから基盤を入れ替えずに済む。

**この構成は、実際の案件で一度作って使っている。** web-app-template から作ったリポジトリを Astro のサイト用に作り替え、その上でページを作って公開まで進めた。そこで足した仕組みのうち、中身に依存しないもの（日本語の書体を使う字だけ切り出す・OGP・画面に入ったら出す動き・アクセス解析の受け口・検索に出さない指定）を、テンプレートとして切り出す。

## ゴール

- [x] clone して `pnpm install` → `pnpm lint`（`astro check`・oxlint・knip）が通る。`styled-system/` はコミットせず、install のときに生成される
- [x] `pnpm -F site build` で `apps/site/dist/` に HTML・CSS・書体が出る。JS のファイルは出ず、`<script>` は書いたところ（inline）にしかない
- [x] 出力された CSS に、Panda の既定のプリセット（`preset-panda`）のトークンと reset が入っていない
- [x] 書体は、ページで使う字だけを切り出した 1 ファイルになる
- [x] `pnpm -F site exec wrangler deploy --dry-run` が通る
- [x] 規約を破ると lint が落ちる（画面から別の画面を import する・`css()` にトークン以外の色を書く）
- [x] `.astro` を整形でき、pre-commit で整形と lint が `.astro` にもかかる
- [x] README・AGENTS.md・[architecture](../architecture/20260819_directory-structure.md) が構成と規約を説明している

## やらないこと

今はやらない（要るサイトで、そのとき design doc を書く）:

- **フォームとサーバーの処理。** 送信先（メール・外部ツール・D1）で作りが変わる。サーバーの処理が要るなら、Astro の Cloudflare adapter をそのときに入れる
- **CMS からのデータ取得。** 取得の置き場所だけ規約に書いてある（`pages/` の frontmatter から、まとまりの `api/` を呼ぶ）
- **CI と自動デプロイ。** 手元の `wrangler deploy` と、Cloudflare の Git 連携の PR プレビュー（`previews`）まで
- **デザインのトークン一式。** 配色は役割で名前を付けた仮のもの。余白・文字サイズのトークン化とレシピは、デザインが来てから、繰り返し出てくるものだけを足す

この先もやらない:

- **ログイン・DB・管理画面。** 要るなら web-app-template から作る。サイトに 2 つ目の入口が要るときは、`apps/` に別アプリとして足し、サイトは静的出力のまま保つ

## 設計

### 画面と URL

| URL | 画面 | 内容 |
| --- | --- | --- |
| `/` | `screens/top` | 仮のトップページ。テンプレートから作ったら置き換える |

### 置き場所

```text
apps/site/
├─ astro.config.ts          書体（使う字だけ切り出す）・Panda の Vite plugin・site（OGP の絶対 URL）
├─ panda.config.ts          トークン（色・書体）・字の段・灰色の箱・段組みの箱・動きの条件
├─ wrangler.jsonc           静的アセットとして配る Worker の設定
├─ scripts/
│  └─ collect-glyphs.ts     src の .astro と .ts に書いた字を集める（書体の切り出しに使う）
└─ src/
   ├─ pages/index.astro     URL と <head> に入れる値
   ├─ screens/top/          仮のトップページ
   ├─ components/
   │  ├─ layout/base-layout.astro   <html>・<head>（OGP・書体・動きの判定・アクセス解析・検索の指定）
   │  └─ ui/reveal-on-scroll.astro  画面に入った [data-reveal] に data-shown を付ける
   └─ styles/globals.css    @layer の順番と reset
```

置き場所・依存の向き・命名の規約は [architecture/20260819_directory-structure.md](../architecture/20260819_directory-structure.md) にあり、依存の向きは `.oxlintrc.json` の `no-restricted-imports` で落ちる。

### スタイル

- **Panda CSS の `css()` で書く。** `strictTokens` で色と書体はトークン以外を書けなくし、`strictPropertyValues` で値も型で検査する（`astro check` で落ちる）
- **既定のプリセットと reset を外す。** 使っていないトークンまで CSS 変数として出るのを止める。reset は `globals.css` の `@layer reset` に、頼っているものだけを置く
- **画面幅の切り替えは `pc`（900px）の 1 つだけ。** スマホと PC の 2 段で組む

### 書体

日本語の書体は、そのまま読むと字の範囲ごとのファイルが 100 個以上になり、`@font-face` だけで HTML が数百 KB になる。Astro の Fonts API（`experimental.glyphs`）に、`scripts/collect-glyphs.ts` で集めたページの字を渡し、**使う字だけを切り出した 1 ファイル**にする。新しい字を書いたら、開発サーバーを立ち上げ直すと書体に入る。

### JS

JS は `<script>` を書いたところにしか出ない。テンプレートにあるのは、動きを出すかの判定（`<head>` の inline）と、画面に入ったら `data-shown` を付ける処理だけ。動きは「出る前に隠す」スタイルを `data-motion` があるときだけ当てるので、JS が動かない・視差効果を減らす設定でも、最初から全部見える。

### アクセス解析と検索

- **ページビューは Cloudflare Web Analytics で数える。** ビーコンは `base-layout.astro` に書き、サイトのトークンが空のうちは出さない。Workers のカスタムドメインで自動の設定が効くかがドキュメントで確かめられないので、自動の設定には任せない
- **検索に出したくないページは、`BaseLayout` に `noindex` を付ける。** `noindex, nofollow` が入る。既定は出す

### テンプレートから作ったら最初に変えるところ

| ファイル | 変えるもの |
| --- | --- |
| `apps/site/wrangler.jsonc` | `name`（Worker の名前）。アカウントが複数なら `account_id`、独自ドメインなら `routes` |
| `apps/site/astro.config.ts` | `site`（公開する URL） |
| `apps/site/panda.config.ts` | 配色と字の段 |
| `apps/site/src/components/layout/base-layout.astro` | Web Analytics のトークン（使うなら） |
| `apps/site/src/pages/`・`src/screens/` | 仮のトップページ |
| `README.md`・`docs/design-docs/README.md` | リポジトリの名前と説明、design doc の一覧 |

## 検討した他の案

| 案 | 採らなかった理由 |
| --- | --- |
| web-app-template に Astro のアプリを足す | 認証・DB・React が workspace に残り、サイトには使わないものの更新（Renovate の PR）と lint の対象が増える |
| Next.js や TanStack Start の静的書き出し | 文章と画像だけのページにも React のランタイムが届く |
| StyleX（web-app-template と同じ） | Panda CSS には Astro 用の Vite plugin と導入手順が公式にあり、`strictTokens` で色と書体をトークン以外書けなくでき、StyleX より一段狭く縛れる |
| Cloudflare Pages で配る | 新しく作るなら Workers の静的アセットが推奨。PR のプレビューも Workers の `previews` で出せる |
| Web フォントを Google Fonts の `<link>` で読む | 字の範囲ごとのファイルと、外のドメインへの接続が増える。Fonts API なら、ビルド時に取ってきて自分のドメインから配れる |

## 影響範囲

新しいテンプレートリポジトリなので、既存のものは変わらない。web-app-template はそのまま残し、ログインや DB のあるアプリはそちらから作る。

## 未決事項

なし。
