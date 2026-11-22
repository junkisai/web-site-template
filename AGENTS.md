# AGENTS.md

このリポジトリで作業する人と AI エージェントのための入口。`CLAUDE.md` はこのファイルへのシンボリックリンクで、編集するのはこちら。ドキュメントの全体は [docs/README.md](docs/README.md) にある。

## どこを見るか

| 知りたいこと | 正本 | 扱い |
| --- | --- | --- |
| プロダクト全体の目的・対象・提供価値・成功条件 | [docs/product.md](docs/product.md) | 変えてよい。目的や方向が変わったら、その変更の中で直す |
| 機能ごとの目的・要件・今の振る舞い | [docs/prds/](docs/prds/README.md) | 変えてよい。実装と同じ変更の中で直す |
| 今の技術構成・開発規約・技術上の制約 | [docs/architecture/](docs/README.md#architecture) | 変えてよい。構成や規約と同じ変更の中で直す |
| 過去の設計判断・その理由・捨てた案 | その変更の PR の本文とコミット | 書いた時点の記録。**今の要件や構成の正本ではなく、変更を断る根拠にもしない** |
| 操作・運用の手順 | [docs/runbooks/](docs/README.md#runbooks) | 手順と同じ変更の中で直す |
| 会話・録音の記録 | [docs/transcripts/](docs/transcripts/README.md) | 書き換えない。決まったことは product.md・prds などに書いて初めて有効 |

- **要件や振る舞いが変わったら、PRD を増やさずに今のファイルを書き直す。** 1 つの機能に PRD は 1 つ（[docs/prds/README.md](docs/prds/README.md#ファイル名)）
- **PRD には要件を、architecture には実現方法を書く。** 使っている技術・設定・置き場所は architecture に書き、PRD には利用者や外部のシステムから見た振る舞いと、守るべき要件（セキュリティ・プライバシー・データの扱いを含む）を書く
- **今の技術構成を、PR やコミットだけに書いた状態にしない。** PR とコミットは当時の判断、architecture が今の How
- **PRD に書いていない振る舞いは、コードにあるからといって意図された要件と決めつけない。** 意図がわからず、それで作業の判断が変わるなら、ユーザーに確かめる
- **PRD の背景・課題・ゴールに、根拠のない目的・課題・測定指標を書かない。** わからないものは「未確認事項」に書く
- **ユーザーが変更を明示的に指示していて、ほかに判断することがないなら、過去の実装の意図を確かめるためだけに作業を止めない。** 指示どおりに進め、気づいた食い違いは報告に書く
- **Living Document（product.md・prds・architecture・runbooks）どうしや、それらとコードが食い違ったら、どちらかに黙って寄せない。** 食い違いを伝え、どちらが意図かを確かめてから直す
- このファイルの規約の節は architecture の要約。食い違ったら architecture を正とし、このファイルを直す

## 変更の進め方

**過去の PR やコミットに残った判断、今の PRD、architecture の既定の方針は、ユーザーの新しい要求で変えたり見直したりしてよい。** ただし、安全性や技術的な制約を無視してよいという意味ではない（下の 3）。

1. **頼まれた変更を、新しい検討の起点にする。** 過去の PR やコミットに違う判断や「この先もやらない」が書いてあっても、それを理由に断らない。過去の判断は、捨てた理由が今も当てはまるかを確かめる材料として読む
2. **関連する PRD と architecture を読み、今との違いを確かめる。** プロダクト全体の目的・提供価値・方向に関わる変更なら、[docs/product.md](docs/product.md) も読む。何が変わるか、影響範囲はどこまでかを書き出す
3. **既存の制約とぶつかるなら、影響・リスク・取りうる案を示して判断を仰ぐ。** 安全性や技術的な制約（lint で守らせている規約、TypeScript の版など）を黙って無視しない。制約を理由に黙って断ることもしない
4. **テンプレートから引き継いだ方針（静的出力を基本にする・ログインや DB を持たない・JS を必要な機能に限る など）は、ユーザーが明示的に求めれば見直してよい。** 既定の方針として守るが、変更を断る理由にはしない。見直すときは、今の構成を保つ案と変える案を比べ、選んだ理由と捨てた案を PR の本文に書く（[docs/architecture/overview.md](docs/architecture/overview.md#構成上の制約)）
5. **判断の理由は、PR の本文とコミットに書く。** なぜその形にしたか・比べて捨てた案・引き受けるトレードオフを書く。複数の作り方を比べて選ぶ変更や、システムの構成・セキュリティ・データの扱いに大きく影響する変更（CMS・新しいデータの流れ・データの持ち方の変更・認証や公開範囲の変更・外部サービスとの連携・サーバーの処理・基盤や規約の変更・複数の機能にまたがる変更）では、捨てた案まで書く。文書（product.md・prds・architecture・runbooks）には今の状態を書き、判断の経緯を書き足さない
6. **実装したら、同じ変更（同じ PR）の中で文書を今の状態に直す。** 振る舞いや要件が変わったら PRD、技術構成や規約が変わったら architecture、手順が変わったら runbooks、プロダクト全体の目的・提供価値・成功条件が変わったら product.md
7. **まだ実装していない案を、PRD などの文書に書かない。** 文書は、実装と同じ変更の中で直す

`apps/site` にファイルを足す・動かすときは [docs/architecture/directory-structure.md](docs/architecture/directory-structure.md) に従う。判断フロー・各ディレクトリの責務・依存の向き・命名がそこにある。スタイルの書き方は [docs/architecture/styling.md](docs/architecture/styling.md) にある。

## 守ること（要約）

正本は [docs/architecture/directory-structure.md](docs/architecture/directory-structure.md)。

**URL の定義は `src/pages/`、画面の実体は `src/screens/<画面>/`。** 画面はまとまりを並べる場所で、中身のロジックは持たない。

**ひとまとまりのものは 1 ディレクトリにまとめる。** データも型も表示部品も、そのまとまりのものは全部。名前は企画やデザインの会話に出てくる言葉で付ける。技術で振り分けると、1 つ直すのに何か所も開くことになる。

**まとまりどうし・画面どうしは参照しない。** 参照した瞬間、片方を触るともう片方が壊れる。組み合わせるのは 1 つ上の `index.astro` の仕事。

**2 つ目の参照元が現れてから外に出す。** 使う画面が 1 つのうちは `screens/<画面>/components/<まとまり>/` に置き、2 つ目の画面が使い始めたら `src/features/<ドメイン>/` へ上げる。出す前と後で中の形は変わらないので、移動だけで済む。

**静的ファイルはまとまりで決めない。** ソースから参照するなら使う場所の隣に置いて import、参照しない・ファイル名を保つ必要があるなら `public/`。画像は `astro:assets` の `<Image>` / `<Picture>` で出す。

**UI フレームワークのランタイムを送らず、JS は必要な機能に限る。** サイトは静的出力で、JS は `<script>` を書いたところにしか出ない。React などの UI フレームワークは入れていない。今ブラウザで動く JS は、動きを出すかの判定と画面に入った要素を出す処理（`components/layout/base-layout.astro`・`components/ui/reveal-on-scroll.astro`）と、ページビューを数える Cloudflare Web Analytics のビーコン（`base-layout.astro`。トークンを入れたときだけ出る）だけ（要件は [docs/prds/site.md](docs/prds/site.md#ブラウザで動く-js)、仕組みは [docs/architecture/overview.md](docs/architecture/overview.md#機能を支える仕組み)）。

## スタイル（要約）

正本は [docs/architecture/styling.md](docs/architecture/styling.md)。

- Panda CSS の `css()` で書く。`.astro` の `<style>` は使わない
- 色とフォントはトークンで書く。直書きは `astro check` の型エラーになる。足すときは `apps/site/panda.config.ts` の `theme.tokens`
- `padding`・`gap`・文字サイズはそのまま書く（`'1.5rem'`）。幅と高さ・`margin`・`inset`・`transition`・`translate`・`scale`・`rotate`・`filter` は決まった値以外を `'[48rem]'` のように囲む
- 字の段・灰色の箱・段組みの箱は `panda.config.ts` の `textStyles`・`layerStyle: 'panel'`・`inner()` を使う。繰り返し出てくる見た目が増えたら、ここに足す。動きは `_motion` の中に書く
- ブラウザで動く `<script>` の中では `css()` を呼ばない
- reset は `src/styles/globals.css` の `@layer reset` の中だけに書く

## 置き場所（要約）

正本は [docs/architecture/directory-structure.md の「置き場所の判断フロー」](docs/architecture/directory-structure.md#置き場所の判断フロー)。上から順に当てはめて、最初に該当したところに置く。

1. ビルド時・運用時にしか動かない（Node API を使う、Vite plugin、生成スクリプト） → `apps/site/scripts/`
2. URL を増やす・変える → `apps/site/src/pages/`
3. 画面そのもの → `apps/site/src/screens/<画面>/index.astro`
4. ひとまとまりで名前が付く → 使う画面が 1 つなら `apps/site/src/screens/<画面>/components/<まとまり>/`、2 つ以上なら `apps/site/src/features/<ドメイン>/`
5. その画面の組み立てにしか意味がない → `apps/site/src/screens/<画面>/` の `components/`・`types/`・`utils/`
6. ドメインを知らない表示部品 → `apps/site/src/components/ui/`（単体で完結する部品）か `apps/site/src/components/layout/`（サイト共通の枠）
7. 副作用のない汎用関数 → `apps/site/src/utils/`
8. 外部ライブラリの設定・ラッパー → `apps/site/src/lib/`

**迷ったら 4。** 企画やデザインの会話で名前が出てくるなら、そのまとまりで 1 ディレクトリにする。

`src/utils`・`src/lib`・`public/` はまだ無い。必要になったらこのパスに作り、別名のディレクトリを新設しない。`apps/site/scripts/` はフラットに置き、サブディレクトリを作らない。

**`screens/<画面>/api/` は作らない。** CMS などからの取得は `pages/` の frontmatter からそのまとまりの `api/` を呼び、props で画面に渡す。

## 破ってはいけない依存の向き

正本は [docs/architecture/directory-structure.md の「依存の方向」](docs/architecture/directory-structure.md#依存の方向)。矢印の向きにだけ import する。

```text
pages/    → screens/, features/, 共有層（components/・utils/・lib/）
screens/  → features/, 共有層
features/ → 共有層
```

`features/` は 2 つ目の画面が同じドメインを使い始めてから作る。

- `src/` から `scripts/` を import しない
- まとまりどうしを import しない（組み合わせるのは `screens/<画面>/index.astro` の仕事）
- `screens/a` から `screens/b` を import しない。他の画面が欲しがったら、それが `features/` へ上げる合図
- `screens/` から `pages/` を import しない
- `features/` から `screens/`・`pages/`・他の `features/` を import しない
- 共有層（`components/`・`utils/`・`lib/`）から `features/`・`screens/`・`pages/` を import しない
- `pages/` にロジックを書かない

最後の 1 つと「まとまりどうし」以外は `.oxlintrc.json` の `overrides` + `no-restricted-imports` で `pnpm lint` が落ちる。oxlint は `.astro` の frontmatter と `<script>` も検査する。**`@/` エイリアス形と相対パス形の両方を塞いである**ので、`../../screens/top` のような書き方でも落ちる。画面の中のまとまりどうしの参照は相対パスなので機械的に区別できず、レビューで見る。

`styled-system/`（Panda の生成物）はどの層からでも import してよい。

## 命名（要約）

正本は [docs/architecture/directory-structure.md の「命名」](docs/architecture/directory-structure.md#命名)。

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

手順の正本は [docs/runbooks/development.md](docs/runbooks/development.md)。

- 整形: `.astro` は Prettier（`prettier-plugin-astro`）、それ以外は oxfmt。oxfmt は `.astro` を整形しない
- 検査: `pnpm lint`（`astro check`・oxlint・knip）。`astro check` のために TypeScript は 6 に据え置いている（7 では動かない）
