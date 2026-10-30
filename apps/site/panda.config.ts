import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // preset-panda（既定の色・余白・文字サイズのトークン一式）は入れない。
  // 入れると使っていないトークンまで CSS 変数として全部出る
  presets: ['@pandacss/preset-base'],
  // reset は src/styles/globals.css の自前のものを使う
  preflight: false,
  // 色とフォントはトークン以外を書けなくする。余白や文字サイズは
  // トークンを定義していないので、'1.5rem' のようにそのまま書ける
  strictTokens: true,
  strictPropertyValues: true,
  include: ['./src/**/*.{ts,astro}'],
  exclude: [],
  outdir: 'styled-system',
  conditions: {
    extend: {
      // 動きを出してよいとき。<head> の inline script が <html> に data-motion を付ける
      // （JS が動かない・視差効果を減らす設定・#still では付かず、最初から全部見える）
      motion: ':root[data-motion] &',
      // 画面に入ったあと（reveal-on-scroll.astro が data-shown を付ける）
      shown: '&[data-shown]',
      // 画面に入った箱の中
      inShown: '[data-shown] &',
    },
  },
  globalCss: {
    'html[data-motion]': { scrollBehavior: 'smooth' },
    body: {
      backgroundColor: 'paper',
      color: 'text',
      fontFamily: 'ja',
      fontWeight: 500,
      textStyle: 'body',
      lineHeight: 1.9,
      letterSpacing: '0.02em',
      lineBreak: 'strict',
      overflowWrap: 'anywhere',
    },
    'b, strong': { fontWeight: 700 },
    ':focus-visible': {
      outlineWidth: '3px',
      outlineStyle: 'solid',
      outlineColor: 'accent',
      outlineOffset: '3px',
    },
  },
  theme: {
    // 画面幅の切り替えは 1 つだけ（スマホと PC）
    breakpoints: { pc: '900px' },
    tokens: {
      // 仮の配色。デザインが決まったら差し替える。名前は色の名前ではなく、役割で付ける
      colors: {
        // 地
        paper: { value: '#ffffff' },
        // 本文
        text: { value: '#1f2328' },
        // 補足の字
        textMuted: { value: '#59636e' },
        // 見出し・リンク・印
        accent: { value: '#0969da' },
        // 箱の地
        surface: { value: '#f6f8fa' },
        // 罫線
        line: { value: '#d1d9e0' },
      },
      fonts: {
        // 変数の中身は Astro の Fonts API が入れる（astro.config.ts の fonts）
        ja: { value: 'var(--font-ja)' },
        mono: {
          value:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        },
      },
    },
    // 字の段。スマホと PC で大きさが変わるものをここで持つ。段にない大きさは、css() にそのまま書く
    textStyles: {
      // 章の見出し
      heading: { value: { fontSize: { base: '26px', pc: '36px' } } },
      body: { value: { fontSize: { base: '15px', pc: '16px' } } },
      // 注記
      note: { value: { fontSize: { base: '13px', pc: '13.5px' } } },
    },
    layerStyles: {
      // 灰色の箱（並び・言葉のまとまり）
      panel: {
        value: {
          backgroundColor: 'surface',
          color: 'text',
        },
      },
    },
  },
  patterns: {
    extend: {
      // 段組みの箱。本文の 1 行が 680px を超えないよう最大 720px で中央に置き、
      // 左右を 20px（ノッチのある端末はその分）空ける
      inner: {
        transform(props) {
          return {
            width: '100%',
            maxWidth: '720px',
            marginInline: 'auto',
            paddingLeft: 'max(20px, env(safe-area-inset-left, 0px))',
            paddingRight: 'max(20px, env(safe-area-inset-right, 0px))',
            // 呼ぶ側が足したスタイル（grid など）
            ...props,
          }
        },
      },
    },
  },
})
