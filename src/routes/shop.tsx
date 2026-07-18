import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories, skinTypes, skinConcerns, type SkinType, type SkinConcern } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SlidersHorizontal, Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop - Aurelane" },
      { name: "description", content: "Browse the full Aurelane range: creams, serums, and rituals for every skin type." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) ?? "" }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q);
  const [cats, setCats] = useState<string[]>([]);
  const [types, setTypes] = useState<SkinType[]>([]);
  const [concerns, setConcerns] = useState<SkinConcern[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 100]);
  const [inStock, setInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (q && !`${p.name} ${p.shortBenefit}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (cats.length && !cats.includes(p.categorySlug)) return false;
      if (types.length && !types.some((t) => p.skinTypes.includes(t))) return false;
      if (concerns.length && !concerns.some((c) => p.concerns.includes(c))) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      if (inStock && p.stock <= 0) return false;
      if (p.rating < minRating) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "new") list = [...list].sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    return list;
  }, [q, cats, types, concerns, price, inStock, minRating, sort]);

  const filters = (
    <div className="space-y-8">
      <FilterBlock title="Category">
        {categories.map((c) => (
          <label key={c.slug} className="flex items-center gap-2 text-sm">
            <Checkbox checked={cats.includes(c.slug)} onCheckedChange={(v) => setCats((p) => (v ? [...p, c.slug] : p.filter((x) => x !== c.slug)))} />
            {c.name}
          </label>
        ))}
      </FilterBlock>
      <FilterBlock title="Skin type">
        {skinTypes.map((t) => (
          <label key={t} className="flex items-center gap-2 text-sm">
            <Checkbox checked={types.includes(t)} onCheckedChange={(v) => setTypes((p) => (v ? [...p, t] : p.filter((x) => x !== t)))} />
            {t}
          </label>
        ))}
      </FilterBlock>
      <FilterBlock title="Concern">
        {skinConcerns.map((c) => (
          <label key={c} className="flex items-center gap-2 text-sm">
            <Checkbox checked={concerns.includes(c)} onCheckedChange={(v) => setConcerns((p) => (v ? [...p, c] : p.filter((x) => x !== c)))} />
            {c}
          </label>
        ))}
      </FilterBlock>
      <FilterBlock title={`Price: $${price[0]} – $${price[1]}`}>
        <Slider min={0} max={100} step={2} value={price} onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])} />
      </FilterBlock>
      <FilterBlock title="Availability">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(!!v)} /> In stock only
        </label>
      </FilterBlock>
      <FilterBlock title="Minimum rating">
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setMinRating(r)} className={`px-3 py-1.5 rounded-full text-xs border ${minRating === r ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
              {r === 0 ? "Any" : `${r}★+`}
            </button>
          ))}
        </div>
      </FilterBlock>
    </div>
  );

  return (
    <div className="container-editorial py-12 md:py-16">
      <div className="mb-10">
        <p className="text-eyebrow">Shop</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">All products</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">Twelve considered formulas across hydration, brightening, and repair.</p>
      </div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="hidden lg:block">{filters}</aside>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 h-11" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden h-11"><SlidersHorizontal className="h-4 w-4 mr-2" /> Filters</Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetTitle>Filters</SheetTitle>
                <div className="mt-6">{filters}</div>
              </SheetContent>
            </Sheet>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px] h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="new">New arrivals</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} products</p>
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <p>No products match your filters.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setCats([]); setTypes([]); setConcerns([]); setPrice([0, 100]); setInStock(false); setMinRating(0); setQ(""); }}>Reset</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-eyebrow mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
