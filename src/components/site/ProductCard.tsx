import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  return (
    <div className="group relative flex flex-col">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block relative overflow-hidden rounded-xl bg-secondary aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.compareAt && (
          <span className="absolute top-3 left-3 bg-background/90 backdrop-blur text-[10px] tracking-widest uppercase px-2 py-1 rounded">
            Sale
          </span>
        )}
        {product.newArrival && !product.compareAt && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-widest uppercase px-2 py-1 rounded">
            New
          </span>
        )}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background transition-colors"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-destructive text-destructive")} />
        </button>
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            size="sm"
            className="w-full h-10"
            onClick={(e) => { e.preventDefault(); addToCart(product.id); toast.success(`${product.name} added to cart`); }}
          >
            <ShoppingBag className="h-4 w-4 mr-2" /> Add to cart
          </Button>
        </div>
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        <p className="text-eyebrow">{product.shortBenefit}</p>
        <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-lg leading-snug hover:underline underline-offset-4">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-current" /> {product.rating.toFixed(1)}
          </span>
          <span>·</span>
          <span>{product.reviewCount} reviews</span>
          {product.stock < 5 && <><span>·</span><span className="text-destructive">Only {product.stock} left</span></>}
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.compareAt && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>}
        </div>
      </div>
    </div>
  );
}
