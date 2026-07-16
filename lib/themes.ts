export const THEME_CATEGORY_VALUES = [
  "gradient",
  "nature",
  "minimal",
  "dark",
  "editorial",
] as const;

export type ThemeCategory = (typeof THEME_CATEGORY_VALUES)[number];

export const THEME_PLATFORM_VALUES = ["macos", "windows"] as const;

export type ThemePlatform = (typeof THEME_PLATFORM_VALUES)[number];

export const THEME_COLOR_VALUES = [
  "blue",
  "violet",
  "green",
  "teal",
  "rose",
  "orange",
  "neutral",
  "black",
] as const;

export type ThemeColor = (typeof THEME_COLOR_VALUES)[number];

export type ThemeSort = "featured" | "popular" | "newest" | "rating";

export interface ThemeAuthor {
  readonly name: string;
  readonly handle: string;
  readonly verified: boolean;
}

export interface ThemeStats {
  readonly downloads: number;
  readonly rating: number;
  readonly reviews: number;
}

export interface ThemeLicense {
  readonly name: string;
  readonly spdx: "CC0-1.0";
  readonly source: "original-procedural-artwork";
}

export interface ThemePreviewStyle {
  readonly backgroundColor: string;
  readonly backgroundImage: string;
  readonly panelColor: string;
  readonly panelBorder: string;
  readonly textColor: string;
  readonly mutedTextColor: string;
  readonly accentColor: string;
  readonly accentSoft: string;
  readonly codeColor: string;
  readonly shadow: string;
  readonly pattern: "aurora" | "grid" | "paper" | "horizon" | "mist" | "orb" | "stars" | "embers";
}

export interface Theme {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly author: ThemeAuthor;
  readonly category: ThemeCategory;
  readonly platforms: readonly ThemePlatform[];
  readonly colors: readonly ThemeColor[];
  readonly tags: readonly string[];
  readonly stats: ThemeStats;
  readonly featured: boolean;
  readonly isNew: boolean;
  readonly version: string;
  readonly engineRange: string;
  readonly packageUrl: string;
  readonly publishedAt: string;
  readonly license: ThemeLicense;
  readonly previewStyle: ThemePreviewStyle;
}

export interface ThemeFilterOptions {
  readonly query?: string;
  readonly category?: ThemeCategory | "all";
  readonly platform?: ThemePlatform | "all";
  readonly color?: ThemeColor | "all";
  readonly featuredOnly?: boolean;
  readonly sort?: ThemeSort;
}

interface FilterOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

interface CategoryOption extends FilterOption<ThemeCategory | "all"> {
  readonly description: string;
}

export const THEME_CATEGORIES = [
  { value: "all", label: "全部", description: "浏览商店中的全部主题" },
  { value: "gradient", label: "渐变光影", description: "柔和渐变与抽象光线" },
  { value: "nature", label: "自然景观", description: "海岸、森林与大气景观" },
  { value: "minimal", label: "简约留白", description: "安静、克制的工作空间" },
  { value: "dark", label: "深色沉浸", description: "为夜间创作设计的低亮界面" },
  { value: "editorial", label: "纸张质感", description: "出版物与手工纸张风格" },
] as const satisfies readonly CategoryOption[];

export const PLATFORM_OPTIONS = [
  { value: "all", label: "全部平台" },
  { value: "macos", label: "macOS" },
  { value: "windows", label: "Windows" },
] as const satisfies readonly FilterOption<ThemePlatform | "all">[];

