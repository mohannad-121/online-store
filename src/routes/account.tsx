import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, MapPin, Package, Heart, CreditCard, Lock, Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — Aurelane" }] }),
  component: AccountPage,
});

const orders = [
  { id: "AUR-102938", date: "Mar 10, 2026", status: "Delivered", total: 148.5, items: 3 },
  { id: "AUR-101284", date: "Feb 22, 2026", status: "Delivered", total: 82.0, items: 1 },
  { id: "AUR-100812", date: "Jan 05, 2026", status: "Delivered", total: 214.75, items: 4 },
];

const tabs = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "orders", label: "Orders", Icon: Package },
  { id: "addresses", label: "Addresses", Icon: MapPin },
  { id: "wishlist", label: "Wishlist", Icon: Heart },
  { id: "payment", label: "Payment methods", Icon: CreditCard },
  { id: "security", label: "Security", Icon: Lock },
  { id: "notifications", label: "Notifications", Icon: Bell },
];

function AccountPage() {
  const [tab, setTab] = useState("profile");
  return (
    <div className="container-editorial py-12 md:py-16">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-eyebrow">My account</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Welcome back, Layla</h1>
        </div>
        <Button variant="outline" onClick={() => toast.success("Signed out (demo)")}><LogOut className="h-4 w-4 mr-2" /> Sign out</Button>
      </div>

      <div className="mt-10 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left whitespace-nowrap ${tab === id ? "bg-secondary" : "hover:bg-secondary/60"}`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </aside>

        <div>
          {tab === "profile" && (
            <Card title="Profile information">
              <div className="grid sm:grid-cols-2 gap-4">
                <F l="First name" v="Layla" /><F l="Last name" v="Aziz" />
                <F l="Email" v="layla@example.com" /><F l="Phone" v="+1 (415) 555-0192" />
              </div>
              <Button className="mt-6">Save changes</Button>
            </Card>
          )}
          {tab === "orders" && (
            <Card title="Order history">
              <div className="divide-y">
                {orders.map((o) => (
                  <div key={o.id} className="py-4 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{o.id}</p>
                      <p className="text-xs text-muted-foreground">{o.date} · {o.items} items</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">{o.status}</span>
                    <p className="font-medium">${o.total.toFixed(2)}</p>
                    <Button variant="ghost" size="sm" asChild><Link to="/track-order">Track</Link></Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
          {tab === "addresses" && (
            <Card title="Saved addresses">
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-5 rounded-xl border border-border">
                    <p className="font-medium">{i === 1 ? "Home" : "Work"}</p>
                    <p className="text-sm text-muted-foreground mt-1">1450 Powell St<br/>San Francisco, CA 94133<br/>United States</p>
                    <div className="mt-3 flex gap-2"><Button variant="outline" size="sm">Edit</Button><Button variant="ghost" size="sm">Remove</Button></div>
                  </div>
                ))}
              </div>
              <Button className="mt-6">Add address</Button>
            </Card>
          )}
          {tab === "wishlist" && (
            <Card title="Saved for later">
              <p className="text-muted-foreground text-sm">View your wishlist <Link to="/wishlist" className="underline">here</Link>.</p>
            </Card>
          )}
          {tab === "payment" && (
            <Card title="Payment methods">
              <div className="p-5 rounded-xl border border-border flex items-center justify-between">
                <div><p className="font-medium">Visa ending 4242</p><p className="text-xs text-muted-foreground">Expires 08/28</p></div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <Button className="mt-6">Add payment method</Button>
              <p className="mt-3 text-xs text-muted-foreground">Card details are handled by our payment provider and never stored on our servers.</p>
            </Card>
          )}
          {tab === "security" && (
            <Card title="Password & security">
              <div className="space-y-4">
                <div><Label className="mb-2 block">Current password</Label><Input type="password" /></div>
                <div><Label className="mb-2 block">New password</Label><Input type="password" /></div>
                <Button>Update password</Button>
                <div className="pt-6 border-t">
                  <p className="font-medium">Two-factor authentication</p>
                  <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account.</p>
                  <Button variant="outline" className="mt-3">Enable 2FA</Button>
                </div>
              </div>
            </Card>
          )}
          {tab === "notifications" && (
            <Card title="Notifications">
              {["Order updates", "New arrivals", "Restock alerts", "Promotions"].map((n) => (
                <label key={n} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <span>{n}</span><input type="checkbox" defaultChecked className="h-4 w-4" />
                </label>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-2xl mb-6">{title}</h2>
      {children}
    </section>
  );
}
function F({ l, v }: { l: string; v: string }) {
  return <div><Label className="mb-2 block">{l}</Label><Input defaultValue={v} /></div>;
}
