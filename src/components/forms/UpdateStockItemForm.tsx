import { useEffect, useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PriceInput } from "../inputs/PriceInput";
import { cn } from "@/lib/utils";
import {
  Operation,
  type UpdateStockItemFormData,
} from "@/types/schemas/update-stock-item-schema";
import { getAllStalls } from "@/api/shared/get-stalls";
import { useAuth } from "@/contexts/Auth.context";

interface Props {
  form: UseFormReturn<UpdateStockItemFormData>;
}

export function UpdateStockItemForm({ form }: Props) {
  const operation = form.watch("operation");
  const { user } = useAuth();

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

  // Reset quantity when operation changes to NOONE
  useEffect(() => {
    if (operation === Operation.NOONE) {
      form.setValue("operationQuantity", 0, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [operation, form]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        {/* Show quantity field only for IN/OUT operations */}
        <div className="grid grid-cols-2 items-stretch gap-3">
          {operation !== Operation.NOONE && (
            <FormField
              control={form.control}
              name="operationQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quantidade{" "}
                    {operation === Operation.IN ? "de entrada" : "de saída"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      className={cn(
                        "transition-all",
                        operation === Operation.IN &&
                          "border-green-500 focus-visible:ring-green-500",
                        operation === Operation.OUT &&
                          "border-red-500 focus-visible:ring-red-500",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="criticalStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível crítico de estoque</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Product details section */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        {/* Stock settings section */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Stall selection for admin users */}
          {user?.role === "ADMIN" && (
            <FormField
              control={form.control}
              name="stallId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barraca</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
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
