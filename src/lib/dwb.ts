import fs from "node:fs";
import path from "node:path";

import { DwbSchema, type Dwb } from "@/lib/schemas/dwb";

const DATA_DIR = path.join(process.cwd(), "data", "dwb");

function readJsonFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getAllDwb(): Dwb[] {
  if (!fs.existsSync(DATA_DIR)) return [];

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const items: Dwb[] = [];

  for (const file of files) {
    const raw = readJsonFile(path.join(DATA_DIR, file));
    const result = DwbSchema.safeParse(raw);
    if (result.success && result.data.published) {
      items.push(result.data);
    }
  }

  return items.sort((a, b) => a.order - b.order);
}

export function getDwbBySlug(slug: string): Dwb | null {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = readJsonFile(filePath);
  const result = DwbSchema.safeParse(raw);
  return result.success ? result.data : null;
}
