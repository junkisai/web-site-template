import { fileURLToPath } from 'node:url'

import { pandacss } from '@pandacss/vite'
import { defineConfig, fontProviders } from 'astro/config'

import { collectGlyphs } from './scripts/collect-glyphs'

// ページで使う字。日本語の書体を字の範囲ごとのファイル（1 書体で 100 個以上・@font-face だけで HTML が数百 KB）にせず、
// 使う字だけを切り出した 1 ファイルにする
const pageGlyphs = collectGlyphs(
  fileURLToPath(new URL('./src', import.meta.url)),
)

export default defineConfig({
  // 公開する URL。OGP（og:url・og:image）の絶対 URL に使う。決まったら入れる。
  // 入れるまでは、base-layout.astro が og:url と og:image を出さない
  // site: 'https://www.example.com',
  // ビルド時に取ってきて dist/ から配る。<head> の <Font> で読み込む（base-layout.astro）
  fonts: [
    {
      // 本文と見出し。太さの違う字（本文 500・強める字 700・見出し 800）を可変の 1 ファイルで持つ
      provider: fontProviders.google(),
      name: 'Noto Sans JP',
      cssVariable: '--font-ja',
      weights: ['500 800'],
      options: { experimental: { glyphs: pageGlyphs } },
      fallbacks: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
    },
  ],
  vite: {
    // styled-system の生成と、生成した CSS の注入を受け持つ
    plugins: [pandacss()],
  },
})
