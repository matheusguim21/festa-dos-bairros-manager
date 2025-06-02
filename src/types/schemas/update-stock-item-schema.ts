// update-stock-item-schema.ts
import { z, RefinementCtx } from "zod";

export enum Operation {
  IN = "IN",
  OUT = "OUT",
  NOONE = "NOONE",
}

/**
 * Em vez de ter um único `const updateStockItemSchema = z.object(...).superRefine(...)`,
 * vamos criar uma função que receba `currentQty` e devolva o schema completo.
 */
export function createUpdateStockItemSchema(currentQty: number) {
  return z
    .object({
      productId: z.number().min(1),
      operation: z.nativeEnum(Operation),
      productName: z.string().min(2).optional(),
      productPrice: z.coerce.number(),
      operationQuantity: z.coerce.number().optional(),
      criticalStock: z.coerce.number(),
      stallId: z.coerce.number(),
    })
    .superRefine((data, ctx: RefinementCtx) => {
      const qtdOp = data.operationQuantity ?? 0;

      // 1) Se operação ≠ NOONE, operationQuantity deve ser > 0
      if (data.operation !== Operation.NOONE && qtdOp <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["operationQuantity"],
          message: "Quantidade de operação deve ser maior que 0",
        });
      }

      // 2) Se operação = NOONE, não informar quantidade > 0
      if (data.operation === Operation.NOONE && qtdOp > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["operationQuantity"],
          message: "Não deve informar quantidade quando operation for Nenhuma",
        });
      }

      // 3) Se operation === OUT, operationQuantity não pode ultrapassar currentQty
      if (
        data.operation === Operation.OUT &&
        data.operationQuantity != null &&
        data.operationQuantity > currentQty
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["operationQuantity"],
          message: `Quantidade de operação não pode ser maior que a quantidade atual do produto\n Quantidade atual: ${currentQty}`,
        });
      }
    });
}

export const OPERATION_LABELS: Record<Operation, string> = {
  [Operation.IN]: "Entrada",
  [Operation.OUT]: "Saída",
  [Operation.NOONE]: "Nenhuma",
};

// Apenas para exportar o tipo inferido pelo Zod (sem contexto)
export type UpdateStockItemFormData = z.infer<
  ReturnType<typeof createUpdateStockItemSchema>
>;
