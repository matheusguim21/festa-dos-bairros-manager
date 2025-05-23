import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { UpdateStockItemForm } from "../forms/UpdateStockItemForm";
import { useForm } from "react-hook-form";
import { UpdateStockItemFormData } from "@/types/schemas/update-stock-item-schema";
import { Product } from "@/types/Product";

interface Props {
  product: Product;
}

export function UpdateStockModal({ product }: Props) {
  const form = useForm<UpdateStockItemFormData>({
    defaultValues: {
      operation: "IN",
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      operationQuantity: 0,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-6 w-6 cursor-pointer self-center rounded-md border-2 border-foreground" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controle de Estoque do Produto</DialogTitle>
          <DialogDescription>
            Anote <span className="font-semibold">Saídas</span> ou{" "}
            <span className="font-semibold">Entradas</span> do produto
          </DialogDescription>
        </DialogHeader>
        <UpdateStockItemForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
