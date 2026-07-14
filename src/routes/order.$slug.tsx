import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PRODUCTS, ADMIN_WHATSAPP, ADMIN_EMAIL, type ProductKey } from "@/lib/products";

const orderSchema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(30)
    .regex(/^[+\d][\d\s\-()]{6,}$/, "Phone can only contain digits, spaces, +, -, ()"),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  buyer_type: z.string().trim().max(60).optional().or(z.literal("")),
  quantity: z.coerce
    .number({ invalid_type_error: "Enter a valid quantity" })
    .int("Quantity must be a whole number of bags")
    .positive("Quantity must be at least 1")
    .max(100000, "Quantity too large"),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const Route = createFileRoute("/order/$slug")({
  beforeLoad: ({ params }) => {
    if (!(params.slug in PRODUCTS)) throw notFound();
  },
  head: ({ params }) => {
    const p = PRODUCTS[params.slug as ProductKey];
    const title = p ? `Place Order for ${p.name} | TARAON GLOBAL` : "Place Order | TARAON GLOBAL";
    return {
      meta: [
        { title },
        { name: "description", content: `Order ${p?.name ?? "potassium humate"} in 25 Kgs packs. TARAON GLOBAL confirms every order on WhatsApp and email.` },
        { name: "robots", content: "noindex, follow" },
      ],
    };
  },
  errorComponent: ({ reset }) => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl text-forest-deep">Something went wrong</h1>
      <button onClick={reset} className="mt-6 rounded-sm bg-forest-deep px-5 py-3 text-cream">Try again</button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl text-forest-deep">Product not found</h1>
      <Link to="/" className="mt-6 inline-block text-gold underline">Back to home</Link>
    </div>
  ),
  component: OrderPage,
});

