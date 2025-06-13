import { Stall } from "./Stall";

export interface Product {
  id: number;
  name: string;
  quantity: number;
  stallId: number;
  stall: Stall;
  price: number;
  criticalStock: number;
  createdAt: string;
  updatedAt: string;
}
