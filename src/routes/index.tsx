import { AppLayout } from "@/layouts/app.layout";
import { Stock } from "@/pages/stock";
import Vendas from "@/pages/vendas";
import { Routes, Route, BrowserRouter } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Login } from "@/pages/auth/login";
import Home from "@/pages/home";
import OrdersToPrepare from "@/pages/OrdersToPrepare";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<Login />} path="/auth/login" />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="estoque" element={<Stock />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="preparing" element={<OrdersToPrepare />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
