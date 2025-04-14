// App.tsx
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./global.css";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet titleTemplate="%s | Festa dos Bairros" />
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </HelmetProvider>
  );
}
