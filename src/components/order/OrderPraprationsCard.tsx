// src/components/preparation/OrderPreparationCard.tsx

import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OrderItemsList } from "../order/cart/OrderItemsLis";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { convertStatus, SocketOrder, statusColorMap } from "@/types/Sales";
import { OrderItem } from "@/store/SaleStore";

interface Props {
  item: SocketOrder;
}

export function OrderPreparationCard({ item }: Props) {
  const colorClasses = statusColorMap[item.status];

  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  return (
    <Dialog>
      <div className="grid grid-cols-[3fr_4fr_1fr] items-stretch rounded-md border-2 border-primary bg-muted px-5 py-4 shadow-md">
        <div>
          <div className="flex flex-1 flex-col justify-center">
            <span className="text-sm">Pedido N°</span>
            <span className="max-w-14 text-lg font-bold">{item.id}</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm">Cliente</span>
            <span className="font-bold">{item.buyerName}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex h-12 flex-1 flex-col justify-between">
            <span>Pedido feito</span>
            <span className="text-sm font-bold">
              {formatDistanceToNow(item.date, {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end">
            <span
              className={cn(
                colorClasses,
                "w-fit rounded-md px-2 py-1 text-xs font-medium",
              )}
            >
              {convertStatus(item.status)}
            </span>
          </div>
        </div>

        <DialogTrigger className="flex h-16 flex-col items-center justify-center gap-1 self-center rounded-md bg-primary px-2">
          <span className="text-xs text-background">Detalhes</span>
          <Info className="w-5 text-muted" />
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader className="pt-5">
          <div className="flex justify-between">
            <div>
              <span>Cliente: </span>
              <span className="font-medium text-primary">{item.buyerName}</span>
            </div>
            <div>
              <span className="text-md">Feito às: </span>
              <span className="font-bold">{format(item.date, "HH:mm")}</span>
            </div>
          </div>
        </DialogHeader>
        <OrderItemsList
          items={item.items as OrderItem[]}
          numberFormatter={numberFormatter}
          total={item.total}
        />
      </DialogContent>
    </Dialog>
  );
}
