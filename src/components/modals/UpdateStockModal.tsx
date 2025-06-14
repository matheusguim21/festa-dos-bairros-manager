"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Package2,
  Edit,
  Save,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpdateStockItemForm } from "../forms/UpdateStockItemForm";
import { cn } from "@/lib/utils";
import { productsService } from "@/api/productService";
import type { Product } from "@/types/Product";
import {
  createUpdateStockItemSchema,
  Operation,
  type UpdateStockItemFormData,
} from "@/types/schemas/update-stock-item-schema";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  product: Product;
}

export function UpdateStockModal({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const dynamicSchema = createUpdateStockItemSchema(product.quantity);
  const form = useForm<UpdateStockItemFormData>({
    defaultValues: {
      operation: Operation.NOONE,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      operationQuantity: 0,
      criticalStock: product.criticalStock,
      stallId: product.stallId,
    },
    resolver: zodResolver(dynamicSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: productsService.updateProduct,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stalls"] });
      toast.success("Produto atualizado com sucesso");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  // Handle keyboard visibility detection
  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      const isKeyboardVisible = window.visualViewport
        ? window.visualViewport.height < window.innerHeight * 0.75
        : false;

      setKeyboardVisible(isKeyboardVisible);
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "SELECT") {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 300);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    } else {
      window.addEventListener("resize", handleResize);
    }

    document.addEventListener("focusin", handleFocus);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
      document.removeEventListener("focusin", handleFocus);
    };
  }, [open]);

  const onSubmit = async (formData: UpdateStockItemFormData) => {
    const {
      criticalStock,
      operation,
      operationQuantity,
      productId,
      productPrice,
      productName,
      stallId,
    } = formData;

    mutate({
      name: productName,
      price: productPrice,
      productId: productId,
      quantity: operationQuantity,
      stallId: stallId,
      criticalStock,
      operation,
    });
  };

  const operation = form.watch("operation");

  useEffect(() => {
    if (open) {
      form.reset({
        operation: Operation.NOONE,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        operationQuantity: 0,
        criticalStock: product.criticalStock,
        stallId: product.stallId,
      });
    }
  }, [open, product, form]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        form.reset({
          operation: Operation.NOONE,
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          operationQuantity: 0,
          criticalStock: product.criticalStock,
          stallId: product.stallId,
        });
        setKeyboardVisible(false);
      }, 300);
    }
  }, [open, form, product]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button
          variant="outline"
          className="w-full gap-2 text-primary"
          onClick={() => setOpen(true)}
        >
          <Edit className="h-4 w-4" />
          Alterar Produto
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "w-full max-w-[95vw] gap-0 p-0 sm:max-w-[600px]",
          // Altura dinâmica baseada no viewport
          "max-h-[95vh] sm:max-h-[90vh]",
          keyboardVisible && "max-h-[60vh]",
        )}
      >
        {/* Header fixo */}
        <DialogHeader className="border-b p-4 pb-2">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Package2 className="h-5 w-5" />
            Gerenciamento de Produto
          </DialogTitle>
          <DialogDescription className="text-sm">
            Atualize informações ou estoque de{" "}
            <span className="font-medium text-foreground">{product.name}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Área de scroll com o conteúdo */}
        <ScrollArea
          ref={scrollAreaRef}
          className={cn(
            "flex-1 px-4",
            keyboardVisible ? "max-h-[35vh]" : "max-h-[65vh] sm:max-h-[60vh]",
          )}
        >
          <div className="py-2">
            {/* Operation selection buttons */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={operation === Operation.NOONE ? "default" : "outline"}
                size="sm"
                className={cn(
                  "gap-1 text-xs transition-all sm:text-sm",
                  operation === Operation.NOONE &&
                    "bg-blue-600 text-background hover:bg-blue-700",
                )}
                onClick={() => form.setValue("operation", Operation.NOONE)}
              >
                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                Editar
              </Button>
              <Button
                type="button"
                variant={operation === Operation.IN ? "default" : "outline"}
                size="sm"
                className={cn(
                  "gap-1 text-xs transition-all sm:text-sm",
                  operation === Operation.IN &&
                    "bg-green-600 text-background hover:bg-green-700",
                )}
                onClick={() => form.setValue("operation", Operation.IN)}
              >
                <ArrowUpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                Entrada
              </Button>

              <Button
                type="button"
                variant={operation === Operation.OUT ? "default" : "outline"}
                size="sm"
                className={cn(
                  "gap-1 text-xs transition-all sm:text-sm",
                  operation === Operation.OUT &&
                    "bg-red-600 text-background hover:bg-red-700",
                )}
                onClick={() => form.setValue("operation", Operation.OUT)}
              >
                <ArrowDownCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                Saída
              </Button>
            </div>

            {/* Form container */}
            <div
              className={cn(
                "w-full rounded-lg transition-all",
                operation === Operation.IN &&
                  "border border-green-200 bg-green-50/50",
                operation === Operation.OUT &&
                  "border border-red-200 bg-red-50/50",
                operation === Operation.NOONE &&
                  "border border-blue-200 bg-blue-50/50",
              )}
            >
              <UpdateStockItemForm form={form} product={product} />
            </div>

            {/* Espaçador para o teclado */}
            {keyboardVisible && <div className="h-4" />}
          </div>
        </ScrollArea>

        {/* Footer fixo */}
        <DialogFooter
          className={cn(
            "gap-2 border-t bg-background p-4 pt-2 sm:gap-0",
            keyboardVisible && "sticky bottom-0",
          )}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            size="sm"
            className="flex-1 sm:flex-none"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            size="sm"
            className={cn(
              "flex-1 gap-2 text-background sm:flex-none",
              operation === Operation.IN && "bg-green-600 hover:bg-green-700",
              operation === Operation.OUT && "bg-red-600 hover:bg-red-700",
              operation === Operation.NOONE && "bg-blue-600 hover:bg-blue-700",
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? (
              <>Processando...</>
            ) : (
              <>
                {operation === Operation.IN ? (
                  <ArrowDownCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : operation === Operation.OUT ? (
                  <ArrowUpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
                <span className="text-xs sm:text-sm">
                  {operation === Operation.NOONE ? "Salvar" : "Atualizar"}
                </span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
