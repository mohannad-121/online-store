import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./data";

type CartItem = { id: string; qty: number };
type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  cartDetailed: { product: Product; qty: number; lineTotal: number }[];
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLS<CartItem[]>("aurelane:cart", []));
    setWishlist(readLS<string[]>("aurelane:wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelane:cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelane:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<StoreState>(() => {
    const cartDetailed = cart
      .map((c) => {
        const product = products.find((p) => p.id === c.id);
        if (!product) return null;
        return { product, qty: c.qty, lineTotal: product.price * c.qty };
      })
      .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];
    const subtotal = cartDetailed.reduce((s, l) => s + l.lineTotal, 0);
    return {
      cart,
      wishlist,
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
      cartCount: cart.reduce((s, c) => s + c.qty, 0),
      wishlistCount: wishlist.length,
      cartDetailed,
      subtotal,
    };
  }, [cart, wishlist]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore outside StoreProvider");
  return ctx;
}
