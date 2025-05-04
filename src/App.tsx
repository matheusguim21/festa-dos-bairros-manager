// App.tsx
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./global.css";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
      <Toaster />
    </HelmetProvider>
  );
}
