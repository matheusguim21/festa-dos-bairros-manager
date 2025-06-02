// src/store/useCaixaStore.ts
import { create } from "zustand";

export interface SaleItem {
  id: string; // ex: "ficha-20" ou "produto-123"
  nome: string; // ex: "Ficha R$ 20" ou "Produto X"
  preco: number; // valor unitário
  quantidade: number; // número de unidades daquele item
  tipo: "ficha" | "produto";
}

interface CaixaState {
  items: SaleItem[];
  total: number;
  addItem: (item: Omit<SaleItem, "quantidade">) => void;
  removeOne: (id: string) => void;
  clearSale: () => void;
}

export const useCaixaStore = create<CaixaState>((set, get) => ({
  items: [],
  total: 0,

  // Recebe um objeto sem 'quantidade' (será sempre +1)
  addItem: (item) => {
    const { items } = get();
    // Tenta encontrar uma entrada existente com mesmo id
    const idx = items.findIndex((i) => i.id === item.id);

    let newItems: SaleItem[];
    if (idx >= 0) {
      // Se já existe, apenas incrementa quantidade
      newItems = items.map((i, iIdx) =>
        iIdx === idx ? { ...i, quantidade: i.quantidade + 1 } : i,
      );
    } else {
      // Se não existe, adiciona nova entrada com quantidade = 1
      newItems = [
        ...items,
        {
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: 1,
          tipo: item.tipo,
        },
      ];
    }

    // Recalcula total
    const newTotal = newItems.reduce(
      (acc, i) => acc + i.preco * i.quantidade,
      0,
    );
    set({ items: newItems, total: newTotal });
  },

  // Remove apenas 1 unidade: se quantidade > 1, decrementa; senão remove a linha
  removeOne: (id) => {
    const { items } = get();
    const idx = items.findIndex((i) => i.id === id);
    if (idx < 0) return; // nada a fazer

    const item = items[idx];
    let newItems: SaleItem[];

    if (item.quantidade > 1) {
      // decrementar quantidade
      newItems = items.map((i, iIdx) =>
        iIdx === idx ? { ...i, quantidade: i.quantidade - 1 } : i,
      );
    } else {
      // se for a última unidade, remove totalmente
      newItems = items.filter((i) => i.id !== id);
    }

    // Recalcula total
    const newTotal = newItems.reduce(
      (acc, i) => acc + i.preco * i.quantidade,
      0,
    );
    set({ items: newItems, total: newTotal });
  },

  clearSale: () => {
    set({ items: [], total: 0 });
  },
}));
