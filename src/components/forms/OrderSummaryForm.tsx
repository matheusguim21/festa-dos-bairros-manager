import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { OrderSummaryFormProps } from "@/types/schemas/order-summary-schema";

type Props = {
  form: UseFormReturn<OrderSummaryFormProps>;
};

export function OrderSummaryForm({ form }: Props) {
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="buyerName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="buyerName"
                  placeholder="Nome do cliente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
