// Exemplo de função para filtrar produtos baseado no nível de estoque

import { Product } from "@/types/Product";

export function filterProductsByStockLevel(
  products: Product[],
  stockLevel: string,
) {
  if (stockLevel === "all") return products;

  return products.filter((product) => {
    const currentStock = product.quantity;
    const criticalStock = product.criticalStock || 0;

    switch (stockLevel) {
      case "out-of-stock":
        return currentStock === 0;

      case "critical":
        return currentStock > 0 && currentStock <= criticalStock;

      case "low":
        return (
          currentStock > criticalStock && currentStock <= criticalStock * 2
        );

      case "normal":
        return currentStock > criticalStock * 2;

      default:
        return true;
    }
  });
}
