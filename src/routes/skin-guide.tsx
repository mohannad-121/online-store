import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import { Info } from "lucide-react";

export const Route = createFileRoute("/skin-guide")({
  head: () => ({ meta: [{ title: "Skin guide — Aurelane" }] }),
  component: SkinGuidePage,
});

const skinTypes = [
  { t: "Dry", d: "Feels tight, may look dull or flaky, especially after cleansing." },
  { t: "Oily", d: "Shows shine within a few hours, prone to congestion and enlarged pores." },
  { t: "Combination", d: "Oil in the T-zone, drier on cheeks. The most common skin type." },
  { t: "Sensitive", d: "Reacts easily — redness, stinging, discomfort with new products." },
  { t: "Normal", d: "Balanced, rarely reactive, few visible concerns." },
];

const concerns = ["Dryness", "Dullness", "Fine lines", "Dark spots", "Redness", "Uneven tone", "Acne"];
const results = ["A soft, hydrated glow", "Even, brighter tone", "Calm, comfortable skin", "Smoother texture"];

function SkinGuidePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ type?: string; concern?: string; result?: string }>({});
  const done = step >= 3;
  const recs = products.slice(0, 3);

  return (
    <div>
      <section className="container-editorial py-16 text-center max-w-2xl mx-auto">
        <p className="text-eyebrow">Skin guide</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Understand your skin</h1>
        <p className="mt-5 text-muted-foreground">A gentle, honest guide to skin types, concerns, and the foundations of a considered routine.</p>
      </section>

      <section className="container-editorial pb-16">
        <h2 className="font-display text-3xl mb-6">Skin types</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {skinTypes.map((s) => (
            <Card key={s.t} className="p-6 bg-secondary/40 border-0">
              <p className="font-display text-2xl">{s.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-editorial py-12 grid md:grid-cols-3 gap-6">
        {[
          { n: "01", t: "Cleanse", d: "Gentle removal of oil, sunscreen, and the day." },
          { n: "02", t: "Treat", d: "Targeted serums for your current focus." },
          { n: "03", t: "Protect", d: "Moisture and SPF to seal it all in." },
        ].map((s) => (
          <div key={s.n} className="p-8 rounded-2xl border border-border">
            <p className="font-display text-4xl text-accent">{s.n}</p>
            <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="container-editorial max-w-3xl">
          <p className="text-eyebrow">Quick quiz</p>
          <h2 className="mt-3 font-display text-4xl">Find your ritual in 30 seconds</h2>
          <p className="mt-3 text-sm text-muted-foreground flex items-center gap-2"><Info className="h-3.5 w-3.5" /> This is a general guide and doesn't replace professional medical advice.</p>

          <div className="mt-8 p-6 rounded-2xl bg-background">
            {!done && (
              <>
                {step === 0 && <QuizStep title="What's your skin type?" options={skinTypes.map((s) => s.t)} onPick={(v) => { setAnswers({ ...answers, type: v }); setStep(1); }} />}
                {step === 1 && <QuizStep title="What's your main concern?" options={concerns} onPick={(v) => { setAnswers({ ...answers, concern: v }); setStep(2); }} />}
                {step === 2 && <QuizStep title="What result do you want most?" options={results} onPick={(v) => { setAnswers({ ...answers, result: v }); setStep(3); }} />}
              </>
            )}
            {done && (
              <div>
                <p className="text-eyebrow">Your suggested routine</p>
                <h3 className="mt-2 font-display text-3xl">Based on: {answers.type} · {answers.concern}</h3>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {recs.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                <Button variant="outline" className="mt-6" onClick={() => { setStep(0); setAnswers({}); }}>Retake quiz</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function QuizStep({ title, options, onPick }: { title: string; options: string[]; onPick: (v: string) => void }) {
  return (
    <div>
      <p className="font-display text-2xl">{title}</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((o) => (
          <button key={o} onClick={() => onPick(o)} className="p-4 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-colors text-left">
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
