import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAllStalls } from "@/api/shared/get-stalls";
import { useMemo } from "react";
import { ControllerRenderProps, FieldPath } from "react-hook-form";
import { useAuth } from "@/contexts/Auth.context";
import { Role } from "@/types/Role";

interface Props<
  TFieldValues extends Record<string, any>,
  TName extends FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
}

interface StallSelectInputProps<
  TFieldValues extends Record<string, any>,
  TName extends FieldPath<TFieldValues>,
> extends Props<TFieldValues, TName> {}

export function StallSelectInput<
  TFieldValues extends Record<string, any>,
  TName extends FieldPath<TFieldValues>,
>({ field }: StallSelectInputProps<TFieldValues, TName>) {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["stalls"],
    queryFn: getAllStalls,
  });

  const options = useMemo(() => {
    const stalls = data || [];
    return [
      { value: "Selecione a Barraca", label: "Selecione uma barraca" },
      ...stalls.map((stall) => ({
        value: stall.id.toString(),
        label: stall.name,
      })),
    ];
  }, [data]);

  return (
    <Select
      disabled={user?.role !== Role.ADMIN}
      onValueChange={(val) => field.onChange(Number(val))}
      value={String(field.value)}
    >
      <SelectTrigger className="h-11">
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
  );
}
