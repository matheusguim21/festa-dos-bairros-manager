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
import { AlertDemo } from "../test/AlertDemo";
import { toast } from "sonner";

const AddProductSchema = z.object({
  productName: z.string(),
  productAmount: z.coerce.number(),
  measureUnity: z.string(),
  productImage: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" },
    ),
});

type AddProductForm = z.infer<typeof AddProductSchema>;

interface Props {
  handleCloseModal: () => void;
}

export function AddProducForm({ handleCloseModal }: Props) {
  const form = useForm<AddProductForm>({
    resolver: zodResolver(AddProductSchema),
  });

  const onSubmit = async (values: AddProductForm) => {
    console.log(values);
    handleCloseModal();
    toast("Produto adicionado com sucesso");
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
                <Input type="number" {...field} />
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
        <FormField
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
        />
      </div>
      <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
        Salvar
      </Button>
    </Form>
  );
}
