import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary/60 border-t border-border">
      <div className="container-editorial py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-display text-3xl">Aurelane</Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Considered skincare rituals. Formulated with dermatologists, made with respect for
            ingredients, packaging, and your skin.
          </p>
          <div className="mt-6 flex gap-2">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 rounded-full border border-border grid place-items-center hover:bg-background transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Shop">
          <FLink to="/shop">All products</FLink>
          <FLink to="/category/hydration">Hydration</FLink>
          <FLink to="/category/brightening">Brightening</FLink>
          <FLink to="/category/repair">Repair</FLink>
          <FLink to="/skin-guide">Skin guide</FLink>
        </FooterCol>

        <FooterCol title="Help">
          <FLink to="/contact">Contact us</FLink>
          <FLink to="/track-order">Track order</FLink>
          <FLink to="/shipping">Shipping</FLink>
          <FLink to="/returns">Returns & refunds</FLink>
          <FLink to="/account">My account</FLink>
        </FooterCol>

        <FooterCol title="Company">
          <FLink to="/about">About us</FLink>
          <FLink to="/privacy">Privacy policy</FLink>
          <FLink to="/terms">Terms</FLink>
          <FLink to="/cookies">Cookies</FLink>
        </FooterCol>
      </div>

      <div className="border-t border-border">
        <div className="container-editorial py-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="max-w-md">
            <p className="text-eyebrow">Newsletter</p>
            <p className="mt-2 font-display text-xl">Rituals in your inbox</p>
          </div>
          <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1 md:w-80">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="you@lovelyemail.com" className="pl-9 h-11 bg-background" />
            </div>
            <Button className="h-11">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Aurelane Skincare. All rights reserved.</p>
          <p>Made with care. Cruelty-free · Dermatologist developed</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-eyebrow mb-4">{title}</p>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
function FLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-foreground/75 hover:text-foreground transition-colors">{children}</Link>
    </li>
  );
}
