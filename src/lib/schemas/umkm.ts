import { z } from "zod";

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const UmkmCategory = z.enum(["kuliner", "jasa", "toko", "kerajinan", "pertanian"]);

const LocationSchema = z.object({
  village: z.string().min(1),
  subdistrict: z.string().min(1),
  regency: z.literal("Banggai Kepulauan"),
  coordinates: z.tuple([z.number(), z.number()]),
});

const ContactSchema = z.object({
  whatsapp: z.string().optional(),
  googleMapsUrl: z.string().url().optional(),
});

export const UmkmSchema = z.object({
  slug: z.string().regex(KEBAB_CASE, "slug must be kebab-case ASCII (a-z, 0-9, hyphen)"),
  name: z.string().min(1),
  category: UmkmCategory,
  tags: z.array(z.string()).optional(),
  description: z.string().min(1),
  location: LocationSchema,
  cover: z.string().min(1),
  operatingHours: z.string().optional(),
  contact: ContactSchema.optional(),
  published: z.boolean().default(true),
});

export type UmkmInput = z.input<typeof UmkmSchema>;
export type Umkm = z.output<typeof UmkmSchema>;
