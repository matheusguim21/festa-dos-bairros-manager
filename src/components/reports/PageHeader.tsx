import { TrendingUp } from "lucide-react";

export function PageHeader() {
  return (
    <div className="space-y-2">
      <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
        <TrendingUp className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
        <span className="leading-tight">Produtos Mais Vendidos</span>
      </h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Acompanhe o desempenho dos produtos e identifique os mais populares
      </p>
    </div>
  );
}
