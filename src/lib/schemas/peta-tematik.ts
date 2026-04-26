import { z } from "zod";

export const PetaTematikFormatSchema = z.enum(["SHP_ZIP", "GeoJSON", "PDF"]);

export const PetaTematikSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  year: z.number().int().nullable(),
  preview: z.string().min(1),
  format: PetaTematikFormatSchema,
  sizeBytes: z.number().nonnegative(),
  downloadUrl: z.string().min(1),
  featured: z.boolean().default(false),
  publishedAt: z.string().min(1),
});

export const PetaTematikListSchema = z.array(PetaTematikSchema);

export type PetaTematikFormat = z.infer<typeof PetaTematikFormatSchema>;
export type PetaTematik = z.infer<typeof PetaTematikSchema>;
