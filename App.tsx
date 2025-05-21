import "./src/styles/global.css";
import { Toaster } from "./src/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./src/routes";
import { Helmet, HelmetProvider } from "@dr.pogodin/react-helmet";
export function App() {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet titleTemplate="%s | Festa dos Bairros" />
        <AppRoutes />
      </QueryClientProvider>
      <Toaster richColors />
    </HelmetProvider>
  );
}
