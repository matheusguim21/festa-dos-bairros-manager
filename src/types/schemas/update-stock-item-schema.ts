import { z } from "zod";

export const updateStockItemSchema = z.object({
  productId: z.number().min(1),
  operation: z.enum(["IN", "OUT"]),
  productName: z.string().min(2).optional(),
  productPrice: z.coerce.number(),
  operationQuantity: z.coerce.number(),
});
export enum Operation {
  IN = "IN",
  OUT = "OUT",
}
export const OPERATION_LABELS: Record<Operation, string> = {
  [Operation.IN]: "Entrada",
  [Operation.OUT]: "Saída",
};

export type UpdateStockItemFormData = z.infer<typeof updateStockItemSchema>;
