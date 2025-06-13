import CashierPage from "@/pages/private/cashier/CashierPage";
import Vendas from "@/pages/private/orders/orders-history";
import OrdersToPrepare from "@/pages/private/orders/OrdersToPrepare";
import StallOrder from "@/pages/private/orders/stall-order";
import ReportsPage from "@/pages/private/relatorios/Page";
import { Stock } from "@/pages/private/stock";
import { Role } from "@/types/Role";
import {
  Store,
  ScrollText,
  Computer,
  Box,
  ChartNoAxesCombined,
} from "lucide-react";
import { ReactNode } from "react";
import { RouteObject } from "react-router";

export interface RoleRoute extends Omit<RouteObject, "children"> {
  path?: string;
  index?: boolean;
  element: React.ReactNode;
  /** Quem pode acessar */
  // allowed: Role[];
  /** Se aparecerá no menu */
  label?: string;
  icon?: ReactNode;
}

export const roleRoutes: Record<Role, RoleRoute[]> = {
  [Role.STALL_SELLER]: [
    {
      index: true,
      element: <StallOrder />,
      label: "Ínicio",
      icon: <Store size={20} />,
    },
    {
      path: "pedidos",
      element: <Vendas />,
      label: "Pedidos",
      icon: <ScrollText size={20} />,
    },
  ],
  [Role.STALL_SUPPORT]: [
    {
      index: true,
      element: <Stock />,
      label: "Estoque",
      icon: <Box size={20} />,
    },
    {
      path: "pedidos",
      element: <Vendas />,
      label: "Pedidos",
      icon: <ScrollText size={20} />,
    },
  ],
  [Role.STALL_ADMIN]: [
    {
      index: true,
      element: <StallOrder />,
      label: "Venda",
      icon: <Store size={20} />,
    },
    {
      path: "estoque",
      element: <Stock />,
      label: "Estoque",
      icon: <Box size={20} />,
    },
    {
      path: "pedidos",
      element: <Vendas />,
      label: "Pedidos",
      icon: <ScrollText size={20} />,
    },
  ],
  [Role.ORDER_PREPARER]: [
    {
      index: true,
      element: <OrdersToPrepare />,
    },
  ],
  [Role.ADMIN]: [
    // {
    //   index: true,
    //   label: "Início",
    //   element: <Stock />,
    //   icon: <Home size={20} />,
    // },
    {
      index: true,
      label: "Vendas das Barracas",
      element: <Vendas />,
      icon: <ScrollText size={20} />,
    },

    {
      path: "estoque",
      label: "Estoque Geral",
      element: <Stock />,
      icon: <Box size={20} />,
    },
    {
      path: "relatorios",
      element: <ReportsPage />,
      label: "Relatórios",
      icon: <ChartNoAxesCombined size={20} />,
    },
    // {
    //   path: "caixa",
    //   element: <CashierPage />,
    //   label: "Caixa",
    //   icon: <Computer size={20} />,
    // },
  ],
  [Role.CASHIER]: [
    {
      path: "caixa",
      element: <CashierPage />,
      label: "Caixa",
      icon: <Computer size={20} />,
    },
  ],
};
