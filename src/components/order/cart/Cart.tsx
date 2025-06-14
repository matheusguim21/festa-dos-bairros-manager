import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";
import { useSaleStore } from "@/store/SaleStore";

import { useForm } from "react-hook-form";
import {
  OrderSummaryFormProps,
  orderSummarySchema,
} from "@/types/schemas/order-summary-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ordersService } from "@/api/orders.service";
import { OrderItemsList } from "./OrderItemsLis";
import { OrderSummaryBar } from "./OrderSummaryBar";
import { DialogClose } from "@radix-ui/react-dialog";
import { OrderSummaryForm } from "@/components/forms/OrderSummaryForm";

export function Cart({ stallId }: { stallId: number }) {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { items, clear } = useSaleStore();

  const form = useForm<OrderSummaryFormProps>({
    resolver: zodResolver(orderSummarySchema),
    defaultValues: { buyerName: "" },
  });

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: ordersService.createOrder,
    onSuccess: () => {
      toast.success("Pedido concluído com sucesso!");
      clear();
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Erro ao finalizar a venda.");
    },
  });

  const onSubmit = (data: OrderSummaryFormProps) => {
    console.log("Form: ", { items });
    mutate({
      buyerName: data.buyerName,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      stallId,
    });
  };

  if (items.length === 0) return null;

  return isMobile ? (
    // --- MOBILE (Drawer) ---
    <Drawer open={open} onOpenChange={setOpen}>
      <OrderSummaryBar
        items={items}
        setOpen={setOpen}
        total={total}
        stallId={stallId}
      />
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            <OrderSummaryForm form={form} />
          </DrawerTitle>
          <DrawerDescription>Resumo da venda</DrawerDescription>
        </DrawerHeader>
        <OrderItemsList items={items} total={total} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
          <Button
            className="text-background"
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            disabled={isPending || !form.formState.isValid}
          >
            Confirmar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle>
        <OrderSummaryBar
          items={items}
          setOpen={setOpen}
          total={total}
          stallId={stallId}
        />
      </DialogTitle>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="py-4">
            <OrderSummaryForm form={form} />
          </DialogTitle>
          <DialogDescription>Resumo da venda</DialogDescription>
        </DialogHeader>
        <OrderItemsList items={items} total={total} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            className="text-background"
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            disabled={isPending || !form.formState.isValid}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
