import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import catHydration from "@/assets/cat-hydration.jpg";
import catBrightening from "@/assets/cat-brightening.jpg";
import catRepair from "@/assets/cat-repair.jpg";

export type SkinType = "Dry" | "Oily" | "Combination" | "Sensitive" | "Normal";
export type SkinConcern = "Dryness" | "Acne" | "Dark spots" | "Fine lines" | "Redness" | "Dullness" | "Uneven tone";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  shortBenefit: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  size: string;
  sku: string;
  image: string;
  gallery: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  keyIngredients: { name: string; role: string }[];
  howToUse: string;
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
};

export const categories: Category[] = [
  {
    slug: "hydration",
    name: "Hydration & Moisture",
    tagline: "Quench thirsty skin",
    description:
      "Deeply nourishing formulas that restore moisture, strengthen the skin barrier, and leave a soft, dewy finish.",
    image: catHydration,
  },
  {
    slug: "brightening",
    name: "Brightening & Glow",
    tagline: "Wake up radiant",
    description:
      "Vitamin-rich blends designed to even skin tone, fade the look of dark spots, and reveal a natural, luminous glow.",
    image: catBrightening,
  },
  {
    slug: "repair",
    name: "Repair & Sensitive",
    tagline: "Calm, restore, soothe",
    description:
      "Gentle, fragrance-considered formulas developed for reactive skin — supporting recovery and comfort.",
    image: catRepair,
  },
];

const IMAGES = [product1, product2, product3, product4];

const mk = (i: number, p: Partial<Product> & Pick<Product, "name" | "categorySlug" | "shortBenefit" | "price">): Product => ({
  id: `p-${i}`,
  slug: p.slug ?? p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  rating: 4.6,
  reviewCount: 120 + i * 7,
  stock: 24,
  size: "50 ml",
  sku: `SK-${String(1000 + i)}`,
  image: IMAGES[i % IMAGES.length],
  gallery: [IMAGES[i % IMAGES.length], IMAGES[(i + 1) % IMAGES.length], IMAGES[(i + 2) % IMAGES.length]],
  description:
    "A weightless, deeply comforting formula developed with botanical actives and skin-identical lipids. Layers beautifully under makeup and pairs with your evening ritual.",
  benefits: [
    "Restores lasting moisture",
    "Reinforces the skin barrier",
    "Softens the look of fine lines",
    "Leaves skin visibly luminous",
  ],
  ingredients: [
    "Aqua",
    "Glycerin",
    "Squalane",
    "Niacinamide",
    "Panthenol",
    "Ceramide NP",
    "Sodium Hyaluronate",
    "Tocopherol",
  ],
  keyIngredients: [
    { name: "Hyaluronic Acid", role: "Draws in moisture at multiple depths" },
    { name: "Ceramide Complex", role: "Rebuilds the skin barrier" },
    { name: "Niacinamide 4%", role: "Evens tone, refines texture" },
  ],
  howToUse:
    "Apply morning and evening to clean, dry skin. Warm a small amount between fingertips and press gently into skin, avoiding the eye area.",
  skinTypes: ["Dry", "Normal", "Combination"],
  concerns: ["Dryness", "Fine lines"],
  ...p,
});

