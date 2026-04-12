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
  {
    slug: "lesson4",
    title: "NexTech Solutions コーポレートサイト",
    description:
      "架空のIT企業「NexTech Solutions」のコーポレートサイト。サービス紹介・実績・CTAセクションを備えたビジネス向けLP。",
    category: "Frontend",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://lesson4-self.vercel.app/",
    thumbnail: null,
    learnings: [
      "コーポレートサイトのレイアウト設計",
      "ビジネス向けLPの情報構成とCTA配置",
      "統計セクションなど動的な数値表示",
      "日本語Webフォント（Noto Sans JP）の活用",
    ],
  },
  {
    slug: "supabase-contacts",
    title: "問い合わせ管理ダッシュボード",
    description:
      "問い合わせデータのCRUD操作（一覧表示・ステータス変更・削除・新規作成）ができる管理ダッシュボード。Server Actionsによるサーバー側処理とSupabaseのリアルタイムDB連携。",
    category: "App",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Server Actions"],
    url: "https://supabase-contacts-beta.vercel.app/",
    thumbnail: null,
    learnings: [],
  },
];
