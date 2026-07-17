# 主题投稿指南

Codex-Skin-Store 采用 GitHub 原生投稿：GitHub 身份、Pull Request、Actions 自动预检和维护者审核共同组成发布流程。合并到 `main` 后，GitHub Pages 会重新生成静态商店；整个流程不需要自有账号服务器、数据库或对象存储。

## 投稿前准备

1. 安装 Git、Node.js 22.13 或更高版本；
2. 准备主题作品以及图片、字体等全部素材的作者、来源和可再分发许可；
3. 准备一张来自真实 Codex 应用效果的 PNG 预览，不要使用与主题不一致的概念图；
4. 确定稳定的主题 ID，只能使用小写字母、数字和至少一个连字符，发布后不能改名；
5. 确定 `1.0.0` 形式的 SemVer 版本以及 Windows、macOS 支持范围。

投稿者不需要、也不应索取官方 Ed25519 私钥。审核期间网页条目使用 `package: null`；即使合并到 `main`，未签名草稿也不会出现在公开商店。审核通过后，维护者手动运行发布工作流作为批准，再使用 GitHub Secret 完成构建和签名。仓库管理员可额外为 `theme-publishing` Environment 配置 Required reviewers。

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
5. 运行 `npm run catalog:generate`，提交同步生成的 `lib/generated-themes.ts` 和 `desktop-catalog-v2.json`；
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

投稿者始终保留 `package: null`，不要自行填写 URL、大小或摘要。发布工作流会按 `theme-<主题ID>-v<版本>` 创建独立的不可变 Release；同步工作流只接受与主题 ID、版本和文件名完全匹配的包，并自动写入精确大小和 SHA-256。目录仍会拒绝 HTTP、非 GitHub Release 包、占位哈希、重复 slug、重复包 ID/版本、未知字段和超过 20 MiB 的包。

## 审核与发布

Actions 通过只代表结构和构建预检成功，不代表作品获得发布资格。维护者仍会检查预览一致性、冒充、版权、素材许可、平台兼容性和运行时效果。

审核通过后的发布顺序是：合并主题 PR；维护者运行 Codex-Skin 发布工作流；工作流从 Store 的精确提交发现待发布主题，签名并完成 Windows、macOS 双平台导入验证；Store 同步任务重新下载、校验大小和 SHA-256、再次验签、提交生成目录并部署 GitHub Pages。日常发布只需要“合并 PR + 运行发布”，不再人工传递包元数据。

签名工作流只接受维护者手动触发，避免未经批准自动使用私钥。Store 每半小时检查一次已发布包；需要立即上线时可手动运行本仓库的 **Sync verified theme releases**。两个工作流都可通过 `theme_id` 只处理一个主题。

已经发布的内容如发现安全、版权或欺诈问题，可以撤下目录条目。未来若投稿量确实需要账号、上传队列和对象存储，再单独评估服务成本和治理方案。
