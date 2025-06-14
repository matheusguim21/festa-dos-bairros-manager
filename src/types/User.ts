import { Role } from "./Role";
import { Stall } from "./Stall";

export type User = {
  id: number;
  username: string;
  name: string;
  role: Role;
  stall?: Stall;
};
