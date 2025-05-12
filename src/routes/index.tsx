import { AppLayout } from "@/layouts/app.layout";
import { Dashboard } from "@/pages/dashboard";
import { Stock } from "@/pages/stock";
import Vendas from "@/pages/vendas/vendas";
import { Routes, Route } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Login } from "@/pages/auth/login";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<Login />} path="/auth/login" />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="estoque" element={<Stock />} />
          <Route path="vendas" element={<Vendas />} />
        </Route>
      </Route>
    </Routes>
  );
}