export const COLOR_OPTIONS = [
  { value: "all", label: "全部颜色", swatch: "linear-gradient(135deg, #8b5cf6, #38bdf8, #34d399)" },
  { value: "blue", label: "蓝色", swatch: "#3b82f6" },
  { value: "violet", label: "紫色", swatch: "#8b5cf6" },
  { value: "green", label: "绿色", swatch: "#4d7c5b" },
  { value: "teal", label: "青色", swatch: "#0d9488" },
  { value: "rose", label: "玫瑰", swatch: "#e8798f" },
  { value: "orange", label: "橙色", swatch: "#f97316" },
  { value: "neutral", label: "中性色", swatch: "#a8a29e" },
  { value: "black", label: "黑色", swatch: "#171717" },
] as const satisfies readonly (FilterOption<ThemeColor | "all"> & { readonly swatch: string })[];

export const SORT_OPTIONS = [
  { value: "featured", label: "精选推荐" },
  { value: "popular", label: "下载最多" },
  { value: "newest", label: "最新发布" },
  { value: "rating", label: "评分最高" },
] as const satisfies readonly FilterOption<ThemeSort>[];

const SAMPLE_LICENSE: ThemeLicense = {
  name: "CC0 1.0 Universal",
  spdx: "CC0-1.0",
  source: "original-procedural-artwork",
};

