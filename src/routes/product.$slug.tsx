import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findProduct, products, type Product } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Heart, ShieldCheck, Truck, RotateCcw, Minus, Plus, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/ProductCard";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = findProduct(params.slug);
    return { meta: [
      { title: p ? `${p.name} — Aurelane` : "Product — Aurelane" },
      { name: "description", content: p?.shortBenefit ?? "Aurelane skincare product" },
      { property: "og:image", content: p?.image },
    ]};
  },
  loader: ({ params }) => {
    const p = findProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-editorial py-10 md:py-16">
      <nav className="text-xs text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link> · <Link to="/shop" className="hover:text-foreground">Shop</Link> · <span>{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="rounded-2xl overflow-hidden bg-secondary aspect-square">
            <img src={product.gallery[active]} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.gallery.map((g, i) => (
              <button key={i} onClick={() => setActive(i)} className={`aspect-square rounded-lg overflow-hidden border-2 ${active === i ? "border-accent" : "border-transparent"}`}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-eyebrow">{product.shortBenefit}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl leading-tight">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />)}
            </span>
            <span className="text-muted-foreground">{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatPrice(product.price)}</span>
            {product.compareAt && <span className="text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>}
            <span className="text-sm text-muted-foreground">· {product.size}</span>
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.skinTypes.map((s) => <span key={s} className="text-xs px-3 py-1 rounded-full bg-secondary">{s}</span>)}
            {product.concerns.map((c) => <span key={c} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent-foreground border border-accent/20">{c}</span>)}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-full h-12">
              <button className="px-4 h-full" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{qty}</span>
              <button className="px-4 h-full" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></button>
            </div>
            <Button className="h-12 flex-1" onClick={() => { addToCart(product.id, qty); toast.success(`${product.name} added to cart`); }}>Add to cart · {formatPrice(product.price * qty)}</Button>
            <Button variant="outline" size="icon" className="h-12 w-12" onClick={() => toggleWishlist(product.id)} aria-label="Wishlist">
              <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-destructive text-destructive" : ""}`} />
            </Button>
          </div>
          <Link to="/checkout" className="mt-3 block">
            <Button variant="secondary" className="w-full h-12">Buy it now</Button>
          </Link>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              { Icon: ShieldCheck, t: "Dermatologist tested" },
              { Icon: Truck, t: "Free shipping $60+" },
              { Icon: RotateCcw, t: "30-day returns" },
            ].map(({ Icon, t }) => (
              <div key={t} className="flex flex-col items-start gap-1.5 p-4 rounded-lg bg-secondary/60">
                <Icon className="h-4 w-4 text-accent" />
                <p className="text-muted-foreground leading-snug">{t}</p>
              </div>
            ))}
          </div>

          <Tabs defaultValue="benefits" className="mt-10">
            <TabsList className="w-full justify-start bg-transparent border-b rounded-none p-0 h-auto">
              {["benefits", "ingredients", "how-to-use", "details"].map((v) => (
                <TabsTrigger key={v} value={v} className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent capitalize px-4 py-3">
                  {v.replace("-", " ")}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="benefits" className="pt-6">
              <ul className="space-y-2 text-sm">
                {product.benefits.map((b) => <li key={b} className="flex gap-2 items-start"><Check className="h-4 w-4 mt-0.5 text-accent" /> {b}</li>)}
              </ul>
            </TabsContent>
            <TabsContent value="ingredients" className="pt-6 space-y-4 text-sm">
              <div>
                <p className="text-eyebrow mb-2">Key ingredients</p>
                <ul className="space-y-2">
                  {product.keyIngredients.map((k) => (
                    <li key={k.name}><strong>{k.name}</strong> — <span className="text-muted-foreground">{k.role}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-eyebrow mb-2">Full list</p>
                <p className="text-muted-foreground leading-relaxed">{product.ingredients.join(", ")}.</p>
              </div>
            </TabsContent>
            <TabsContent value="how-to-use" className="pt-6 text-sm text-muted-foreground leading-relaxed">
              {product.howToUse}
            </TabsContent>
            <TabsContent value="details" className="pt-6 text-sm space-y-2">
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Size:</strong> {product.size}</p>
              <p><strong>Storage:</strong> Store in a cool, dry place, away from direct sunlight.</p>
              <p><strong>Warnings:</strong> For external use only. Discontinue use if irritation occurs.</p>
              <p><strong>Delivery:</strong> 2–5 business days. Free over $60.</p>
              <p><strong>Returns:</strong> 30-day satisfaction guarantee.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-eyebrow">Reviews</p>
            <h2 className="mt-2 font-display text-3xl">What customers say</h2>
          </div>
          <div className="text-right">
            <p className="font-display text-4xl">{product.rating.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">{product.reviewCount} reviews</p>
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {[
            { n: "Elena K.", r: 5, t: "Beautiful texture. My skin feels genuinely comforted every morning." },
            { n: "Maria L.", r: 5, t: "I've noticed my complexion looks brighter within two weeks." },
            { n: "Sara F.", r: 4, t: "Lovely product, packaging is gorgeous. Wish the jar was slightly bigger." },
            { n: "Yara N.", r: 5, t: "Zero irritation on my sensitive skin, which is rare for me." },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 text-accent">
                {Array.from({ length: r.r }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed">"{r.t}"</p>
              <p className="mt-3 text-xs text-muted-foreground">{r.n} · Verified buyer</p>
            </div>
          ))}
        </div>
      </section>

      {/* Q&A */}
      <section className="mt-20">
        <p className="text-eyebrow">Questions & answers</p>
        <h2 className="mt-2 font-display text-3xl">Ask our skincare team</h2>
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="q1"><AccordionTrigger>Can I use this with retinol?</AccordionTrigger><AccordionContent className="text-muted-foreground">Yes — layer this cream after your retinol to help buffer and hydrate.</AccordionContent></AccordionItem>
          <AccordionItem value="q2"><AccordionTrigger>Is it safe during pregnancy?</AccordionTrigger><AccordionContent className="text-muted-foreground">The formula avoids common ingredients of concern, but always consult your doctor.</AccordionContent></AccordionItem>
          <AccordionItem value="q3"><AccordionTrigger>Is the packaging recyclable?</AccordionTrigger><AccordionContent className="text-muted-foreground">Yes — the glass jar and outer carton are fully recyclable.</AccordionContent></AccordionItem>
        </Accordion>
      </section>

      {/* Related */}
      <section className="mt-24">
        <h2 className="font-display text-3xl mb-8">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
