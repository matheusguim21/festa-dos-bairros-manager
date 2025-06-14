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
import { useAuth } from "@/contexts/Auth.context";
import { Role } from "@/types/Role";

interface StallSelectInputProps {
  onChange: (value: string) => void;
  value: string | undefined;
}

export function StallSelectInput({ onChange, value }: StallSelectInputProps) {
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
      onValueChange={(val) => onChange(val)}
      value={value}
    >
      <SelectTrigger className="h-11 w-full">
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
