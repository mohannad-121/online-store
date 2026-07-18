import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie policy - Aurelane" }] }),
  component: () => (
    <div className="container-editorial py-16 max-w-3xl">
      <p className="text-eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-5xl">Cookies</h1>
      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>We use a small number of essential cookies to keep the site running, plus analytics cookies to understand how our site is used. You can manage your preferences from your browser settings at any time.</p>
        <p>We never use cookies to sell personal data.</p>
      </div>
    </div>
  ),
});
