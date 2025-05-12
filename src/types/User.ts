import { Stall } from "./Stall";

export type User = {
  id: number;
  username: string;
  name: string;
  role: "STALL" | "ADMIN";
  stall: Stall;
};
