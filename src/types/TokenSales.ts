import { ClassNameValue } from "tailwind-merge";

// src/constants/fichas.ts
export const FICHAS = [1, 2, 5, 10, 20, 25] as const;
export type FichaValue = (typeof FICHAS)[number];

// Você pode ajustar essas cores conforme quiser.
export const fichaColorMap: Record<FichaValue, ClassNameValue> = {
  1: "bg-brown hover:bg-brown/90",
  2: "bg-green-600 hover:bg-green-600",
  5: "bg-red-500 hover:bg-red-600",
  10: "bg-black hover:bg-black/80",
  20: "bg-indigo-900 hover:bg-indigo-700",
  25: "bg-indigo-300 hover:bg-indigo-500",
};
