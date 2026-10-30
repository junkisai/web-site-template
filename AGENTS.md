# AGENTS.md

## 実装の前に読む

**機能を追加・変更するときは、コードを書く前に design doc を書く。** 何を・なぜ・どう作るか、やらないことと捨てた案まで [docs/design-docs/](docs/design-docs/README.md) にまとめ、合意してから実装に入る。書くタイミング・テンプレート・`status` の進め方はそこにある。文言修正・スタイル調整・リファクタリング・バグ修正には要らない。

`apps/site` にファイルを追加・移動するときは [docs/architecture/20260819_directory-structure.md](docs/architecture/20260819_directory-structure.md) に従う。判断フロー・各ディレクトリの責務・依存の方向・命名・スタイルの書き方がそこにある。

## 守ること

**URL の定義は `src/pages/`、画面の実体は `src/screens/<画面>/`。** 画面はまとまりを並べる場所で、中身のロジックは持たない。

**ひとまとまりのものは 1 ディレクトリにまとめる。** データも型も表示部品も、そのまとまりのものは全部。名前は企画やデザインの会話に出てくる言葉で付ける。技術で振り分けると、1 つ直すのに何か所も開くことになる。

**まとまりどうし・画面どうしは参照しない。** 参照した瞬間、片方を触るともう片方が壊れる。組み合わせるのは 1 つ上の `index.astro` の仕事。

**2 つ目の参照元が現れてから外に出す。** 使う画面が 1 つのうちは `screens/<画面>/components/<まとまり>/` に置き、2 つ目の画面が使い始めたら `src/features/<ドメイン>/` へ上げる。出す前と後で中の形は変わらないので、移動だけで済む。

**静的ファイルはまとまりで決めない。** ソースから参照するなら使う場所の隣に置いて import、参照しない・ファイル名を保つ必要があるなら `public/`。画像は `astro:assets` の `<Image>` / `<Picture>` で出す。

**ブラウザに JS を送らない。** サイトは静的出力で、JS は `<script>` を書いたところにしか出ない。React などの UI フレームワークは入れていない。外から読む JS は、ページビューを数える Cloudflare Web Analytics のビーコン（`components/layout/base-layout.astro`。トークンを入れたときだけ出る）だけ。

## スタイル（要約）

- Panda CSS の `css()` で書く。`.astro` の `<style>` は使わない
- 色とフォントはトークンで書く。直書きは `astro check` の型エラーになる。足すときは `apps/site/panda.config.ts` の `theme.tokens`
- `padding`・`gap`・文字サイズはそのまま書く（`'1.5rem'`）。幅と高さ・`margin`・`inset`・`transition`・`translate`・`scale`・`rotate`・`filter` は決まった値以外を `'[48rem]'` のように囲む
- 字の段・灰色の箱・段組みの箱は `panda.config.ts` の `textStyles`・`layerStyle: 'panel'`・`inner()` を使う。繰り返し出てくる見た目が増えたら、ここに足す。動きは `_motion` の中に書く
- ブラウザで動く `<script>` の中では `css()` を呼ばない
- reset は `src/styles/globals.css` の `@layer reset` の中だけに書く

## 置き場所（要約）

上から順に当てはめて、最初に該当したところに置く。

1. ビルド時・運用時にしか動かない（Node API を使う、Vite plugin、生成スクリプト） → `apps/site/scripts/`
2. URL を増やす・変える → `apps/site/src/pages/`
3. 画面そのもの → `apps/site/src/screens/<画面>/index.astro`
4. ひとまとまりで名前が付く → 使う画面が 1 つなら `apps/site/src/screens/<画面>/components/<まとまり>/`、2 つ以上なら `apps/site/src/features/<ドメイン>/`
5. その画面の組み立てにしか意味がない → `apps/site/src/screens/<画面>/` の `components/`・`types/`・`utils/`
6. ドメインを知らない表示部品 → `apps/site/src/components/ui/`（単体で完結する部品）か `apps/site/src/components/layout/`（サイト共通の枠）
7. 副作用のない汎用関数 → `apps/site/src/utils/`
8. 外部ライブラリの設定・ラッパー → `apps/site/src/lib/`

**迷ったら 4。** 企画やデザインの会話で名前が出てくるなら、そのまとまりで 1 ディレクトリにする。

`src/utils`・`src/lib` はまだ無い。必要になったらこのパスに作り、別名のディレクトリを新設しない。`apps/site/scripts/` はフラットに置き、サブディレクトリを作らない。

**`screens/<画面>/api/` は作らない。** CMS などからの取得は `pages/` の frontmatter からそのまとまりの `api/` を呼び、props で画面に渡す。

## 破ってはいけない依存の向き

```text
pages/ → screens/ → features/ → components/, utils/, lib/
       → features/
       → components/layout/
```

`features/` は 2 つ目の画面が同じドメインを使い始めてから作る。

- `src/` から `scripts/` を import しない
- まとまりどうしを import しない（組み合わせるのは `screens/<画面>/index.astro` の仕事）
- `screens/a` から `screens/b` を import しない。他の画面が欲しがったら、それが `features/` へ上げる合図
- `screens/` から `pages/` を import しない
- `features/` から `screens/`・`pages/`・他の `features/` を import しない
- 共有層（`components/`・`utils/`・`lib/`）から `features/`・`screens/`・`pages/` を import しない
- `pages/` にロジックを書かない

最後の 1 つと「まとまりどうし」以外は `.oxlintrc.json` の `overrides` + `no-restricted-imports` で `pnpm lint` が落ちる。oxlint は `.astro` の frontmatter も検査する。**`@/` エイリアス形と相対パス形の両方を塞いである**ので、`../../screens/top` のような書き方でも落ちる。画面の中のまとまりどうしの参照は相対パスなので機械的に区別できず、レビューで見る。

`styled-system/`（Panda の生成物）はどの層からでも import してよい。

## 命名

**パスに現れるものは、ディレクトリもファイルもすべて kebab-case。** PascalCase になるのはコードの中の識別子（コンポーネント名・型名）だけ。

大文字小文字を混ぜないのは、macOS は区別せず CI（Linux）は区別するため。混ぜた時点で「ローカルで通るのにビルドで落ちる」を踏む。

- ディレクトリ → kebab-case（`screens/news-detail/`, `features/news/`, `components/ui/`）
- ファイル → kebab-case（`faq-item.astro`, `get-news.ts`）
- `.astro` は default import で読み、識別子はファイルの綴りを PascalCase にしたもの（`faq-item.astro` → `FaqItem`、`screens/top/index.astro` → `TopScreen`）
- `.ts` は名前付き export だけ。default export は使わない
- 部品を分けたくなったら kebab-case のディレクトリを切って `index.astro` に置く
- バレルファイル（再 export だけの `index.ts`）は作らない

**import のパスは `git ls-files` の表記と一字一句合わせる。**

## 整形と検査

- 整形: `.astro` は Prettier（`prettier-plugin-astro`）、それ以外は oxfmt。oxfmt は `.astro` を整形しない
- 検査: `pnpm lint`（`astro check`・oxlint・knip）。`astro check` のために TypeScript は 6 に据え置いている（7 では動かない）