export const THEMES = [
  {
    slug: "aurora-drift",
    name: "极光漫游",
    summary: "蓝紫极光缓缓掠过深夜，为长时间创作保留恰到好处的层次。",
    author: { name: "Northlight Studio", handle: "northlight", verified: true },
    category: "gradient",
    platforms: ["macos", "windows"],
    colors: ["violet", "blue", "black"],
    tags: ["极光", "冷色", "夜间", "渐变"],
    stats: { downloads: 28430, rating: 4.9, reviews: 816 },
    featured: true,
    isNew: false,
    version: "1.3.0",
    engineRange: ">=1.1.0 <2.0.0",
    packageUrl: "/packages/aurora-drift-1.3.0.dreamskin",
    publishedAt: "2026-04-18T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#080b18",
      backgroundImage: "radial-gradient(circle at 72% 18%, rgba(110, 231, 255, .5), transparent 32%), radial-gradient(circle at 30% 8%, rgba(167, 139, 250, .58), transparent 38%), linear-gradient(145deg, #17112f 0%, #081426 48%, #071015 100%)",
      panelColor: "rgba(11, 17, 33, .78)",
      panelBorder: "rgba(172, 205, 255, .16)",
      textColor: "#f4f7ff",
      mutedTextColor: "#9aa9c6",
      accentColor: "#8be8ff",
      accentSoft: "rgba(139, 232, 255, .16)",
      codeColor: "#c4b5fd",
      shadow: "0 28px 80px rgba(3, 7, 20, .48)",
      pattern: "aurora",
    },
  },
  {
    slug: "midnight-grid",
    name: "午夜网格",
    summary: "精密网格与克制的电光蓝，适合偏爱结构感的深色工作台。",
    author: { name: "Plain Systems", handle: "plainsystems", verified: true },
    category: "dark",
    platforms: ["macos", "windows"],
    colors: ["black", "blue"],
    tags: ["网格", "深色", "蓝黑", "技术感"],
    stats: { downloads: 19680, rating: 4.8, reviews: 504 },
    featured: true,
    isNew: false,
    version: "1.1.2",
    engineRange: ">=1.0.0 <2.0.0",
    packageUrl: "/packages/midnight-grid-1.1.2.dreamskin",
    publishedAt: "2026-03-02T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#080a0f",
      backgroundImage: "linear-gradient(rgba(72, 113, 170, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(72, 113, 170, .1) 1px, transparent 1px), radial-gradient(circle at 78% 12%, rgba(50, 126, 255, .2), transparent 35%)",
      panelColor: "rgba(13, 17, 24, .92)",
      panelBorder: "rgba(100, 142, 204, .2)",
      textColor: "#eef4ff",
      mutedTextColor: "#8491a5",
      accentColor: "#65a5ff",
      accentSoft: "rgba(101, 165, 255, .14)",
      codeColor: "#8cc8ff",
      shadow: "0 26px 70px rgba(0, 0, 0, .5)",
      pattern: "grid",
    },
  },
  {
    slug: "linen-light",
    name: "亚麻晨光",
    summary: "温柔米白与细腻纸纤维质感，让界面像一本摊开的轻盈笔记。",
    author: { name: "Quiet Form", handle: "quietform", verified: true },
    category: "minimal",
    platforms: ["macos"],
    colors: ["neutral", "orange"],
    tags: ["浅色", "米白", "极简", "纸张"],
    stats: { downloads: 14720, rating: 4.7, reviews: 391 },
    featured: false,
    isNew: false,
    version: "1.0.6",
    engineRange: ">=1.1.0 <2.0.0",
    packageUrl: "/packages/linen-light-1.0.6.dreamskin",
    publishedAt: "2026-02-11T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#eee8dc",
      backgroundImage: "radial-gradient(circle at 18% 0%, rgba(255, 255, 255, .88), transparent 38%), repeating-linear-gradient(96deg, rgba(107, 91, 65, .025) 0 1px, transparent 1px 6px)",
      panelColor: "rgba(255, 253, 248, .84)",
      panelBorder: "rgba(95, 76, 51, .13)",
      textColor: "#332e27",
      mutedTextColor: "#817666",
      accentColor: "#a55e2f",
      accentSoft: "rgba(165, 94, 47, .11)",
      codeColor: "#7c4a2e",
      shadow: "0 24px 60px rgba(79, 63, 38, .16)",
      pattern: "paper",
    },
  },
  {
    slug: "ocean-glass",
    name: "海面玻璃",
    summary: "清透海岸色调叠加磨砂玻璃面板，明亮但不刺眼。",
    author: { name: "Tidal Workshop", handle: "tidalworkshop", verified: false },
    category: "nature",
    platforms: ["macos", "windows"],
    colors: ["teal", "blue", "neutral"],
    tags: ["海洋", "玻璃", "青蓝", "明亮"],
    stats: { downloads: 11390, rating: 4.8, reviews: 284 },
    featured: true,
    isNew: false,
    version: "1.2.1",
    engineRange: ">=1.1.0 <2.0.0",
    packageUrl: "/packages/ocean-glass-1.2.1.dreamskin",
    publishedAt: "2026-05-06T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#9ed7dc",
      backgroundImage: "linear-gradient(175deg, rgba(235, 249, 246, .9) 0 30%, rgba(91, 187, 197, .58) 31% 55%, rgba(21, 92, 121, .82) 80% 100%), radial-gradient(circle at 75% 28%, rgba(255, 255, 255, .7), transparent 18%)",
      panelColor: "rgba(237, 251, 250, .68)",
      panelBorder: "rgba(255, 255, 255, .46)",
      textColor: "#163b45",
      mutedTextColor: "#47727a",
      accentColor: "#087f8c",
      accentSoft: "rgba(8, 127, 140, .12)",
      codeColor: "#075f72",
      shadow: "0 28px 70px rgba(19, 80, 94, .22)",
      pattern: "horizon",
    },
  },
  {
    slug: "moss-and-mist",
    name: "苔色山雾",
    summary: "层叠苔绿与清晨薄雾，营造沉静、有呼吸感的专注空间。",
    author: { name: "Field Notes Lab", handle: "fieldnotes", verified: true },
    category: "nature",
    platforms: ["macos", "windows"],
    colors: ["green", "neutral", "black"],
    tags: ["森林", "雾", "绿色", "沉静"],
    stats: { downloads: 8720, rating: 4.9, reviews: 219 },
    featured: false,
    isNew: true,
    version: "1.0.1",
    engineRange: ">=1.2.0 <2.0.0",
    packageUrl: "/packages/moss-and-mist-1.0.1.dreamskin",
    publishedAt: "2026-07-03T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#17221d",
      backgroundImage: "radial-gradient(ellipse at 28% 20%, rgba(207, 222, 202, .34), transparent 35%), linear-gradient(155deg, rgba(75, 101, 76, .9), rgba(25, 40, 32, .94) 48%, #101714 100%)",
      panelColor: "rgba(20, 31, 25, .76)",
      panelBorder: "rgba(183, 210, 182, .15)",
      textColor: "#eef4eb",
      mutedTextColor: "#9dad9e",
      accentColor: "#a9cf9b",
      accentSoft: "rgba(169, 207, 155, .14)",
      codeColor: "#c3dda7",
      shadow: "0 28px 72px rgba(7, 14, 10, .42)",
      pattern: "mist",
    },
  },
  {
    slug: "solar-bloom",
    name: "日光绽放",
    summary: "珊瑚橙与玫瑰粉相遇，给工作区注入温暖又现代的能量。",
    author: { name: "Chromatic Dept.", handle: "chromaticdept", verified: false },
    category: "gradient",
    platforms: ["windows"],
    colors: ["orange", "rose", "violet"],
    tags: ["暖色", "日落", "活力", "渐变"],
    stats: { downloads: 6940, rating: 4.6, reviews: 168 },
    featured: false,
    isNew: true,
    version: "1.0.0",
    engineRange: ">=1.2.0 <2.0.0",
    packageUrl: "/packages/solar-bloom-1.0.0.dreamskin",
    publishedAt: "2026-06-27T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#7f284d",
      backgroundImage: "radial-gradient(circle at 70% 22%, rgba(255, 222, 130, .88), transparent 24%), radial-gradient(circle at 30% 72%, rgba(238, 103, 139, .72), transparent 40%), linear-gradient(145deg, #4d2b82, #bc3f6b 48%, #ee8c52)",
      panelColor: "rgba(72, 27, 64, .7)",
      panelBorder: "rgba(255, 229, 207, .23)",
      textColor: "#fff8f4",
      mutedTextColor: "#f2c6c3",
      accentColor: "#ffd68d",
      accentSoft: "rgba(255, 214, 141, .17)",
      codeColor: "#ffc6a5",
      shadow: "0 28px 80px rgba(65, 17, 50, .38)",
      pattern: "orb",
    },
  },
  {
    slug: "paper-observatory",
    name: "纸上天文台",
    summary: "深蓝墨色与细小星图铺在暖灰纸面上，像一本安静的观测手册。",
    author: { name: "Margin Press", handle: "marginpress", verified: true },
    category: "editorial",
    platforms: ["macos"],
    colors: ["neutral", "blue", "black"],
    tags: ["星图", "纸张", "编辑风", "复古"],
    stats: { downloads: 5230, rating: 4.8, reviews: 127 },
    featured: true,
    isNew: true,
    version: "1.0.2",
    engineRange: ">=1.2.0 <2.0.0",
    packageUrl: "/packages/paper-observatory-1.0.2.dreamskin",
    publishedAt: "2026-07-08T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#c9c2b3",
      backgroundImage: "radial-gradient(circle at 13% 19%, rgba(30, 46, 69, .55) 0 1px, transparent 2px), radial-gradient(circle at 72% 28%, rgba(30, 46, 69, .42) 0 1px, transparent 2px), repeating-linear-gradient(0deg, rgba(56, 48, 38, .025) 0 1px, transparent 1px 5px)",
      panelColor: "rgba(240, 236, 226, .86)",
      panelBorder: "rgba(37, 49, 67, .18)",
      textColor: "#202c3d",
      mutedTextColor: "#697080",
      accentColor: "#284d7a",
      accentSoft: "rgba(40, 77, 122, .12)",
      codeColor: "#513f64",
      shadow: "0 24px 64px rgba(49, 45, 39, .2)",
      pattern: "stars",
    },
  },
  {
    slug: "ember-terminal",
    name: "余烬终端",
    summary: "炭黑背景中留下一点琥珀余温，为终端爱好者打造的低干扰主题。",
    author: { name: "Afterdark Tools", handle: "afterdark", verified: false },
    category: "dark",
    platforms: ["macos", "windows"],
    colors: ["black", "orange"],
    tags: ["终端", "炭黑", "琥珀", "夜间"],
    stats: { downloads: 3670, rating: 4.7, reviews: 96 },
    featured: false,
    isNew: true,
    version: "1.0.0",
    engineRange: ">=1.2.0 <2.0.0",
    packageUrl: "/packages/ember-terminal-1.0.0.dreamskin",
    publishedAt: "2026-07-12T08:00:00.000Z",
    license: SAMPLE_LICENSE,
    previewStyle: {
      backgroundColor: "#0f0d0c",
      backgroundImage: "radial-gradient(circle at 77% 8%, rgba(239, 133, 55, .23), transparent 30%), linear-gradient(145deg, #171311, #0b0a09 64%)",
      panelColor: "rgba(20, 17, 15, .92)",
      panelBorder: "rgba(231, 159, 87, .17)",
      textColor: "#f4eee7",
      mutedTextColor: "#a69a8f",
      accentColor: "#e9a35b",
      accentSoft: "rgba(233, 163, 91, .13)",
      codeColor: "#f1bd76",
      shadow: "0 28px 74px rgba(0, 0, 0, .48)",
      pattern: "embers",
    },
  },
] as const satisfies readonly Theme[];