function OrderPage() {
  const { slug } = Route.useParams();
  const product = PRODUCTS[slug as ProductKey];
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<null | {
    order_number: string;
    id: string;
    waHref: string;
    mailHref: string;
    details: Record<string, string>;
  }>(null);
  const [fallback, setFallback] = useState<null | { waHref: string; message: string }>(null);

  function buildFallback(d: z.infer<typeof orderSchema>) {
    const msg =
      `Hi TARAON GLOBAL, I could not submit the order form. Please take my order:\n\n` +
      `Product: ${product.name}\n` +
      `Quantity: ${d.quantity} ${product.unit} (${product.pack} pack)\n` +
      `Name: ${d.customer_name}\n` +
      `Phone: ${d.phone}` +
      (d.email ? `\nEmail: ${d.email}` : "") +
      (d.company ? `\nCompany: ${d.company}` : "") +
      (d.city || d.state ? `\nLocation: ${[d.city, d.state].filter(Boolean).join(", ")}` : "") +
      (d.buyer_type ? `\nBuyer type: ${d.buyer_type}` : "") +
      (d.notes ? `\nNotes: ${d.notes}` : "");
    return { message: msg, waHref: `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}` };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = orderSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const d = parsed.data;
    const { data, error } = await supabase
      .from("orders")
      .insert({
        product_slug: product.slug,
        product_name: product.name,
        quantity: d.quantity,
        unit: product.unit,
        customer_name: d.customer_name,
        phone: d.phone,
        whatsapp: d.whatsapp || null,
        email: d.email || null,
        company: d.company || null,
        city: d.city || null,
        state: d.state || null,
        buyer_type: d.buyer_type || null,
        notes: d.notes || null,
      })
      .select("id, order_number")
      .single();
    setSubmitting(false);
    if (error || !data) {
      const fb = buildFallback(d);
      setFallback(fb);
      toast.error("Order submission failed. Use the WhatsApp link below to send it directly.", {
        action: { label: "Open WhatsApp", onClick: () => window.open(fb.waHref, "_blank", "noopener,noreferrer") },
        duration: 10000,
      });
      window.open(fb.waHref, "_blank", "noopener,noreferrer");
      return;
    }
    const summary =
      `*New Order for TARAON GLOBAL*\n` +
      `Order #: ${data.order_number}\n` +
      `Product: ${product.name}\n` +
      `Quantity: ${d.quantity} ${product.unit} (${product.pack} pack)\n` +
      `Name: ${d.customer_name}\n` +
      (d.company ? `Company: ${d.company}\n` : "") +
      `Phone: ${d.phone}\n` +
      (d.email ? `Email: ${d.email}\n` : "") +
      (d.city || d.state ? `Location: ${[d.city, d.state].filter(Boolean).join(", ")}\n` : "") +
      (d.buyer_type ? `Buyer type: ${d.buyer_type}\n` : "") +
      (d.notes ? `Notes: ${d.notes}\n` : "");
    const waHref = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(summary)}`;
    const mailHref =
      `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(`New Order ${data.order_number} - ${product.name}`)}` +
      `&body=${encodeURIComponent(summary)}`;
    const details: Record<string, string> = {
      Product: product.name,
      Quantity: `${d.quantity} ${product.unit} (${product.pack} pack)`,
      Name: d.customer_name,
      Phone: d.phone,
    };
    if (d.whatsapp) details.WhatsApp = d.whatsapp;
    if (d.email) details.Email = d.email;
    if (d.company) details.Company = d.company;
    if (d.city || d.state) details.Location = [d.city, d.state].filter(Boolean).join(", ");
    if (d.buyer_type) details["Buyer type"] = d.buyer_type;
    if (d.notes) details.Notes = d.notes;
    setPlaced({ order_number: data.order_number, id: data.id, waHref, mailHref, details });
    setFallback(null);
    window.open(waHref, "_blank", "noopener,noreferrer");
    toast.success(`Order ${data.order_number} saved`);
  }

  if (placed) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/20 text-forest-deep font-display text-lg">✓</div>
            <h1 className="mt-4 font-display text-3xl text-forest-deep">Order placed</h1>
            <p className="mt-2 text-ink/70">
              Order ID: <span className="font-semibold text-forest-deep">{placed.order_number}</span>
            </p>
            <p className="mt-1 text-xs text-ink/50">Reference: {placed.id}</p>
          </div>
          <dl className="mt-6 grid gap-x-6 gap-y-2 rounded border border-border bg-secondary/40 p-4 text-sm sm:grid-cols-2">
            {Object.entries(placed.details).map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="font-medium text-forest-deep">{k}:</dt>
                <dd className="text-ink/80 break-words">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-center text-sm text-ink/70">A WhatsApp draft has opened. Tap send so we get it. You can also email it.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={placed.waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-medium text-white">
              <MessageCircle className="h-4 w-4" /> Send on WhatsApp
            </a>
            <a href={placed.mailHref} className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/30 px-5 py-3 text-sm font-medium text-forest-deep">
              <Mail className="h-4 w-4" /> Email order
            </a>
          </div>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-ink/60 underline">Back to home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-14">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Place order" title={product.name} />
        <p className="mt-2 text-ink/70">
          Pack size: <strong>{product.pack}</strong>. Fill this in and we will confirm price, dispatch and payment on WhatsApp.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4">
          <input type="hidden" name="product" value={product.slug} />
          <Field
            label="Quantity (number of 25 Kg bags)"
            name="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={100000}
            step={1}
            required
          />
          <Field label="Full name" name="customer_name" required minLength={2} maxLength={120} autoComplete="name" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              minLength={7}
              maxLength={30}
              pattern="[+\d][\d\s\-()]{6,}"
              title="Digits only, may start with +. Spaces, -, () allowed."
            />
            <Field label="WhatsApp (if different)" name="whatsapp" type="tel" inputMode="tel" maxLength={30} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" maxLength={255} autoComplete="email" />
            <Field label="Company (optional)" name="company" maxLength={120} autoComplete="organization" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" name="city" maxLength={80} autoComplete="address-level2" />
            <Field label="State" name="state" maxLength={80} autoComplete="address-level1" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-forest-deep">Buyer type</label>
            <select name="buyer_type" className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm">
              <option value="">Select</option>
              <option>Farmer</option>
              <option>Dealer / Distributor</option>
              <option>Fertilizer Company</option>
              <option>Exporter</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-forest-deep">Notes</label>
            <textarea name="notes" rows={3} maxLength={2000} className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" placeholder="Delivery timeline, special requirements..." />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Place order
          </button>
          {fallback && (
            <div className="rounded border border-gold/60 bg-gold/10 p-4 text-sm text-forest-deep">
              <p className="font-medium">We could not save your order just now.</p>
              <p className="mt-1 text-ink/80">Use the WhatsApp link below to send the same details to Rajesh directly. We will confirm as soon as we receive it.</p>
              <a
                href={fallback.waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2 text-xs font-medium text-white"
              >
                <MessageCircle className="h-4 w-4" /> Send on WhatsApp
              </a>
            </div>
          )}
          <p className="text-xs text-ink/60">
            By placing an order you agree we may contact you on the phone, WhatsApp or email you provided. No payment is taken online. TARAON GLOBAL will confirm price and dispatch before shipment.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-forest-deep">{label}</label>
      <input id={name} name={name} {...rest} className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
    </div>
  );
}
