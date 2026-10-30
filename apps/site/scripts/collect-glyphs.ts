import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// 注釈の中の字はページに出ないので数えない。`https://` の `//` は注釈ではないので残す
const stripComments = (source: string) =>
  source
    .replaceAll(/<!--[\s\S]*?-->/g, '')
    .replaceAll(/\/\*[\s\S]*?\*\//g, '')
    .replaceAll(/(?<!:)\/\/[^\n]*/g, '')

/**
 * dir の下の .astro と .ts に書いた字を全部集める。Fonts API の glyphs に渡し、
 * ページで使う字だけを切り出したフォントのファイルを作る（astro.config.ts）。
 * LP の字はすべてソースに書いてあり、CMS などから取る字は無いので、これで足りる。
 * 足りない字があっても、その字だけ次の書体（fallbacks）で出る
 */
export const collectGlyphs = (dir: string): string[] => {
  const glyphs = new Set<string>()
  // ASCII の印字できる字は全部入れる（数え上げの途中の数字など、ソースに無い組み合わせも出るため）
  for (let code = 0x20; code < 0x7f; code++)
    glyphs.add(String.fromCodePoint(code))

  const walk = (path: string) => {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const child = join(path, entry.name)
      if (entry.isDirectory()) walk(child)
      else if (/\.(astro|ts)$/.test(entry.name)) {
        for (const char of stripComments(readFileSync(child, 'utf8'))) {
          if (!/\s/.test(char)) glyphs.add(char)
        }
      }
    }
  }
  walk(dir)

  return [...glyphs].toSorted()
}
