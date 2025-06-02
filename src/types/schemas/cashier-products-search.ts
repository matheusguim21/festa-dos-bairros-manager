// Dentro de ProdutosTab.tsx (ou num arquivo de schemas separado)

import { z } from "zod";

export const cashierProductsSchema = z.object({
  productName: z.string().optional(), // agora tem o mesmo nome do campo do FormField
  stallId: z
    .string()
    .optional()
    .transform((val) => {
      // se vier vazio (""), retorna undefined/nulo, senão converte para número
      return val === "" || val === undefined ? undefined : Number(val);
    }),
});

export type CashierProductsForm = z.infer<typeof cashierProductsSchema>;
