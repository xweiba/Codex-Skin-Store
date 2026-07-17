import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const index = await readJson("theme-repository.json");
exactKeys(index, ["$schema", "schemaVersion", "name", "updatedAt", "themes"], "theme-repository.json");
assert.equal(index.schemaVersion, 1, "desktop catalog schemaVersion must be 1");
assert.match(index.updatedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, "updatedAt must be UTC");
assert.ok(Array.isArray(index.themes) && index.themes.length > 0 && index.themes.length <= 500, "themes must contain 1-500 entries");

await Promise.all([
  stat(join(root, "schemas", "theme-repository-v1.schema.json")),
  stat(join(root, "schemas", "theme-v1.schema.json")),
]);

const indexed = new Set();
for (const entry of index.themes) {
  exactKeys(entry, ["id", "manifest"], `catalog entry ${entry?.id ?? "unknown"}`);
  assert.match(entry.id, /^[a-z0-9][a-z0-9-]{1,63}$/, `invalid theme id: ${entry.id}`);
  assert.equal(entry.manifest, `themes/${entry.id}.json`, `manifest must match theme id: ${entry.id}`);
  assert.ok(!indexed.has(entry.id), `duplicate theme id: ${entry.id}`);
  indexed.add(entry.id);

  const theme = await readJson(entry.manifest);
  assert.equal(theme.schemaVersion, 1, `${entry.id}: schemaVersion must be 1`);
  assert.equal(theme.codeThemeId, entry.id, `${entry.id}: codeThemeId mismatch`);
  const assets = [
    [theme.previewImage, "previews"],
    [theme.theme?.backgroundImage, "backgrounds"],
    [theme.theme?.logoImage, "logos"],
    [theme.home?.pet?.image, "pets"],
  ];
  for (const [asset, directory] of assets) {
    if (!asset) continue;
    assert.match(asset, new RegExp(`^\\.\\./${directory}/[A-Za-z0-9._-]+\\.(?:png|jpe?g|webp|avif)$`), `${entry.id}: unsafe ${directory} path`);
    await validateImage(join(root, "themes", asset), entry.id);
  }
}

const actual = new Set((await readdir(join(root, "themes"), { withFileTypes: true }))
  .filter(entry => entry.isFile() && entry.name.endsWith(".json"))
  .map(entry => entry.name.slice(0, -5)));
assert.deepEqual([...actual].sort(), [...indexed].sort(), "theme index must exactly match themes directory");
console.log(`Desktop catalog valid: ${indexed.size} themes.`);

async function readJson(path) {
  return JSON.parse(await readFile(join(root, path), "utf8"));
}

function exactKeys(value, expected, label) {
  assert.ok(value && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  assert.deepEqual(Object.keys(value).sort(), [...expected].sort(), `${label} contains missing or unknown fields`);
}

async function validateImage(path, themeId) {
  const absolute = resolve(path);
  assert.ok(absolute.startsWith(`${root}${sep}`), `${themeId}: asset escapes repository`);
  const bytes = await readFile(absolute);
  const extension = extname(absolute).toLowerCase();
  const valid = extension === ".png"
    ? bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))
    : extension === ".jpg" || extension === ".jpeg"
      ? bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
      : extension === ".webp"
        ? bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP"
        : extension === ".avif"
          ? bytes.subarray(4, 8).toString() === "ftyp" && ["avif", "avis"].some(brand => bytes.includes(Buffer.from(brand)))
          : false;
  assert.ok(valid, `${themeId}: image signature does not match ${relative(root, absolute)}`);
}
