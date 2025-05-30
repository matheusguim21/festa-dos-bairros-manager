// src/routes/RequireAuth.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/contexts/Auth.context";
import { Role } from "@/types/Role";

interface RequireAuthProps {
  allowedRoles?: Role[];
  children?: React.ReactNode;
}

export function RequireAuth({ allowedRoles, children }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // não está logado: redireciona para a página de login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // está logado, mas não tem permissão para este role
    return <Navigate to="/unauthorized" replace />;
  }

  return children ?? <Outlet />;
}
