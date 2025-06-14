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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PriceInput } from "../inputs/PriceInput";
import {
  Operation,
  type UpdateStockItemFormData,
} from "@/types/schemas/update-stock-item-schema";
import { getAllStalls } from "@/api/shared/get-stalls";
import { useAuth } from "@/contexts/Auth.context";
import { QuantityInput } from "../inputs/QuantityInpur";
import { CriticalStockInput } from "../inputs/CriticalStockinput";
import type { Product } from "@/types/Product";
import { Package, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  form: UseFormReturn<UpdateStockItemFormData>;
  product: Product;
}

export function UpdateStockItemForm({ form, product }: Props) {
  const operation = form.watch("operation");
  const operationQuantity = form.watch("operationQuantity") || 0;
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

  // Calculate stock status and new quantity
  const stockInfo = useMemo(() => {
    const currentStock = product.quantity || 0;
    const criticalStock = product.criticalStock || 5;
    const newStock =
      operation === Operation.IN
        ? currentStock + operationQuantity
        : operation === Operation.OUT
          ? Math.max(0, currentStock - operationQuantity)
          : currentStock;

    const getStockStatus = (stock: number) => {
      if (stock === 0)
        return {
          level: "out",
          label: "Sem estoque",
          color: "text-red-600",
          bgColor: "bg-red-50",
          icon: AlertTriangle,
        };
      if (stock <= criticalStock)
        return {
          level: "critical",
          label: "Crítico",
          color: "text-red-600",
          bgColor: "bg-red-50",
          icon: AlertTriangle,
        };
      if (stock <= criticalStock * 2)
        return {
          level: "low",
          label: "Baixo",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          icon: AlertTriangle,
        };
      return {
        level: "normal",
        label: "Normal",
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: Package,
      };
    };

    return {
      current: currentStock,
      new: newStock,
      difference: newStock - currentStock,
      currentStatus: getStockStatus(currentStock),
      newStatus: getStockStatus(newStock),
      criticalStock,
    };
  }, [product.quantity, product.criticalStock, operation, operationQuantity]);

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
    const CurrentIcon = stockInfo.currentStatus.icon;
    const NewIcon = stockInfo.newStatus.icon;

    return (
      <div className="space-y-3 p-3">
        <Form {...form}>
          <form className="space-y-3">
            {/* Current Stock Display - Compacto */}
            <div
              className={cn(
                "rounded-lg border-l-4 p-3",
                stockInfo.currentStatus.bgColor,
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CurrentIcon
                    className={cn("h-4 w-4", stockInfo.currentStatus.color)}
                  />
                  <span className="text-sm font-medium">Atual:</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-bold",
                      stockInfo.currentStatus.color,
                    )}
                  >
                    {stockInfo.current}
                  </Badge>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stockInfo.currentStatus.label}
                </Badge>
              </div>
            </div>

            {/* Quantity Input */}
            <FormField
              control={form.control}
              name="operationQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Quantidade{" "}
                    {operation === Operation.IN ? "de entrada" : "de saída"}
                  </FormLabel>
                  <FormControl>
                    <QuantityInput
                      value={field.value || 0}
                      onChange={field.onChange}
                      min={1}
                      max={
                        operation === Operation.OUT ? stockInfo.current : 1000
                      }
                      variant={
                        operation === Operation.IN ? "success" : "destructive"
                      }
                      size="sm"
                      placeholder="Digite a quantidade"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock Preview - Compacto */}
            {operationQuantity > 0 && (
              <div
                className={cn(
                  "rounded-lg border-l-4 p-3",
                  stockInfo.newStatus.bgColor,
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <NewIcon
                        className={cn("h-4 w-4", stockInfo.newStatus.color)}
                      />
                      <span className="text-sm font-medium">Após:</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-bold",
                          stockInfo.newStatus.color,
                        )}
                      >
                        {stockInfo.new}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stockInfo.newStatus.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Alteração:
                    </span>
                    <Badge
                      variant={
                        stockInfo.difference > 0 ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {stockInfo.difference > 0 ? "+" : ""}
                      {stockInfo.difference}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Warning for OUT operations */}
            {operation === Operation.OUT &&
              operationQuantity > stockInfo.current && (
                <Alert variant="destructive" className="p-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Quantidade maior que estoque atual. Estoque ficará zerado.
                  </AlertDescription>
                </Alert>
              )}

            {/* Stall selection for admin users */}
            {user?.role === "ADMIN" && (
              <FormField
                control={form.control}
                name="stallId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Barraca
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        <SelectTrigger className="h-9 text-sm">
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
          </form>
        </Form>
      </div>
    );
  }

  // Full form for other operations (NOONE or product updates) - Mais compacto
  return (
    <div className="space-y-3 p-3">
      <Form {...form}>
        <form className="space-y-3">
          {/* Current Stock Info - Compacto */}
          <div
            className={cn(
              "rounded-lg border-l-4 p-3",
              stockInfo.currentStatus.bgColor,
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Estoque:</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-bold",
                    stockInfo.currentStatus.color,
                  )}
                >
                  {stockInfo.current}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {stockInfo.currentStatus.label}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Crítico: {stockInfo.criticalStock}
              </div>
            </div>
          </div>

          {/* Product details section - Compacto */}
          <Card className="border-0 shadow-none">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-base">Detalhes do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 pt-0">
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do produto"
                          className="h-9 text-sm"
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
                      <FormLabel className="text-sm font-medium">
                        Preço
                      </FormLabel>
                      <FormControl>
                        <PriceInput field={field} className="h-9" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stock settings section - Compacto */}
          <Card className="border-0 shadow-none">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-base">
                Configurações de Estoque
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 pt-0">
              <FormField
                control={form.control}
                name="criticalStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
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
                      <FormLabel className="text-sm font-medium">
                        Barraca
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={String(field.value)}
                        >
                          <SelectTrigger className="h-9 text-sm">
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
    </div>
  );
}
