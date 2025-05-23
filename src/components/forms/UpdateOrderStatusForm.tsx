import { convertStatus, SaleStatusApi, statusColorMap } from "@/types/Sales";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { OrderStatusForm } from "../sale/SaleCard";
import { useAuth } from "@/contexts/Auth.context";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";
import { DialogClose } from "../ui/dialog";

interface Props {
  form: UseFormReturn<OrderStatusForm>;
  onSubmit: (data: any) => void;
}

export function UpdateOrderStatusForm({ form, onSubmit }: Props) {
  const statusOptions = Object.values(SaleStatusApi);

  const { user } = useAuth();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={"status"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {user?.role === "ADMIN" ? (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {convertStatus(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex gap-3">
                    {statusOptions
                      .filter((option) => option !== field.value)
                      .map((item) =>
                        item === "CANCELED" ? (
                          <AlertDialog key={item}>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                className={cn([
                                  statusColorMap[item],
                                  "uppercase shadow-lg",
                                ])}
                              >
                                Cancelar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmação</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja cancelar o pedido?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Não</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button
                                    className="bg-destructive text-background"
                                    onClick={() => {
                                      field.onChange(item);
                                      form.handleSubmit(onSubmit)();
                                    }}
                                  >
                                    Cancelar Pedido
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <DialogClose asChild>
                            <Button
                              key={item}
                              type="button"
                              onClick={() => {
                                field.onChange(item);
                                form.handleSubmit(onSubmit)();
                              }}
                              className={statusColorMap[item]}
                            >
                              {convertStatus(item)}
                            </Button>
                          </DialogClose>
                        ),
                      )}
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
