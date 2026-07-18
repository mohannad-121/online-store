import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "ar";

type TranslationKeys =
  | "home"
  | "shop"
  | "category"
  | "brightening"
  | "hydration"
  | "repair"
  | "skinGuide"
  | "about"
  | "contact"
  | "account"
  | "trackOrder"
  | "orders"
  | "privacy"
  | "terms"
  | "cookies"
  | "wishlist"
  | "cart"
  | "search"
  | "newsletterPlaceholder"
  | "subscribe"
  | "adminPanel"
  | "products"
  | "allProducts"
  | "discoverProducts"
  | "items"
  | "ordersLabel"
  | "orderSummary"
  | "language";

type Translations = Record<Language, Record<TranslationKeys, string>>;

const translations: Translations = {
  en: {
    home: "Home",
    shop: "Shop",
    category: "Category",
    brightening: "Brightening",
    hydration: "Hydration",
    repair: "Repair",
    skinGuide: "Skin Guide",
    about: "About",
    contact: "Contact",
    account: "Account",
    trackOrder: "Track order",
    orders: "Orders",
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",
    wishlist: "Wishlist",
    cart: "Cart",
    search: "Search",
    newsletterPlaceholder: "you@example.com",
    subscribe: "Subscribe",
    adminPanel: "Admin panel",
    products: "Products",
    allProducts: "All products",
    discoverProducts: "Discover products",
    items: "Items",
    ordersLabel: "Orders",
    orderSummary: "Order summary",
    language: "Language",
  },
  ar: {
    home: "الرئيسية",
    shop: "المتجر",
    category: "التصنيف",
    brightening: "التفتيح",
    hydration: "الترطيب",
    repair: "الترميم",
    skinGuide: "دليل البشرة",
    about: "نبذة",
    contact: "تواصل",
    account: "حسابي",
    trackOrder: "تتبع الطلب",
    orders: "الطلبات",
    privacy: "الخصوصية",
    terms: "الشروط",
    cookies: "الكوكيز",
    wishlist: "المفضلة",
    cart: "السلة",
    search: "بحث",
    newsletterPlaceholder: "you@example.com",
    subscribe: "اشترك",
    adminPanel: "لوحة الإدارة",
    products: "المنتجات",
    allProducts: "كل المنتجات",
    discoverProducts: "اكتشف المنتجات",
    items: "العناصر",
    ordersLabel: "الطلبات",
    orderSummary: "ملخص الطلب",
    language: "اللغة",
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  isRtl: boolean;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("aurelane:language") : null;
    if (stored === "ar" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("aurelane:language", language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKeys) => translations[language][key],
      isRtl: language === "ar",
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
