import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact - Aurelane" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-editorial py-12 md:py-20 grid lg:grid-cols-[1.2fr_1fr] gap-12">
      <div>
        <p className="text-eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-5xl">We're here to help</h1>
        <p className="mt-4 text-muted-foreground max-w-lg">Reach out with any question about your skin, an order, or our formulas. We respond within one business day.</p>
        <form className="mt-8 grid gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent"); }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label className="mb-2 block">Name</Label><Input required /></div>
            <div><Label className="mb-2 block">Email</Label><Input type="email" required /></div>
          </div>
          <div><Label className="mb-2 block">Subject</Label><Input /></div>
          <div><Label className="mb-2 block">Message</Label><Textarea rows={6} required /></div>
          <Button type="submit" className="justify-self-start px-6">Send message</Button>
        </form>
      </div>
      <aside className="space-y-4">
        <InfoCard Icon={Mail} title="Email" value="hello@aurelane.com" />
        <InfoCard Icon={Phone} title="Phone" value="+1 (415) 555-0192" />
        <InfoCard Icon={MessageCircle} title="WhatsApp" value="Chat with us" />
        <InfoCard Icon={MapPin} title="Studio" value="1450 Powell St, San Francisco" />
        <InfoCard Icon={Clock} title="Hours" value="Mon–Fri, 9am–6pm PT" />
        <p className="text-sm text-muted-foreground">Prefer self-service? Browse our <Link to="/" className="underline">FAQs</Link>.</p>
      </aside>
    </div>
  );
}

function InfoCard({ Icon, title, value }: { Icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card">
      <div className="h-10 w-10 rounded-full bg-accent/10 grid place-items-center shrink-0"><Icon className="h-4 w-4 text-accent" /></div>
      <div>
        <p className="text-eyebrow">{title}</p>
        <p className="mt-1">{value}</p>
      </div>
    </div>
  );
}
