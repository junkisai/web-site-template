# 手元で開発する

セットアップから、開発サーバー・ビルド・lint と整形まで。使っている道具の構成は [architecture/overview.md](../architecture/overview.md#開発の道具) にある。

## セットアップ

```sh
pnpm install
```

Node は `.node-version`、pnpm は `package.json` の `packageManager` の版を使う。

`pnpm install` すると、次の 2 つが走る。

- **Panda CSS の生成物（`apps/site/styled-system/`）を作る。** `apps/site` の `prepare` script が `panda codegen` を実行する。生成物はコミットしない
- **Git フックを入れる。** lefthook 自身の `postinstall` がフックをインストールする。`pnpm-workspace.yaml` の `allowBuilds` に `lefthook: true` があるのはこのためで、外すとフックが有効にならない

環境変数と secret は無いので、`.env` などは用意しなくてよい。

公開から 7 日未満の版のせいで install が止まったときは [minimum-release-age.md](minimum-release-age.md) を見る。

## Git フック

フックの内容は [lefthook.yml](../../lefthook.yml) にある。

| フック | 実行内容 |
| --- | --- |
| pre-commit | ステージ済みのファイルに `oxlint --fix` をかけ、`.ts`・`.css` などは oxfmt、`.astro` は Prettier で整形し、修正結果を自動でステージし直す |
| pre-push | `pnpm lint`（`astro check`・`oxlint`・`knip`）を実行し、エラーがあれば push を中断する |

フックを一時的に飛ばしたいときは `LEFTHOOK=0 git commit` のように環境変数を付ける。

## 開発サーバー

```sh
pnpm dev     # http://localhost:3000
```

`apps/site` だけを起動するときは `pnpm -F site dev`。

- `apps/site/panda.config.ts` を変えたあと、型が古いままのときは `pnpm gen` で Panda の生成物を作り直す。`pnpm lint` は先に `gen` を流すので、lint では気にしなくてよい
- **新しい字を書いたら、開発サーバーを立ち上げ直す。** 書体は、立ち上げたときにソースにあった字だけで切り出すため（[prds/web-font.md](../prds/web-font.md)）
- 動きを止めた状態で見るときは、URL に `?still` か `#still` を付ける（[prds/motion.md](../prds/motion.md)）

## ビルドして確かめる

```sh
pnpm -F site build     # apps/site/dist/ に書き出す
pnpm -F site preview   # 書き出したものを手元で配る
```

## lint と整形

```sh
pnpm lint                 # astro check・oxlint・knip
pnpm lint:packageVersion  # workspace 内の依存のバージョンのずれ（syncpack）
pnpm fmt                  # .astro は Prettier、それ以外は oxfmt
```

TypeScript は 6 に据え置いている。7 に上げると `astro check` が動かない（[architecture/overview.md](../architecture/overview.md#構成上の制約)）。
