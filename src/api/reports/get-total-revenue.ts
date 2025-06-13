import { api } from "../api";

export async function getTotalRevenue(): Promise<{
  totalRevenue: number;
}> {
  const response = await api.get("/reports/receita-total");

  return response.data;
}
