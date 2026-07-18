import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Aurelane" }] }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, subtotal, setQty, removeFromCart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
  const tax = subtotal * 0.08;
  const total = Math.max(0, subtotal - discount) + shipping + tax;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "GLOW10") {
      setDiscount(subtotal * 0.1);
      toast.success("Coupon applied: 10% off");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (cartDetailed.length === 0) {
    return (
      <div className="container-editorial py-24 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-secondary grid place-items-center"><ShoppingBag className="h-6 w-6 text-muted-foreground" /></div>
        <h1 className="mt-6 font-display text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Discover our considered skincare rituals.</p>
        <Button asChild className="mt-6"><Link to="/shop">Shop products</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-editorial py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Your bag</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-10 mt-10">
        <div className="space-y-4">
          {cartDetailed.map(({ product, qty, lineTotal }) => (
            <div key={product.id} className="grid grid-cols-[100px_1fr_auto] gap-4 items-center p-4 rounded-2xl border border-border bg-card">
              <Link to="/product/$slug" params={{ slug: product.slug }} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="min-w-0">
                <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-lg hover:underline">{product.name}</Link>
                <p className="text-xs text-muted-foreground">{product.size} · {product.sku}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-full">
                    <button className="px-2 py-1" onClick={() => setQty(product.id, qty - 1)}><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button className="px-2 py-1" onClick={() => setQty(product.id, qty + 1)}><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"><Trash2 className="h-3 w-3" /> Remove</button>
                </div>
              </div>
              <p className="font-medium">{formatPrice(lineTotal)}</p>
            </div>
          ))}
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">← Continue shopping</Link>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6 h-fit">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            {discount > 0 && <Row label="Discount" value={`-${formatPrice(discount)}`} />}
            <Row label={`Shipping${shipping === 0 ? " (free)" : ""}`} value={shipping === 0 ? "—" : formatPrice(shipping)} />
            <Row label="Estimated tax" value={formatPrice(tax)} />
            <div className="border-t border-border pt-3 flex justify-between font-medium text-base">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-eyebrow mb-2">Coupon</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Try GLOW10" className="pl-9" />
              </div>
              <Button variant="outline" onClick={applyCoupon}>Apply</Button>
            </div>
          </div>
          <Button asChild className="w-full h-12 mt-6"><Link to="/checkout">Checkout <ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
          <p className="mt-3 text-xs text-muted-foreground text-center">Secure checkout · SSL protected</p>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
