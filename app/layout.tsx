import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? "https://lixiaobaivv.github.io/Codex-Skin-Store/";
const metadataBase = new URL(siteUrl);
const socialImage = new URL("og.png", metadataBase).href;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Dream Skin Store — Codex 主题商店",
    template: "%s · Dream Skin Store",
  },
  description: "发现、预览并一键导入安全的 Codex Dream Skin 声明式主题。",
  applicationName: "Dream Skin Store",
  keywords: ["Codex", "Dream Skin", "主题商店", "桌面主题"],
  openGraph: {
    title: "Dream Skin Store — Codex 主题商店",
    description: "给 Codex 换一种心情。发现并一键导入社区主题。",
    type: "website",
    locale: "zh_CN",
    siteName: "Dream Skin Store",
    url: metadataBase,
    images: [{ url: socialImage, width: 1536, height: 1024, alt: "Dream Skin Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Skin Store — Codex 主题商店",
    description: "给 Codex 换一种心情。发现并一键导入社区主题。",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
