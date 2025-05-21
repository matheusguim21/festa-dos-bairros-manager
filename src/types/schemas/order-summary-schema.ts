// order-summary.schema.ts
import { z } from "zod";

export const orderSummarySchema = z.object({
  buyerName: z.string().min(1, "O nome do cliente é obrigatório"),
});

export type OrderSummaryForm = z.infer<typeof orderSummarySchema>;
