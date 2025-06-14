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
        <form className="flex flex-wrap gap-3 xs:w-full xs:flex-col md:w-full md:flex-row">
          <FormField
            control={form.control}
            name="productName"
            render={({ field: { name, onChange, disabled, value } }) => (
              <FormItem className="flex w-full items-center gap-4 rounded border bg-secondary p-0">
                <Search className="ml-2 text-muted-foreground" />

                <Input
                  className="w-full border-0 placeholder:text-gray-400 sm:text-sm"
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
                    <StallSelectInput {...field} />
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
