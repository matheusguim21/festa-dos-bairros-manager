import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Props {
  control: any;
}

export function StockFilters({ control }: Props) {
  return (
    <div className="flex gap-5">
      <Controller
        control={control}
        name="productName"
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
          </div>
        )}
      />
    </div>
  );
}
