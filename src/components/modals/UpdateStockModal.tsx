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
      // Invalidate specific queries to ensure fresh data
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
      // Detect if keyboard is visible on mobile
      const isKeyboardVisible = window.visualViewport
        ? window.visualViewport.height < window.innerHeight * 0.75
        : false;

      setKeyboardVisible(isKeyboardVisible);
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "SELECT") {
        // Small delay to ensure keyboard is shown
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 300);
      }
    };

    // Add event listeners
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
      // Reset form with current product values when modal opens
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
      // Reset form when modal closes
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
          "p-3 transition-all duration-300 xs:w-[97%]",
          // Adjust modal height when keyboard is visible
          keyboardVisible
            ? "max-h-[50vh] sm:max-h-[70vh]"
            : "max-h-[90vh] sm:max-h-[85vh]",
        )}
      >
        <ScrollArea
          ref={scrollAreaRef}
          className={cn(
            "w-full transition-all duration-300",
            keyboardVisible ? "h-[40vh]" : "h-auto",
          )}
        >
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Package2 className="h-5 w-5" />
              Gerenciamento de Produto
            </DialogTitle>
            <DialogDescription className="pt-2 text-base">
              Atualize informações ou estoque de{" "}
              <span className="font-medium text-foreground">
                {product.name}
              </span>
            </DialogDescription>
          </DialogHeader>

          {/* Operation selection buttons */}
          <div className="mb-4 mt-2 grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={operation === Operation.NOONE ? "default" : "outline"}
              className={cn(
                "gap-1 transition-all",
                operation === Operation.NOONE &&
                  "bg-blue-600 text-background hover:bg-blue-700",
              )}
              onClick={() => form.setValue("operation", Operation.NOONE)}
            >
              <Edit className="h-4 w-4" />
              Editar
            </Button>
            <Button
              type="button"
              variant={operation === Operation.IN ? "default" : "outline"}
              className={cn(
                "gap-1 transition-all",
                operation === Operation.IN &&
                  "bg-green-600 text-background hover:bg-green-700",
              )}
              onClick={() => form.setValue("operation", Operation.IN)}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Entrada
            </Button>

            <Button
              type="button"
              variant={operation === Operation.OUT ? "default" : "outline"}
              className={cn(
                "gap-1 transition-all",
                operation === Operation.OUT &&
                  "bg-red-600 text-background hover:bg-red-700",
              )}
              onClick={() => form.setValue("operation", Operation.OUT)}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Saída
            </Button>
          </div>

          {/* Form container with contextual styling */}
          <div
            className={cn(
              "mb-4 w-full rounded-lg transition-all",
              operation === Operation.IN && "border-green-200 bg-green-50",
              operation === Operation.OUT && "border-red-200 bg-red-50",
              operation === Operation.NOONE && "border-blue-200 bg-blue-50",
            )}
          >
            <UpdateStockItemForm product={product} form={form} />
          </div>

          {/* Spacer for keyboard */}
          {keyboardVisible && <div className="h-20" />}
        </ScrollArea>

        <DialogFooter
          className={cn(
            "mt-4 gap-2 transition-all duration-300 sm:gap-0",
            keyboardVisible && "sticky bottom-0 border-t bg-background pt-4",
          )}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "gap-2 text-background",
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
                  <ArrowDownCircle className="h-4 w-4" />
                ) : operation === Operation.OUT ? (
                  <ArrowUpCircle className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {operation === Operation.NOONE
                  ? "Salvar Alterações"
                  : "Atualizar Estoque"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
