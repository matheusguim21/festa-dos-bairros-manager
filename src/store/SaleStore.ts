import { create } from "zustand";
import { Product } from "@/types/Product";

type SaleItem = {
  product: Product;
  quantity: number;
};
type SaleStore = {
  items: SaleItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  setItemQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
};

export const useSaleStore = create<SaleStore>((set) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id,
      );
      if (existing) {
        if (existing.quantity >= product.quantity) return state;
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      } else {
        return {
          items: [...state.items, { product, quantity: 1 }],
        };
      }
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  },
  setItemQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    }));
  },
  clear: () => set({ items: [] }),
}));
