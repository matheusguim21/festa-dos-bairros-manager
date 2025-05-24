// src/components/SaleCard.tsx

import {
  convertStatus,
  Sale,
  SaleStatusApi,
  statusColorMap,
} from "@/types/Sales";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { OrderItemsList } from "./cart/OrderItemsLis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/api/orders.service";
import { Info } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UpdateOrderStatusForm } from "../forms/UpdateOrderStatusForm";
import { Button } from "../ui/button";
import { useState } from "react";

import { useAuth } from "@/contexts/Auth.context";

interface Props {
  sale: Sale;
}

// 1) Mapa de status → classes

export const orderStatusSchema = z.object({
  status: z.enum(
    Object.values(SaleStatusApi) as [SaleStatusApi, ...SaleStatusApi[]],
  ),
});

export type OrderStatusForm = z.infer<typeof orderStatusSchema>;

export function OrderCard({ sale }: Props) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  // 2) Pega o conjunto de classes pelo status
  const colorClasses = statusColorMap[sale.status];

  const form = useForm<OrderStatusForm>({
    defaultValues: {
      status: sale.status,
    },
    resolver: zodResolver(orderStatusSchema),
  });
  const watchedStatus = form.watch("status");
  const originalStatus = form.formState.defaultValues?.status;
  const isStatusChanged = watchedStatus !== originalStatus;

  const { data: items, refetch } = useQuery({
    queryKey: ["order-item", sale.id],
    queryFn: () => ordersService.getOrderItemsByOrderId(sale.id),
  });
  const { mutate } = useMutation({
    mutationFn: ({
      orderId,
      newStatus,
    }: {
      orderId: number;
      newStatus: SaleStatusApi;
    }) => ordersService.updateOrderStatus(orderId, newStatus),

    onError: (error) => toast.error(error.message),
  });

  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  const onSubmit = (data: OrderStatusForm) => {
    mutate(
      { orderId: sale.id, newStatus: data.status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          toast.success("Status alterado com sucesso");
          form.reset({ status: data.status }); // ✅ redefine o valor base do form
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog>
      <div className="grid grid-cols-[3fr_4fr_1fr] items-stretch rounded-md border-2 border-primary bg-muted px-5 py-4 shadow-md">
        <div>
          <div className="flex flex-1 flex-col justify-center">
            <span className="text-sm">Pedido N°</span>
            <span className="max-w-14 text-lg font-bold">{sale.id}</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm">Cliente</span>
            <span className="font-bold">{sale.buyerName}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex h-12 flex-1 flex-col justify-between">
            <span>Pedido feito</span>
            <span className="text-sm font-bold">
              {formatDistanceToNow(sale.date, {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={sale.status === "CANCELED"}
                  className={cn(
                    colorClasses,
                    "h-5 w-fit rounded-md px-2 py-1 text-xs font-medium",
                    {
                      "pointer-events-none opacity-50":
                        sale.status === "CANCELED",
                    },
                  )}
                >
                  {convertStatus(sale.status)}
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle>Status do Pedido</DialogTitle>
                <DialogDescription>
                  Selecione uma das opções para alterar o status do pedido
                </DialogDescription>
                <UpdateOrderStatusForm form={form} onSubmit={onSubmit} />

                {user!.role === "ADMIN" ? (
                  <Button
                    disabled={!isStatusChanged}
                    className="text-background"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Salvar
                  </Button>
                ) : null}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <DialogTrigger
          className="flex h-16 flex-col items-center justify-center gap-1 self-center rounded-md bg-primary px-2"
          onClick={() => refetch()}
        >
          <span className="text-xs text-background">Detalhes</span>
          <Info className="w-5 text-muted" />
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader className="pt-5">
          <div className="flex justify-between">
            <div>
              <span>Cliente: </span>
              <span className="font-medium text-primary">
                {sale.buyerName}{" "}
              </span>
            </div>
            <div>
              <span className="text-md">Feito às: </span>
              <span className="font-bold">{format(sale.date, "HH:mm")}</span>
            </div>
          </div>
        </DialogHeader>
        <OrderItemsList
          items={items || []}
          numberFormatter={numberFormatter}
          total={sale.total}
        />
      </DialogContent>
    </Dialog>
  );
}
