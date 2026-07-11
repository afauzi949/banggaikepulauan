import fs from "node:fs";
import path from "node:path";

import { KegiatanSchema, type Kegiatan } from "@/lib/schemas/kegiatan";

const DATA_DIR = path.join(process.cwd(), "data", "kegiatan");

function readJsonFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getAllKegiatan(): Kegiatan[] {
  if (!fs.existsSync(DATA_DIR)) return [];

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const items: Kegiatan[] = [];

  for (const file of files) {
    const raw = readJsonFile(path.join(DATA_DIR, file));
    const result = KegiatanSchema.safeParse(raw);
    if (result.success && result.data.published) {
      items.push(result.data);
    }
  }

  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getKegiatanBySlug(slug: string): Kegiatan | null {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = readJsonFile(filePath);
  const result = KegiatanSchema.safeParse(raw);
  return result.success ? result.data : null;
}

export function getAllKegiatanTags(items: Kegiatan[]): string[] {
  const set = new Set(items.flatMap((k) => k.tags ?? []));
  return Array.from(set).sort();
}
