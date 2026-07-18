import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, Package, Truck, Home, Clock } from "lucide-react";

export const Route = createFileRoute("/track-order")({
  head: () => ({ meta: [{ title: "Track order - Aurelane" }] }),
  component: TrackOrderPage,
});

const steps = [
  { Icon: Check, label: "Order received", date: "Mar 12" },
  { Icon: Check, label: "Confirmed", date: "Mar 12" },
  { Icon: Package, label: "Processing", date: "Mar 13" },
  { Icon: Truck, label: "Shipped", date: "Mar 14" },
  { Icon: Home, label: "Delivered", date: "Est. Mar 16" },
];

function TrackOrderPage() {
  const [shown, setShown] = useState(false);
  return (
    <div className="container-editorial py-12 md:py-16 max-w-2xl">
      <h1 className="font-display text-4xl md:text-5xl">Track your order</h1>
      <p className="mt-3 text-muted-foreground">Enter your order number and contact to see live progress.</p>
      <form className="mt-8 grid gap-4" onSubmit={(e) => { e.preventDefault(); setShown(true); }}>
        <div><Label className="mb-2 block">Order number</Label><Input placeholder="AUR-123456" required /></div>
        <div><Label className="mb-2 block">Email or phone</Label><Input placeholder="you@example.com" required /></div>
        <Button className="justify-self-start px-6">Track</Button>
      </form>
      {shown && (
        <section className="mt-12 rounded-2xl border border-border p-6 bg-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> Estimated delivery: March 16</div>
          <ol className="mt-6 relative border-l border-border ml-3 space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="pl-8">
                <span className={`absolute -left-3.5 h-7 w-7 rounded-full grid place-items-center ${i < 3 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
                  <s.Icon className="h-3.5 w-3.5" />
                </span>
                <p className="font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.date}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
