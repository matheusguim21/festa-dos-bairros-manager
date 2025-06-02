import { Product } from "@/types/Product";
import { Minus, Plus, TriangleAlert } from "lucide-react";

import { useSaleStore } from "@/store/SaleStore";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface Props {
  product: Product;
}

export function OrderProductsCard({ product }: Props) {
  const { addItem, items, removeItem } = useSaleStore();

  const current = items.find((item) => item.product.id === product.id);
  const quantity = current?.quantity || 0;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(product.price);
  return (
    <div
      className={cn(
        "flex max-w-96 flex-1 justify-between gap-2 rounded-md border-2 border-primary bg-muted px-2 shadow-md",
        product.quantity <= 0 && "select-none opacity-50",
      )}
    >
      {product.quantity <= product.criticalStock && (
        <Popover>
          <PopoverTrigger>
            <TriangleAlert className="h-7 w-7 text-red-500" />
          </PopoverTrigger>
          <PopoverContent>
            <span className="text-red-600">
              {product.quantity <= 0
                ? "Produto indisponível"
                : "Estoque de produto baixo"}
            </span>
          </PopoverContent>
        </Popover>
      )}
      <div className="flex max-w-[50%] flex-1 flex-col justify-center pl-5">
        <span className="break-words text-lg">{product.name}</span>
        <span className="text-lg font-bold">{formattedPrice}</span>
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
      <div
        className={cn(
          "flex flex-col items-center justify-evenly gap-2 pr-2",
          product.quantity <= 0 && "pointer-events-none",
        )}
      >
        <Plus
          className="h-6 w-6 cursor-pointer rounded-lg border-2 border-green-600 text-green-600"
          onClick={() => {
            if (quantity < product.quantity) {
              addItem(product);
            } else {
              toast.warning("Quantidade máxima de produto em estoque atingida");
            }
          }}
        />
        <span className="w-7 rounded-lg border-2 border-primary text-center">
          {quantity}
        </span>
        <Minus
          className="h-6 w-6 cursor-pointer rounded-lg border-2 border-red-500 text-red-500"
          onClick={() => {
            if (quantity > 0) removeItem(product.id);
          }}
        />
      </div>
    </div>
  );
}
