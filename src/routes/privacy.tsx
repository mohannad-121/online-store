import { createFileRoute } from "@tanstack/react-router";

function LegalPage({ title, body }: { title: string; body: { h: string; p: string }[] }) {
  return (
    <div className="container-editorial py-16 max-w-3xl">
      <p className="text-eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: March 2026 · Demo content for presentation purposes.</p>
      <div className="mt-10 space-y-8">
        {body.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl">{s.h}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy policy — Aurelane" }] }),
  component: () => (
    <LegalPage title="Privacy policy" body={[
      { h: "What we collect", p: "We collect only what we need to fulfill your order and improve your experience — name, contact details, shipping address, and browsing behavior on our site." },
      { h: "How we use it", p: "To process orders, provide customer support, communicate offers when you opt in, and improve our products and site." },
      { h: "Your rights", p: "You may request access, correction, or deletion of your data at any time by writing to privacy@aurelane.com." },
      { h: "Third parties", p: "We share data only with vetted providers (payment, shipping, analytics) under contract, never for sale." },
      { h: "Security", p: "Our systems use encryption in transit, hashed passwords, and least-privilege access controls." },
    ]} />
  ),
});
