import type { Metadata } from "next";
import { Storefront } from "@/components/storefront";

export const metadata: Metadata = {
  title: "发现主题",
  description: "浏览、安全预览并一键导入 Codex Dream Skin 社区主题。",
};

export default function Home() {
  return <Storefront />;
}
