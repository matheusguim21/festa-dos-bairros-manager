import { Product } from "@/types/Product";

import { UpdateStockModal } from "../modals/UpdateStockModal";
import { cn, numberFormatterToCurrency } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

interface Props {
  product: Product;
}

export function StockProductsCard({ product }: Props) {
  const estoque_baixo = product.quantity <= product.criticalStock;
  const estoque_zerado = product.quantity <= 0;
  return (
    <Card key={product.id} className="max-h-44">
      <CardContent className="flex max-h-44 min-h-40 w-[370px] max-w-[600px] flex-col justify-end gap-2">
        <div className="flex">
          <p
            className={cn(
              estoque_baixo || estoque_zerado
                ? "font-bold text-red-500"
                : "font-semibold",
            )}
          >
            {`Estoque${estoque_zerado ? " zerado:" : estoque_baixo ? " baixo:" : ":"}  ${product.quantity} unidades`}
          </p>
          <></>
        </div>

        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {numberFormatterToCurrency.format(product.price)}
        </p>
        <UpdateStockModal product={product} />
      </CardContent>
    </Card>
  );
}
