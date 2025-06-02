import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useQuery } from "@tanstack/react-query";
import { getAllStalls } from "@/api/shared/get-stalls";
import { useMemo } from "react";
import { CashierProductsForm } from "@/types/schemas/cashier-products-search";

type Props = {
  form: UseFormReturn<CashierProductsForm>;
};

export function CashierForm({ form }: Props) {
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
  return (
    <Form {...form}>
      <div className="flex flex-1 items-end gap-5">
        <FormField
          control={form.control}
          name="productName"
          render={({ field: { name, onChange, disabled, value } }) => (
            <FormItem className="flex max-h-12 w-96 items-center gap-4 rounded-xl border bg-secondary p-0">
              <FormControl>
                <Input
                  className="border-0 placeholder:text-gray-400 sm:text-sm"
                  placeholder="nome do produto"
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  name={name}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stallId"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center">
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
                    <SelectItem value={"undefined"}>Nenhuma</SelectItem>
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
      </div>
    </Form>
  );
}
