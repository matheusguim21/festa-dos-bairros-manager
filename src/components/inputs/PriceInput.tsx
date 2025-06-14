import { Input } from "@/components/ui/input";

import { ControllerRenderProps, FieldValues } from "react-hook-form";

type PriceInputProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, any>;
  className?: string | undefined;
};

export function PriceInput<T extends FieldValues>({
  field,
  className,
}: PriceInputProps<T>) {
  return (
    <Input
      className={className}
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
  );
}
