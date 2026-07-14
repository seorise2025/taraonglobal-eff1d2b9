import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Loader2, MessageCircle, Mail, LogOut, RefreshCw, Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL } from "@/lib/products";

type OrderRow = {
  id: string;
  order_number: string;
  product_name: string;
  product_slug: string;
  quantity: number;
  unit: string;
  customer_name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  company: string | null;
  city: string | null;
  state: string | null;
  buyer_type: string | null;
  notes: string | null;
  status: "new" | "confirmed" | "dispatched" | "delivered" | "cancelled";
  admin_notes: string | null;
  created_at: string;
};

const STATUSES: OrderRow["status"][] = ["new", "confirmed", "dispatched", "delivered", "cancelled"];

const STATUS_MESSAGE: Record<OrderRow["status"], string> = {
  new: "Hi {name}, we have received your order {num} for {qty} bags of {product}. We will confirm shortly. , TARAON GLOBAL",
  confirmed: "Hi {name}, your order {num} for {qty} bags of {product} is confirmed. Dispatch details will follow. , TARAON GLOBAL",
  dispatched: "Hi {name}, your order {num} ({qty} bags of {product}) has been dispatched. , TARAON GLOBAL",
  delivered: "Hi {name}, your order {num} has been delivered. Thank you for choosing TARAON GLOBAL.",
  cancelled: "Hi {name}, your order {num} has been cancelled. Please reach out if you need help. , TARAON GLOBAL",
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Orders Admin | TARAON GLOBAL" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | OrderRow["status"]>("all");

  const load = useCallback(async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data: roleData } = await supabase.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!roleData) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(true);
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setOrders(data as OrderRow[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: OrderRow["status"]) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setOrders((prev) => prev?.map((o) => (o.id === id ? { ...o, status } : o)) ?? null);
    toast.success(`Marked ${status}`);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  function downloadCsv() {
    if (!orders || orders.length === 0) {
      toast.error("No orders to export");
      return;
    }
    const rows = filter === "all" ? orders : orders.filter((o) => o.status === filter);
    const cols: (keyof OrderRow)[] = [
      "order_number", "created_at", "status", "product_slug", "product_name",
      "quantity", "unit", "customer_name", "phone", "whatsapp", "email",
      "company", "city", "state", "buyer_type", "notes", "admin_notes", "id",
    ];
    const esc = (v: unknown) => {
      if (v === null || v === undefined) return "";
      const s = String(v).replace(/"/g, '""');
      return /[",\n\r]/.test(s) ? `"${s}"` : s;
    };
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.href = url;
    a.download = `taraon-orders-${filter}-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} orders`);
  }

  if (isAdmin === null) {
    return (
      <div className="container-page py-20 text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-forest-deep" />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl text-forest-deep">Access denied</h1>
        <p className="mt-2 text-ink/70">
          Your account does not have admin access. Ask an existing admin to grant your user the <code>admin</code> role.
        </p>
        <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-sm">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    );
  }

  const filtered = filter === "all" ? orders : orders?.filter((o) => o.status === filter);

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-forest-deep">Orders</h1>
          <p className="text-sm text-ink/60">{orders?.length ?? 0} total</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="rounded-sm border border-input bg-background px-3 py-2 text-sm">
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={load} className="inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-sm"><RefreshCw className="h-4 w-4" /> Refresh</button>
          <button onClick={downloadCsv} className="inline-flex items-center gap-2 rounded-sm bg-forest-deep px-3 py-2 text-sm font-medium text-cream hover:bg-gold hover:text-forest-deep"><Download className="h-4 w-4" /> Export CSV</button>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-sm"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {filtered?.length === 0 && <p className="text-ink/60">No orders.</p>}
        {filtered?.map((o) => {
          const msg = STATUS_MESSAGE[o.status]
            .replace("{name}", o.customer_name)
            .replace("{num}", o.order_number)
            .replace("{qty}", String(o.quantity))
            .replace("{product}", o.product_name);
          const waNumber = (o.whatsapp || o.phone).replace(/\D/g, "");
          const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
          const mailHref = o.email
            ? `mailto:${o.email}?subject=${encodeURIComponent(`Order ${o.order_number} status: ${o.status}`)}&body=${encodeURIComponent(msg)}`
            : null;
          return (
            <article key={o.id} className="rounded-lg border border-border bg-card p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold">{o.order_number}</div>
                  <h2 className="font-display text-xl text-forest-deep">{o.product_name}</h2>
                  <p className="text-sm text-ink/70">{o.quantity} {o.unit} · {new Date(o.created_at).toLocaleString("en-IN")}</p>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value as OrderRow["status"])}
                  className={`rounded-sm border px-3 py-2 text-sm font-medium ${statusClass(o.status)}`}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </header>
              <dl className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <Row k="Name" v={o.customer_name} />
                <Row k="Phone" v={o.phone} />
                {o.whatsapp && <Row k="WhatsApp" v={o.whatsapp} />}
                {o.email && <Row k="Email" v={o.email} />}
                {o.company && <Row k="Company" v={o.company} />}
                {(o.city || o.state) && <Row k="Location" v={[o.city, o.state].filter(Boolean).join(", ")} />}
                {o.buyer_type && <Row k="Buyer" v={o.buyer_type} />}
              </dl>
              {o.notes && <p className="mt-3 rounded border-l-2 border-gold/60 bg-secondary/50 p-3 text-sm text-ink/80">{o.notes}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2 text-xs font-medium text-white">
                  <MessageCircle className="h-4 w-4" /> Send status on WhatsApp
                </a>
                {mailHref && (
                  <a href={mailHref} className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/30 px-4 py-2 text-xs font-medium text-forest-deep">
                    <Mail className="h-4 w-4" /> Email customer
                  </a>
                )}
                <a href={`mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(`FYI Order ${o.order_number}`)}`} className="inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-xs">
                  <Mail className="h-4 w-4" /> Forward to office
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="font-medium text-forest-deep">{k}:</dt>
      <dd className="text-ink/80">{v}</dd>
    </div>
  );
}

function statusClass(s: OrderRow["status"]) {
  switch (s) {
    case "new": return "bg-gold/15 border-gold/50 text-forest-deep";
    case "confirmed": return "bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100";
    case "dispatched": return "bg-purple-50 border-purple-300 text-purple-900 dark:bg-purple-950/40 dark:text-purple-100";
    case "delivered": return "bg-green-50 border-green-300 text-green-900 dark:bg-green-950/40 dark:text-green-100";
    case "cancelled": return "bg-red-50 border-red-300 text-red-900 dark:bg-red-950/40 dark:text-red-100";
  }
}
