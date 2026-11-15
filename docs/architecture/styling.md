# スタイルの書き方

`apps/site` のスタイルの規約。設定は `apps/site/panda.config.ts`、reset は `apps/site/src/styles/globals.css` にある。

## Panda CSS の設定

| 設定 | 今の値 | 効くこと |
| --- | --- | --- |
| `presets` | `@pandacss/preset-base` だけ | 既定のトークン一式（`preset-panda`）を入れない。使っていないトークンまで CSS 変数として出るのを止める |
| `preflight` | `false` | Panda の reset を使わず、`globals.css` の reset を使う |
| `strictTokens` | `true` | 色と書体はトークン以外を書くと `astro check` の型エラーになる |
| `strictPropertyValues` | `true` | 存在しないプロパティと値が型エラーになる |
| `theme.breakpoints` | `pc: '900px'` だけ | 画面幅の切り替えは 1 つだけ（スマホと PC） |

## 書き方

スタイルは Panda CSS の `css()` で書く。

```astro
---
import { css } from 'styled-system/css'
---

<h1 class={css({ fontSize: '1.875rem', color: 'accent' })}>見出し</h1>
```

- **`.astro` の `<style>` は使わない。** 書き方を `css()` の 1 つにするため。lint では止められないので、レビューで見る
- **色とフォントはトークンで書く。** `'red'`・`'#fff'`・`oklch(...)` のような直書きは型エラーになる。新しい色が要るときは、`panda.config.ts` の `theme.tokens.colors` に足す。色の名前は色そのものではなく役割で付ける（`paper`・`text`・`accent` など）。今の配色は仮のもの
- **余白と文字サイズはトークンにしない。** `padding`・`gap`・`fontSize` は `'1.5rem'` のようにそのまま書ける
- **決まった値しか型が通らないプロパティは、それ以外の値を `[...]` で囲む。** 幅と高さ（`width`・`maxWidth`・`minHeight` など）、`margin` 系、`inset`、`transition`、`translate`・`scale`・`rotate`、`filter` がそれ。`'[48rem]'`・`'[8px]'`・`'[0 28px]'` のように囲む（Panda のエスケープハッチ）
- **画面幅で変えるときは `pc` の条件で書く。** `{ padding: '20px', pc: { padding: '24px 28px' } }` のように、スマホの値を先に書き、PC の値を `pc` に書く
- **部品に呼ぶ側からスタイルを渡さない。** 渡したスタイルは静的に読めず、Panda が警告を出す。違いは `tone="lemon"` のような選択肢の引数か、呼ぶ側の包む要素で表す
- **`css()` はビルド時に評価される。** `.astro` の frontmatter とテンプレートで呼ぶかぎり、Panda のランタイムはブラウザに届かない。**ブラウザで動く `<script>` の中では `css()` を呼ばない。** 状態でスタイルを変えたいときは、クラスを切り替えるのではなく `data-*` 属性と `css()` の条件（`_open` など）で書く

## 繰り返し出てくる見た目

`panda.config.ts` に持つ。繰り返し出てくる見た目が増えたら、ここに足す。

| 見た目 | 書き方 | 中身 |
| --- | --- | --- |
| 字の段 | `textStyle: 'heading'`・`'body'`・`'note'` | 章の見出し・本文・注記。スマホと PC で大きさが変わる。段にない大きさは `css()` にそのまま書く |
| 灰色の箱 | `layerStyle: 'panel'` | 箱の地の色と本文の色 |
| 段組みの箱 | `styled-system/patterns` の `inner()` | 最大 720px で中央に置き、左右を 20px（ノッチのある端末はその分）空ける。本文の 1 行が 680px を超えない |

## 動き

動きを出すかどうかの条件は [specs/motion.md](../specs/motion.md) にある。条件を満たすと、`<html>` に `data-motion` が付く。

- **動きは `_motion` の中に書く。** `_motion` は `<html>` に `data-motion` があるときだけ当たる。**「出る前に隠す」スタイルもここに書く。** こうすると、動きを出さないときは最初から全部見える
- **画面に入ったあとの見た目は `_shown`（自分）・`_inShown`（画面に入った箱の中）で書き、要素に `data-reveal` を付ける**
- **`data-reveal` を使う画面には `RevealOnScroll`（`components/ui/reveal-on-scroll.astro`）を置く。** `data-shown` を付けるのはこの部品だけなので、置き忘れると、動きを出すときに「出る前」の見た目のまま残る（例: `screens/top/index.astro`）

## 全体に当てるスタイルと reset

- **`html`・`body` の色とフォントは `panda.config.ts` の `globalCss` で当てる。** `src/styles/globals.css` には `@layer` の順番と reset だけを置く
- **reset は必ず `@layer reset` の中に書く。** Panda は生成した CSS を `@layer` の中に出し、ブラウザは `@layer` の外の CSS を中の CSS より常に優先する。外に書くと、reset の `a { color: inherit }` などが Panda のスタイルに勝つ
- reset には、このアプリが実際に頼っているものだけを置く

## 生成物

**`styled-system/` は `panda codegen` の生成物で、コミットしない。** 手で触らない。`pnpm install`（`prepare`）と `pnpm lint`（turbo の `gen`）の前に作り直される。`panda.config.ts` を変えたあと型が古いときは `pnpm gen` を流す。

`styled-system/` は依存の向きの対象外で、どの層からでも import してよい（[directory-structure.md](directory-structure.md#依存の方向)）。
