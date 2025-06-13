import type { Product } from "@/types/Product";
import { Minus, Plus, AlertTriangle } from "lucide-react";
import { useSaleStore } from "@/store/SaleStore";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  product: Product;
}

export function OrderProductsCard({ product }: Props) {
  const { addItem, items, removeItem } = useSaleStore();

  const current = items.find((item) => item.product.id === product.id);
  const quantity = current?.quantity || 0;
  const isOutOfStock = product.quantity <= 0;
  const isLowStock = product.quantity <= product.criticalStock && !isOutOfStock;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(product.price);

  const handleAddItem = () => {
    if (quantity < product.quantity) {
      addItem(product);
    } else {
      toast.warning("Quantidade máxima de produto em estoque atingida");
    }
  };

  const handleRemoveItem = () => {
    if (quantity > 0) removeItem(product.id);
  };

  return (
    <Card
      className={cn(
        "w-full overflow-hidden transition-all duration-200",
        isOutOfStock ? "opacity-60 grayscale" : "hover:shadow-lg",
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Product info section */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-lg font-medium">
                {product.name}
              </h3>

              {(isLowStock || isOutOfStock) && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      // size="icon"
                      className="h-8 w-8 text-red-500"
                    >
                      <AlertTriangle className="h-full w-full" />
                      <span className="sr-only">Alerta de estoque</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isOutOfStock ? "text-red-600" : "text-amber-600",
                      )}
                    >
                      {isOutOfStock
                        ? "Produto indisponível"
                        : "Estoque de produto baixo"}
                    </p>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="mt-2 flex flex-col items-start justify-center gap-2">
              <p className="text-xl font-bold text-primary">{formattedPrice}</p>
              <Badge variant="outline" className="text-sm">
                Estoque: {product.quantity}
              </Badge>
            </div>
          </div>

          {/* Quantity controls section */}
          <div
            className={cn(
              "flex items-center justify-between gap-2 bg-muted/50 p-4 sm:w-36 sm:flex-col sm:items-center sm:justify-center sm:border-l",
              isOutOfStock && "pointer-events-none",
            )}
          >
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={handleAddItem}
              disabled={isOutOfStock || quantity >= product.quantity}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Adicionar item</span>
            </Button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background font-medium">
              {quantity}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleRemoveItem}
              disabled={isOutOfStock || quantity <= 0}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Remover item</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
