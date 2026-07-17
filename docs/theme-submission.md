# 主题投稿指南

Codex-Skin-Store 采用 GitHub 原生投稿：GitHub 身份、Pull Request、Actions 自动预检和维护者审核共同组成发布流程。合并到 `main` 后，GitHub Pages 会重新生成静态商店；整个流程不需要自有账号服务器、数据库或对象存储。

## 投稿前准备

1. 安装 Git、Node.js 22.13 或更高版本；
2. 准备主题作品以及图片、字体等全部素材的作者、来源和可再分发许可；
3. 准备一张来自真实 Codex 应用效果的 PNG 预览，不要使用与主题不一致的概念图；
4. 确定稳定的主题 ID，只能使用小写字母、数字和连字符，发布后不能改名；
5. 确定 `1.0.0` 形式的 SemVer 版本以及 Windows、macOS 支持范围。

投稿者不需要、也不应索取官方 Ed25519 私钥。审核通过后由维护者使用受保护的 GitHub Secret 构建和签名 `.dreamskin`。审核期间网页条目使用 `package: null`，不会显示一键导入或下载入口。

## 制作桌面主题

1. 复制 `themes/dilraba-star.json` 为 `themes/<主题ID>.json`；
2. 保持 `schemaVersion: 1`，让 `codeThemeId` 与文件名完全相同，并填写作者、分类、版本和浅色/深色模式；
3. 设置背景、强调色、文字色、面板色、首页品牌文案、输入框提示和恰好四张快捷操作卡；
4. 如需宠物，填写 `home.pet.image`、替代文本和 48-220 的显示尺寸；
5. 将素材放到固定目录，并只用安全的相对路径引用。

目录对应关系：

| 内容 | 仓库目录 | 清单路径示例 |
| --- | --- | --- |
| 客户端预览 | `previews/` | `../previews/my-theme.png` |
| 主背景 | `backgrounds/` | `../backgrounds/my-theme.jpg` |
| Logo | `logos/` | `../logos/my-theme.png` |
| 可选宠物 | `pets/` | `../pets/my-theme.png` |

图片只接受 PNG、JPEG、WebP 或 AVIF，扩展名必须与真实文件格式一致。主题不能修改用户项目、任务、进度、对话内容或账号数据，也不能包含 JavaScript、HTML、CSS、SVG、Shell、PowerShell、可执行文件、符号链接或隐藏的额外文件。

## 提交目录 PR

1. Fork 本仓库并新建分支；
2. 在 `theme-repository.json` 的 `themes` 数组登记 `themes/<主题ID>.json`，同时更新 UTC `updatedAt`；
3. 复制一个 `catalog/themes/*.json` 为 `catalog/themes/<主题ID>.json`，让 `slug` 与主题 ID 相同并先设置 `package: null`；
4. 将与客户端预览相同的 PNG 复制到 `public/theme-previews/<主题ID>.png`，并设置网页条目的 `previewImage`；
5. 运行 `npm run catalog:generate`，提交同步生成的 `lib/generated-themes.ts`；
6. 运行下列完整检查；
7. 创建 Pull Request，并完整填写投稿清单、真实截图、测试平台和素材许可。

```bash
npm ci
npm run catalog:generate
npm run catalog:check
npm run lint
npm test
npm run build:pages
```

审核通过后，维护者构建官方包并把 `package: null` 替换为完整发布信息：

```json
{
  "published": true,
  "id": "author.theme-id",
  "version": "1.0.0",
  "url": "https://github.com/author/theme/releases/download/v1.0.0/theme-1.0.0.dreamskin",
  "sha256": "<64 位小写十六进制摘要>",
  "size": 1234567
}
```

目录拒绝可变下载地址、HTTP、非 GitHub Release 包、占位哈希、重复 slug、重复包 ID/版本、未知字段和超出 20 MiB 的包。CI 不会执行主题中的任何内容，也不会把主题代理到商店服务器。投稿者不要自行填写虚假的 URL、大小或摘要。

## 审核与发布

Actions 通过只代表结构和构建预检成功，不代表作品获得发布资格。维护者仍会检查预览一致性、冒充、版权、素材许可、平台兼容性和运行时效果。

审核通过后的发布顺序是：维护者同步已审核源文件，构建并用官方密钥签名 `.dreamskin`，在不可变 GitHub Release 发布包，写回精确大小和 SHA-256，最后更新网页与桌面两套目录。合并发布提交后，GitHub Pages 自动部署，Codex-Skin 客户端也会从 `main` 获取新目录。主题随后可在网页和 Windows/macOS 客户端中检索、预览、一键导入或下载。

已经发布的内容如发现安全、版权或欺诈问题，可以撤下目录条目。未来若投稿量确实需要账号、上传队列和对象存储，再单独评估服务成本和治理方案。
