import Cashier from "@/pages/private/cashier";
import Vendas from "@/pages/private/orders/orders-history";
import OrdersToPrepare from "@/pages/private/orders/OrdersToPrepare";
import StallOrder from "@/pages/private/orders/stall-order";
import { Stock } from "@/pages/private/stock";
import { Role } from "@/types/Role";
import { Store, ScrollText } from "lucide-react";
import { ReactNode } from "react";
import { RouteObject } from "react-router";

export interface RoleRoute extends Omit<RouteObject, "children"> {
  path?: string;
  index?: boolean;
  element: React.ReactNode;
  /** Quem pode acessar */
  allowed: Role[];
  /** Se aparecerá no menu */
  label?: string;
  icon?: ReactNode;
}

export const roleRoutes: Record<Role, RoleRoute[]> = {
  [Role.STALL_SELLER]: [
    {
      index: true,
      element: <StallOrder />,
      allowed: [Role.STALL_SELLER],
      label: "Ínicio",
      icon: <Store size={20} />,
    },
    {
      path: "pedidos",
      allowed: [Role.STALL_SELLER],
      element: <Vendas />,
      label: "Pedidos",
      icon: <ScrollText size={20} />,
    },
  ],
  [Role.STALL_SUPPORT]: [
    { index: true, element: <Stock />, allowed: [Role.STALL_SUPPORT] },
    { path: "vendas", element: <Vendas />, allowed: [Role.STALL_SUPPORT] },
  ],
  [Role.ORDER_PREPARER]: [
    {
      index: true,
      element: <OrdersToPrepare />,
      allowed: [Role.ORDER_PREPARER],
    },
  ],
  [Role.ADMIN]: [
    { index: true, element: <StallOrder />, allowed: [Role.ADMIN] },
    { path: "vendas", element: <Vendas />, allowed: [Role.ADMIN] },
    { path: "estoque", element: <Stock />, allowed: [Role.ADMIN] },
  ],
  [Role.CASHIER]: [
    {
      path: "caixa",
      element: <Cashier />,
      allowed: [Role.ADMIN],
    },
  ],
};
