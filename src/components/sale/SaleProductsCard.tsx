import { Product } from "@/types/Product";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { useSaleStore } from "@/store/SaleStore";

interface Props {
  product: Product;
}

export function SaleProductsCard({ product }: Props) {
  const { addItem, items, removeItem } = useSaleStore();

  const current = items.find((item) => item.product.id === product.id);
  const quantity = current?.quantity || 0;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(product.price);
  return (
    <div className="flex items-stretch justify-between rounded-md border-2 border-primary bg-muted px-5 py-4 shadow-md">
      <div className="flex flex-1 flex-col justify-center pl-5">
        <span className="text-lg">{product.name}</span>
        <span className="text-lg font-bold">{formattedPrice}</span>
      </div>

      <div className="flex flex-col items-center justify-evenly gap-2">
        <Plus
          className="h-6 w-6 rounded-full border-2 border-green-600 text-green-600"
          onClick={() => {
            if (quantity < product.quantity) addItem(product);
          }}
        />
        <span className="w-7 rounded border-2 border-primary text-center">
          {quantity}
        </span>
        <Minus
          className="h-6 w-6 rounded-full border-2 border-red-500 text-red-500"
          onClick={() => {
            if (quantity > 0) removeItem(product.id);
          }}
        />
      </div>
    </div>
  );
}
