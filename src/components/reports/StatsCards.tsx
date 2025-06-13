import { Package, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BestSellingProduct,
  PaginatedResponse,
  ProductStats,
} from "@/types/reports";
import { useQuery } from "@tanstack/react-query";
import { getTotalRevenue } from "@/api/reports/get-total-revenue";

interface StatsCardsProps {
  stats: ProductStats;
  pagination?: PaginatedResponse<BestSellingProduct>;
}

export function StatsCards({ stats, pagination }: StatsCardsProps) {
  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });

  const { data: receitaTotal } = useQuery({
    queryKey: ["receita"],
    queryFn: getTotalRevenue,
  });

  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      <Card className="sm:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Produtos
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">
            {pagination?.totalElements || stats.totalProducts}
          </div>
          <p className="text-xs text-muted-foreground">
            {pagination
              ? `Mostrando ${pagination.limit} por página`
              : "produtos encontrados"}
          </p>
        </CardContent>
      </Card>

      <Card className="sm:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unidades Vendidas
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">
            {stats.totalSold.toLocaleString("pt-BR")}
          </div>
          <p className="text-xs text-muted-foreground">
            {pagination ? "na página atual" : "no total"}
          </p>
        </CardContent>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">
            {numberFormatter.format(receitaTotal?.totalRevenue ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {pagination ? "da página atual" : "total gerada"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
