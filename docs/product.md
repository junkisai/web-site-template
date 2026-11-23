# web-site-template

このテンプレート全体の目的・対象・課題・提供価値・成功条件。今後の変更で、何を足し何を足さないかを判断するときの軸にする。機能ごとの要件と振る舞いは [prds/](prds/README.md)、技術の構成は [architecture/](README.md#architecture)、過去の判断とその理由はその変更の PR とコミットにある。

> **テンプレートから作ったサイトでは、この文書をそのサイトの目的に書き直す**（[runbooks/start-from-template.md](runbooks/start-from-template.md)）。ここに書いてあるのは、テンプレートそのものの目的。

## プロダクト概要

ログインも DB も無い Web サイト（LP・キャンペーンページ・会社や個人のサイト）を始めるための、リポジトリのテンプレート。GitHub の「Use this template」で新しいリポジトリを作り、ページの中身を作り始める。

特定のエンドユーザーに向けたサービスではない。直接の利用者はこのテンプレートからサイトを作る開発者で、サイトの閲覧者はその先にいる。

## ターゲットユーザー

| 対象 | 関わり方 | 根拠 |
| --- | --- | --- |
| テンプレートからサイトを作る開発者（作者に限らず、チームのメンバーや外部の開発者を含む） | 直接の利用者。リポジトリを作り、ページを作り、デプロイする | [README](../README.md)・[runbooks/start-from-template.md](runbooks/start-from-template.md) |
| リポジトリで作業する AI エージェント | 開発者と同じ文書と規約を読んで作業する | [AGENTS.md](../AGENTS.md)・[docs/README.md](README.md) |
| 作ったサイトの閲覧者 | 間接の利用者。テンプレートに入っている仕組み（軽さ・JS が動かなくても読めること・書体・動き）が届く先 | [prds/](prds/README.md) |

テンプレートの作者は、この構成で実際の案件のサイトを一度作り、公開まで進めている（[テンプレートを作ったときの記録の「背景」][record-background]）。作者に限らず、チームのメンバーや外部の開発者が使ってもよい（2026-11-15 にユーザーが確認）。

## 解決する課題

- **Web アプリ向けの土台からサイトを作ると、消す作業から始まる。** ログインと DB のある Web アプリ向けの土台には、React・認証・DB・管理画面が入っている。文章と画像が中心のサイトをそこから作ると、使わないものを消す作業から始まり、静的に書き出しても React のランタイムがページに届く（[テンプレートを作ったときの記録の「背景」][record-background]）
- **サイトの土台を、中身を作り始めてから入れ替えたくない。** サイトは軽さがそのまま成果に効き、初回表示が遅いと読まれる前に離脱される。軽い土台を最初に用意しておけば、中身を作り始めてから基盤を入れ替えずに済む（同）
- **中身に依存しない仕組みを、サイトごとに作り直したくない。** 実際の案件で足した仕組みのうち、日本語の書体を使う字だけ切り出す・OGP・画面に入ったら出す動き・アクセス解析の受け口・検索に出さない指定は、サイトの中身に依存しない（同）
- **置き場所を技術で振り分けたり、まとまりどうしが参照し合ったりすると、直すのが重くなる。** 1 つ直すのに何か所も開くことになり、片方を触るともう片方が壊れる（[architecture/directory-structure.md の「考え方」](architecture/directory-structure.md#考え方)）
- **過去の設計判断を、今の変えられない仕様と読み違える。** 実装後に書き換えない決まりだった設計の記録を、AI エージェントが今の仕様として読み、変更を断ったことがある（[PR #18](https://github.com/junkisai/web-site-template/pull/18)）

## 提供価値

- **閲覧者に軽く届く、静的なサイトの土台。** 閲覧者のブラウザには、機能に要る JS だけを届ける
- **中身に依存しない仕組みが最初から入っている。** 書体・ページのメタ情報と OGP・画面に入ったら出す動き・アクセス解析の受け口。それぞれの要件は [prds/](prds/README.md) にある
- **置き場所・依存の向き・命名の規約と、それを守らせる lint。** 規約を破ると `pnpm lint` が落ちる（[architecture/directory-structure.md](architecture/directory-structure.md)）
- **開発と公開の手順。** 手元から Cloudflare Workers へのデプロイと、PR ごとのプレビュー（[runbooks/](README.md#runbooks)）
- **人と AI エージェントが、今の要件・今の構成・過去の判断・手順を取り違えないドキュメントの体系**（[docs/README.md](README.md)）

## コア体験

1. GitHub の「Use this template」でリポジトリを作り、名前・公開する URL・配色・仮のトップページなどを変える（[runbooks/start-from-template.md](runbooks/start-from-template.md)）
2. `pnpm install` して、`pnpm dev` で手元に立ち上げる（[runbooks/development.md](runbooks/development.md)）
3. 規約に沿ってページとセクションを作る。置き場所や依存の向きを破ると `pnpm lint` が落ちる
4. `pnpm -F site deploy` で公開する（[runbooks/deploy.md](runbooks/deploy.md)）

この流れで目指すのは、**使わないものを消す作業から始めずに、サイトの中身を作り始められること**（[テンプレートを作ったときの記録の「背景」][record-background]）。

## ゴール・成功指標

テンプレートとしての成功は、次の状態が保たれていること。

- テンプレートから作ったリポジトリで、使わないものを消す作業から始めずにページを作り始められる
- 作ったサイトの閲覧者に、機能に要るものだけが届く。今の基準は、各 PRD の要件（[prds/site.md の「業務ルール・制約」](prds/site.md#業務ルール制約)など）にある
- 規約を破ると、lint や型の検査で気づける

テンプレートを作ったときに確かめた条件のうち今も守っているものは、各 PRD の受け入れ条件と [architecture/overview.md の「構成上の制約」](architecture/overview.md#構成上の制約)にある。

**テンプレートなので、数値の目標や測定指標は置かない**（2026-11-15 にユーザーが確認）。

## スコープ・非ゴール

### スコープ

- 静的な Web サイト（LP・キャンペーンページ・会社や個人のサイト）の土台
- 中身に依存しない仕組み（[prds/](prds/README.md#一覧) の一覧）
- 開発の道具と規約、手元からのデプロイ

### 今は無いもの

**「この先もやらない」と決めたものではない。** テンプレートを作ったときに、今はやらない（要るサイトで、そのとき作り方を決める）としたものと、まだ決めていないもの。いずれテンプレートに取り込んでいく見込みで、どれをいつ入れるかは決まっていない（2026-11-15 にユーザーが確認）。足すときは、比べた案と選んだ理由を PR の本文に書く（[AGENTS.md の「変更の進め方」](../AGENTS.md#変更の進め方)）。

- フォームの送信とサーバーの処理（[テンプレートを作ったときの記録の「やらないこと」][record-non-goals]）
- CMS からのデータ取得。取得の置き場所の規約だけある（同）
- CI と自動デプロイ（同）
- デザインのトークン一式。配色は仮のもので、余白・文字サイズのトークンはデザインが来てから足す（同）
- テスト。置き場所だけ決めてある（[architecture/overview.md の「構成上の制約」](architecture/overview.md#構成上の制約)）
- 404 のページ・`robots.txt`・`sitemap.xml`。出すかどうかが決まっていない（[prds/site.md](prds/site.md#未確認事項)）

### 意図的な非ゴール

- **ログイン・DB・管理画面を持つ Web アプリ。** テンプレートを作ったときに「この先もやらない」と決めた（[テンプレートを作ったときの記録の「やらないこと」][record-non-goals]）

これもテンプレートから引き継いだ既定の方針で、ユーザーが明示的に求めれば見直してよい。見直すときは、今の構成を保つ案と変える案を比べ、選んだ理由を PR の本文に書く（[architecture/overview.md の「構成上の制約」](architecture/overview.md#構成上の制約)）。

## プロダクト原則

判断に迷ったときの軸。どれも既定の方針で、ユーザーが明示的に求めれば見直してよい（[AGENTS.md](../AGENTS.md)）。

1. **閲覧者に届けるものを軽く保つ。** 初回表示の遅さは離脱につながる、という前提に立つ。JS は機能に要るものだけにし、UI フレームワークのランタイムを届けない（[テンプレートを作ったときの記録の「背景」][record-background]・[prds/site.md](prds/site.md#ブラウザで動く-js)）
2. **どの環境でも、内容をすべて読めるようにする。** JS が動かなくても、動きを減らす設定でも、内容はすべて見える（[prds/site.md](prds/site.md#js-が動かないとき)・[prds/motion.md](prds/motion.md)）
3. **閲覧者のブラウザから外のドメインへの接続を増やさない。** 書体は自分のドメインから配り、外から読むのはトークンを入れたときの計測のビーコンだけ（[prds/site.md](prds/site.md#外部への接続)）
4. **テンプレートには、中身に依存しない仕組みだけを入れる。** 特定のサイトの中身に依存するものは、そのサイトで作る（[テンプレートを作ったときの記録の「背景」][record-background]）
5. **規約は文書に書くだけでなく、lint と型で守らせる。** 依存の向きは oxlint、色と書体のトークンは型の検査で止める（[architecture/](README.md#architecture)）
6. **器は、実際に要るようになってから作る。** 2 つ目の画面が使うまで `features/` を作らず、2 つ目の入口ができるまで別アプリを作らない（[architecture/directory-structure.md](architecture/directory-structure.md)）
7. **今・過去・手順を分けて書く。** 今の要件は PRD、今の構成は architecture、手順は runbooks に書き、過去の判断は PR とコミットに残す（[docs/README.md](README.md)）

## 未確認事項・仮説

- **「軽さがそのまま成果に効く」は前提（仮説）。** [テンプレートを作ったときの記録の「背景」][record-background]に書かれた前提で、このリポジトリに裏付けの数値は無い

## 関連資料

- [README.md](../README.md) — リポジトリの入口・技術の一覧・よく使うコマンド
- [docs/README.md](README.md) — ドキュメントの種類と読み分け
- [prds/](prds/README.md) — 機能ごとの目的・要件・振る舞い
- [architecture/overview.md](architecture/overview.md) — 今の構成と構成上の制約
- [テンプレートを作ったときの記録][record] — このテンプレートを作ったときの判断と、捨てた案。最初のコミット `aaa2cbb` に入れたもので、PR は無い
- [runbooks/start-from-template.md](runbooks/start-from-template.md) — テンプレートから作ったときに変えるもの
- [AGENTS.md](../AGENTS.md) — 作業の進め方と規約の要約

[record]: https://github.com/junkisai/web-site-template/blob/aaa2cbbdb77e2447ac00427379344e434e7ee40a/docs/design-docs/20261031_web-site-template.md
[record-background]: https://github.com/junkisai/web-site-template/blob/aaa2cbbdb77e2447ac00427379344e434e7ee40a/docs/design-docs/20261031_web-site-template.md#背景
[record-non-goals]: https://github.com/junkisai/web-site-template/blob/aaa2cbbdb77e2447ac00427379344e434e7ee40a/docs/design-docs/20261031_web-site-template.md#やらないこと
