import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & conditions — Aurelane" }] }),
  component: () => (
    <div className="container-editorial py-16 max-w-3xl">
      <p className="text-eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-5xl">Terms & conditions</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: March 2026.</p>
      <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
        <section><h2 className="font-display text-2xl text-foreground">Use of the site</h2><p className="mt-3">By using aurelane.com you agree to these terms. You must be 16 or older to purchase.</p></section>
        <section><h2 className="font-display text-2xl text-foreground">Orders</h2><p className="mt-3">We reserve the right to refuse or cancel an order at any time for reasons including product availability or errors in pricing.</p></section>
        <section><h2 className="font-display text-2xl text-foreground">Intellectual property</h2><p className="mt-3">All content on this site is owned by Aurelane and protected by copyright and trademark law.</p></section>
        <section><h2 className="font-display text-2xl text-foreground">Limitation of liability</h2><p className="mt-3">To the fullest extent permitted, our liability is limited to the amount you paid for the product in question.</p></section>
      </div>
    </div>
  ),
});
