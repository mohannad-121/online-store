import { useEffect, useMemo, useState } from "react";
import { products as defaultProducts, type Product } from "./data";

export type ProductOverride = Partial<Pick<Product, "name" | "price" | "stock" | "shortBenefit" | "featured" | "bestseller" | "newArrival" | "compareAt" | "description" | "size">>;
export type ProductOverrideMap = Record<string, ProductOverride>;

const STORAGE_KEY = "aurelane:product-overrides";

function readOverrides(): ProductOverrideMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProductOverrideMap) : {};
  } catch {
    return {};
  }
}

function writeOverrides(overrides: ProductOverrideMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function useProductCatalog() {
  const [overrides, setOverrides] = useState<ProductOverrideMap>({});

  useEffect(() => {
    setOverrides(readOverrides());
  }, []);

  const products = useMemo(
    () =>
      defaultProducts.map((product) => ({
        ...product,
        ...(overrides[product.id] ?? {}),
      })),
    [overrides],
  );

  const saveOverride = (id: string, update: ProductOverride) => {
    setOverrides((prev) => {
      const next = { ...prev, [id]: { ...(prev[id] ?? {}), ...update } };
      writeOverrides(next);
      return next;
    });
  };

  return { products, overrides, saveOverride };
}
