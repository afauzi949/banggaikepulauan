import { promises as fs } from "node:fs";
import path from "node:path";

import { PetaTematikListSchema, type PetaTematik } from "@/lib/schemas/peta-tematik";

const PETA_TEMATIK_FILE = path.join(process.cwd(), "data", "peta-tematik", "index.json");

async function readAll(): Promise<PetaTematik[]> {
  const raw = await fs.readFile(PETA_TEMATIK_FILE, "utf8");

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid JSON in ${PETA_TEMATIK_FILE}: ${message}`);
  }

  const result = PetaTematikListSchema.safeParse(json);
  if (!result.success) {
    throw new Error(`Invalid peta-tematik index ${PETA_TEMATIK_FILE}: ${result.error.message}`);
  }

  return result.data.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export type PetaTematikListOpts = {
  featured?: boolean;
  format?: PetaTematik["format"];
  limit?: number;
};

export async function getPetaTematikList(opts: PetaTematikListOpts = {}): Promise<PetaTematik[]> {
  const { featured, format, limit } = opts;

  let items = await readAll();

  if (typeof featured === "boolean") {
    items = items.filter((item) => item.featured === featured);
  }
  if (format) {
    items = items.filter((item) => item.format === format);
  }
  if (typeof limit === "number" && limit >= 0) {
    items = items.slice(0, limit);
  }

  return items;
}
