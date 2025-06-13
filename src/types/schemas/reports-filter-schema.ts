import { z } from "zod";

export const filtersSchema = z.object({
  searchTerm: z.string().default(""),
  stallId: z.string().default("all"),
  sortBy: z.enum(["totalSold", "revenue", "name"]).default("totalSold"),
  page: z.number().min(0).default(0),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type FiltersFormData = z.infer<typeof filtersSchema>;
