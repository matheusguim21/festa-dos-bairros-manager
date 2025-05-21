import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSaleStore } from "@/store/SaleStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  OrderSummaryForm,
  orderSummarySchema,
} from "@/types/schemas/order-summary-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ordersService } from "@/api/orders.service";
import { useAuth } from "@/contexts/Auth.context";

export function SaleSummaryBar() {
  const { user } = useAuth();

  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { items, clear } = useSaleStore();

  const form = useForm<OrderSummaryForm>({
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
      toast.success("Venda finalizada com sucesso!");
      clear();
      setOpen(false);
    },
    onError: () => {
      toast.error("Erro ao finalizar a venda.");
    },
  });

  const onSubmit = (data: OrderSummaryForm) => {
    console.log("Form: ", { items });
    mutate({
      buyerName: data.buyerName,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      stallId: user!.stall.id,
    });
  };

  if (items.length === 0) return null;

  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  return isMobile ? (
    // --- MOBILE (Drawer) ---
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-muted bg-white p-4 shadow-xl">
        <div className="flex justify-between">
          <div className="flex w-[50%] flex-wrap justify-start">
            <span>
              <strong className="flex-1">
                {items.length} produto{items.length > 1 && "(s)"}
              </strong>{" "}
              selecionado{items.length > 1 && "(s)"}
            </span>
            <br />
            <div>
              <span> Total: </span>
              <span className="font-bold">{numberFormatter.format(total)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="reset"
              variant={"outline"}
              className="border-red-500 bg-background text-red-500"
              onClick={clear}
            >
              Cancelar venda
            </Button>
            <Button
              onClick={() => setOpen(true)}
              className="rounded-md bg-primary px-4 py-2 text-white"
            >
              Finalizar Venda
            </Button>
          </div>
        </div>
      </div>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Finalizar Venda</DrawerTitle>
          <DrawerDescription>Resumo da venda</DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form className="space-y-4 px-4">
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="buyerName">Nome do cliente</Label>
                  <FormControl>
                    <Input
                      id="buyerName"
                      placeholder="Nome do cliente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Lista de produtos e total */}
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between py-2"
                >
                  <div className="flex gap-2">
                    <span>{item.quantity}x</span>
                    <span>{item.product.name}</span>
                  </div>
                  <div className="flex min-w-[80px] justify-end gap-1">
                    <span className="text-right">R$</span>
                    <span className="font-regular text-serif w-[50px] tabular-nums">
                      {numberFormatter
                        .format(item.product.price)
                        .replace("R$", "")
                        .trim()}
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-3 flex justify-between">
                <span className="font-bold">Total: {""} </span>
                <span className="text-xl font-bold text-primary">
                  {numberFormatter.format(total)}
                </span>
              </div>
            </div>

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
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-muted bg-white p-4 shadow-xl">
        <div className="flex justify-between">
          <div className="flex w-[50%] flex-wrap justify-start">
            <span>
              <strong className="flex-1">
                {items.length} produto{items.length > 1 && "(s)"}
              </strong>{" "}
              selecionado{items.length > 1 && "(s)"}
            </span>
            <br />
            <div>
              <span> Total: </span>
              <span className="font-bold">{numberFormatter.format(total)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="reset"
              variant={"outline"}
              className="border-red-500 bg-background text-red-500"
              onClick={clear}
            >
              Cancelar venda
            </Button>
            <Button
              onClick={() => setOpen(true)}
              className="rounded-md bg-primary px-4 py-2 text-white"
            >
              Finalizar Venda
            </Button>
          </div>
        </div>
      </div>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            <Form {...form}>
              <Input placeholder="Nome do cliente" />
            </Form>
          </DrawerTitle>
          <DrawerDescription>Resumo da venda</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-1 px-4">
          <div>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between py-2">
                <div className="flex gap-2">
                  <span>{item.quantity}x</span>
                  <span>{item.product.name}</span>
                </div>
                <div className="flex min-w-[80px] justify-end gap-1">
                  <span className="text-right">R$</span>
                  <span className="w-[50px] text-right font-mono tabular-nums">
                    {numberFormatter
                      .format(item.product.price)
                      .replace("R$", "")
                      .trim()}
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-3 flex justify-between">
              <span className="font-bold">Total: {""} </span>
              <span className="text-xl font-bold text-primary">
                {numberFormatter.format(total)}
              </span>
            </div>
          </div>
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
          <Button className="text-background">Confirmar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
