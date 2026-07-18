import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist - Aurelane" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="container-editorial py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Wishlist</h1>
      {items.length === 0 ? (
        <div className="mt-16 text-center py-16 rounded-2xl bg-secondary/50">
          <Heart className="h-6 w-6 mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Your wishlist is empty.</p>
          <Button asChild className="mt-4"><Link to="/shop">Discover products</Link></Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
