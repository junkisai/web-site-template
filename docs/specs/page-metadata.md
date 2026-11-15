# ページのメタ情報と検索

各ページの `<head>` に入れるタイトル・説明・OGP と、検索エンジンに出すかどうか。

## 振る舞い

### タイトルと説明

- 各ページはタイトルと説明を必ず持つ
- タイトルは `<title>` と `og:title` に、説明は `<meta name="description">` と `og:description` に、同じ値で出る

### OGP

| 項目 | 出る条件 | 値 |
| --- | --- | --- |
| `og:type` | 常に | `website` |
| `og:locale` | 常に | `ja_JP` |
| `og:title`・`og:description` | 常に | ページのタイトル・説明 |
| `og:site_name` | ページがサイト名を指定したとき | サイト名 |
| `og:url` | 公開する URL（`astro.config.ts` の `site`）を入れたとき | 公開する URL にページのパスを足した絶対 URL |
| `og:image`・`og:image:width`・`og:image:height`・`og:image:alt` | 公開する URL を入れていて、ページが OGP 画像を指定したとき | 画像の絶対 URL・幅・高さ・代替テキスト |
| `twitter:card` | 公開する URL を入れたとき | `summary_large_image` |

- OGP の URL は絶対 URL でしか出さない。そのため、公開する URL を入れるまでは `og:url`・`og:image`・`twitter:card` が出ない。テンプレートの初期状態は入れていない
- OGP 画像は、URL が変わらないファイル（`public/` に置いたもの）を指す

### 検索エンジン

- 既定では、すべてのページを検索に出す
- 検索に出さないと指定したページには、`<meta name="robots" content="noindex, nofollow">` を出す。限られた人にだけ配るページで使う

### favicon

- favicon を置くまでは、ブラウザが `/favicon.ico` を取りに行かない（取りに行くと 404 になるため）

## 制約

なし

## 受け入れ条件

- [ ] テンプレートの状態（公開する URL を入れていない）でビルドすると、`og:type`・`og:title`・`og:description`・`og:locale` が出て、`og:url`・`og:image`・`twitter:card` は出ない
- [ ] 公開する URL を入れると、`og:url` がそのページの絶対 URL になる
- [ ] 検索に出さないと指定したページにだけ、`noindex, nofollow` が出る

## 未確認事項

- **`twitter:card` は、OGP 画像を指定していないページにも出る。** 公開する URL を入れると、画像の有無にかかわらず `summary_large_image` になる。画像の無いページでもこの値にするのが意図かは確かめていない

## 関連

- 経緯: [design-docs/20261031_web-site-template.md](../design-docs/20261031_web-site-template.md)
- 公開する URL・OGP 画像・`noindex` の入れ方: [runbooks/start-from-template.md](../runbooks/start-from-template.md)
- 実装: `apps/site/src/components/layout/base-layout.astro`（`BaseLayout` の props `title`・`description`・`siteName`・`ogImage`・`noindex`）
