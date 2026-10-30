# web-site-template

ログインも DB も無い Web サイト（LP・キャンペーンページ・会社や個人のサイト）を始めるためのテンプレートです。Astro の静的出力でページを作り、Cloudflare Workers の静的アセットとして配ります。ブラウザに JS を送らない構成と、置き場所・依存の向き・命名の規約を、最初から lint で守らせます。

ログインや DB のある Web アプリは [web-app-template](https://github.com/junkisai/web-app-template) から作ります。

| Kind                             |                              |                                  |                                  |
| -------------------------------- | ---------------------------- | -------------------------------- | -------------------------------- |
| **言語・マークアップ**           | TypeScript (Language)        | HTML (Markup)                    |                                  |
|                                  |                              |                                  |                                  |
| **スタイル・デザイン**           | CSS (Style Sheet Language)   | Panda CSS (CSS-in-JS)            |                                  |
|                                  |                              |                                  |                                  |
| **フレームワーク**               | Astro (Static Site)          |                                  |                                  |
|                                  |                              |                                  |                                  |
| **ビルド・配信**                 | Vite (Build Tool)            | Cloudflare Workers (Hosting)     | Wrangler (Deployment CLI)        |
|                                  |                              |                                  |                                  |
| **開発ツール／ユーティリティ**   | pnpm (Package Manager)       | Turborepo (Monorepo Task Runner) | oxlint (Linter)                  |
|                                  | oxfmt (Formatter)            | Prettier (Formatter for .astro)  | knip (Unused Code Detector)      |

## Workspace

- `apps/site`: Web サイト。Astro の静的出力で作り、Cloudflare Workers の静的アセットとして配信する

ディレクトリ構成と置き場所の規約は [docs/architecture/20260819_directory-structure.md](./docs/architecture/20260819_directory-structure.md) にあります。要約は [AGENTS.md](./AGENTS.md) にあり、`CLAUDE.md` はそのシンボリックリンクです。編集するのは `AGENTS.md` の側です。機能を追加・変更するときは、実装の前に [docs/design-docs/](./docs/design-docs/README.md) に design doc を書きます。

この構成にした理由は [docs/design-docs/20261031_web-site-template.md](./docs/design-docs/20261031_web-site-template.md) にあります。

## テンプレートから作ったら

GitHub の「Use this template」で作ったあと、次を変えます。

| ファイル | 変えるもの |
| --- | --- |
| [apps/site/wrangler.jsonc](./apps/site/wrangler.jsonc) | `name`（Worker の名前）。アカウントが複数なら `account_id`、独自ドメインなら `routes` |
| [apps/site/astro.config.ts](./apps/site/astro.config.ts) | `site`（公開する URL。OGP の絶対 URL に使う） |
| [apps/site/panda.config.ts](./apps/site/panda.config.ts) | 配色（仮のもの）と字の段 |
| [apps/site/src/components/layout/base-layout.astro](./apps/site/src/components/layout/base-layout.astro) | Cloudflare Web Analytics のトークン（使うなら） |
| `apps/site/src/pages/`・`apps/site/src/screens/` | 仮のトップページ |
| この README と [docs/design-docs/README.md](./docs/design-docs/README.md) | リポジトリの名前と説明、design doc の一覧 |

## Setup

```sh
pnpm install
```

`pnpm install` すると、次の 2 つが走ります。

- **Panda CSS の生成物（`apps/site/styled-system/`）を作る。** `apps/site` の `prepare` script が `panda codegen` を実行します。生成物はコミットしません
- **Git フックを入れる。** lefthook 自身の `postinstall` がフックをインストールします。`pnpm-workspace.yaml` の `allowBuilds` に `lefthook: true` があるのはこのためで、外すとフックが有効になりません

フックの内容は [lefthook.yml](./lefthook.yml) にあります。

| フック | 実行内容 |
| --- | --- |
| pre-commit | ステージ済みのファイルに `oxlint --fix` をかけ、`.ts`・`.css` などは oxfmt、`.astro` は Prettier で整形し、修正結果を自動でステージし直します |
| pre-push | `pnpm lint`（`astro check`・`oxlint`・`knip`）を実行し、エラーがあれば push を中断します |

フックを一時的に飛ばしたいときは `LEFTHOOK=0 git commit` のように環境変数を付けます。

環境変数と secret はありません。

## Development

```sh
pnpm dev     # http://localhost:3000
```

`apps/site` だけを起動するときは `pnpm -F site dev` です。

- `apps/site/panda.config.ts` を変えたあと、型が古いままのときは `pnpm gen` で Panda の生成物を作り直します。`pnpm lint` は先に `gen` を流すので、lint では気にしなくて構いません
- 本文の書体（Noto Sans JP）は、ページで使う字だけを切り出して配ります。新しい字を書いたら、開発サーバーを立ち上げ直すと書体に入ります
- 動きを止めた状態で見るときは、URL に `?still` を付けます

## Lint / Format

```sh
pnpm lint                 # astro check・oxlint・knip
pnpm lint:packageVersion  # workspace 内の依存のバージョンのずれ（syncpack）
pnpm fmt                  # .astro は Prettier、それ以外は oxfmt
```

TypeScript は 6 に据え置いています。`.astro` の型を検査する `astro check` が TypeScript 7 で動かないためです（[withastro/astro#17268](https://github.com/withastro/astro/issues/17268)）。

## Deploy

手元から Cloudflare Workers にデプロイします。

```sh
pnpm -F site deploy
```

`astro build` で `apps/site/dist/` に静的ファイルを書き出し、`wrangler deploy` で静的アセットとして配信します。初回は `wrangler login` が必要です。デプロイ先のアカウントは、ログインしたユーザーか、[apps/site/wrangler.jsonc](./apps/site/wrangler.jsonc) の `account_id` で決まります。

独自ドメインで公開するときは、[apps/site/wrangler.jsonc](./apps/site/wrangler.jsonc) の `routes` と、[apps/site/astro.config.ts](./apps/site/astro.config.ts) の `site` を同じドメインにします。Cloudflare の Git 連携を使うと、PR ごとのプレビューが出ます（`wrangler.jsonc` の `previews`）。
