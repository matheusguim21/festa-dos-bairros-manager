import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Clock,
  ExternalLink,
  Package,
  Receipt,
  ShoppingBag,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { OrderItemsList } from "./cart/OrderItemsLis";
import { UpdateOrderStatusForm } from "../forms/UpdateOrderStatusForm";
import { useAuth } from "@/contexts/Auth.context";
import { ordersService } from "@/api/orders.service";
import { cn } from "@/lib/utils";
import {
  convertStatus,
  type Sale,
  SaleStatusApi,
  statusColorMap,
} from "@/types/Sales";

interface Props {
  sale: Sale;
}

export const orderStatusSchema = z.object({
  status: z.enum(
    Object.values(SaleStatusApi) as [SaleStatusApi, ...SaleStatusApi[]],
  ),
});

export type OrderStatusForm = z.infer<typeof orderStatusSchema>;

export function OrderCard({ sale }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const queryClient = useQueryClient();
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

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      orderId,
      newStatus,
    }: {
      orderId: number;
      newStatus: SaleStatusApi;
    }) => ordersService.updateOrderStatus(orderId, newStatus),
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data: OrderStatusForm) => {
    mutate(
      { orderId: sale.id, newStatus: data.status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          toast.success("Status alterado com sucesso");
          form.reset({ status: data.status });
          setOpen(false);
        },
      },
    );
  };

  const formattedDate = formatDistanceToNow(sale.date, {
    addSuffix: true,
    locale: ptBR,
  });

  const handleViewDetails = () => {
    refetch();
    setDetailsOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md sm:w-full md:w-[400px]">
        <CardContent className="p-0">
          {/* Status indicator strip */}
          <div className={cn("h-1.5", colorClasses)} />

          <div className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              {/* Order info */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Pedido</span>
                  <span className="font-bold">#{sale.id}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Barraca:
                  </span>
                  <span className="font-medium">{sale.stall.name}</span>
                </div>
              </div>

              {/* Status badge */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={sale.status === "CANCELED"}
                    className={cn(
                      "h-auto gap-1.5 rounded-full px-3 py-1",
                      colorClasses,
                      sale.status === "CANCELED" && "opacity-60",
                    )}
                  >
                    <span className="relative flex h-2 w-2">
                      <span
                        className={cn(
                          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                          sale.status === "PENDING"
                            ? "bg-amber-400"
                            : sale.status === "PREPARING"
                              ? "bg-blue-400"
                              : sale.status === "DELIVERED"
                                ? "bg-green-400"
                                : "bg-red-400",
                        )}
                      ></span>
                      <span
                        className={cn(
                          "relative inline-flex h-2 w-2 rounded-full",
                          sale.status === "PENDING"
                            ? "bg-amber-500"
                            : sale.status === "PREPARING"
                              ? "bg-blue-500"
                              : sale.status === "DELIVERED"
                                ? "bg-green-500"
                                : "bg-red-500",
                        )}
                      ></span>
                    </span>
                    {convertStatus(sale.status)}
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle>Status do Pedido</DialogTitle>
                  <DialogDescription>
                    Selecione uma das opções para alterar o status do pedido
                  </DialogDescription>
                  <UpdateOrderStatusForm form={form} onSubmit={onSubmit} />

                  {user?.role === "ADMIN" && (
                    <Button
                      disabled={!isStatusChanged || isPending}
                      className={cn("gap-2", isPending && "opacity-80")}
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      {isPending ? "Processando..." : "Salvar Alterações"}
                    </Button>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <Separator className="my-3" />

            {/* Time info */}
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Pedido feito:
              </span>
              <span className="text-sm font-medium">{formattedDate}</span>
              <span className="text-xs text-muted-foreground">
                ({format(sale.date, "dd/MM/yyyy HH:mm")})
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t bg-muted/30 p-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleViewDetails}
          >
            <ShoppingBag className="h-4 w-4" />
            Ver Detalhes
            <ExternalLink className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>

      {/* Order details dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Receipt className="h-5 w-5" />
              Detalhes do Pedido #{sale.id}
            </DialogTitle>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/50 p-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Barraca:
                  </span>
                  <span className="font-medium">{sale.stall.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Data:</span>
                  <span className="font-medium">
                    {format(sale.date, "dd/MM/yyyy")}
                  </span>
                </div>
              </div>

              <Badge variant="outline" className={cn("gap-1.5", colorClasses)}>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    sale.status === "PENDING"
                      ? "bg-amber-500"
                      : sale.status === "PREPARING"
                        ? "bg-blue-500"
                        : sale.status === "DELIVERED"
                          ? "bg-green-500"
                          : "bg-red-500",
                  )}
                ></span>
                {convertStatus(sale.status)}
              </Badge>
            </div>
          </DialogHeader>

          <div className="mt-2">
            <OrderItemsList items={items || []} total={sale.total} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
