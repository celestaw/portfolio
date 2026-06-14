# 渡邉 拓真 — Portfolio (Next.js)

## 起動

```bash
npm install
npm run dev
```

ローカル実装時はhttp://localhost:3000 で表示される。

## 本番ビルド

```bash
npm run build
npm run start
```

## 構成

```
app/
  layout.tsx          フォント・メタ情報
  globals.css         残像/光点の視覚表現
  page.tsx            トップ（Hero + 制作実績一覧 + プロフィール）
  works/[slug]/page.tsx  制作物の詳細ページ
components/
  WorkCard.tsx        一覧カード
data/
  profile.ts          ★プロフィール本文（ここを編集）
  projects.ts         ★制作物データ（ここが本体。本文もここ）
public/works/         画像置き場
```

## 編集の勘所

- **中身はすべて data/ にある。** デザインを触らずに文章・リンク・技術タグを更新できる。
- 各制作物の `TODO` は、動画URL・GitHubリンク・画像が決まり次第差し込む。
  動画/GitHubが無い項目を提出すると弱いので、最低でも featured の5件は
  「動いている証拠」へのリンクを埋めること。
- 画像は `public/works/` に置き、`cover` / `media.src` のパスと一致させる。
- 一覧だけの項目を詳細化したくなったら、その項目の `featured` を `true` にして
  `overview` 等の本文フィールドを足すだけでよい。

## デプロイ

Vercel に push すれば自動でビルドされる。リポジトリを連携して import するだけ。
このサイト自体が Next.js / TypeScript の制作実績になる。
