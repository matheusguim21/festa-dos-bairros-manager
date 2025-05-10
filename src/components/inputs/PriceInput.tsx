import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { AddProductForm } from "./AddProductForm";
type PriceInputProps = {
  form: UseFormReturn<AddProductForm>;
};

export function PriceInput({ form }: PriceInputProps) {
  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Preço</FormLabel>
          <FormControl>
            <Input
              value={
                field.value !== undefined && field.value !== null
                  ? (field.value / 1).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : ""
              }
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                const float = parseFloat(onlyNums) / 100;
                field.onChange(isNaN(float) ? null : float);
              }}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
