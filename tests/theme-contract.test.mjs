import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const schemaUrl = new URL("../spec/theme-package.schema.json", import.meta.url);

test("theme package schema stays declarative and closed", async () => {
  const schema = JSON.parse(await readFile(schemaUrl, "utf8"));

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(schema.additionalProperties, false);
  assert.ok(schema.required.includes("signature"));
  assert.ok(schema.required.includes("assets"));

  const source = JSON.stringify(schema);
  assert.doesNotMatch(source, /javascript|text\/css|image\/svg\+xml/i);
  assert.match(source, /image\/png/);
  assert.match(source, /image\/webp/);
  assert.match(source, /Ed25519/);
});

test("storefront catalogs and enables the published signed sample", async () => {
  const [storefront, themes, links] = await Promise.all([
    readFile(new URL("../components/storefront.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/themes.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/dreamskin-link.ts", import.meta.url), "utf8"),
  ]);

  assert.match(storefront, /一键导入/);
  assert.match(storefront, /手动下载/);
  assert.doesNotMatch(storefront, /PROTOCOL_PREVIEW_SHA256|dreamskin\.store\/packages/);
  assert.match(themes, /releases\/download\/sample-v1\/codex-skin-sample-1\.0\.0\.dreamskin/);
  assert.match(themes, /7a75fff8086fe6949ef9e37e82c161a8e015a1e00e02181938cd479e9ae41387/);
  assert.match(themes, /size: 2041227/);
  assert.match(themes, /published: true/);
  assert.match(storefront, /theme\.package\?\.published/);
  assert.match(links, /URLSearchParams/);
  assert.match(links, /dreamskin:\/\/install/);
});

test("GitHub Pages build is static and uses the repository base path", async () => {
  const [layout, config, packageJson, workflow] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(layout, /next\/headers|await headers/);
  assert.match(config, /output:\s*"export"/);
  assert.match(config, /Codex-Skin-Store/);
  assert.match(packageJson, /build:pages/);
  assert.match(workflow, /deploy-pages@v5/);
});
