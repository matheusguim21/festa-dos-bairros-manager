import { ControllerRenderProps, FieldPath } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMemo } from "react";

interface Props<
  TFieldValues extends Record<string, any>,
  TName extends FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
}

interface CriticalStockInputProps<
  TFieldValues extends Record<string, any>,
  TName extends FieldPath<TFieldValues>,
> extends Props<TFieldValues, TName> {}

const generateCriticalStockOptions = () => {
  const options = [];
  options.push({
    value: "Selecione o nível crítico",
    label: "Selecione o nível crítico",
  });
  for (let i = 0; i <= 100; i += 5) {
    options.push({
      value: i.toString(),
      label: i === 0 ? "Sem limite crítico" : `${i} unidades`,
    });
  }
  return options;
};

export function CriticalStockInput<
  TFieldValues extends Record<string, any>,
  TName extends FieldPath<TFieldValues>,
>({ field }: CriticalStockInputProps<TFieldValues, TName>) {
  const criticalStockOptions = useMemo(
    () => generateCriticalStockOptions(),
    [],
  );

  return (
    <Select
      onValueChange={(value) => field.onChange(Number(value))}
      value={String(field.value)}
      defaultValue="0"
    >
      <SelectTrigger className="h-11 text-base">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {criticalStockOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
