import { query } from "$app/server";
import type { Hayagriva } from "$lib/hayagriva";
import { readFile } from "node:fs/promises";
import YAML from "yaml";

export const entries = query(async () => {
  const raw = await readFile("/home/glebihan/internships/bib.yaml", {
    encoding: "utf8",
  });

  const entries: Hayagriva = YAML.parse(raw);

  return Object.entries(entries)
    .map(([id, entry]) => ({ id, ...entry }))
    .toReversed();
});
