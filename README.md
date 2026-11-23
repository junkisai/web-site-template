# web-site-template

ログインも DB も無い Web サイト（LP・キャンペーンページ・会社や個人のサイト）を始めるためのテンプレートです。Astro の静的出力でページを作り、Cloudflare Workers の静的アセットとして配ります。UI フレームワークのランタイムをブラウザに送らず、JS を必要な機能に限る構成にしてあり、置き場所・依存の向き・命名の規約を最初から lint で守らせます。

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

## ドキュメント

[docs/README.md](./docs/README.md) に全体の案内があります。

| 知りたいこと | 置き場所 |
| --- | --- |
| このテンプレートの目的・対象・提供価値・成功条件 | [docs/product.md](./docs/product.md) |
| 機能ごとの目的・要件・今の振る舞い（何を満たすべきか） | [docs/prds/](./docs/prds/README.md) |
| 今の構成と開発の規約（使っている技術・置き場所・依存の向き・命名・スタイル） | [docs/architecture/](./docs/README.md#architecture) |
| この構成にした理由・検討して捨てた案 | その変更の PR の本文とコミット |
| 開発・デプロイの手順 | [docs/runbooks/](./docs/README.md#runbooks) |
| 会話・録音の記録 | [docs/transcripts/](./docs/transcripts/README.md) |

規約の要約とエージェント向けの作業の進め方は [AGENTS.md](./AGENTS.md) にあり、`CLAUDE.md` はそのシンボリックリンクです。編集するのは `AGENTS.md` の側です。文書は実装と同じ PR の中で今の状態に直し、判断の理由と検討して捨てた案は PR の本文とコミットに残します（[AGENTS.md の「変更の進め方」](./AGENTS.md#変更の進め方)）。

## テンプレートから作ったら

GitHub の「Use this template」で作ったあとに変えるものは、[docs/runbooks/start-from-template.md](./docs/runbooks/start-from-template.md) にあります。

## よく使うコマンド

```sh
pnpm install         # 依存を入れる。Panda の生成物と Git フックもここで入る
pnpm dev             # 開発サーバー（http://localhost:3000）
pnpm lint            # astro check・oxlint・knip
pnpm fmt             # .astro は Prettier、それ以外は oxfmt
pnpm -F site deploy  # Cloudflare Workers にデプロイ
```

詳しくは [docs/runbooks/development.md](./docs/runbooks/development.md)（セットアップ・Git フック・開発サーバー・lint と整形）と [docs/runbooks/deploy.md](./docs/runbooks/deploy.md)（デプロイ・独自ドメイン・PR ごとのプレビュー）にあります。
