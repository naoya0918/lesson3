# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** team-f-cc-lab.vercel.app のレイアウト構造をベースに、lesson1 のネイビー×オレンジ配色を融合したポートフォリオサイトを Next.js + Tailwind + shadcn/ui で構築する。

**Architecture:** Next.js 16 App Router で `/` (カード一覧 + タブフィルター) と `/works/[slug]` (iframe プレビュー詳細) の2ページ構成。作品データは `src/data/works.ts` に静的定義。team-f-cc-lab の `hub-article` カード構造と `hub-tabs` フィルターを再現しつつ、glassmorphism + オレンジグラデーションでオリジナル配色に。

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui, DM Sans + DM Mono (Google Fonts)

---

## File Structure

```
lesson3/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind v4 @theme + カラートークン + アニメーション
│   │   ├── layout.tsx           # ルートレイアウト（フォント, メタデータ）
│   │   ├── page.tsx             # トップページ（Server Component）
│   │   └── works/
│   │       └── [slug]/
│   │           └── page.tsx     # 詳細ページ（Server Component）
│   ├── components/
│   │   ├── Header.tsx           # サイトヘッダー（ロゴ + サブタイトル）
│   │   ├── TabFilter.tsx        # タブフィルター（"use client"）
│   │   ├── WorkCard.tsx         # カードコンポーネント
│   │   ├── WorkList.tsx         # カード一覧 + フィルタリング（"use client"）
│   │   ├── WorkPreview.tsx      # iframe プレビュー
│   │   └── Footer.tsx           # フッター
│   ├── data/
│   │   └── works.ts             # 作品データ + Work 型定義
│   └── lib/
│       └── utils.ts             # cn() ユーティリティ
├── public/
│   └── (サムネイル画像、後から追加可)
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts
└── .gitignore
```

---

### Task 1: プロジェクト初期化

**Files:**
- Create: `package.json`, `tsconfig.json`, `postcss.config.mjs`, `next.config.ts`, `.gitignore`

- [ ] **Step 1: Next.js プロジェクトを作成**

```bash
cd /c/Users/naoya/programming-dojo/lesson3
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --skip-install
```

対話プロンプトが出た場合:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: No (デフォルトの `@/*`)

- [ ] **Step 2: 依存パッケージをインストール**

```bash
cd /c/Users/naoya/programming-dojo/lesson3
npm install
```

- [ ] **Step 3: dev サーバーで起動確認**

```bash
cd /c/Users/naoya/programming-dojo/lesson3
npm run dev
```

Expected: `http://localhost:3000` でデフォルトの Next.js ページが表示される。確認後 Ctrl+C で停止。

- [ ] **Step 4: shadcn/ui を初期化**

```bash
cd /c/Users/naoya/programming-dojo/lesson3
npx shadcn@latest init -d
```

- [ ] **Step 5: git init + 初回コミット**

```bash
cd /c/Users/naoya/programming-dojo/lesson3
git init
git add -A
git commit -m "chore: init Next.js 16 + Tailwind v4 + shadcn/ui project"
```

---

### Task 2: デザイントークン + グローバルCSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: globals.css をカラートークン + アニメーション定義に書き換え**

lesson1 のネイビー×オレンジ配色と team-f-cc-lab のレイアウト変数を融合する。

```css
@import "tailwindcss";

@theme inline {
  --color-bg: #050816;
  --color-surface: rgba(15, 23, 42, 0.9);
  --color-surface-solid: #0f172a;
  --color-line: rgba(148, 163, 184, 0.25);
  --color-line-hover: rgba(249, 115, 22, 0.7);
  --color-ink: #f0f0f0;
  --color-ink2: #999999;
  --color-ink3: #555555;
  --color-accent: #f97316;
  --color-accent2: #facc15;
  --color-navy: #0b1f3a;

  --font-sans: "DM Sans", sans-serif;
  --font-mono: "DM Mono", monospace;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: ビルド確認**

```bash
cd /c/Users/naoya/programming-dojo/lesson3
npm run build
```

Expected: ビルド成功。

- [ ] **Step 3: コミット**

```bash
git add src/app/globals.css
git commit -m "style: add design tokens with navy × orange color scheme"
```

---

### Task 3: ルートレイアウト + フォント設定

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: layout.tsx を DM Sans + DM Mono フォントに書き換え**

```tsx
import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "有田の成長記録 — 3ヶ月で独立する男のポートフォリオ",
  description:
    "AIを相棒に、爆速で成長し、自由な働き方を実現する。有田のエンジニア独立チャレンジの記録。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${dmSans.variable} ${dmMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: ビルド確認**

```bash
npm run build
```

