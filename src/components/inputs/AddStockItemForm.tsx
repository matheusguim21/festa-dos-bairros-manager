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
import { useMutation } from "@tanstack/react-query";
import { createStockItem } from "@/api/stockService";

const AddProductSchema = z.object({
  productName: z.string({
    message: "Campo obrigatório",
  }),
  productAmount: z.coerce.number(),
  measureUnity: z.string({
    message: "Campo obrigatório",
  }),
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

export type AddStockItemForm = z.infer<typeof AddProductSchema>;

interface Props {
  handleCloseModal: () => void;
}

export function AddStockItemForm({ handleCloseModal }: Props) {
  const form = useForm<AddStockItemForm>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      productAmount: 1,
    },
  });

  const onSuccess = () => {
    handleCloseModal();
    toast("Produto adicionado com sucesso");
  };
  const { mutate } = useMutation({
    mutationFn: createStockItem, // recebe (data: AddStockItemForm)
    onSuccess: onSuccess,
    onError: (error) => {
      toast.error("Erro ao adicionar produto");
      console.error("Erro ao criar item:", error);
    },
  });

  const onSubmit = async (values: AddStockItemForm) => {
    console.log(values);
    mutate(values);
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
        <FormField
          control={form.control}
          name="productAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade do Produto</FormLabel>
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
      </div>
      <div className="flex flex-row gap-3">
        <FormField
          control={form.control}
          name="measureUnity"
          render={({ field }) => (
            <FormItem className="min-w-52">
              <FormLabel>Unidade de medida</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="unidades">unidades</SelectItem>
                  <SelectItem value="kg">quilos</SelectItem>
                  <SelectItem value="l">litros</SelectItem>
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
