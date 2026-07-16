import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Loader2, MessageCircle, Mail, LogOut, RefreshCw, Download, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL } from "@/lib/products";
import { buildOrderStatusWaMessage, buildEnquiryFollowUpMessage } from "@/lib/inquiry";

type Tab = "orders" | "enquiries";

const ORDER_STATUSES = [
  "requirement_received",
  "quoted",
  "confirmed",
  "in_production",
  "ready_to_ship",
  "dispatched",
  "delivered",
  "closed_lost",
] as const;
type OrderStatus = (typeof ORDER_STATUSES)[number];

const ENQUIRY_STATUSES = ["new", "in_progress", "quoted", "converted", "closed"] as const;
type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

type OrderRow = {
  id: string;
  order_number: string;
  product_name: string;
  product_slug: string;
  quantity: number;
  unit: string;
  bags: number | null;
  customer_name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  company: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  gst_number: string | null;
  buyer_type: string | null;
  po_reference: string | null;
  required_delivery_date: string | null;
  notes: string | null;
  status: string;
  admin_notes: string | null;
  follow_up_date: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
};

type EnquiryRow = {
  id: string;
  reference_number: string | null;
  name: string;
  company: string | null;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  gst_number: string | null;
  product_needed: string | null;
  quantity: string | null;
  monthly_requirement: string | null;
  expected_order_date: string | null;
  buyer_type: string | null;
  message: string | null;
  status: string;
  admin_notes: string | null;
  follow_up_date: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin | TARAON GLOBAL" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRow[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");

  const load = useCallback(async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data: roleData } = await supabase.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!roleData) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(true);
    const [{ data: o, error: oe }, { data: e, error: ee }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
    ]);
    if (oe) toast.error(oe.message);
    else setOrders(o as OrderRow[]);
    if (ee) toast.error(ee.message);
    else setEnquiries(e as EnquiryRow[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setStatusFilter("all");
    setProductFilter("all");
  }, [tab]);

  async function updateOrder(id: string, patch: Record<string, unknown>) {
    const { error } = await supabase.from("orders").update(patch as never).eq("id", id);
    if (error) return toast.error(error.message);
    setOrders((prev) => prev?.map((o) => (o.id === id ? { ...o, ...(patch as Partial<OrderRow>) } : o)) ?? null);
    toast.success("Updated");
  }

  async function updateEnquiry(id: string, patch: Record<string, unknown>) {
    const { error } = await supabase.from("enquiries").update(patch as never).eq("id", id);
    if (error) return toast.error(error.message);
    setEnquiries((prev) => prev?.map((e) => (e.id === id ? { ...e, ...(patch as Partial<EnquiryRow>) } : e)) ?? null);
    toast.success("Updated");
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  function downloadCsv() {
    const rows: Record<string, unknown>[] =
      tab === "orders"
        ? (filteredOrders as unknown as Record<string, unknown>[])
        : (filteredEnquiries as unknown as Record<string, unknown>[]);
    if (!rows || rows.length === 0) {
      toast.error("Nothing to export");
      return;
    }
    const cols = Object.keys(rows[0]);
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
    a.download = `taraon-${tab}-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} rows`);
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
        <button
          onClick={signOut}
          className="mt-6 inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-sm"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    );
  }

  const productOptionsOrders = Array.from(new Set((orders ?? []).map((o) => o.product_slug))).sort();
  const productOptionsEnq = Array.from(
    new Set((enquiries ?? []).map((e) => e.product_needed).filter(Boolean) as string[]),
  ).sort();

  const filteredOrders = (orders ?? []).filter(
    (o) =>
      (statusFilter === "all" || o.status === statusFilter) &&
      (productFilter === "all" || o.product_slug === productFilter),
  );
  const filteredEnquiries = (enquiries ?? []).filter(
    (e) =>
      (statusFilter === "all" || e.status === statusFilter) &&
      (productFilter === "all" || e.product_needed === productFilter),
  );

  const statuses = tab === "orders" ? ORDER_STATUSES : ENQUIRY_STATUSES;

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-forest-deep">Admin</h1>
          <p className="text-sm text-ink/60">
            {tab === "orders"
              ? `${orders?.length ?? 0} bulk requirements`
              : `${enquiries?.length ?? 0} enquiries`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex overflow-hidden rounded-sm border border-border">
            <button
              onClick={() => setTab("orders")}
              className={`px-3 py-2 text-sm ${tab === "orders" ? "bg-forest-deep text-cream" : "bg-background text-ink/80"}`}
            >
              Bulk Requirements
            </button>
            <button
              onClick={() => setTab("enquiries")}
              className={`px-3 py-2 text-sm ${tab === "enquiries" ? "bg-forest-deep text-cream" : "bg-background text-ink/80"}`}
            >
              Enquiries
            </button>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All products</option>
            {(tab === "orders" ? productOptionsOrders : productOptionsEnq).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-sm"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 rounded-sm bg-forest-deep px-3 py-2 text-sm font-medium text-cream hover:bg-gold hover:text-forest-deep"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {tab === "orders" && filteredOrders.length === 0 && <p className="text-ink/60">No bulk requirements.</p>}
        {tab === "orders" &&
          filteredOrders.map((o) => (
            <OrderCard key={o.id} row={o} onUpdate={(patch) => updateOrder(o.id, patch)} />
          ))}
        {tab === "enquiries" && filteredEnquiries.length === 0 && <p className="text-ink/60">No enquiries.</p>}
        {tab === "enquiries" &&
          filteredEnquiries.map((e) => (
            <EnquiryCard key={e.id} row={e} onUpdate={(patch) => updateEnquiry(e.id, patch)} />
          ))}
      </div>
    </section>
  );
}

