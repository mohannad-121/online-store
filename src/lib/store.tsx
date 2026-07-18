import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./data";

type CartItem = { id: string; qty: number };
type OrderItem = { product: Product; qty: number; lineTotal: number };
type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  totalFormatted: string;
  customerName: string;
  createdAt: string;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  addOrder: (order: Order) => void;
  cartCount: number;
  wishlistCount: number;
  cartDetailed: OrderItem[];
  subtotal: number;
};

const StoreCtx = createContext<StoreState | null>(null);

function readLS<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLS<CartItem[]>("aurelane:cart", []));
    setWishlist(readLS<string[]>("aurelane:wishlist", []));
    setOrders(readLS<Order[]>("aurelane:orders", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelane:cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelane:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelane:orders", JSON.stringify(orders));
  }, [orders, hydrated]);

  const value = useMemo<StoreState>(() => {
    const cartDetailed = cart
      .map((c) => {
        const product = products.find((p) => p.id === c.id);
        if (!product) return null;
        return { product, qty: c.qty, lineTotal: product.price * c.qty };
      })
      .filter(Boolean) as OrderItem[];
    const subtotal = cartDetailed.reduce((s, l) => s + l.lineTotal, 0);
    return {
      cart,
      wishlist,
      orders,
      addToCart: (id, qty = 1) =>
        setCart((prev) => {
          const ex = prev.find((c) => c.id === id);
          if (ex) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
          return [...prev, { id, qty }];
        }),
      removeFromCart: (id) => setCart((prev) => prev.filter((c) => c.id !== id)),
      setQty: (id, qty) =>
        setCart((prev) =>
          qty <= 0 ? prev.filter((c) => c.id !== id) : prev.map((c) => (c.id === id ? { ...c, qty } : c)),
        ),
      clearCart: () => setCart([]),
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      isWishlisted: (id) => wishlist.includes(id),
      addOrder: (order) => setOrders((prev) => [order, ...prev]),
      cartCount: cart.reduce((s, c) => s + c.qty, 0),
      wishlistCount: wishlist.length,
      cartDetailed,
      subtotal,
    };
  }, [cart, wishlist, orders]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore outside StoreProvider");
  return ctx;
}
