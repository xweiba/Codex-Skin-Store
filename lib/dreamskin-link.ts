import type { ThemePackage } from "@/lib/themes";

export function createDreamSkinInstallLink(packageInfo: ThemePackage): string {
  const parameters = new URLSearchParams({
    url: packageInfo.url,
    sha256: packageInfo.sha256,
    size: String(packageInfo.size),
    id: packageInfo.id,
    version: packageInfo.version,
  });
  return `dreamskin://install?${parameters.toString()}`;
}
