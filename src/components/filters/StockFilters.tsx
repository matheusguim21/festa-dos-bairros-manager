// components/StockFilters.tsx
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface Props {
  control: any;
  handleSearch: () => void;
}

export function StockFilters({ control, handleSearch }: Props) {
  return (
    <div className="flex gap-5">
      <Controller
        control={control}
        name="search"
        render={({ field: { name, onChange, disabled, value } }) => (
          <div className="flex w-96 items-center gap-4 rounded-xl border bg-secondary p-0">
            <Input
              className="border-0 placeholder:text-gray-400 sm:text-sm"
              placeholder="nome do produto"
              value={value}
              onChange={onChange}
              disabled={disabled}
              name={name}
            />
            <div
              className="flex h-full w-[20%] cursor-pointer items-center justify-center rounded-r-lg bg-primary"
              onClick={handleSearch}
            >
              <Search className="text-background" />
            </div>
          </div>
        )}
      />
      <Controller
        control={control}
        name="limit"
        render={({ field }) => (
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["5", "10", "20", "50"].map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
