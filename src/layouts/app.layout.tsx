import { Header } from "@/components/app/header";
import { Outlet } from "react-router";
export function AppLayout() {
  return (
    <div className="bg-background">
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
