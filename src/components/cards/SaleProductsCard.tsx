import { Product } from "@/types/Product";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";

interface Props {
  product: Product;
}

export function SaleProductsCard({ product }: Props) {
  const [quantity, setQuantity] = useState(0);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(product.price);
  return (
    <div className="flex h-full items-stretch justify-between rounded-md border-2 border-primary bg-secondary px-5 py-4">
      <div className="flex flex-1 flex-col items-center justify-center">
        <span>{product.name}</span>
        <span>{formattedPrice}</span>
      </div>

      <Separator
        className="mx-4 h-full w-[2px] bg-foreground"
        orientation="vertical"
      />
      <div className="flex flex-col items-center justify-evenly gap-2 py-2">
        <Plus
          className="h-6 w-6 rounded-full border-2 border-green-600 text-green-600"
          onClick={() =>
            setQuantity((state) => {
              return state + 1;
            })
          }
        />
        <span className="w-7 rounded border-2 border-primary text-center">
          {quantity}
        </span>
        <Minus
          className="h-6 w-6 rounded-full border-2 border-red-500 text-red-500"
          onClick={() =>
            setQuantity((state) => {
              return state - 1;
            })
          }
        />
      </div>
    </div>
  );
}
