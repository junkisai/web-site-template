# サイト全体

このテンプレートから作るサイト（LP・キャンペーンページ・会社や個人のサイトなど）全体が、今満たしていること。個々の機能は [specs の一覧](README.md#一覧) の各ファイルにある。

## 振る舞い

### 範囲

- 今は、ログイン・DB・管理画面・フォームの送信・リクエストごとのサーバーの処理を持たず、静的なサイトとして動く
- これらが要るようになったときにどう作るか（今の構成を保つか、変えるか）は仕様ではなく構成の判断で、[architecture/overview.md](../architecture/overview.md#構成上の制約) で扱う

### 配信

- すべてのページを、ビルドしたときに HTML として書き出し、そのまま配る。リクエストのたびにページを組み立てる処理は無い

### ページ

| URL | 内容 |
| --- | --- |
| `/` | 仮のトップページ。テンプレートから作ったサイトでは置き換える |

### 言語

- ページの言語は日本語（`<html lang="ja">`）

### 画面幅

- 幅 900px 以上を PC、900px 未満をスマホとして、2 段で組む。間の段は持たない

### ブラウザで動く JS

- ブラウザに送る JS は、ページに `<script>` として書いたものだけ。UI フレームワーク（React など）のランタイムは送らない
- テンプレートの時点で `<script>` があるのは、動きを出すかの判定と、画面に入った要素を出す処理の 2 つ（[motion.md](motion.md)）
- **JS が動かなくても、すべての内容が見える**

### 外部への接続

- 書体はサイトと同じドメインから配る（[web-font.md](web-font.md)）
- 外のドメインから読み込むのは、Cloudflare Web Analytics のビーコンだけ。それもトークンを入れたときだけ（[web-analytics.md](web-analytics.md)）

## 制約

なし

## 受け入れ条件

- [ ] テンプレートの状態でビルドすると、`apps/site/dist/` に `.js` のファイルが無く、`<script>` はすべて HTML の中にある
- [ ] Web Analytics のトークンが空のとき、出力の HTML に外のドメインを指す `<script>`・`<link>` が無い
- [ ] JS を切ったブラウザで開いても、すべての内容が見える
- [ ] 幅 900px を境に、字の大きさと余白がスマホ用と PC 用で切り替わる

## 未確認事項

- **存在しない URL への応答。** `apps/site/wrangler.jsonc` は `not_found_handling: "404-page"`（`404.html` を返す設定）だが、404 のページ（`src/pages/404.astro`）は無く、ビルドの出力にも `404.html` が無い。今何が返るかは確かめておらず、404 のページを用意するかも決まっていない
- **`robots.txt`・`sitemap.xml`。** 置き場所（`public/`）の規約だけがあり、出すかどうかは決まっていない

## 関連

- 経緯: [design-docs/20261031_web-site-template.md](../design-docs/20261031_web-site-template.md)
- 構成と構成上の制約: [architecture/overview.md](../architecture/overview.md)
- 画面幅の切り替えの書き方: [architecture/styling.md](../architecture/styling.md)
