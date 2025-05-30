// src/routes/AppRoutes.tsx
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router";
import { RequireAuth } from "./RequireAuth";
import { PublicRoute } from "./PublicRoute";
import { AppLayout } from "@/layouts/app.layout";
import { useAuth } from "@/contexts/Auth.context";
import { roleRoutes } from "./RoleRoutes";
import { Login } from "@/pages/public/auth/login";
import UnauthorizedPage from "@/pages/public/unauthorized";

export function AppRoutes() {
  const { user } = useAuth();

  const publicRoutes: RouteObject[] = [
    {
      element: <PublicRoute />,
      children: [
        { path: "/auth/login", element: <Login /> },
        { path: "/unauthorized", element: <UnauthorizedPage /> },
      ],
    },
  ];

  // se user existir, pega o array de rotas do role dele
  const privateChildren: RouteObject[] = user
    ? [
        {
          element: <AppLayout />,
          children: roleRoutes[user.role] || [],
        },
      ]
    : [];

  const privateRoutes: RouteObject[] = [
    {
      element: <RequireAuth />,
      children: privateChildren,
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

  return <RouterProvider router={router} />;
}
