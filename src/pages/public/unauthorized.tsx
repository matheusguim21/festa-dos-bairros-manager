import { useNavigate } from "react-router";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white bg-opacity-90 p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-16 w-16 animate-pulse text-red-600" />
        </div>
        <h1 className="mb-2 text-4xl font-extrabold text-gray-800">
          Acesso Negado
        </h1>
        <p className="mb-6 text-gray-600">
          Ops! Você não tem permissão para acessar esta página.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate(-1)} className="px-6">
            Voltar
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="px-6"
          >
            Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
