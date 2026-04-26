import { z } from "zod";

export const TransportTypeSchema = z.enum(["ferry", "speedboat"]);

export const TransportScheduleSchema = z.object({
  days: z.string().min(1),
  departureTime: z.string().min(1),
  durationLabel: z.string().min(1),
});

export const TransportSchema = z.object({
  slug: z.string().min(1),
  type: TransportTypeSchema,
  operator: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.literal("IDR"),
  schedule: TransportScheduleSchema,
});

export const TransportListSchema = z.array(TransportSchema);

export type TransportType = z.infer<typeof TransportTypeSchema>;
export type Transport = z.infer<typeof TransportSchema>;
