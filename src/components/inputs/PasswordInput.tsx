import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { colors } from "@/styles/colors";
import { useRef, useState } from "react";

type PasswordInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  fieldName: string;
};

export function PasswordInput<TFieldValues extends FieldValues>({
  form,
  fieldName,
}: PasswordInputProps<TFieldValues>) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <FormField
      control={form.control}
      name={fieldName as Path<TFieldValues>}
      render={({ field }) => (
        <FormItem>
          <FormLabel onClick={() => passwordRef.current?.focus()}>
            {fieldName === "password" ? "Senha" : "Confirme sua senha"}
          </FormLabel>
          <FormControl>
            <div className="flex items-center justify-between rounded-md border-2 border-primary pr-3">
              <Input
                className="border-0 ring-0"
                type={passwordVisible ? "text" : "password"}
                autoComplete="current-password"
                autoCapitalize="none"
                {...field}
                ref={passwordRef}
              />
              {passwordVisible ? (
                <Eye
                  className="cursor-pointer"
                  color={colors.light.primary}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer"
                  color={colors.light.primary}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
