// App.tsx
import { BrowserRouter } from "react-router";

import { HelmetProvider, Helmet } from "react-helmet-async";
import "./src/styles/global.css";
import { Toaster } from "./src/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./src/routes";
export function App() {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Helmet titleTemplate="%s | Festa dos Bairros" />
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster richColors />
    </HelmetProvider>
  );
}
