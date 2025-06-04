import { Eraser, SendHorizonal } from "lucide-react";
import { OrderItem, useSaleStore } from "@/store/SaleStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/api/orders.service";
import { useAuth } from "@/contexts/Auth.context";

interface Props {
  items: OrderItem[];
  numberFormatter: Intl.NumberFormat;
  total: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function OrderSummaryBar({
  items,
  numberFormatter,
  total,
  setOpen,
}: Props) {
  const { clear } = useSaleStore();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate } = useMutation({
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

  const onSubmit = () => {
    console.log("Form: ", { items });
    mutate({
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      stallId: user!.stall.id,
    });
  };
  return (
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
            Limpar <Eraser size={30} />
          </Button>
          <Button
            onClick={() => onSubmit()}
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            Confirmar
            <SendHorizonal size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
}
