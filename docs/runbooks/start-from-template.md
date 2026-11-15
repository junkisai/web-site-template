# テンプレートから新しいサイトを作る

GitHub の「Use this template」でリポジトリを作ったあとにやること。

## 最初に変えるもの

| ファイル | 変えるもの |
| --- | --- |
| [apps/site/wrangler.jsonc](../../apps/site/wrangler.jsonc) | `name`（Worker の名前。workers.dev の URL にもなる）。アカウントが複数なら `account_id`、独自ドメインなら `routes`（[deploy.md](deploy.md#独自ドメインで公開する)） |
| [apps/site/astro.config.ts](../../apps/site/astro.config.ts) | `site`（公開する URL。OGP の絶対 URL に使う。入れるまで `og:url`・`og:image` は出ない） |
| [apps/site/panda.config.ts](../../apps/site/panda.config.ts) | 配色（仮のもの）と字の段（[architecture/styling.md](../architecture/styling.md)） |
| [apps/site/src/components/layout/base-layout.astro](../../apps/site/src/components/layout/base-layout.astro) | Cloudflare Web Analytics のトークン（使うなら。`webAnalyticsToken`）。ダッシュボードの Web Analytics → Manage site の JS スニペットにある値（[prds/web-analytics.md](../prds/web-analytics.md)） |
| `apps/site/src/pages/`・`apps/site/src/screens/` | 仮のトップページ |
| [README.md](../../README.md) | リポジトリの名前と説明 |
| [docs/product.md](../product.md) | テンプレートの目的・対象・提供価値を、作るサイトのものに書き直す。根拠のない目標や数値は書かず、わからないことは「未確認事項・仮説」に置く |
| [docs/prds/](../prds/README.md) | テンプレートの要件を、作るサイトの要件に直す（ページの一覧など）。直すのは実装と同じ変更の中 |
| [docs/design-docs/README.md](../design-docs/README.md) | design doc の一覧 |

## 必要になったら

- **検索結果に載せたくないページ:** そのページの `BaseLayout` に `noindex` を付ける（[prds/page-metadata.md](../prds/page-metadata.md#検索エンジン)）。アクセスの制限にはならないので、閲覧できる人を限るなら認証やアクセス制御を別に入れる
- **OGP 画像:** `apps/site/public/` に置き、`BaseLayout` の `ogImage` に `public/` からのパス・幅・高さ・代替テキストを渡す。`site` を入れるまでは出ない
- **サイト名（`og:site_name`）:** `BaseLayout` の `siteName` に渡す
- **favicon:** 置くまでは、ブラウザが `/favicon.ico` を取りに行かないよう `base-layout.astro` に `<link rel="icon" href="data:," />` を置いてある。favicon を置いたら、この行を差し替える

## 終わったら

- `pnpm lint` が通ることを確かめる（[development.md](development.md#lint-と整形)）
- デプロイする（[deploy.md](deploy.md)）
