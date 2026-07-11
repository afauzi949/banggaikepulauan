import { promises as fs } from "node:fs";
import path from "node:path";

import { WisataSchema, type Wisata } from "@/lib/schemas/wisata";

const WISATA_DIR = path.join(process.cwd(), "data", "wisata");

export type WisataListOpts = {
  featured?: boolean;
  category?: Wisata["category"];
  limit?: number;
  includeUnpublished?: boolean;
};

async function parseFile(file: string): Promise<Wisata> {
  const filePath = path.join(WISATA_DIR, file);
  const raw = await fs.readFile(filePath, "utf8");

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid JSON in ${filePath}: ${message}`);
  }

  const result = WisataSchema.safeParse(json);
  if (!result.success) {
    throw new Error(`Invalid wisata file ${filePath}: ${result.error.message}`);
  }

  const expectedSlug = file.replace(/\.json$/, "");
  if (result.data.slug !== expectedSlug) {
    throw new Error(
      `Slug mismatch in ${filePath}: filename "${expectedSlug}" does not match slug "${result.data.slug}"`,
    );
  }

  return result.data;
}

async function readAll(): Promise<Wisata[]> {
  const entries = await fs.readdir(WISATA_DIR);
  const files = entries.filter((name) => name.endsWith(".json") && !name.startsWith("_"));

  const items = await Promise.all(files.map(parseFile));

  return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getWisataList(opts: WisataListOpts = {}): Promise<Wisata[]> {
  const { featured, category, limit, includeUnpublished = false } = opts;

  let items = await readAll();

  if (!includeUnpublished) {
    items = items.filter((item) => item.published);
  }
  if (typeof featured === "boolean") {
    items = items.filter((item) => item.featured === featured);
  }
  if (category) {
    items = items.filter((item) => item.category === category);
  }
  if (typeof limit === "number" && limit >= 0) {
    items = items.slice(0, limit);
  }

  return items;
}

export async function getWisataBySlug(slug: string): Promise<Wisata | null> {
  const items = await readAll();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getAllWisataSlugs(): Promise<string[]> {
  const items = await readAll();
  return items.filter((item) => item.published).map((item) => item.slug);
}