Expected: ビルド成功。

- [ ] **Step 3: コミット**

```bash
git add src/app/layout.tsx
git commit -m "feat: add root layout with DM Sans + DM Mono fonts"
```

---

### Task 4: 作品データ定義

**Files:**
- Create: `src/data/works.ts`

- [ ] **Step 1: Work 型と作品データを定義**

```typescript
export type Work = {
  slug: string;
  title: string;
  description: string;
  category: "Frontend" | "App" | "Other";
  tags: string[];
  url: string;
  thumbnail: string | null;
  learnings: string[];
};

export const categories = ["All", "Frontend", "App", "Other"] as const;
export type Category = (typeof categories)[number];

export const works: Work[] = [
  {
    slug: "lesson1",
    title: "3ヶ月で独立する男の記録",
    description:
      "素のHTML/CSS/JSで作成したポートフォリオ第1弾。ダークUI × オレンジグラデーションのデザインで、ミッション・自己紹介・コンタクトセクションを構成。",
    category: "Frontend",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://20260326-web-2.vercel.app/",
    thumbnail: null,
    learnings: [
      "CSS カスタムプロパティによるデザイントークン管理",
      "IntersectionObserver を使ったスクロールアニメーション",
      "レスポンシブデザイン（モバイルファースト）",
      "backdrop-filter を使った glassmorphism 表現",
    ],
  },
  {
    slug: "lesson2",
    title: "Next.js ポートフォリオ",
    description:
      "Next.js 16 + Tailwind CSS v4 + TypeScript で再構築したポートフォリオ。コンポーネント分割とモダンなフロントエンド開発を実践。",
    category: "Frontend",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://lesson2-next.vercel.app/",
    thumbnail: null,
    learnings: [
      "Next.js App Router によるページ構成",
      "Tailwind CSS v4 のインラインテーマ設定",
      "React コンポーネント分割の考え方",
      "TypeScript による型安全な開発",
    ],
  },
];
```

- [ ] **Step 2: ビルド確認**

```bash
npm run build
```

Expected: ビルド成功（未使用 export の警告は OK）。

- [ ] **Step 3: コミット**

```bash
git add src/data/works.ts
git commit -m "feat: add work data definitions for lesson1 and lesson2"
```

---

### Task 5: cn() ユーティリティ

**Files:**
- Create: `src/lib/utils.ts`

shadcn/ui init で既に作成されている可能性がある。存在しない場合のみ作成。

- [ ] **Step 1: utils.ts を確認・作成**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: 依存パッケージ確認**

```bash
npm ls clsx tailwind-merge 2>/dev/null || npm install clsx tailwind-merge
```

- [ ] **Step 3: コミット（変更がある場合のみ）**

```bash
git add src/lib/utils.ts package.json package-lock.json
git commit -m "feat: add cn() utility"
```

---

### Task 6: Header コンポーネント

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: Header を実装**

team-f-cc-lab の `hub-header` 構造を参考に、配色をオリジナルに。

```tsx
export default function Header() {
  return (
    <header className="mx-auto max-w-[860px] px-5 pt-12 pb-8">
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          有田の成長記録
        </h1>
        <span className="font-mono text-xs text-accent">Portfolio</span>
      </div>
      <p className="mt-1 text-sm text-ink2">
        3ヶ月で独立する男のポートフォリオ
      </p>
    </header>
  );
}
```

- [ ] **Step 2: ビルド確認**

```bash
npm run build
```

