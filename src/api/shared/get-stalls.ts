import { Stall } from "@/types/Stall";
import { api } from "../api";

export async function getAllStalls(): Promise<Stall[] | []> {
  try {
    const response = await api.get("/stalls");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
