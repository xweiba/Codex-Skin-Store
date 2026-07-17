# Desktop theme repository v1

Codex-Skin-Store publishes two separate, declarative catalogs from the same reviewed repository:

- `catalog/themes/*.json` is the web storefront catalog. It points to immutable, signed `.dreamskin` packages and powers the GitHub Pages experience.
- `theme-repository.json` plus `themes/`, `previews/`, `backgrounds/`, `logos/`, and optional `pets/` is the desktop catalog. Codex-Skin downloads it from the fixed official repository and applies themes without replacing project, task, conversation, or account data.

The desktop client may select a transport mirror, but it cannot redirect synchronization to a different repository. Every update is downloaded into a temporary directory, validated completely, and atomically swapped into the local cache. A failed update leaves the previous cache untouched.

## Layout

```text
theme-repository.json
schemas/theme-repository-v1.schema.json
schemas/theme-v1.schema.json
themes/<theme-id>.json
previews/<asset>.png
backgrounds/<asset>.jpg
logos/<asset>.png
pets/<optional-asset>.png
```

The v1 schemas are closed: unknown fields are rejected. Theme IDs, filenames, index entries, asset directories, image extensions, and actual image signatures must agree. JavaScript, CSS, HTML, SVG, executable files, remote runtime assets, path traversal, symbolic links, and unindexed manifests are not allowed.

The web package protocol and desktop repository protocol do not silently convert into one another. A reviewed theme can be published to either or both catalogs, but each representation must pass its own schema and CI checks.
