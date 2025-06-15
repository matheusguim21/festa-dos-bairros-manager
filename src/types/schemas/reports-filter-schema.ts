import { z } from "zod";

export const filtersSchema = z.object({
  searchTerm: z.string().default(""),
  stallId: z.string().default("all"),
  sortBy: z.enum(["totalSold", "revenue", "name"]).default("totalSold"),
  festivalDay: z.enum(["all", "2025-06-13", "2025-06-14"]).default("all"),
  page: z.number().min(0).default(0),
  limit: z.number().min(1).max(100).default(10),
});

export type FiltersFormData = z.infer<typeof filtersSchema>;

// Constantes para as datas da festa
export const FESTIVAL_DATES = {
  DAY_1: "2025-06-13",
  DAY_2: "2025-06-14",
} as const;

// Helper para formatar as datas corretamente no fuso horário brasileiro
export const formatFestivalDate = (dateString: string) => {
  // Cria a data adicionando o horário para evitar problemas de fuso horário
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // month - 1 porque Date usa 0-11 para meses

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo", // Força o fuso horário de São Paulo
  });
};

// Helper alternativo usando formatação manual
export const formatFestivalDateSafe = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const monthIndex = Number.parseInt(month) - 1;
  return `${Number.parseInt(day)} de ${monthNames[monthIndex]} de ${year}`;
};
