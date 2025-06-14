import type { Product } from "@/types/Product";
import { AlertTriangle, Package } from "lucide-react";
import { UpdateStockModal } from "../modals/UpdateStockModal";
import { cn, numberFormatterToCurrency } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  product: Product;
}

export function StockProductsCard({ product }: Props) {
  const isLowStock =
    product.quantity <= product.criticalStock && product.quantity > 0;
  const isOutOfStock = product.quantity <= 0;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md xs:w-full md:w-[400px]">
      <CardContent className="flex h-full flex-col justify-between gap-3 p-5">
        <div className="space-y-2">
          {/* Header with name and price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-lg font-medium">{product.name}</h3>
            <Badge variant="outline" className="whitespace-nowrap text-sm">
              {numberFormatterToCurrency.format(product.price)}
            </Badge>
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-muted-foreground">Estoque:</span>
                <span
                  className={cn(
                    "font-medium",
                    isOutOfStock
                      ? "text-red-600"
                      : isLowStock
                        ? "text-amber-600"
                        : "text-green-600",
                  )}
                >
                  {product.quantity} unidades
                </span>
              </div>
            </div>

            {(isLowStock || isOutOfStock) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle
                        className={cn(
                          "h-4 w-4",
                          isOutOfStock ? "text-red-500" : "text-amber-600",
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isOutOfStock ? "Estoque zerado" : "Estoque baixo"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Status indicator */}
          <div className="mt-1">
            <Badge
              variant={
                isOutOfStock
                  ? "destructive"
                  : isLowStock
                    ? "outline"
                    : "secondary"
              }
              className={cn(
                "w-full justify-center",
                isLowStock && "border-amber-200 bg-amber-50 text-amber-700",
              )}
            >
              {isOutOfStock
                ? "Estoque zerado"
                : isLowStock
                  ? "Estoque baixo"
                  : "Estoque disponível"}
            </Badge>
          </div>
        </div>
        <CardFooter className="w-full border-t-2 p-0 py-3">
          <UpdateStockModal product={product} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
