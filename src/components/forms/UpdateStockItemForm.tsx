"use client";

import { useEffect, useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceInput } from "../inputs/PriceInput";
import {
  Operation,
  type UpdateStockItemFormData,
} from "@/types/schemas/update-stock-item-schema";
import { getAllStalls } from "@/api/shared/get-stalls";
import { useAuth } from "@/contexts/Auth.context";
import { QuantityInput } from "../inputs/QuantityInpur";
import { CriticalStockInput } from "../inputs/CriticalStockinput";

interface Props {
  form: UseFormReturn<UpdateStockItemFormData>;
}

export function UpdateStockItemForm({ form }: Props) {
  const operation = form.watch("operation");
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["stalls"],
    queryFn: getAllStalls,
  });

  const options = useMemo(() => {
    const stalls = data || [];
    return stalls.map((stall) => ({
      value: stall.id.toString(),
      label: stall.name,
    }));
  }, [data]);

  // Reset quantity when operation changes to NOONE
  useEffect(() => {
    if (operation === Operation.NOONE) {
      form.setValue("operationQuantity", 0, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [operation, form]);

  // Show only operation fields for IN/OUT operations
  if (operation === Operation.IN || operation === Operation.OUT) {
    return (
      <Form {...form}>
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {operation === Operation.IN
                  ? "Entrada de Estoque"
                  : "Saída de Estoque"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="operationQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Quantidade{" "}
                        {operation === Operation.IN ? "de entrada" : "de saída"}
                      </FormLabel>
                      <FormControl>
                        <QuantityInput
                          value={field.value || 0}
                          onChange={field.onChange}
                          min={1}
                          max={100}
                          variant={
                            operation === Operation.IN
                              ? "success"
                              : "destructive"
                          }
                          size="md"
                          placeholder="Digite a quantidade"
                        />
                        {/* <Input
                          type="number"
                          min="1"
                          placeholder="0"
                          className={cn(
                            "h-11 text-base transition-all",
                            operation === Operation.IN &&
                              "border-green-500 focus-visible:ring-green-500",
                            operation === Operation.OUT &&
                              "border-red-500 focus-visible:ring-red-500",
                          )}
                          {...field}
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Stall selection for admin users */}
              {user?.role === "ADMIN" && (
                <FormField
                  control={form.control}
                  name="stallId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Barraca
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={String(field.value)}
                        >
                          <SelectTrigger className="h-11 text-base">
                            <SelectValue placeholder="Selecione a Barraca" />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    );
  }

  // Full form for other operations (NOONE or product updates)
  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Product details section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalhes do Produto</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-end space-y-4">
            <div className="grid items-end gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do produto"
                        className="h-11 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Preço
                    </FormLabel>
                    <FormControl>
                      <PriceInput field={field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stock settings section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configurações de Estoque</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="criticalStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Nível crítico de estoque
                  </FormLabel>
                  <FormControl>
                    <CriticalStockInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stall selection for admin users */}
            {user?.role === "ADMIN" && (
              <FormField
                control={form.control}
                name="stallId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Barraca
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        <SelectTrigger className="h-11 text-base">
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
