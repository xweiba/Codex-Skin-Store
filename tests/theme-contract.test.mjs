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
