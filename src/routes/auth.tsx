import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Aurelane" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [tab, setTab] = useState("signin");
  return (
    <div className="container-editorial py-16 max-w-md">
      <div className="text-center">
        <p className="text-eyebrow">Welcome</p>
        <h1 className="mt-3 font-display text-4xl">Your Aurelane account</h1>
      </div>
      <div className="mt-8 rounded-2xl border border-border p-6 bg-card">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Create account</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="pt-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Signed in (demo)"); }}>
              <div><Label className="mb-2 block">Email</Label><Input type="email" required /></div>
              <div><Label className="mb-2 block">Password</Label><Input type="password" required /></div>
              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" /> Remember me</label>
                <Link to="/forgot-password" className="text-accent underline">Forgot?</Link>
              </div>
              <Button className="w-full h-11">Sign in</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup" className="pt-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Account created — check your email"); }}>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="mb-2 block">First name</Label><Input required /></div>
                <div><Label className="mb-2 block">Last name</Label><Input required /></div>
              </div>
              <div><Label className="mb-2 block">Email</Label><Input type="email" required /></div>
              <div><Label className="mb-2 block">Password</Label><Input type="password" required /></div>
              <p className="text-xs text-muted-foreground">By continuing, you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.</p>
              <Button className="w-full h-11">Create account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
