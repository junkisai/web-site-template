# ページのメタ情報と検索

各ページの `<head>` に入れるタイトル・説明・OGP と、検索エンジンにインデックスさせるかどうか・favicon。

## 概要・提供価値

各ページのタイトルと説明、SNS などでページの URL が共有されたときに使われる情報（OGP）を、決まった形で `<head>` に出す。検索結果に載せたくないページでは、インデックスに登録しないよう検索エンジンに求められる。テンプレートの利用者は、ページごとに値を渡すだけで済む。

## 背景・解決する課題

- テンプレートのもとになった案件で足した仕組みのうち、中身に依存しないもの（OGP・検索に出さない指定）として切り出した（[product.md の「解決する課題」](../product.md#解決する課題)）
- OGP の URL は絶対 URL にする。そのため、公開する URL が決まるまでは `og:url`・`og:image` を出さない（`astro.config.ts`・`base-layout.astro` の注釈）
- favicon を置かないうちにブラウザが `/favicon.ico` を取りに行くと 404 になる。これを止める（`base-layout.astro` の注釈）

## 対象ユーザー・スコープ

- 対象ユーザー・役割: ページの `<head>` を読む外部のシステム（検索エンジン・SNS）と、その結果を見る人。ページごとにタイトルなどを決めるテンプレートの利用者
- 対象の画面・URL: すべてのページの `<head>`
- できる操作: テンプレートの利用者は、ページごとにタイトル・説明・サイト名・OGP 画像・検索結果に載せないかを指定する
- 対象の範囲: タイトルと説明・OGP・検索エンジンへの指定・favicon
- 対象外: 閲覧できる人を限ること。`noindex` はアクセスの制限ではない（[業務ルール・制約](#業務ルール制約)）

## ゴール・成功条件

- どのページにもタイトルと説明があり、`<title>`・`description`・OGP に同じ値で出ている
- 検索結果に載せたくないと指定したページにだけ、インデックスに登録しないよう求める指定が出る
- 測定指標は決まっていない

## 振る舞い

### タイトルと説明

- タイトルは `<title>` と `og:title` に、説明は `<meta name="description">` と `og:description` に、同じ値で出る

### OGP

| 項目 | 出る条件 | 値 |
| --- | --- | --- |
| `og:type` | 常に | `website` |
| `og:locale` | 常に | `ja_JP` |
| `og:title`・`og:description` | 常に | ページのタイトル・説明 |
| `og:site_name` | ページがサイト名を指定したとき | サイト名 |
| `og:url` | 公開する URL を設定したとき | 公開する URL にページのパスを足した絶対 URL |
| `og:image`・`og:image:width`・`og:image:height`・`og:image:alt` | 公開する URL を設定していて、ページが OGP 画像を指定したとき | 画像の絶対 URL・幅・高さ・代替テキスト |
| `twitter:card` | 公開する URL を設定したとき | `summary_large_image` |

### 検索エンジン

- 既定では `noindex` を出さず、検索エンジンがインデックスに登録するのを妨げない。検索結果に載るかどうかは検索エンジンが決めるので、サイトの側では約束できない
- 検索結果に載せたくないと指定したページには、`<meta name="robots" content="noindex, nofollow">` を出し、インデックスに登録しないよう検索エンジンに求める

### favicon

- favicon を置くまでは、ブラウザが `/favicon.ico` を取りに行かない

## 業務ルール・制約

- 各ページはタイトルと説明を必ず持つ
- OGP の URL は絶対 URL でしか出さない
- OGP 画像は、URL が変わらないファイルを指す
- **`noindex` は検索結果への掲載を抑える指定で、アクセスの制限ではない。** URL を知っていれば誰でも閲覧できる。閲覧できる人を限るページは `noindex` に頼らず、認証やアクセス制御を別に入れる（今のテンプレートには無い）

## 状態遷移

なし

## 例外・境界条件

- 公開する URL を設定していない（テンプレートの初期状態）→ `og:url`・`og:image` 系・`twitter:card` を出さない。OGP 画像を指定していても出ない
- OGP 画像を指定していない → `og:image` 系を出さない。`twitter:card` は公開する URL を設定していれば出る（[実装から読み取れる現状](#実装から読み取れる現状)）
- サイト名を指定していない → `og:site_name` を出さない
- favicon を置いていない → ブラウザが `/favicon.ico` を取りに行かず、404 にならない

## 受け入れ条件

- `noindex` を指定していないページには、`<meta name="robots">` が出ない
- テンプレートの状態（公開する URL を設定していない）でビルドすると、`og:type`・`og:title`・`og:description`・`og:locale` が出て、`og:url`・`og:image`・`twitter:card` は出ない
- 公開する URL を設定すると、`og:url` がそのページの絶対 URL になる
- 検索結果に載せたくないと指定したページにだけ、`noindex, nofollow` が出る

## 実装から読み取れる現状・未確認事項

### 実装から読み取れる現状

- **`twitter:card` は、OGP 画像を指定していないページにも出る。** 公開する URL を設定すると、画像の有無にかかわらず `summary_large_image` になる

### 未確認事項

- **画像の無いページでも `twitter:card` を `summary_large_image` にするのが意図か。** 確かめていない

## 関連資料

- Product: [product.md](../product.md)
- Architecture: [overview.md の「ページのメタ情報」](../architecture/overview.md#ページのメタ情報)（値の渡し方・公開する URL の設定）、[directory-structure.md の「静的ファイルの置き場所」](../architecture/directory-structure.md#静的ファイルの置き場所)（OGP 画像・favicon を置く `public/`）
- Runbooks: [start-from-template.md](../runbooks/start-from-template.md)（公開する URL・OGP 画像・サイト名・`noindex`・favicon の入れ方）、[deploy.md の「独自ドメインで公開する」](../runbooks/deploy.md#独自ドメインで公開する)
- 関連する PRD: [site.md](site.md)
- 根拠となる実装: `apps/site/src/components/layout/base-layout.astro`、`apps/site/astro.config.ts` の `site`
