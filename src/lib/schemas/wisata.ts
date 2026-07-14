import { z } from "zod";

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const WisataCategory = z.enum(["wisata-alam", "budaya", "sejarah", "spiritual", "kuliner"]);

const LocationSchema = z.object({
  village: z.string().min(1),
  subdistrict: z.string().min(1),
  regency: z.literal("Banggai Kepulauan"),
  coordinates: z.tuple([z.number(), z.number()]),
});

const VideoSchema = z.object({
  publicId: z.string().min(1),
  caption: z.string().optional(),
});

const SeoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

export const WisataSchema = z.object({
  slug: z.string().regex(KEBAB_CASE, "slug must be kebab-case ASCII (a-z, 0-9, hyphen)"),
  title: z.string().min(1),
  category: WisataCategory,
  tags: z.array(z.string()).optional(),
  excerpt: z.string().max(160),
  description: z.string().min(1),
  location: LocationSchema,
  cover: z.string().min(1),
  gallery: z.array(z.string().min(1)).optional(),
  videos: z.array(VideoSchema).optional(),
  tiketMasuk: z.string().optional(),
  fasilitas: z.array(z.string()).optional(),
  waktuKunjunganTerbaik: z.string().optional(),
  narahubung: z
    .object({
      nama: z.string(),
      kontak: z.string(),
    })
    .optional(),
  nilaiBudaya: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  publishedAt: z.string().datetime({ offset: true }),
  seo: SeoSchema,
});

export type WisataInput = z.input<typeof WisataSchema>;
export type Wisata = z.output<typeof WisataSchema>;
