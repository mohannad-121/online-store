import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Lock, CreditCard, Wallet, Banknote, Building2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout - Aurelane" }] }),
  component: CheckoutPage,
});

const steps = ["Information", "Delivery", "Shipping", "Payment", "Review"];

function CheckoutPage() {
  const { cartDetailed, subtotal, clearCart, addOrder } = useStore();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);

  const shippingCost = shipping === "express" ? 14 : subtotal >= 60 ? 0 : 6;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const placeOrder = () => {
    const order = {
      id: String(Date.now()),
      items: cartDetailed,
      total,
      totalFormatted: formatPrice(total),
      customerName: "Guest",
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    setPlaced(true);
    clearCart();
    toast.success("Order placed successfully");
  };

  if (placed) {
    return (
      <div className="container-editorial py-24 text-center max-w-lg mx-auto">
        <div className="mx-auto h-16 w-16 rounded-full bg-accent/15 grid place-items-center"><Check className="h-6 w-6 text-accent" /></div>
        <h1 className="mt-6 font-display text-4xl">Thank you for your order</h1>
        <p className="mt-3 text-muted-foreground">A confirmation has been sent to your email. Order #AUR-{Math.floor(100000 + Math.random() * 900000)}.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Button asChild><Link to="/">Back to home</Link></Button>
          <Button asChild variant="outline"><Link to="/track-order">Track order</Link></Button>
        </div>
      </div>
    );
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <Button asChild className="mt-6"><Link to="/shop">Shop products</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-editorial py-10 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>

      <div className="mt-8 flex items-center gap-4 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-2 text-sm whitespace-nowrap ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
            <span className={`h-6 w-6 rounded-full grid place-items-center text-xs ${i < step ? "bg-accent text-accent-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{i < step ? <Check className="h-3 w-3" /> : i + 1}</span>
            {s}
            {i < steps.length - 1 && <span className="w-6 h-px bg-border ml-2" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 mt-10">
        <div className="space-y-6">
          {step === 0 && (
            <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <div>
                <h2 className="font-display text-2xl">Your information</h2>
                <p className="text-sm text-muted-foreground">Guest checkout - <Link to="/auth" className="underline">sign in</Link> for a faster experience.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" type="email" required />
                <Field label="Phone" required />
                <Field label="First name" required />
                <Field label="Last name" required />
              </div>
              <label className="flex items-center gap-2 text-sm"><Checkbox /> Email me with news and offers</label>
            </section>
          )}

          {step === 1 && (
            <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl">Delivery address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Country" defaultValue="United States" />
                <Field label="Postal code" />
                <div className="sm:col-span-2"><Field label="Address" /></div>
                <Field label="Apartment, suite (optional)" />
                <Field label="City" />
                <Field label="State / Region" />
              </div>
              <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Billing address same as delivery</label>
              <div>
                <Label className="mb-2 block">Order note (optional)</Label>
                <Textarea placeholder="Any delivery notes for our team" />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl">Shipping method</h2>
              <RadioGroup value={shipping} onValueChange={setShipping} className="space-y-3">
                <RadioOption id="standard" value="standard" title="Standard delivery" desc="3–5 business days" price={subtotal >= 60 ? "Free" : formatPrice(6)} />
                <RadioOption id="express" value="express" title="Express delivery" desc="1–2 business days" price={formatPrice(14)} />
                <RadioOption id="pickup" value="pickup" title="Store pickup" desc="Available in select cities" price="Free" />
              </RadioGroup>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-accent" /><h2 className="font-display text-2xl">Payment method</h2></div>
              <p className="text-xs text-muted-foreground">Demo checkout - no live payment is processed. Your card details are never stored.</p>
              <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                <RadioOption id="card" value="card" title="Credit or debit card" desc="Visa · Mastercard · Amex" icon={<CreditCard className="h-4 w-4" />} />
                <RadioOption id="wallet" value="wallet" title="Digital wallet" desc="Apple Pay · Google Pay" icon={<Wallet className="h-4 w-4" />} />
                <RadioOption id="cod" value="cod" title="Cash on delivery" desc="Pay when you receive" icon={<Banknote className="h-4 w-4" />} />
                <RadioOption id="bank" value="bank" title="Bank transfer" desc="Instructions on the next step" icon={<Building2 className="h-4 w-4" />} />
              </RadioGroup>
              {payment === "card" && (
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="sm:col-span-2"><Field label="Card number" placeholder="1234 1234 1234 1234" /></div>
                  <Field label="Expiration (MM / YY)" />
                  <Field label="CVC" />
                  <div className="sm:col-span-2"><Field label="Name on card" /></div>
                </div>
              )}
            </section>
          )}

          {step === 4 && (
            <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl">Review your order</h2>
              <div className="divide-y">
                {cartDetailed.map(({ product, qty, lineTotal }) => (
                  <div key={product.id} className="py-3 flex items-center gap-4">
                    <img src={product.image} className="h-14 w-14 rounded-md object-cover bg-secondary" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {qty} · {product.size}</p>
                    </div>
                    <p>{formatPrice(lineTotal)}</p>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-2 text-sm pt-4"><Checkbox defaultChecked className="mt-0.5" /> <span>I agree to the <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.</span></label>
            </section>
          )}

          <div className="flex justify-between">
            {step > 0 ? <Button variant="outline" onClick={back}>Back</Button> : <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground self-center">← Return to cart</Link>}
            {step < steps.length - 1 ? <Button onClick={next}>Continue</Button> : <Button onClick={placeOrder}>Place order</Button>}
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6 h-fit lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-6 space-y-3 max-h-64 overflow-y-auto">
            {cartDetailed.map(({ product, qty, lineTotal }) => (
              <div key={product.id} className="flex items-center gap-3 text-sm">
                <div className="relative">
                  <img src={product.image} className="h-14 w-14 rounded-md object-cover bg-secondary" alt="" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-5 min-w-5 grid place-items-center">{qty}</span>
                </div>
                <div className="flex-1 min-w-0"><p className="truncate">{product.name}</p><p className="text-xs text-muted-foreground">{product.size}</p></div>
                <p>{formatPrice(lineTotal)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm pt-4 border-t">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shippingCost === 0 ? "Free" : formatPrice(shippingCost)} />
            <Row label="Estimated tax" value={formatPrice(tax)} />
            <div className="flex justify-between font-medium text-base pt-2 border-t"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> SSL-secured checkout</div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div>
      <Label className="mb-2 block text-sm">{label}</Label>
      <Input {...props} />
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
function RadioOption({ id, value, title, desc, price, icon }: { id: string; value: string; title: string; desc: string; price?: string; icon?: React.ReactNode }) {
  return (
    <Label htmlFor={id} className="flex items-center gap-4 p-4 border border-border rounded-xl cursor-pointer hover:border-accent transition-colors [&:has([data-state=checked])]:border-accent">
      <RadioGroupItem value={value} id={id} />
      {icon}
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {price && <p className="text-sm">{price}</p>}
    </Label>
  );
}
