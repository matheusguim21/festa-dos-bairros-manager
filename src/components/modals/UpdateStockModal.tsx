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
import {
  createUpdateStockItemSchema,
  Operation,
  UpdateStockItemFormData,
} from "@/types/schemas/update-stock-item-schema";
import { Product } from "@/types/Product";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/api/productService";
import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  product: Product;
}

export function UpdateStockModal({ product }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const dynamicSchema = createUpdateStockItemSchema(product.quantity);
  const form = useForm<UpdateStockItemFormData>({
    defaultValues: {
      operation: Operation.NOONE,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      operationQuantity: 0,
      criticalStock: product.criticalStock,
      stallId: product.stallId,
    },
    resolver: zodResolver(dynamicSchema),
  });

  const { mutate } = useMutation({
    mutationFn: productsService.updateProduct,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries();
      toast.success("Produto atualizado com sucesso");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onSubmit = async (formData: UpdateStockItemFormData) => {
    const {
      criticalStock,
      operation,
      operationQuantity,
      productId,
      productPrice,
      productName,
      stallId,
    } = formData;
    console.log("Formulário: ", formData);
    mutate({
      name: productName,
      price: productPrice,
      productId: productId,
      quantity: operationQuantity,
      stallId: stallId,
      criticalStock,
      operation,
    });
  };

  const operation = form.watch("operation");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full text-background"
          onClick={() => setOpen(true)}
        >
          Editar
        </Button>
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

        <Button
          type="submit"
          className={cn(
            "text-background",
            operation === "IN"
              ? "bg-green-600"
              : operation === "OUT"
                ? "bg-red-500"
                : null,
          )}
          onClick={form.handleSubmit(onSubmit)}
        >
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
