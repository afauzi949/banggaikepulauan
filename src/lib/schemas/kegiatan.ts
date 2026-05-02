import { z } from "zod";

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const KegiatanSchema = z.object({
  slug: z.string().regex(KEBAB_CASE, "slug must be kebab-case ASCII (a-z, 0-9, hyphen)"),
  title: z.string().min(1),
  tags: z.array(z.string()).optional(),
  excerpt: z.string().max(300),
  description: z.string().min(1),
  cover: z.string().min(1),
  date: z.string().min(1),
  published: z.boolean().default(true),
});

export type KegiatanInput = z.input<typeof KegiatanSchema>;
export type Kegiatan = z.output<typeof KegiatanSchema>;
