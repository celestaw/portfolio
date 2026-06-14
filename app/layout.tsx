import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const jp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp",
});

export const metadata: Metadata = {
  title: "渡邉 拓真 — Portfolio",
  description: "渡邉拓真（東京科学大学 修士1年, HCI）の制作実績ポートフォリオ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${sans.variable} ${jp.variable}`}>
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  );
}
