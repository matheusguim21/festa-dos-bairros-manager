import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/api/productService";

import { PriceInput } from "../inputs/PriceInput";
import { StallSelectInput } from "../inputs/StallInput";
import { CriticalStockInput } from "../inputs/CriticalStockinput";
import { QuantityInput } from "../inputs/QuantityInpur";
import { useAuth } from "@/contexts/Auth.context";

const AddProductSchema = z.object({
  productName: z
    .string({
      message: "Campo obrigatório",
    })
    .min(2, "Campo obrigatório"),
  productAmount: z.coerce.number().min(1, "O valor deve ser maior que 0"),
  price: z.coerce.number().min(1, "O valor deve ser maior que 0"),
  stallId: z.string({
    message: "A barraca é obrigatória",
  }),
  criticalStock: z.coerce.number(),

  // productImage: z
  //   .instanceof(File, {
  //     message: "Campo obrigatório",
  //   })
  //   .refine(
  //     (file) =>
  //       [
  //         "image/png",
  //         "image/jpeg",
  //         "image/jpg",
  //         "image/svg+xml",
  //         "image/gif",
  //       ].includes(file.type),
  //     { message: "Arquivo inválido" },
  //   )
  //   .optional(),
});

export type AddProductForm = z.infer<typeof AddProductSchema>;

interface Props {
  handleCloseModal: () => void;
}

export function AddProductForm({ handleCloseModal }: Props) {
  const { user } = useAuth();
  const form = useForm<AddProductForm>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      productAmount: 1,
      price: 0,
      productName: "",
      criticalStock: 0,
      stallId: user?.stall?.id.toString(),
    },
  });
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
    handleCloseModal();
    toast("Produto adicionado com sucesso");
  };
  const { mutate } = useMutation({
    mutationFn: productsService.createProductItem, // recebe (data: AddProductForm)
    onSuccess: onSuccess,
    onError: (error) => {
      toast.error("Erro ao adicionar produto");
      console.error("Erro ao criar item:", error);
    },
  });

  const onSubmit = async (formData: AddProductForm) => {
    console.log(formData);

    mutate(formData);
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome"
                  className="flex-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço do Item</FormLabel>
              <FormControl>
                <PriceInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="stallId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barraca</FormLabel>
              <FormControl>
                <StallSelectInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <QuantityInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="criticalStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque Ctítico</FormLabel>
              <FormControl>
                <CriticalStockInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button
        className="text-background"
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
      >
        Salvar
      </Button>
    </Form>
  );
}
