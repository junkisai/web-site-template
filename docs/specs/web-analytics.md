# アクセス解析

ページビューの数え方。

## 振る舞い

- ページビューは Cloudflare Web Analytics で数える
- サイトのトークンを入れたときだけ、すべてのページにビーコン（`static.cloudflareinsights.com` の JS）を 1 つ読み込む。トークンが空のうちは読み込まない
- テンプレートの初期状態ではトークンは空で、ページビューは数えていない
- トークンは、ページの HTML にそのまま出る公開の値

## 制約

- ビーコンは、サイトが外から読み込む唯一の JS（[site.md](site.md#外部への接続)）

## 受け入れ条件

- [ ] トークンが空のとき、出力の HTML に `cloudflareinsights` が出てこない
- [ ] トークンを入れたとき、各ページの HTML にビーコンの `<script>` が 1 つだけある

## 未確認事項

なし

## 関連

- 経緯（Cloudflare の自動の設定に任せない理由）: [design-docs/20261031_web-site-template.md](../design-docs/20261031_web-site-template.md)
- トークンの入れ方: [runbooks/start-from-template.md](../runbooks/start-from-template.md)
- 実装: `apps/site/src/components/layout/base-layout.astro` の `webAnalyticsToken`
