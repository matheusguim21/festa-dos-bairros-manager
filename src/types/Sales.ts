// src/types/status.enums.ts

// Status que vem da API (inglês)
export enum SaleStatusApi {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

// Status interno / que será exibido na UI (português)
// Note que os nomes dos membros do enum não podem ter acento,
// mas os valores podem:
export enum SaleStatus {
  PENDENTE = "PENDENTE",
  EM_PREPARO = "EM PREPARO",
  ENTREGUE = "ENTREGUE",
  CANCELADO = "CANCELADO",
}
// src/types/sale.ts

// Interface de uma venda no front-end
export interface Sale {
  id: number;
  stallId: number;
  buyerName: string;
  total: number;
  date: string;
  status: SaleStatusApi;
}
export const statusColorMap: Record<Sale["status"], string> = {
  PENDING: "bg-yellow-200 text-yellow-800",
  PREPARING: "bg-blue-200   text-blue-800",
  DELIVERED: "bg-green-200  text-green-800",
  CANCELED: "bg-red-200    text-red-800",
};

// Mapa de tradução de API → UI
export const saleStatusTranslation: Record<SaleStatusApi, SaleStatus> = {
  [SaleStatusApi.PENDING]: SaleStatus.PENDENTE,
  [SaleStatusApi.PREPARING]: SaleStatus.EM_PREPARO,
  [SaleStatusApi.DELIVERED]: SaleStatus.ENTREGUE,
  [SaleStatusApi.CANCELED]: SaleStatus.CANCELADO,
};

// Função auxiliar para converter
export function convertStatus(apiStatus: SaleStatusApi): SaleStatus {
  return saleStatusTranslation[apiStatus];
}

export type SocketOrder = Sale & {
  items: {
    product: {
      id: number;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
};
