import { useAuth } from "@/contexts/Auth.context";
import { Navigate, Outlet } from "react-router";

export function PublicRoute() {
  const { user } = useAuth();

  if (user) {
    console.log("User: ", user);
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}
