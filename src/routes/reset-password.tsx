import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set new password - Aurelane" }] }),
  component: () => (
    <div className="container-editorial py-16 max-w-md">
      <h1 className="font-display text-4xl">Set a new password</h1>
      <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }}>
        <div><Label className="mb-2 block">New password</Label><Input type="password" required /></div>
        <div><Label className="mb-2 block">Confirm password</Label><Input type="password" required /></div>
        <Button className="w-full h-11">Update password</Button>
        <p className="text-sm text-center"><Link to="/auth" className="underline">Back to sign in</Link></p>
      </form>
    </div>
  ),
});
