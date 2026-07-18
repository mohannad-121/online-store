import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  head: () => ({ meta: [{ title: "Shipping policy - Aurelane" }] }),
  component: () => (
    <div className="container-editorial py-16 max-w-3xl">
      <p className="text-eyebrow">Support</p>
      <h1 className="mt-3 font-display text-5xl">Shipping</h1>
      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p><strong className="text-foreground">Standard delivery</strong> - 3 to 5 business days. Free on orders over $60.</p>
        <p><strong className="text-foreground">Express delivery</strong> - 1 to 2 business days for $14.</p>
        <p><strong className="text-foreground">International</strong> - We ship across the US, Canada, UK, EU, and GCC. Duties may apply.</p>
        <p><strong className="text-foreground">Tracking</strong> - You'll receive a tracking link by email as soon as your order ships.</p>
      </div>
    </div>
  ),
});
