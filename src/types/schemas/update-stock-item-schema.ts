import { z } from "zod";

export enum Operation {
  IN = "IN",
  OUT = "OUT",
  NOONE = "NOONE",
}
export const updateStockItemSchema = z.object({
  productId: z.number().min(1),
  operation: z.nativeEnum(Operation),
  productName: z.string().min(2).optional(),
  productPrice: z.coerce.number(),
  operationQuantity: z.coerce.number(),
  criticalStock: z.coerce.number(),
  stallId: z.coerce.number(),
});
export const OPERATION_LABELS: Record<Operation, string> = {
  [Operation.IN]: "Entrada",
  [Operation.OUT]: "Saída",
  [Operation.NOONE]: "Nenhuma",
};

export type UpdateStockItemFormData = z.infer<typeof updateStockItemSchema>;
