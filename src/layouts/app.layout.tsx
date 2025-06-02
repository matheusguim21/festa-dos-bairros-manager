// src/layouts/AppLayout.tsx
import { Header } from "@/components/header/header";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    // 1) flex‐column ocupando toda a altura da viewport
    <div className="flex h-screen flex-col bg-background">
      <Header navBar={true} />

      {/* 2) Conteúdo: ocupa o espaço restante abaixo do Header e evita scroll externo */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
