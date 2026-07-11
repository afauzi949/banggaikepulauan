import { z } from "zod";

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const DwbSchema = z.object({
  slug: z.string().regex(KEBAB_CASE, "slug must be kebab-case ASCII (a-z, 0-9, hyphen)"),
  title: z.string().min(1),
  excerpt: z.string().max(500),
  cover: z.string().min(1),
  tags: z.array(z.string()).optional(),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export type DwbInput = z.input<typeof DwbSchema>;
export type Dwb = z.output<typeof DwbSchema>;
