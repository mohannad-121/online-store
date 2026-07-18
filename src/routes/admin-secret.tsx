import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useProductCatalog, type ProductOverride } from "@/lib/products";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/i18n";

const ADMIN_KEY = "aurelane-admin";
const SECRET_PASSWORD = "admin2026";

export const Route = createFileRoute("/admin-secret")({
  head: () => ({ meta: [{ title: "Admin dashboard - Aurelane" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { products, saveOverride } = useProductCatalog();
  const { orders } = useStore();
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setApproved(window.localStorage.getItem(ADMIN_KEY) === SECRET_PASSWORD);
  }, []);

  const authorize = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      window.localStorage.setItem(ADMIN_KEY, SECRET_PASSWORD);
      setApproved(true);
      setError(null);
      return;
    }
    setError("Invalid admin password.");
  };

  const updateProduct = (id: string, field: keyof ProductOverride, value: string | number) => {
    saveOverride(id, { [field]: value } as ProductOverride);
  };

  const productColumns = useMemo(
    () => ["name", "price", "stock", "featured", "bestseller", "newArrival"] as const,
    [],
  );

  if (!approved) {
    return (
      <div className="container-editorial py-24 max-w-xl mx-auto">
        <h1 className="font-display text-4xl">{t("adminPanel")}</h1>
        <p className="mt-4 text-muted-foreground">Enter the admin password to continue.</p>
        <form onSubmit={authorize} className="mt-8 space-y-4">
          <div>
            <Label className="mb-2 block text-sm">Password</Label>
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          <Button type="submit">Unlock dashboard</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-eyebrow">{t("adminPanel")}</p>
          <h1 className="mt-2 font-display text-4xl">Aurelane Admin</h1>
          <p className="mt-3 text-sm text-muted-foreground">Manage products and review order activity from this hidden control panel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={activeTab === "products" ? "secondary" : "outline"} onClick={() => setActiveTab("products")}>{t("products")}</Button>
          <Button variant={activeTab === "orders" ? "secondary" : "outline"} onClick={() => setActiveTab("orders")}>{t("orders")}</Button>
        </div>
      </div>

      {activeTab === "products" ? (
        <section className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card p-6">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="pb-3">Product</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Featured</th>
                <th className="pb-3">Bestseller</th>
                <th className="pb-3">New</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border/70">
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">
                    <Input
                      type="number"
                      min={0}
                      className="w-24"
                      value={product.price}
                      onChange={(e) => updateProduct(product.id, "price", Number(e.target.value))}
                    />
                  </td>
                  <td className="py-4">
                    <Input
                      type="number"
                      min={0}
                      className="w-24"
                      value={product.stock}
                      onChange={(e) => updateProduct(product.id, "stock", Number(e.target.value))}
                    />
                  </td>
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={product.featured}
                      onChange={(e) => updateProduct(product.id, "featured", e.target.checked)}
                    />
                  </td>
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={product.bestseller ?? false}
                      onChange={(e) => updateProduct(product.id, "bestseller", e.target.checked)}
                    />
                  </td>
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={product.newArrival ?? false}
                      onChange={(e) => updateProduct(product.id, "newArrival", e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">No orders have been placed yet.</p>
              <Button asChild><Link to="/shop">Browse products</Link></Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-border bg-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                      <p className="font-medium">{order.customerName ?? "Guest"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                      <p className="font-semibold">{order.totalFormatted}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img src={item.product.image} alt="" className="h-14 w-14 rounded-lg object-cover bg-secondary" />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty {item.qty} · {item.product.size}</p>
                        </div>
                        <p>{item.product.price * item.qty} AED</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
