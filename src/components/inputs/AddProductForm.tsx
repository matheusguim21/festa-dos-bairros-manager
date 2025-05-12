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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/api/productService";
import { getAllStalls } from "@/api/shared/get-stalls";
import { useMemo } from "react";
import { PriceInput } from "./PriceInput";

const AddProductSchema = z.object({
  productName: z.string({
    message: "Campo obrigatório",
  }),
  productAmount: z.coerce.number(),
  price: z.coerce.number(),
  stallId: z.number(),
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
  const form = useForm<AddProductForm>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      productAmount: 1,
      price: 0,
      productName: "",
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

  const onSubmit = async (formData: AddProductForm) => {
    console.log(formData);

    mutate(formData);
  };

  return (
    <Form {...form}>
      <div className="flex justify-start gap-3">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PriceInput form={form} />
      </div>
      <div className="flex flex-row gap-3">
        <FormField
          control={form.control}
          name="productAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  // className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stallId"
          render={({ field }) => (
            <FormItem className="min-w-52">
              <FormLabel>Barraca</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a Barraca" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="productImage"
          render={({ field }) => (
            <FormItem className="w-52">
              <FormLabel>Imagem do Produto</FormLabel>
              <FormControl>
                <Input
                  title="Escolha uma imagem"
                  placeholder="Escolha uma imagem"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) field.onChange(file);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
