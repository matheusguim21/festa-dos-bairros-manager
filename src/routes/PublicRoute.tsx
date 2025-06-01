import { useAuth } from "@/contexts/Auth.context";
import { Navigate, Outlet } from "react-router";

export function PublicRoute() {
  const { user } = useAuth(); // Supondo que useAuth indique se o estado carregou

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
