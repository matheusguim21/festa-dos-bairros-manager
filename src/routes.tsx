// routes.tsx
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/dashboard";
import { AppLayout } from "./layouts/app.layout";
import { Stock } from "./pages/stock";
import Vendas from "./pages/vendas/vendas";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="estoque" element={<Stock />} />
        <Route path="vendas" element={<Vendas />} />
      </Route>
    </Routes>
  );
}
