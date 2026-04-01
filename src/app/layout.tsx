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
