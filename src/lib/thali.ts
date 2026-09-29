import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  lineFirst,
  lineWeekly,
  type Cadence,
  type ProductId,
} from "@/data/dairy";

export type Line = {
  productId: ProductId;
  qty: number;
  cadence: Cadence;
};

export type Customer = {
  name: string;
  phone: string;
  area: string;
  landmark: string;
};

export type PlacedOrder = {
  id: string;
  customer: Customer;
  lines: Line[];
  weekly: number;
  firstBill: number;
  placedAt: string;
};

type State = {
  lines: Line[];
  orders: PlacedOrder[];
  upsert: (line: Line) => void;
  remove: (productId: ProductId) => void;
  clear: () => void;
  cancel: (id: string) => void;
  place: (customer: Customer) => PlacedOrder;
};

export const useThali = create<State>()(
  persist(
    (set, get) => ({
      lines: [],
      orders: [],
      upsert: (line) =>
        set((s) => ({
          lines: [...s.lines.filter((l) => l.productId !== line.productId), line],
        })),
      remove: (productId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
      clear: () => set({ lines: [] }),
      cancel: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
      place: (customer) => {
        const lines = get().lines;
        const order: PlacedOrder = {
          id: `TVD-${Date.now().toString(36).toUpperCase()}`,
          customer: {
            name: customer.name.trim(),
            phone: customer.phone.trim(),
            area: customer.area,
            landmark: customer.landmark.trim(),
          },
          lines,
          weekly: lines.reduce((sum, l) => sum + lineWeekly(l.productId, l.qty, l.cadence), 0),
          firstBill: lines.reduce((sum, l) => sum + lineFirst(l.productId, l.qty), 0),
          placedAt: new Date().toISOString(),
        };
        set((s) => ({ orders: [order, ...s.orders], lines: [] }));
        return order;
      },
    }),
    {
      name: "tvd-thali",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ lines: s.lines, orders: s.orders }),
    },
  ),
);
