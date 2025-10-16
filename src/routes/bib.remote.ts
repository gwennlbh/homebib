import { query } from "$app/server";
import { type as t } from "arktype";
import type { Hayagriva } from "$lib/hayagriva";
import { readFile } from "node:fs/promises";
import YAML from "yaml";

export const entries = query(t.string, async (filepath) => {
  const raw = await readFile(filepath, {
    encoding: "utf8",
  });

  const entries: Hayagriva = YAML.parse(raw);

  return Object.entries(entries)
    .map(([id, entry]) => ({ id, ...entry }))
    .toReversed();
});