- [ ] **Step 3: コミット**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Header component"
```

---

### Task 7: WorkCard コンポーネント

**Files:**
- Create: `src/components/WorkCard.tsx`

- [ ] **Step 1: WorkCard を実装**

team-f-cc-lab の `hub-article` 構造（左テキスト + 右サムネイル iframe）を再現。glassmorphism スタイル。

```tsx
import Link from "next/link";
import type { Work } from "@/data/works";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group flex gap-6 rounded-2xl border border-line bg-surface p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-line-hover hover:shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="mb-1 font-mono text-xs uppercase tracking-wider text-accent">
          {work.category}
        </span>
        <h3 className="mb-2 text-lg font-semibold leading-snug text-ink">
          {work.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-ink2">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface-solid/50 px-2.5 py-0.5 font-mono text-xs text-ink2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative hidden h-[120px] w-[200px] shrink-0 overflow-hidden rounded-lg border border-line sm:block">
        <iframe
          src={work.url}
          width="1280"
          height="800"
          className="pointer-events-none origin-top-left scale-[0.156]"
          tabIndex={-1}
          loading="lazy"
          title={`${work.title} preview`}
        />
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: ビルド確認**

```bash
npm run build
```

- [ ] **Step 3: コミット**

```bash
git add src/components/WorkCard.tsx
git commit -m "feat: add WorkCard component with iframe preview"
```

---

### Task 8: TabFilter + WorkList コンポーネント

**Files:**
- Create: `src/components/TabFilter.tsx`
- Create: `src/components/WorkList.tsx`

- [ ] **Step 1: TabFilter を実装**

```tsx
"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/data/works";

export default function TabFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: Category;
  onChange: (cat: Category) => void;
}) {
  return (
    <div className="flex gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat as Category)}
          className={cn(
            "rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-200",
            active === cat
              ? "border-accent bg-accent/10 text-ink"
              : "border-line text-ink3 hover:border-ink2 hover:text-ink2"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: WorkList を実装**

WorkList は TabFilter とカード一覧を束ねるクライアントコンポーネント。

```tsx
"use client";

import { useState } from "react";
import { works, categories, type Category } from "@/data/works";
import TabFilter from "./TabFilter";
import WorkCard from "./WorkCard";

export default function WorkList() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <div>
      <div className="mb-8">
        <TabFilter
          categories={categories}
          active={active}
          onChange={setActive}
        />
      </div>
      <div className="flex flex-col gap-4">
        {filtered.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: ビルド確認**

```bash
npm run build
```

- [ ] **Step 4: コミット**

```bash
git add src/components/TabFilter.tsx src/components/WorkList.tsx
git commit -m "feat: add TabFilter and WorkList components"
```

---

### Task 9: Footer コンポーネント

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Footer を実装**

```tsx
export default function Footer() {
  return (
    <footer className="mx-auto max-w-[860px] border-t border-line px-5 py-8">
      <p className="text-center font-mono text-xs text-ink3">
        Built with Next.js + Tailwind CSS + Claude Code
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: コミット**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 10: トップページ組み立て

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: page.tsx をトップページとして組み立て**

```tsx
import Header from "@/components/Header";
import WorkList from "@/components/WorkList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[860px] px-5 pb-16">
        <WorkList />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: dev サーバーで表示確認**

```bash
npm run dev
```

Expected: `http://localhost:3000` にヘッダー + タブ + カード2枚 + フッターが表示される。カードにはiframeサムネイルが表示され、タブ切り替えでフィルタリングが動作する。

- [ ] **Step 3: ビルド確認**

```bash
npm run build
```

- [ ] **Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble top page with Header, WorkList, Footer"
```

---

### Task 11: 詳細ページ（iframe プレビュー）

**Files:**
- Create: `src/components/WorkPreview.tsx`
- Create: `src/app/works/[slug]/page.tsx`

- [ ] **Step 1: WorkPreview コンポーネントを実装**

team-f-cc-lab 風の iframe 埋め込みプレビュー。

```tsx
export default function WorkPreview({ url, title }: { url: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-solid">
      <div className="border-b border-line px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
          </div>
          <span className="flex-1 text-center font-mono text-xs text-ink3 truncate">
            {url}
          </span>
        </div>
      </div>
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={url}
          width="1280"
          height="800"
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ transform: "scale(var(--preview-scale, 0.5))" }}
          tabIndex={-1}
          title={`${title} preview`}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 詳細ページを実装**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { works } from "@/data/works";
import WorkPreview from "@/components/WorkPreview";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 16 では params は Promise
  return params.then(({ slug }) => {
    const work = works.find((w) => w.slug === slug);
    return work
      ? { title: `${work.title} — 有田の成長記録` }
      : { title: "Not Found" };
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[860px] px-5 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-ink2 transition-colors hover:text-accent"
        >
          ← Back
        </Link>

        <div className="mb-6">
          <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-accent">
            {work.category}
          </span>
          <h1 className="mb-3 text-3xl font-bold text-ink">{work.title}</h1>
          <p className="text-base leading-relaxed text-ink2">
            {work.description}
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface-solid/50 px-3 py-1 font-mono text-xs text-ink2"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-8">
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-accent2"
          >
            サイトを見る ↗
          </a>
        </div>

        <div className="mb-10">
          <WorkPreview url={work.url} title={work.title} />
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold text-ink">学んだこと</h2>
          <ul className="flex flex-col gap-2">
            {work.learnings.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-ink2"
              >
                <span className="mt-1 text-accent">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: dev サーバーで動作確認**

```bash
npm run dev
```

確認事項:
- `http://localhost:3000` でカードクリック → `/works/lesson1` に遷移
- iframe プレビューが表示される
- 「← Back」で戻れる
- 「サイトを見る ↗」で別タブに開く

- [ ] **Step 4: ビルド確認**

```bash
npm run build
```

Expected: 静的生成で `/works/lesson1` と `/works/lesson2` がビルドされる。

- [ ] **Step 5: コミット**

```bash
git add src/components/WorkPreview.tsx src/app/works/
git commit -m "feat: add work detail page with iframe preview"
```

---

### Task 12: フェードインアニメーション

**Files:**
- Create: `src/components/ScrollReveal.tsx`
- Modify: `src/components/WorkList.tsx`

- [ ] **Step 1: ScrollReveal コンポーネントを実装**

lesson1 の IntersectionObserver パターンを React 化。

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: WorkList にフェードインを適用**

`src/components/WorkList.tsx` のカード表示部分を更新:

```tsx
"use client";

import { useState } from "react";
import { works, categories, type Category } from "@/data/works";
import TabFilter from "./TabFilter";
import WorkCard from "./WorkCard";
import ScrollReveal from "./ScrollReveal";

export default function WorkList() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? works : works.filter((w) => w.category === active);

  return (
    <div>
      <div className="mb-8">
        <TabFilter
          categories={categories}
          active={active}
          onChange={setActive}
        />
      </div>
      <div className="flex flex-col gap-4">
        {filtered.map((work, i) => (
          <ScrollReveal key={work.slug} delay={i * 120}>
            <WorkCard work={work} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: ビルド確認**

```bash
npm run build
```

- [ ] **Step 4: コミット**

```bash
git add src/components/ScrollReveal.tsx src/components/WorkList.tsx
git commit -m "feat: add scroll reveal animation to work cards"
```

---

### Task 13: iframe スケール調整 + レスポンシブ対応

**Files:**
- Modify: `src/components/WorkPreview.tsx`
- Modify: `src/components/WorkCard.tsx`

- [ ] **Step 1: WorkPreview に JS ベースのスケール計算を追加**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function WorkPreview({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      setScale(el.clientWidth / 1280);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-solid">
      <div className="border-b border-line px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
          </div>
          <span className="flex-1 truncate text-center font-mono text-xs text-ink3">
            {url}
          </span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: `${800 * scale}px` }}
      >
        <iframe
          src={url}
          width="1280"
          height="800"
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ transform: `scale(${scale})` }}
          tabIndex={-1}
          title={`${title} preview`}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: WorkCard の iframe サムネイルをレスポンシブ対応**

`src/components/WorkCard.tsx` の iframe 部分にモバイル非表示を確認（既に `hidden sm:block` で対応済み）。追加修正は不要の見込み。

- [ ] **Step 3: ビルド確認**

```bash
npm run build
```

- [ ] **Step 4: dev で表示確認**

```bash
npm run dev
```

確認事項:
- 詳細ページの iframe がコンテナ幅に合わせてスケール
- ウィンドウリサイズに追従
- モバイル幅でもレイアウトが崩れない

- [ ] **Step 5: コミット**

```bash
git add src/components/WorkPreview.tsx src/components/WorkCard.tsx
git commit -m "feat: responsive iframe scaling for preview"
```

---

### Task 14: Next.js 設定 + iframe 許可

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: next.config.ts で外部 iframe の CSP ヘッダーを設定（必要な場合）**

iframe の `src` が外部 URL なので、表示を確認。ブラウザのコンソールに CSP エラーが出ていなければこのタスクはスキップ。

エラーが出ている場合:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src https://20260326-web-2.vercel.app https://lesson2-next.vercel.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: ビルド確認 + コミット（変更がある場合のみ）**

```bash
npm run build
git add next.config.ts
git commit -m "fix: allow external iframe sources in CSP"
```

---

### Task 15: 最終確認 + 仕上げコミット

**Files:** 全体確認

- [ ] **Step 1: ビルド + lint**

```bash
npm run build
npm run lint
```

Expected: エラーなし。

- [ ] **Step 2: dev サーバーで全ページ動作確認**

```bash
npm run dev
```

確認チェックリスト:
- [ ] トップページ表示（ヘッダー + タブ + カード2枚 + フッター）
- [ ] タブ「All」で全カード表示
- [ ] タブ「Frontend」で2枚表示
- [ ] タブ「App」「Other」で0件表示
- [ ] カードホバーでアニメーション
- [ ] カードクリックで詳細ページ遷移
- [ ] 詳細ページ: iframe プレビュー表示
- [ ] 詳細ページ: 「サイトを見る ↗」で別タブ遷移
- [ ] 詳細ページ: 「← Back」でトップに戻る
- [ ] スマホ幅（375px）でレイアウト崩れなし
- [ ] スクロールフェードインアニメーション動作

- [ ] **Step 3: 問題があれば修正してコミット**
