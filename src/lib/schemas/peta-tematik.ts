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

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${bytes} B`;
}

const FORMAT_LABEL: Record<PetaTematik["format"], string> = {
  SHP_ZIP: "SHP (ZIP)",
  GeoJSON: "GeoJSON",
  PDF: "PDF",
};

export function formatLabel(format: PetaTematik["format"]): string {
  return FORMAT_LABEL[format];
}
