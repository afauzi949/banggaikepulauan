import { promises as fs } from "node:fs";
import path from "node:path";

import { TransportListSchema, type Transport } from "@/lib/schemas/transport";

const TRANSPORT_FILE = path.join(process.cwd(), "data", "transport.json");

async function readAll(): Promise<Transport[]> {
  const raw = await fs.readFile(TRANSPORT_FILE, "utf8");

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid JSON in ${TRANSPORT_FILE}: ${message}`);
  }

  const result = TransportListSchema.safeParse(json);
  if (!result.success) {
    throw new Error(`Invalid transport list ${TRANSPORT_FILE}: ${result.error.message}`);
  }

  return result.data;
}

export type TransportListOpts = {
  type?: Transport["type"];
  limit?: number;
};

export async function getTransportList(opts: TransportListOpts = {}): Promise<Transport[]> {
  const { type, limit } = opts;

  let items = await readAll();

  if (type) {
    items = items.filter((item) => item.type === type);
  }
  if (typeof limit === "number" && limit >= 0) {
    items = items.slice(0, limit);
  }

  return items;
}
