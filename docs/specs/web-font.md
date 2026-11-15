# 書体

本文と見出しの書体と、その配り方。

## 振る舞い

- 本文と見出しは Noto Sans JP で出す。太さは 500〜800 の範囲を 1 つの可変の書体で持つ（本文 500・強める字 700・見出し 800）
- 書体はビルドしたときに取ってきて、**サイトと同じドメインから配る。** 閲覧者のブラウザが外の書体の配信に接続することはない
- 配る書体は、**ページで使う字だけを切り出した 1 ファイル**
  - 含める字: `apps/site/src/` の `.astro` と `.ts` に書かれた字（注釈の中の字は除く）と、ASCII の印字できる字すべて
- 含めていない字（ソースに書かれていない字。CMS などから取る字）は、その字だけ代わりの書体で出す。代わりの書体は Hiragino Sans → Hiragino Kaku Gothic ProN → 端末の sans-serif の順

## 制約

- 書体に入るのはソースに書いた字だけ。ソースの外から来る字（CMS などのデータ）を Noto Sans JP で出したくなったら、この仕様を変える変更として扱う

## 受け入れ条件

- [ ] ビルドの出力（`apps/site/dist/_astro/fonts/`）に、書体のファイルが 1 つだけある
- [ ] 出力の HTML が、外の書体の配信（Google Fonts など）を参照していない

## 未確認事項

なし

## 関連

- 経緯（字の範囲ごとのファイルにしない理由）: [design-docs/20261031_web-site-template.md](../design-docs/20261031_web-site-template.md)
- 開発中に新しい字を書いたとき: [runbooks/development.md](../runbooks/development.md#開発サーバー)
- 実装: `apps/site/astro.config.ts` の `fonts`、`apps/site/scripts/collect-glyphs.ts`、`apps/site/src/components/layout/base-layout.astro` の `<Font>`
