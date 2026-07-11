import { promises as fs } from "node:fs";
import path from "node:path";

import { UmkmSchema, type Umkm } from "@/lib/schemas/umkm";

const UMKM_FILE = path.join(process.cwd(), "data", "umkm", "index.json");

async function readAll(): Promise<Umkm[]> {
  const raw = await fs.readFile(UMKM_FILE, "utf8");

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid JSON in ${UMKM_FILE}: ${message}`);
  }

  if (!Array.isArray(json)) {
    throw new Error(`Expected array in ${UMKM_FILE}`);
  }

  const items: Umkm[] = [];
  for (const entry of json) {
    const result = UmkmSchema.safeParse(entry);
    if (result.success) {
      items.push(result.data);
    }
  }

  return items;
}

export type UmkmListOpts = {
  category?: Umkm["category"];
  search?: string;
  location?: string;
  limit?: number;
};

export async function getUmkmList(opts: UmkmListOpts = {}): Promise<Umkm[]> {
  const { category, search, location, limit } = opts;

  let items = await readAll();

  items = items.filter((item) => item.published);

  if (category) {
    items = items.filter((item) => item.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
    );
  }
  if (location) {
    const loc = location.toLowerCase();
    items = items.filter(
      (item) =>
        item.location.village.toLowerCase().includes(loc) ||
        item.location.subdistrict.toLowerCase().includes(loc),
    );
  }
  if (typeof limit === "number" && limit >= 0) {
    items = items.slice(0, limit);
  }

  return items;
}

export async function getUmkmBySlug(slug: string): Promise<Umkm | null> {
  const items = await readAll();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getUmkmLocations(): Promise<string[]> {
  const items = await readAll();
  const locations = new Set(items.map((item) => item.location.village));
  return Array.from(locations).sort();
}

export async function getUmkmCategories(): Promise<string[]> {
  const items = await readAll();
  const categories = new Set(items.map((item) => item.category));
  return Array.from(categories).sort();
}
