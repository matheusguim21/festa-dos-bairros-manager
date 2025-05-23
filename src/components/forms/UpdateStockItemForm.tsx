import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
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

interface Props {
  form: UseFormReturn<UpdateStockItemFormData>;
}

export function UpdateStockItemForm({ form }: Props) {
  const operationOptions = Object.values(Operation);

  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="operation"
            render={({ field }) => {
              const isIn = field.value === Operation.IN;

              return (
                <FormItem key={field.value}>
                  <FormLabel>Tipo de Operação</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                          isIn
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800",
                        )}
                      >
                        {isIn ? (
                          <div className="flex">
                            <ArrowUpCircle className="h-4 w-4" />{" "}
                            <SelectValue />
                          </div>
                        ) : (
                          <div className="flex">
                            <ArrowDownCircle className="h-4 w-4" />{" "}
                            <SelectValue />
                          </div>
                        )}
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {operationOptions.map((option) => (
                          <SelectItem value={option}>
                            {OPERATION_LABELS[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel>Nome do item</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <PriceInput field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operationQuantity"
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