function normalizeSearchValue(value: string): string {
  return value.trim().toLocaleLowerCase("zh-CN");
}

function matchesSearch(theme: Theme, query: string): boolean {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchable = [
    theme.name,
    theme.summary,
    theme.author.name,
    theme.author.handle,
    ...theme.tags,
  ];

  return searchable.some((value) => normalizeSearchValue(value).includes(normalizedQuery));
}

function compareThemes(left: Theme, right: Theme, sort: ThemeSort): number {
  if (sort === "popular") {
    return right.stats.downloads - left.stats.downloads;
  }

  if (sort === "newest") {
    return Date.parse(right.publishedAt) - Date.parse(left.publishedAt);
  }

  if (sort === "rating") {
    return right.stats.rating - left.stats.rating || right.stats.reviews - left.stats.reviews;
  }

  return Number(right.featured) - Number(left.featured)
    || Number(right.isNew) - Number(left.isNew)
    || right.stats.downloads - left.stats.downloads;
}

export function filterThemes(
  themes: readonly Theme[] = THEMES,
  options: ThemeFilterOptions = {},
): Theme[] {
  const {
    query = "",
    category = "all",
    platform = "all",
    color = "all",
    featuredOnly = false,
    sort = "featured",
  } = options;

  return themes
    .filter((theme) => matchesSearch(theme, query))
    .filter((theme) => category === "all" || theme.category === category)
    .filter((theme) => platform === "all" || theme.platforms.includes(platform))
    .filter((theme) => color === "all" || theme.colors.includes(color))
    .filter((theme) => !featuredOnly || theme.featured)
    .sort((left, right) => compareThemes(left, right, sort));
}

export function getThemeBySlug(slug: string): Theme | undefined {
  return THEMES.find((theme) => theme.slug === slug);
}

export function getThemeCategoryLabel(category: ThemeCategory): string {
  return THEME_CATEGORIES.find((option) => option.value === category)?.label ?? category;
}

export function getPlatformLabel(platform: ThemePlatform): string {
  return PLATFORM_OPTIONS.find((option) => option.value === platform)?.label ?? platform;
}

export function formatDownloads(downloads: number, locale = "zh-CN"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: downloads >= 10_000 ? 1 : 0,
  }).format(downloads);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getCategoryCount(
  category: ThemeCategory | "all",
  themes: readonly Theme[] = THEMES,
): number {
  return category === "all"
    ? themes.length
    : themes.filter((theme) => theme.category === category).length;
}