function OrderCard({ row, onUpdate }: { row: OrderRow; onUpdate: (p: Partial<OrderRow>) => void }) {
  const [notes, setNotes] = useState(row.admin_notes ?? "");
  const [followUp, setFollowUp] = useState(row.follow_up_date ?? "");
  const waNumber = (row.whatsapp || row.phone).replace(/\D/g, "");
  const msg = buildOrderStatusWaMessage({
    name: row.customer_name,
    reference: row.order_number,
    product: row.product_name,
    quantity: `${row.quantity} ${row.unit}${row.bags ? ` (${row.bags} x 25 Kg bags)` : ""}`,
    status: row.status,
  });
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  const mailHref = row.email
    ? `mailto:${row.email}?subject=${encodeURIComponent(`Requirement ${row.order_number}: ${row.status.replace(/_/g, " ")}`)}&body=${encodeURIComponent(msg)}`
    : null;

  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-gold">{row.order_number}</div>
          <h2 className="font-display text-xl text-forest-deep">{row.product_name}</h2>
          <p className="text-sm text-ink/70">
            {row.quantity} {row.unit}
            {row.bags ? ` · ${row.bags} bags` : ""} · {new Date(row.created_at).toLocaleString("en-IN")}
          </p>
        </div>
        <select
          value={row.status}
          onChange={(e) => onUpdate({ status: e.target.value })}
          className="rounded-sm border px-3 py-2 text-sm font-medium"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </header>
      <dl className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        <Row k="Name" v={row.customer_name} />
        <Row k="Phone" v={row.phone} />
        {row.whatsapp && <Row k="WhatsApp" v={row.whatsapp} />}
        {row.email && <Row k="Email" v={row.email} />}
        {row.company && <Row k="Company" v={row.company} />}
        {row.gst_number && <Row k="GSTIN" v={row.gst_number} />}
        {(row.city || row.state || row.pincode) && (
          <Row k="Location" v={[row.city, row.state, row.pincode].filter(Boolean).join(", ")} />
        )}
        {row.buyer_type && <Row k="Buyer" v={row.buyer_type} />}
        {row.po_reference && <Row k="PO" v={row.po_reference} />}
        {row.required_delivery_date && <Row k="Needed by" v={row.required_delivery_date} />}
        {row.source_page && <Row k="Source page" v={row.source_page} />}
        {row.utm_source && <Row k="UTM" v={[row.utm_source, row.utm_medium, row.utm_campaign].filter(Boolean).join(" / ")} />}
      </dl>
      {row.notes && (
        <p className="mt-3 rounded border-l-2 border-gold/60 bg-secondary/50 p-3 text-sm text-ink/80">{row.notes}</p>
      )}
      <AdminMeta
        notes={notes}
        setNotes={setNotes}
        followUp={followUp}
        setFollowUp={setFollowUp}
        onSave={() => onUpdate({ admin_notes: notes || null, follow_up_date: followUp || null })}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2 text-xs font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> Send status on WhatsApp
        </a>
        {mailHref && (
          <a
            href={mailHref}
            className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/30 px-4 py-2 text-xs font-medium text-forest-deep"
          >
            <Mail className="h-4 w-4" /> Email customer
          </a>
        )}
        <a
          href={`mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(`FYI Requirement ${row.order_number}`)}`}
          className="inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-xs"
        >
          <Mail className="h-4 w-4" /> Forward to office
        </a>
      </div>
    </article>
  );
}

