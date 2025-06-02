import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberFormatterToCurrency = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency",
});
