import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Package, PackageX } from "lucide-react";
import type { BestSellingProduct } from "@/types/reports";

interface ProductCardProps {
  product: BestSellingProduct;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const compactNumberFormatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  // Format large numbers for mobile display
  const formatMobileValue = (value: number) => {
    if (value >= 1000) {
      return compactNumberFormatter.format(value);
    }
    return numberFormatter.format(value);
  };

  // Determine stock status
  const getStockStatus = () => {
    // Verificar se os campos de estoque existem
    const currentStock = product.currentStock ?? product.quantity ?? 0;
    const criticalStock = product.criticalStock ?? 5; // Default para 5 se não existir

    if (currentStock === 0) {
      return {
        level: "out-of-stock",
        label: "Sem estoque",
        variant: "destructive" as const,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: PackageX,
        showStock: true,
      };
    }

    if (currentStock <= criticalStock) {
      return {
        level: "critical",
        label: "Crítico",
        variant: "destructive" as const,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: AlertTriangle,
        showStock: true,
      };
    }

    if (currentStock <= criticalStock * 2) {
      return {
        level: "low",
        label: "Baixo",
        variant: "secondary" as const,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: AlertTriangle,
        showStock: true,
      };
    }

    return {
      level: "normal",
      label: "Normal",
      variant: "outline" as const,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: Package,
      showStock: true,
    };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;
  const currentStock = product.currentStock ?? product.quantity ?? 0;

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-3 sm:p-6">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          {/* Header */}
          <div className="mb-3 flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              #{index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold leading-tight">
                {product.name}
              </h3>
              <div className="mt-1 flex flex-wrap gap-1">
                <Badge
                  variant="outline"
                  className="max-w-full px-2 py-0.5 text-xs"
                >
                  <span className="truncate">{product.stall.name}</span>
                </Badge>
                {stockStatus.showStock && (
                  <Badge
                    variant={stockStatus.variant}
                    className="gap-1 px-2 py-0.5 text-xs"
                  >
                    <StockIcon className="h-3 w-3" />
                    {stockStatus.label}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator className="mb-3" />

          {/* Stats - Stacked layout for better mobile experience */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Vendidos:</span>
              <span className="text-sm font-bold text-primary">
                {product.totalSold}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Receita:</span>
              <span className="text-sm font-bold text-green-600">
                {formatMobileValue(product.revenue)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Preço:</span>
              <span className="text-sm font-bold">
                {formatMobileValue(product.price)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Estoque:</span>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-bold ${stockStatus.color}`}>
                  {currentStock}
                </span>
                {stockStatus.level !== "normal" && (
                  <StockIcon className={`h-3 w-3 ${stockStatus.color}`} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout (sm to lg) */}
        <div className="hidden sm:block lg:hidden">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                #{index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-semibold leading-tight">
                  {product.name}
                </h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {product.stall.name}
                  </Badge>
                  {stockStatus.showStock && stockStatus.level !== "normal" && (
                    <Badge
                      variant={stockStatus.variant}
                      className="gap-1 text-xs"
                    >
                      <StockIcon className="h-3 w-3" />
                      {stockStatus.label}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Stats in 4 columns for tablet */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="space-y-1">
                <div className="text-base font-bold text-primary">
                  {product.totalSold}
                </div>
                <div className="text-xs text-muted-foreground">vendidos</div>
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-green-600">
                  {numberFormatter.format(product.revenue)}
                </div>
                <div className="text-xs text-muted-foreground">receita</div>
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold">
                  {numberFormatter.format(product.price)}
                </div>
                <div className="text-xs text-muted-foreground">preço</div>
              </div>
              <div className="space-y-1">
                <div
                  className={`flex items-center justify-center gap-1 text-base font-bold ${stockStatus.color}`}
                >
                  {currentStock}
                  {stockStatus.level !== "normal" && (
                    <StockIcon className="h-3 w-3" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">estoque</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-6">
          {/* Product Info */}
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              #{index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold">{product.name}</h3>
              <div className="mt-1 flex gap-2">
                <Badge variant="outline">{product.stall.name}</Badge>
                {stockStatus.showStock && stockStatus.level !== "normal" && (
                  <Badge variant={stockStatus.variant} className="gap-1">
                    <StockIcon className="h-3 w-3" />
                    {stockStatus.label}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid shrink-0 grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {product.totalSold}
              </div>
              <div className="text-xs text-muted-foreground">vendidos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {numberFormatter.format(product.revenue)}
              </div>
              <div className="text-xs text-muted-foreground">receita</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {numberFormatter.format(product.price)}
              </div>
              <div className="text-xs text-muted-foreground">preço unit.</div>
            </div>
            <div>
              <div
                className={`flex items-center justify-center gap-1 text-lg font-bold ${stockStatus.color}`}
              >
                {currentStock}
                {stockStatus.level !== "normal" && (
                  <StockIcon className="h-4 w-4" />
                )}
              </div>
              <div className="text-xs text-muted-foreground">estoque</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