function EnquiryCard({ row, onUpdate }: { row: EnquiryRow; onUpdate: (p: Partial<EnquiryRow>) => void }) {
  const [notes, setNotes] = useState(row.admin_notes ?? "");
  const [followUp, setFollowUp] = useState(row.follow_up_date ?? "");
  const waNumber = (row.whatsapp || row.phone).replace(/\D/g, "");
  const msg = buildEnquiryFollowUpMessage({ name: row.name, reference: row.reference_number });
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  const mailHref = row.email
    ? `mailto:${row.email}?subject=${encodeURIComponent(`Your enquiry ${row.reference_number ?? ""}`.trim())}&body=${encodeURIComponent(msg)}`
    : null;

  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-gold">{row.reference_number ?? "ENQUIRY"}</div>
          <h2 className="font-display text-xl text-forest-deep">{row.name}</h2>
          <p className="text-sm text-ink/70">
            {row.product_needed ?? "General enquiry"} · {new Date(row.created_at).toLocaleString("en-IN")}
          </p>
        </div>
        <select
          value={row.status}
          onChange={(e) => onUpdate({ status: e.target.value })}
          className="rounded-sm border px-3 py-2 text-sm font-medium"
        >
          {ENQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </header>
      <dl className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        <Row k="Phone" v={row.phone} />
        {row.whatsapp && <Row k="WhatsApp" v={row.whatsapp} />}
        {row.email && <Row k="Email" v={row.email} />}
        {row.company && <Row k="Company" v={row.company} />}
        {row.gst_number && <Row k="GSTIN" v={row.gst_number} />}
        {(row.city || row.state || row.pincode) && (
          <Row k="Location" v={[row.city, row.state, row.pincode].filter(Boolean).join(", ")} />
        )}
        {row.buyer_type && <Row k="Buyer" v={row.buyer_type} />}
        {row.quantity && <Row k="Quantity" v={row.quantity} />}
        {row.monthly_requirement && <Row k="Monthly need" v={row.monthly_requirement} />}
        {row.expected_order_date && <Row k="Expected order" v={row.expected_order_date} />}
        {row.source_page && <Row k="Source page" v={row.source_page} />}
        {row.utm_source && <Row k="UTM" v={[row.utm_source, row.utm_medium, row.utm_campaign].filter(Boolean).join(" / ")} />}
      </dl>
      {row.message && (
        <p className="mt-3 rounded border-l-2 border-gold/60 bg-secondary/50 p-3 text-sm text-ink/80">{row.message}</p>
      )}
      <AdminMeta
        notes={notes}
        setNotes={setNotes}
        followUp={followUp}
        setFollowUp={setFollowUp}
        onSave={() => onUpdate({ admin_notes: notes || null, follow_up_date: followUp || null })}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2 text-xs font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> Reply on WhatsApp
        </a>
        {mailHref && (
          <a
            href={mailHref}
            className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/30 px-4 py-2 text-xs font-medium text-forest-deep"
          >
            <Mail className="h-4 w-4" /> Email customer
          </a>
        )}
      </div>
    </article>
  );
}

function AdminMeta({
  notes,
  setNotes,
  followUp,
  setFollowUp,
  onSave,
}: {
  notes: string;
  setNotes: (v: string) => void;
  followUp: string;
  setFollowUp: (v: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="mt-4 grid gap-3 rounded border border-border/70 bg-background/50 p-3 sm:grid-cols-[1fr_auto_auto]">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Internal notes"
        rows={2}
        className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
      />
      <label className="flex items-center gap-2 text-xs text-ink/70">
        Follow up
        <input
          type="date"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          className="rounded-sm border border-input bg-background px-2 py-1 text-sm"
        />
      </label>
      <button
        onClick={onSave}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-forest-deep px-3 py-2 text-xs font-medium text-cream hover:bg-gold hover:text-forest-deep"
      >
        <Save className="h-3.5 w-3.5" /> Save
      </button>
    </div>
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
