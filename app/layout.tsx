import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

function safeOrigin(requestHeaders: Headers): URL {
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const directHost = requestHeaders.get("host")?.trim();
  const hostCandidate = forwardedHost || directHost || "dreamskin.store";
  const host = /^[a-z0-9.-]+(?::[0-9]{1,5})?$/i.test(hostCandidate)
    ? hostCandidate
    : "dreamskin.store";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
    ? forwardedProtocol
    : host.startsWith("localhost")
      ? "http"
      : "https";

  return new URL(`${protocol}://${host}`);
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = safeOrigin(await headers());
  const socialImage = new URL("/og.png", origin).href;

  return {
    metadataBase: origin,
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
      url: origin,
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Dream Skin Store" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dream Skin Store — Codex 主题商店",
      description: "给 Codex 换一种心情。发现并一键导入社区主题。",
      images: [socialImage],
    },
  };
}

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