export const products: Product[] = [
  mk(0, {
    name: "Silk Veil Moisture Cream",
    categorySlug: "hydration",
    shortBenefit: "72-hour deep hydration",
    price: 68,
    compareAt: 82,
    bestseller: true,
    featured: true,
    rating: 4.9,
    reviewCount: 412,
  }),
  mk(1, {
    name: "Dew Drop Hydra Serum",
    categorySlug: "hydration",
    shortBenefit: "Plumping hyaluronic serum",
    price: 54,
    bestseller: true,
    rating: 4.8,
    reviewCount: 289,
  }),
  mk(2, {
    name: "Cloud Balm Overnight Mask",
    categorySlug: "hydration",
    shortBenefit: "Wake up soft and refreshed",
    price: 62,
    newArrival: true,
  }),
  mk(3, {
    name: "Weightless Barrier Lotion",
    categorySlug: "hydration",
    shortBenefit: "Everyday moisture, invisible finish",
    price: 44,
  }),
  mk(4, {
    name: "Golden Hour Vitamin C",
    categorySlug: "brightening",
    shortBenefit: "Illuminating antioxidant serum",
    price: 72,
    compareAt: 88,
    bestseller: true,
    featured: true,
    rating: 4.9,
    reviewCount: 356,
    skinTypes: ["Normal", "Oily", "Combination"],
    concerns: ["Dullness", "Dark spots", "Uneven tone"],
  }),
  mk(5, {
    name: "Glow Renewal Essence",
    categorySlug: "brightening",
    shortBenefit: "Gentle daily radiance",
    price: 58,
    newArrival: true,
    concerns: ["Dullness", "Uneven tone"],
  }),
  mk(6, {
    name: "Bright Eye Awakening Cream",
    categorySlug: "brightening",
    shortBenefit: "Softens dark circles",
    price: 48,
    size: "15 ml",
    concerns: ["Dullness", "Fine lines"],
  }),
  mk(7, {
    name: "Radiance Night Elixir",
    categorySlug: "brightening",
    shortBenefit: "Overnight glow ritual",
    price: 84,
    concerns: ["Dullness", "Dark spots"],
  }),
  mk(8, {
    name: "Calm Cushion Repair Cream",
    categorySlug: "repair",
    shortBenefit: "Comfort for reactive skin",
    price: 58,
    bestseller: true,
    skinTypes: ["Sensitive", "Dry", "Normal"],
    concerns: ["Redness", "Dryness"],
  }),
  mk(9, {
    name: "Green Ritual Soothing Gel",
    categorySlug: "repair",
    shortBenefit: "Cooling relief, sage-infused",
    price: 46,
    skinTypes: ["Sensitive", "Combination"],
    concerns: ["Redness"],
  }),
  mk(10, {
    name: "Barrier Restore Serum",
    categorySlug: "repair",
    shortBenefit: "Reinforces skin resilience",
    price: 66,
    newArrival: true,
    skinTypes: ["Sensitive", "Dry"],
    concerns: ["Redness", "Dryness"],
  }),
  mk(11, {
    name: "Quiet Skin Fragrance-Free Balm",
    categorySlug: "repair",
    shortBenefit: "Bare essentials, nothing extra",
    price: 42,
    stock: 3,
    skinTypes: ["Sensitive"],
    concerns: ["Redness", "Dryness"],
  }),
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.categorySlug === slug);

export const skinTypes: SkinType[] = ["Dry", "Oily", "Combination", "Sensitive", "Normal"];
export const skinConcerns: SkinConcern[] = ["Dryness", "Acne", "Dark spots", "Fine lines", "Redness", "Dullness", "Uneven tone"];

export const testimonials = [
  { name: "Amelia R.", location: "London", quote: "My skin has never felt this comfortable. The Silk Veil is the softest cream I've ever used.", rating: 5 },
  { name: "Noor K.", location: "Dubai", quote: "The Golden Hour serum genuinely brightened my complexion in three weeks — no irritation at all.", rating: 5 },
  { name: "Priya S.", location: "Toronto", quote: "As someone with reactive skin, the Calm Cushion is a rare product I actually trust.", rating: 5 },
  { name: "Sofia M.", location: "Milan", quote: "Elegant packaging, beautiful textures, and results I can see. It feels like a small ritual every night.", rating: 5 },
];

export const faqs = [
  { q: "Are your products dermatologically tested?", a: "Every formula is developed with dermatologists and independently patch-tested on a broad range of skin types before launch." },
  { q: "Are the products cruelty-free?", a: "Yes. All Aurelane formulas and finished goods are cruelty-free and never tested on animals." },
  { q: "How soon will I see results?", a: "Most customers notice smoother, more comfortable skin within the first two weeks, with visible tone and texture changes after 4–6 weeks of consistent use." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If a product isn't right for your skin, reach out and we'll make it right." },
  { q: "Do you ship internationally?", a: "We currently ship across North America, the UK, EU, and the GCC. More regions are coming soon." },
];
