import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { PasswordInput } from "../inputs/PasswordInput";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/api/auth.service";
import { useAuth } from "@/contexts/Auth.context";
import { toast } from "sonner";
import { AxiosError } from "axios";

const LoginSchema = z.object({
  username: z.string({
    message: "Campo Obrigatório",
  }),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra e um número.",
  }),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export function LoginFilters() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      username: undefined,
    },
  });

  const { signIn } = useAuth();
  const onSubmit = async (formData: LoginForm) => {
    console.log("Form Data: ", formData);

    mutate(formData);
  };
  const { mutate, data } = useMutation({
    mutationFn: AuthService.login,
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("Erro:", error);

        if (error.code === "ERR_NETWORK") {
          toast.error("Erro de conexão com a API", { className: "mb-5" });
          return; // ← IMPORTANTE: garantir que o código não continue
        }

        toast.error(error.response?.data.message ?? "Erro desconhecido", {
          className: "mb-5",
        });
        return;
      }

      toast.error(error.message ?? "Erro desconhecido", { className: "mb-5" });
    },
  });

  if (data) {
    signIn(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col gap-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input
                    autoCapitalize="none"
                    className="border-2"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordInput fieldName="password" form={form} />
          <Button
            className="w-full text-background"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
