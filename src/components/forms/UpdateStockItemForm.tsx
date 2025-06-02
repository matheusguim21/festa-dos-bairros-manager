import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Operation,
  OPERATION_LABELS,
  UpdateStockItemFormData,
} from "@/types/schemas/update-stock-item-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { PriceInput } from "../inputs/PriceInput";
import { cn } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { getAllStalls } from "@/api/shared/get-stalls";
import { useAuth } from "@/contexts/Auth.context";

interface Props {
  form: UseFormReturn<UpdateStockItemFormData>;
}

export function UpdateStockItemForm({ form }: Props) {
  const operation = form.watch("operation");
  const { user } = useAuth();
  const operationOptions = Object.values(Operation);

  const { data } = useQuery({
    queryKey: ["stalls"],
    queryFn: getAllStalls,
  });

  const options = useMemo(() => {
    const stalls = data || [];
    return stalls.map((stall) => ({
      value: stall.id.toString(),
      label: stall.name,
    }));
  }, [data]);

  // Ao mudar para NOONE, zera operationQuantity
  const oper = form.watch("operation");
  useEffect(() => {
    if (oper === Operation.NOONE) {
      form.setValue("operationQuantity", 0, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [oper, form.setValue]);

  return (
    <Form {...form}>
      <form>
        {/**
         * Um único grid de 2 colunas para TODOS os campos.
         * O Tailwind `grid-cols-2` não quebra em telas menores,
         * então SEMPRE serão 2 colunas (cada item encolhe, mas permanece lado a lado).
         */}
        <div className="grid grid-cols-2 gap-2">
          {/** 1) Tipo de Operação */}
          <FormField
            control={form.control}
            name="operation"
            render={({ field }) => {
              const isIn = field.value === Operation.IN;
              const isOut = field.value === Operation.OUT;

              return (
                <FormItem>
                  <FormLabel>Tipo de Operação</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 text-sm font-medium",
                          isIn
                            ? "border-green-950 bg-green-100 text-green-800"
                            : isOut
                              ? "border-red-900 bg-red-100 text-red-800"
                              : "border border-primary",
                        )}
                      >
                        {isIn ? (
                          <div className="flex items-center gap-2">
                            <ArrowUpCircle className="h-4 w-4" />{" "}
                            <SelectValue />
                          </div>
                        ) : isOut ? (
                          <div className="flex items-center gap-2">
                            <ArrowDownCircle className="h-4 w-4" />{" "}
                            <SelectValue />
                          </div>
                        ) : (
                          <SelectValue placeholder="Saída ou entrada" />
                        )}
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {operationOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {OPERATION_LABELS[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/**
           * 2) Quantidade só se operação ≠ NOONE.
           *    Quando for NOONE, esse FormField não será renderizado e o próximo ficará no lugar.
           */}
          {oper !== Operation.NOONE && (
            <FormField
              control={form.control}
              name="operationQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quantidade{" "}
                    {oper === Operation.IN
                      ? "de entrada"
                      : oper === Operation.OUT && "de saída"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="disabled:border-0"
                      type="number"
                      disabled={operation === Operation.NOONE}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/** 3) Preço do produto */}
          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <PriceInput field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** 4) Nome do item */}
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do item</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** 5) Valor crítico do estoque */}
          <FormField
            control={form.control}
            name="criticalStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor crítico do estoque</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** 6) Barraca só para ADMIN */}
          {user?.role === "ADMIN" && (
            <FormField
              control={form.control}
              name="stallId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barraca</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={String(field.value)}
                    >
                      <SelectTrigger className="border border-primary">
                        <SelectValue placeholder="Selecione a Barraca" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </form>
    </Form>
  );
}
