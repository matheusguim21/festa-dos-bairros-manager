import { AppLayout } from "@/layouts/app.layout";
import { Stock } from "@/pages/stock/stock";
import Vendas from "@/pages/orders/orders-history";
import {
  Routes,
  Route,
  BrowserRouter,
  createBrowserRouter,
} from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Login } from "@/pages/auth/login";
import StallOrder from "@/pages/orders/stall-order";
import OrdersToPrepare from "@/pages/orders/OrdersToPrepare";

export function AppRoutes() {
  const router = createBrowserRouter([
    {
      element: <PublicRoute />,
      children: [
        {
          path: "/auth/login",
          element: <Login />,
        },
      ],
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <AppLayout />,
          children: [
            {
              index: true,
              element: <StallOrder />,
            },
            {
              path: "estoque",
              element: <Stock />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<Login />} path="/auth/login" />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<StallOrder />} />
            <Route path="estoque" element={<Stock />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="preparing" element={<OrdersToPrepare />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
