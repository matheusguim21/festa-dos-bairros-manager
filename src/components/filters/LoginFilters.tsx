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
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/api/auth.service";
import { useEffect } from "react";
import { useAuth } from "@/contexts/Auth.context";

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
  });

  if (data) {
    signIn(data);
  }

  return (
    <Form {...form}>
      <div className="flex flex-1 flex-col gap-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input className="border-2" placeholder="" {...field} />
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
    </Form>
  );
}
