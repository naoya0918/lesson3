# Portfolio v2 — Design Spec

team-f-cc-lab.vercel.app のクローンをベースに、有田のポートフォリオとして再構築する。

## 技術スタック

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| CSS | Tailwind CSS v4 |
| Components | shadcn/ui |
| Fonts | DM Sans (本文) + DM Mono (コード/ラベル) via Google Fonts |
| Deploy | Vercel |

## デザイン方針：ハイブリッド型

### レイアウト（team-f-cc-lab 準拠）
- 最大幅 860px のセンタリングレイアウト
- ヘッダー: ロゴ（左）
- タブフィルター: All / Frontend / App / Other
- カード一覧: 各カードは左にテキスト（タイトル + 説明 + タグ）、右にサムネイル
- フッター: メタ情報

### 配色（lesson1 融合）
- Background: `#050816`（lesson1 のダーク背景）
- Surface: `rgba(15, 23, 42, 0.9)` with `backdrop-filter: blur(16px)`
- Primary accent: `#f97316`（オレンジ）
- Secondary accent: `#facc15`（イエロー）
- Gradient: `linear-gradient(135deg, #f97316, #facc15)`
- Text primary: `#f0f0f0`
- Text secondary: `#999`
- Border: `rgba(148, 163, 184, 0.25)`

### カードスタイル
- glassmorphism: 半透明背景 + border + backdrop-filter + box-shadow
- ホバー時: `translateY(-6px)` + border-color がオレンジに変化
- team-f-cc-lab のカード構造（テキスト左 + サムネイル右）を踏襲

### アニメーション
- フェードイン: `opacity: 0 → 1` + `translateY(30px → 0)`（lesson1 の IntersectionObserver パターン）

## ページ構成

### `/` — トップページ
- ヘッダー: サイト名「有田の成長記録」+ サブタイトル
- タブフィルター: クライアントサイドでカードをフィルタリング
  - All: 全カード表示
  - Frontend / App / Other: category でフィルタ
- カード一覧: 2カード（初期）

### `/works/[slug]` — 詳細ページ
- 戻るリンク（← トップへ）
- タイトル + 説明文
- 技術スタック（タグ表示）
- iframe プレビュー（team-f-cc-lab 風、デスクトップ幅をスケール縮小表示）
- 「学んだこと」セクション

## 初期コンテンツ

### Card 1: Lesson 1
- title: `3ヶ月で独立する男の記録`
- description: `素のHTML/CSS/JSで作成したポートフォリオ第1弾`
- category: `Frontend`
- tags: `["HTML", "CSS", "JavaScript"]`
- slug: `lesson1`
- url: https://20260326-web-2.vercel.app/
- thumbnail: OGP画像 or スクリーンショット

### Card 2: Lesson 2
- title: `Next.js アプリ`
- description: `Next.js + Tailwind CSS で構築したアプリケーション`
- category: `Frontend`
- tags: `["Next.js", "Tailwind CSS", "TypeScript"]`
- slug: `lesson2`
- url: https://lesson2-next.vercel.app/
- thumbnail: OGP画像 or スクリーンショット

## データ管理

作品データは `src/data/works.ts` に TypeScript の配列として定義。DBは不要（静的データ）。

```typescript
type Work = {
  slug: string;
  title: string;
  description: string;
  category: "Frontend" | "App" | "Other";
  tags: string[];
  url: string;
  thumbnail: string;
  learnings: string[];
};
```

## コンポーネント構成

```
src/
├── app/
│   ├── globals.css          # Tailwind設定 + カラートークン
│   ├── layout.tsx           # ルートレイアウト（フォント、メタデータ）
│   ├── page.tsx             # トップページ
│   └── works/
│       └── [slug]/
│           └── page.tsx     # 詳細ページ
├── components/
│   ├── Header.tsx           # サイトヘッダー
│   ├── TabFilter.tsx        # タブフィルター（クライアントコンポーネント）
│   ├── WorkCard.tsx         # カードコンポーネント
│   ├── WorkPreview.tsx      # iframe プレビュー
│   └── ui/                  # shadcn/ui コンポーネント
├── data/
│   └── works.ts             # 作品データ定義
└── lib/
    └── utils.ts             # cn() ユーティリティ
```

## 未決定事項

- サムネイル画像: 初期実装では placeholder グラデーションで進め、後から画像に差し替え可能にする。
