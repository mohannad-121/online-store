import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password - Aurelane" }] }),
  component: () => (
    <div className="container-editorial py-16 max-w-md">
      <h1 className="font-display text-4xl">Reset password</h1>
      <p className="mt-3 text-muted-foreground">Enter your email and we'll send a reset link.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Reset email sent"); }}>
        <div><Label className="mb-2 block">Email</Label><Input type="email" required /></div>
        <Button className="w-full h-11">Send reset link</Button>
        <p className="text-sm text-center"><Link to="/auth" className="underline">Back to sign in</Link></p>
      </form>
    </div>
  ),
});
