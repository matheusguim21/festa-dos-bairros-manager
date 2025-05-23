import { Product } from "@/types/Product";
import { TriangleAlert } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { UpdateStockModal } from "../modals/UpdateStockModal";

interface Props {
  product: Product;
}

export function StockProductsCard({ product }: Props) {
  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  return (
    <div className="flex justify-between gap-2 rounded-md border-2 border-primary bg-muted px-2 shadow-md">
      {product.quantity <= product.criticalStock && (
        <Popover>
          <PopoverTrigger>
            <TriangleAlert className="h-7 w-7 text-red-500" />
          </PopoverTrigger>
          <PopoverContent>
            <span className="text-red-600">
              {product.quantity <= 0
                ? "Estoque zerado"
                : "Estoque de produto baixo"}
            </span>
          </PopoverContent>
        </Popover>
      )}
      <div className="flex max-w-[50%] flex-1 flex-col justify-center pl-5">
        <span className="break-words text-lg">{product.name}</span>
        <span className="text-lg font-bold">
          {numberFormatter.format(product.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col items-start justify-center gap-1">
        <div className="flex flex-col items-center">
          <span className="text-lg">Estoque</span>
          <span className="text-xl font-bold">{product.quantity}</span>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="mr-2 min-h-32 border border-primary"
      />
      <UpdateStockModal product={product} />
    </div>
  );
}
