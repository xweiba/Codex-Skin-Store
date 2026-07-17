# Codex-Skin-Store

[简体中文](README.md) | [English](README.en.md)

Codex-Skin-Store is the public theme catalog for Codex-Skin. Browse themes on the web, download them manually, or send a signed theme to the Windows or macOS client with one click.

- Storefront: <https://lixiaobaivv.github.io/Codex-Skin-Store/>
- Client downloads: <https://github.com/lixiaobaivv/Codex-Skin/releases/latest>
- Client guide: <https://github.com/lixiaobaivv/Codex-Skin/blob/main/README.en.md>

> This is a community project, not an OpenAI or official Codex product. The website cannot read Codex credentials, API keys, projects, tasks, or conversations.

## Get Started

1. Install the Codex-Skin client for your system.
2. Open Codex-Skin once so the operating system registers its import handler.
3. Visit the storefront and select a theme.
4. Choose one-click import.
5. Review the source, version, and exact size in the client.
6. After verification, decide whether to restart Codex and apply the theme.

Use `Codex-Skin-Setup-win-x64.exe` on Windows. On macOS, use `Codex-Skin-osx-arm64.pkg` for Apple Silicon or `Codex-Skin-osx-x64.pkg` for Intel. The current packages are unsigned and not notarized, so Windows SmartScreen or macOS Gatekeeper may ask for explicit approval.

## One-Click Import

Windows Setup registers `dreamskin://` and `.dreamskin` automatically. Portable Windows users can register them with:

```powershell
.\Codex-Skin-win-x64.exe protocol register
```

The macOS PKG declares the same URL scheme and document type. Open `Codex-Skin.app` once after installation so LaunchServices can finish registration.

The web page only starts a request. The client asks before downloading, verifies the exact size, SHA-256, Ed25519 signature, closed manifest, platform support, and image files, installs atomically, then asks separately before applying. A click can never silently install or activate a theme.

## Faster GitHub Downloads

If GitHub Releases are slow, prepend a mirror to the original address:

```text
https://github.com/lixiaobaivv/Codex-Skin/releases/latest/download/Codex-Skin-Setup-win-x64.exe
https://ghfast.top/https://github.com/lixiaobaivv/Codex-Skin/releases/latest/download/Codex-Skin-Setup-win-x64.exe
https://gh-proxy.com/https://github.com/lixiaobaivv/Codex-Skin/releases/latest/download/Codex-Skin-Setup-win-x64.exe
```

Mirrors are third-party services and may be unavailable or return stale content. Verify downloads against `Codex-Skin-win-x64-SHA256SUMS.txt` or `Codex-Skin-installers-SHA256SUMS.txt` from the same Release.

## What Themes Can Change

Themes may change backgrounds, fixed sidebar styling, the masthead, logo, home guidance, four prompt cards, message bubbles, composer styling, and an optional pet image.

Themes cannot replace user projects, tasks, progress, conversations, account data, or Codex behavior. Prompt cards only insert their configured text into the real Codex composer.

## Troubleshooting

**One-click import does nothing:** open Codex-Skin once; repair Windows Setup registration or run `protocol register` for the portable client; on macOS, confirm that you installed the latest PKG.

**Signature or hash validation fails:** do not continue. Download the theme again from the store and report the theme name, version, and client error code if it still fails.

**An imported theme was not applied:** installation and application are intentionally separate confirmations. Select the verified theme in Codex-Skin and choose **Apply and restart Codex**.

## Privacy And Safety

- The storefront is static GitHub Pages and requires no account.
- It does not probe the local client or connect to local CDP.
- Theme packages cannot contain JavaScript, HTML, CSS, SVG, shell scripts, executables, symlinks, or undeclared files.
- The desktop client is the final verification and consent boundary.

Theme authors can use the [submission guide](docs/theme-submission.md). Storefront and catalog issues belong in [Codex-Skin-Store Issues](https://github.com/lixiaobaivv/Codex-Skin-Store/issues). Build and contribution details remain in [CONTRIBUTING.md](CONTRIBUTING.md); normal users do not need Node.js or a source checkout.
