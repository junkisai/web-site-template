# 画面に入ったら出す動き

要素が画面に入ったときに出す動きと、動きを出さない条件。

## 振る舞い

### 出すとき

- 印を付けた要素は、画面の下から 15% の線まで入ったときに「出たあと」の見た目になる
- 1 度出た要素は、画面から外れても戻さない
- 出る前と出たあとにどう見えるかは、要素ごとに決める
- 動きを出すときだけ、ページの中のリンクで滑らかにスクロールする
- 画面に入ったかを判定できないブラウザ（IntersectionObserver が無い）では、印を付けた要素をすべて、すぐに「出たあと」にする

### 出さないとき

次のどれかに当たるときは動きを出さず、**最初からすべての内容が見える。**

- JS が動かない
- OS やブラウザで、動き（視差効果）を減らす設定にしている
- URL に `#still` がある、またはクエリに `still` がある（`?still`・`&still`）。動きを止めた状態で確かめるときに使う

## 制約

- 「出る前」に要素を隠すのは、動きを出すときだけ。動きを出さないときに、隠れたままの要素を作らない

## 受け入れ条件

- [ ] 動きを減らす設定・`#still`・`?still`・JS を切った状態のどれでも、トップページの見出しが最初から見えている
- [ ] 動きを出す状態で、印を付けた要素が画面に入ると「出たあと」の見た目になり、画面から外れても戻らない

## 未確認事項

なし

## 関連

- 経緯: [design-docs/20261031_web-site-template.md](../design-docs/20261031_web-site-template.md)
- 書き方（`_motion`・`_shown`・`_inShown`・`data-reveal`）: [architecture/styling.md](../architecture/styling.md#動き)
- 実装: `apps/site/src/components/layout/base-layout.astro`（動きを出すかの判定）、`apps/site/src/components/ui/reveal-on-scroll.astro`（画面に入った要素に `data-shown` を付ける）、`apps/site/panda.config.ts` の `conditions`
