import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
        <Package className="h-10 w-10 text-muted-foreground sm:h-12 sm:w-12" />
        <h3 className="mt-4 text-base font-semibold sm:text-lg">
          Nenhum produto encontrado
        </h3>
        <p className="text-center text-sm text-muted-foreground sm:text-base">
          Tente ajustar os filtros para ver mais resultados
        </p>
      </CardContent>
    </Card>
  );
}
