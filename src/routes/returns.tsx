import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({ meta: [{ title: "Returns & refunds - Aurelane" }] }),
  component: () => (
    <div className="container-editorial py-16 max-w-3xl">
      <p className="text-eyebrow">Support</p>
      <h1 className="mt-3 font-display text-5xl">Returns & refunds</h1>
      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>We offer a 30-day satisfaction guarantee on all products. If something isn't right for your skin, contact us at hello@aurelane.com and we'll make it right.</p>
        <p><strong className="text-foreground">How it works:</strong> Reach out, tell us which product and why. We'll arrange a return label and process a refund within 5 business days of receiving the item.</p>
        <p>Sale items, gift cards, and opened kits are non-refundable unless there's a quality issue.</p>
      </div>
    </div>
  ),
});
