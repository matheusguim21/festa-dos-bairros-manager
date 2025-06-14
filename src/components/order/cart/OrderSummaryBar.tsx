import type React from "react";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShoppingCart, Trash2, CheckCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ordersService } from "@/api/orders.service";
import { numberFormatterToCurrency } from "@/lib/utils";
import { type OrderItem, useSaleStore } from "@/store/SaleStore";

interface Props {
  items: OrderItem[];
  total: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stallId: number;
}

export function OrderSummaryBar({ items, total, setOpen, stallId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { clear } = useSaleStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ordersService.createOrder,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      toast.success("Pedido concluído com sucesso!");
      clear();
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setOpen(false);
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Erro ao finalizar a venda.");
      setIsSubmitting(false);
    },
  });

  const onSubmit = () => {
    if (items.length === 0) {
      toast.warning("Adicione pelo menos um item ao pedido");
      return;
    }

    mutate({
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      stallId,
    });
  };

  const itemCount = items.length;
  const itemText = itemCount === 1 ? "produto" : "produtos";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex-1 border-t bg-card shadow-lg">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
          {/* Order summary */}
          <div className="flex items-center pl-2">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{itemCount}</span>
                <span className="text-muted-foreground">{itemText}</span>
                {itemCount > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-1 h-4" />
                    <span className="text-lg font-bold text-primary">
                      {numberFormatterToCurrency.format(total)}
                    </span>
                  </>
                )}
              </div>
              {itemCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  Revise seu pedido antes de confirmar
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 pr-2">
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={clear}
              disabled={itemCount === 0 || isSubmitting}
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Limpar
            </Button>

            <Button
              size="sm"
              className="gap-1.5"
              onClick={onSubmit}
              disabled={itemCount === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex gap-2 text-background">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processando...
                </div>
              ) : (
                <div className="flex gap-2 text-background">
                  <CheckCircle className="h-4 w-4" />
                  Confirmar Pedido
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
