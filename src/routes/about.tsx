import { createFileRoute } from "@tanstack/react-router";
import lifestyle from "@/assets/lifestyle-1.jpg";
import featured from "@/assets/featured-banner.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About us — Aurelane" },
    { name: "description", content: "Our story, mission, and ingredient philosophy." },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="container-editorial py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-eyebrow">Our story</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl leading-tight">Skincare, considered — from ingredient to ritual.</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Aurelane began with a simple idea: skincare should feel like a moment of care, not a chore.
            We work closely with dermatologists and formulators to develop products that are gentle,
            effective, and quietly beautiful — from the first drop to the last.
          </p>
        </div>
        <img src={lifestyle} alt="" className="rounded-2xl aspect-[4/5] object-cover" />
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container-editorial grid md:grid-cols-3 gap-8">
          {[
            { t: "Mission", d: "To make thoughtful skincare accessible — with formulas we'd use on our own skin, every day." },
            { t: "Vision", d: "A future where every beauty product is honest about what it does, how it's made, and who it's for." },
            { t: "Values", d: "Kindness in every formula, transparency in every claim, and respect for the planet and its people." },
          ].map((v) => (
            <div key={v.t}>
              <p className="text-eyebrow">{v.t}</p>
              <p className="mt-3 font-display text-2xl">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-editorial py-20 grid md:grid-cols-2 gap-12 items-center">
        <img src={featured} alt="" className="rounded-2xl aspect-[4/3] object-cover" />
        <div>
          <p className="text-eyebrow">Ingredient philosophy</p>
          <h2 className="mt-3 font-display text-4xl">Botanical actives, backed by science.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We choose ingredients for what they do — not what they sound like. Our formulas pair
            time-tested botanicals with clinically-proven actives at levels that actually work.
            Nothing on our label is filler.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>· Cruelty-free, everywhere</li>
            <li>· No parabens, phthalates, sulfates, mineral oils</li>
            <li>· Third-party stability tested</li>
            <li>· Recyclable glass and refillable formats where possible</li>
          </ul>
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container-editorial">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-eyebrow">The team</p>
            <h2 className="mt-3 font-display text-4xl">A small, considered team</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            {[
              { n: "Layla Aziz", r: "Founder & Formulator" },
              { n: "Dr. Elena Marchetti", r: "Dermatology Advisor" },
              { n: "Sofia Bennett", r: "Head of Product" },
            ].map((m) => (
              <div key={m.n} className="text-center">
                <div className="aspect-square rounded-2xl bg-sand mb-4"></div>
                <p className="font-display text-xl">{m.n}</p>
                <p className="text-sm text-muted-foreground">{m.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
