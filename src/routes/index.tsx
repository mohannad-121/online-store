import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Truck, Star, Check } from "lucide-react";
import heroImage from "@/assets/hero-skincare.jpg";
import lifestyle from "@/assets/lifestyle-1.jpg";
import featured from "@/assets/featured-banner.jpg";
import { Button } from "@/components/ui/button";
import { categories, products, testimonials, faqs } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelane - Considered skincare for real skin" },
      { name: "description", content: "Dermatologist-developed creams, serums and rituals for hydration, brightening, and sensitive skin." },
      { property: "og:title", content: "Aurelane - Considered skincare rituals" },
      { property: "og:description", content: "Dermatologist-developed creams, serums and rituals." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-editorial grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24">
          <div className="fade-in-up">
            <p className="text-eyebrow">New · Silk Veil Collection</p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Skincare that feels<br/> like a quiet ritual.
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Considered formulas developed with dermatologists - for hydration that lasts,
              radiance you can see, and comfort your skin will trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 text-sm tracking-wide">
                <Link to="/shop">Shop the collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 text-sm tracking-wide">
                <Link to="/skin-guide">Explore skin guide</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
              {[
                { Icon: ShieldCheck, label: "Dermatologist developed" },
                { Icon: Leaf, label: "Botanical actives" },
                { Icon: Sparkles, label: "Cruelty-free" },
                { Icon: Truck, label: "Free shipping $60+" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col gap-2">
                  <Icon className="h-5 w-5 text-accent" />
                  <p className="text-xs text-muted-foreground leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[5/6] md:aspect-[4/5] rounded-2xl overflow-hidden">
              <img src={heroImage} alt="Aurelane hero" className="w-full h-full object-cover" width={1600} height={1400} />
            </div>
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-background rounded-xl shadow-elegant p-5 max-w-[240px]">
              <div className="flex items-center gap-2 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="mt-2 text-sm leading-snug">"My skin feels calm and cared for - every single morning."</p>
              <p className="mt-2 text-xs text-muted-foreground">- Amelia, verified customer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-editorial py-16 md:py-24">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-eyebrow">Collections</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Find your ritual</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-accent">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-2xl bg-secondary"
            >
              <div className="aspect-[4/5]">
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[10px] tracking-[0.25em] uppercase opacity-80">{c.tagline}</p>
                <h3 className="mt-2 font-display text-2xl">{c.name}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm">Shop now <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="container-editorial py-16">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-eyebrow">Bestsellers</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Loved by our community</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-accent">Shop all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="container-editorial py-16">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={featured} alt="Featured" loading="lazy" className="w-full h-[420px] md:h-[520px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-16 max-w-xl text-white">
              <p className="text-[10px] tracking-[0.25em] uppercase opacity-80">Editorial</p>
              <h3 className="mt-3 font-display text-4xl md:text-5xl leading-tight">The Silk Veil Ritual</h3>
              <p className="mt-4 text-white/85 leading-relaxed">
                A three-step evening ritual designed for deep hydration, calm, and quiet luxury.
                Discover how each layer supports your skin overnight.
              </p>
              <Button asChild variant="secondary" className="mt-6 h-11 px-6">
                <Link to="/product/silk-veil-moisture-cream">Discover the ritual</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-editorial py-16">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-eyebrow">Just landed</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">New arrivals</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/50 py-20 mt-8">
        <div className="container-editorial grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow">Why Aurelane</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">Formulated with intent. Made to last.</h2>
            <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
              We work with dermatologists and independent labs to develop products that respect
              your skin - and your time. No overpromises, no unnecessary steps.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { t: "Dermatologist developed", d: "Tested on a broad range of skin tones and types." },
                { t: "Botanical, effective actives", d: "Time-tested ingredients paired with proven science." },
                { t: "Considered packaging", d: "Recyclable glass, refill-ready formats where possible." },
                { t: "Cruelty-free forever", d: "Never tested on animals, anywhere in the world." },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <div className="mt-1 h-6 w-6 rounded-full bg-accent/15 grid place-items-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{f.t}</p>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img src={lifestyle} alt="Skincare ritual" loading="lazy" className="rounded-2xl w-full object-cover aspect-[5/4]" />
          </div>
        </div>
      </section>

      {/* ROUTINE */}
      <section className="container-editorial py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-eyebrow">A simple ritual</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Three steps, morning & night</h2>
          <p className="mt-4 text-muted-foreground">Everything your skin needs - nothing it doesn't.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Cleanse", d: "Gently remove the day with our fragrance-considered cleanser." },
            { n: "02", t: "Treat", d: "Layer a targeted serum for your skin's current focus." },
            { n: "03", t: "Protect", d: "Seal in moisture with a barrier-supporting cream." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-8">
              <p className="font-display text-4xl text-accent">{s.n}</p>
              <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/50 py-20">
        <div className="container-editorial">
          <div className="text-center">
            <p className="text-eyebrow">Reviews</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Words from our customers</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-background p-6 shadow-soft">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                <p className="mt-4 text-xs text-muted-foreground">{t.name} · {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="container-editorial py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden bg-secondary aspect-[4/5]">
              <img src={lifestyle} alt="Before" className="w-full h-full object-cover grayscale opacity-90" loading="lazy" />
              <p className="absolute mt-[-40px] ml-3 text-white text-xs uppercase tracking-widest">Before</p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-secondary aspect-[4/5]">
              <img src={lifestyle} alt="After" className="w-full h-full object-cover" loading="lazy" />
              <p className="absolute mt-[-40px] ml-3 text-white text-xs uppercase tracking-widest">After 8 weeks</p>
            </div>
          </div>
          <div>
            <p className="text-eyebrow">Results</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Visible change, gently.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              In an 8-week independent user trial, participants using the Silk Veil ritual reported
              smoother texture and improved comfort. Results are illustrative - every skin is different.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { n: "94%", l: "Noticed softer skin" },
                { n: "89%", l: "More even tone" },
                { n: "97%", l: "Would repurchase" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl">{s.n}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM GRID */}
      <section className="container-editorial py-16">
        <div className="text-center mb-10">
          <p className="text-eyebrow">@aurelane.skin</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">From our community</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[lifestyle, featured, heroImage, lifestyle, featured, heroImage].map((img, i) => (
            <a key={i} href="#" className="aspect-square overflow-hidden bg-secondary rounded-md">
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial py-20 grid md:grid-cols-[1fr_1.4fr] gap-12">
        <div>
          <p className="text-eyebrow">Common questions</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">Everything you need to know</h2>
          <p className="mt-4 text-muted-foreground">Can't find your answer? <Link to="/contact" className="underline underline-offset-4">Get in touch</Link>.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* NEWSLETTER */}
      <section className="container-editorial pb-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase opacity-70">Rituals in your inbox</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">Join the Aurelane letter</h2>
          <p className="mt-4 opacity-80 max-w-xl mx-auto">Skincare notes, ingredient stories, and early access to new formulas. Unsubscribe anytime.</p>
          <form className="mt-8 flex flex-col sm:flex-row max-w-md mx-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Your email" className="h-12 bg-background text-foreground" />
            <Button variant="secondary" className="h-12 px-6">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
