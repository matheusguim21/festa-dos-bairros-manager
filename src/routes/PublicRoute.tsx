import { useAuth } from "@/contexts/Auth.context";
import { Navigate, Outlet } from "react-router";

export function PublicRoute() {
  const { user } = useAuth(); // Supondo que useAuth indique se o estado carregou

  if (user) {
    if (user.role === "ORDER_PREPARER") {
      return <Navigate to="/preparing" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
