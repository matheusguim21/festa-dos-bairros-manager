import { Stall } from "./Stall";

export type User = {
  id: number;
  username: string;
  name: string;
  role: "ADMIN" | "STALL_SELLER" | "ORDER_PREPARER" | "CASHIER";
  stall: Stall;
};
