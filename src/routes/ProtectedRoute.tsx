import { useAuth } from "@/contexts/Auth.context";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    console.log("User: ", user);

    return <Navigate to={"/auth/login"} />;
  }

  return <Outlet />;
}
