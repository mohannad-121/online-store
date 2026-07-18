import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/category/hydration", label: "Hydration" },
  { to: "/category/brightening", label: "Brightening" },
  { to: "/category/repair", label: "Repair" },
  { to: "/skin-guide", label: "Skin Guide" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground text-xs tracking-widest uppercase">
      <div className="container-editorial flex items-center justify-center gap-6 py-2 text-center">
        <span>Complimentary shipping on orders over $60</span>
        <span className="hidden sm:inline opacity-60">·</span>
        <span className="hidden sm:inline">Dermatologist developed</span>
      </div>
    </div>
  );
}

export function Header() {
  const { cartCount, wishlistCount } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <AnnouncementBar />
      <div className="container-editorial flex items-center justify-between h-16 md:h-20 gap-4">
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetTitle className="font-display text-2xl">Aurelane</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="px-2 py-3 text-base border-b border-border/50 hover:text-accent"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link to="/account" className="px-2 py-3 text-base border-b border-border/50">Account</Link>
                <Link to="/track-order" className="px-2 py-3 text-base border-b border-border/50">Track order</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="font-display text-2xl md:text-3xl tracking-tight">
          Aurelane
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {nav.slice(0, 6).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
            <Search className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Language" className="hidden md:inline-flex">
            <Globe className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link to="/account"><User className="h-[18px] w-[18px]" /></Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative" asChild>
            <Link to="/wishlist">
              <Heart className="h-[18px] w-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] leading-none rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] leading-none rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
      {searchOpen && (
        <div className="border-t border-border/60 bg-background">
          <div className="container-editorial py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = new FormData(e.currentTarget).get("q") as string;
                window.location.href = `/shop?q=${encodeURIComponent(q ?? "")}`;
              }}
              className="flex gap-2"
            >
              <Input name="q" autoFocus placeholder="Search creams, serums, ingredients…" className="h-11" />
              <Button type="submit" className="h-11">Search</Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
