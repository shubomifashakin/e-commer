import { create } from "zustand";

export const cartStore = create<CartInfo>((set) => ({
  items: [],

  addToCart: (product) =>
    set((state) => ({ items: [...state.items, product] })),

  removeFromCart: (productId) =>
    set((state) => ({ items: state.items.filter((c) => c.id === productId) })),

  clearCart: () => set(() => ({ items: [] })),

  incrementItemQuantity: (itemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
}));

type CartInfo = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  incrementItemQuantity: (itemId: string) => void;
};

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
  id: string;
};
