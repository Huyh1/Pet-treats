import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';

export interface CartItem {
  productId: string;
  quantity: number;
  // 用于快速展示，避免每次都去查 products
  snapshot: {
    name: string;
    price: number;
    image: string;
    weight: string;
  };
}

interface CartState {
  items: CartItem[];
  coupon: { code: string; discount: number } | null;
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  count: () => number;
  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  total: () => number;
}

const COUPONS: Record<string, number> = {
  WELCOME10: 0.1,
  FUROU15: 0.15,
  HANDMADE20: 0.2,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                quantity: qty,
                snapshot: {
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  weight: product.weight,
                },
              },
            ],
          };
        }),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase();
        if (COUPONS[normalized]) {
          set({ coupon: { code: normalized, discount: COUPONS[normalized] } });
          return true;
        }
        return false;
      },
      removeCoupon: () => set({ coupon: null }),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.snapshot.price * i.quantity, 0),
      discount: () => {
        const { items, coupon } = get();
        const sub = items.reduce((s, i) => s + i.snapshot.price * i.quantity, 0);
        return coupon ? Math.round(sub * coupon.discount) : 0;
      },
      shipping: () => {
        const sub = get().subtotal();
        if (sub === 0) return 0;
        return sub >= 99 ? 0 : 12;
      },
      total: () => {
        const { subtotal, discount, shipping } = get();
        return subtotal() - discount() + shipping();
      },
    }),
    { name: 'furou-cart' }
  )
);
