import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | TARAON GLOBAL" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const fn = mode === "signin" ? supabase.auth.signInWithPassword({ email, password }) : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    const { error } = await fn;
    setBusy(false);
    if (error) return toast.error(error.message);
    if (mode === "signup") {
      toast.success("Account created. Ask an existing admin to grant you access.");
    } else {
      navigate({ to: "/admin" });
    }
  }

  return (
    <section className="container-page py-20">
      <div className="mx-auto max-w-md rounded-lg border border-border bg-card p-8">
        <h1 className="font-display text-2xl text-forest-deep">Admin {mode === "signin" ? "sign in" : "sign up"}</h1>
        <p className="mt-1 text-sm text-ink/70">Order management for TARAON GLOBAL staff.</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-forest-deep">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-forest-deep">Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
          </div>
          <button type="submit" disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-sm bg-forest-deep px-5 py-3 text-sm font-medium text-cream disabled:opacity-60">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} {mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-xs text-ink/60 underline">
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
