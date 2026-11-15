# デプロイする

手元から Cloudflare Workers にデプロイする。CI からの自動デプロイは無い。

## 初回だけ

- Cloudflare にログインする

  ```sh
  pnpm -F site exec wrangler login
  ```

- デプロイ先のアカウントは、ログインしたユーザーか、[apps/site/wrangler.jsonc](../../apps/site/wrangler.jsonc) の `account_id` で決まる。ログインしたユーザーが複数のアカウントに入れるときは、`account_id` を書いて固定する

## デプロイ

```sh
pnpm -F site deploy
```

`astro build` で `apps/site/dist/` に静的ファイルを書き出し、`wrangler deploy` で静的アセットとして配信する。

デプロイせずに設定だけ確かめるときは、ビルドしてから `--dry-run` を付ける。

```sh
pnpm -F site build
pnpm -F site exec wrangler deploy --dry-run
```

## 独自ドメインで公開する

1. [apps/site/wrangler.jsonc](../../apps/site/wrangler.jsonc) の `routes` に、Cloudflare で DNS を管理しているドメインを足す（`{ "pattern": "www.example.com", "custom_domain": true }`）。デプロイすると、DNS のレコードと証明書が自動でできる
2. [apps/site/astro.config.ts](../../apps/site/astro.config.ts) の `site` を同じドメインにする。`site` は OGP の絶対 URL に使う（[prds/page-metadata.md](../prds/page-metadata.md)）
3. ドメインを付けると、workers.dev の URL は既定で止まる。残すなら `wrangler.jsonc` に `"workers_dev": true` を足す

## PR ごとのプレビュー

Cloudflare の Git 連携を使うと、PR のブランチごとにプレビューが出る（Git 連携が `npx wrangler preview` で出す）。

`wrangler.jsonc` の `previews` ブロックが無いとプレビューが止まるので、消さない。中身は上の設定をそのまま使うので、空でよい。
