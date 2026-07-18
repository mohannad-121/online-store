import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findCategory, productsByCategory, type Category, type Product } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const c = findCategory(params.slug);
    return { meta: [
      { title: c ? `${c.name} - Aurelane` : "Category - Aurelane" },
      { name: "description", content: c?.description ?? "Aurelane skincare category" },
    ]};
  },
  loader: ({ params }) => {
    const c = findCategory(params.slug);
    if (!c) throw notFound();
    return { category: c, products: productsByCategory(params.slug) };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData() as { category: Category; products: Product[] };
  return (
    <div>
      <section className="relative bg-secondary/60">
        <div className="container-editorial grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <div>
            <p className="text-eyebrow">{category.tagline}</p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">{category.name}</h1>
            <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">{category.description}</p>
          </div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" width={1000} height={1200} />
          </div>
        </div>
      </section>
      <section className="container-editorial py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <section className="container-editorial pb-20">
        <div className="rounded-2xl bg-secondary/60 p-8 md:p-12">
          <p className="text-eyebrow">Skincare tips</p>
          <h2 className="mt-3 font-display text-3xl">Get the most from your {category.name.toLowerCase()} ritual</h2>
          <ul className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
            <li><strong className="block font-display text-lg mb-1">Layer thinnest first</strong><span className="text-muted-foreground">Serums before creams - always.</span></li>
            <li><strong className="block font-display text-lg mb-1">Give actives time</strong><span className="text-muted-foreground">Wait 30 seconds between layers.</span></li>
            <li><strong className="block font-display text-lg mb-1">Protect in the morning</strong><span className="text-muted-foreground">Finish with SPF for best results.</span></li>
          </ul>
          <Link to="/skin-guide" className="mt-6 inline-block text-sm underline underline-offset-4">Read the full skin guide →</Link>
        </div>
      </section>
    </div>
  );
}
