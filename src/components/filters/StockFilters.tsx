import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { SearchStockItemForm } from "@/pages/private/stock";

import { StallSelectInput } from "../inputs/StallInput";
import { useAuth } from "@/contexts/Auth.context";
import { Role } from "@/types/Role";

interface Props {
  form: UseFormReturn<SearchStockItemForm>;
}

export function StockFilters({ form }: Props) {
  const { user } = useAuth();

  return (
    <div className="flex gap-5">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="productName"
            render={({ field: { name, onChange, disabled, value } }) => (
              <FormItem className="flex w-96 items-center gap-4 rounded-xl border bg-secondary p-0">
                <div className="h-full rounded-s-xl bg-muted-foreground/10 p-2">
                  <Search className="text-muted-foreground" />
                </div>
                <Input
                  className="border-0 placeholder:text-gray-400 sm:text-sm"
                  placeholder="nome do produto"
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  name={name}
                />
              </FormItem>
            )}
          />
          {user?.role === Role.ADMIN && (
            <FormField
              control={form.control}
              name="stallId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <StallSelectInput field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </div>
  );
}
