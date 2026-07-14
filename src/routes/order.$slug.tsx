import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PRODUCTS, ADMIN_WHATSAPP, ADMIN_EMAIL, type ProductKey } from "@/lib/products";
import { trackOrder } from "@/lib/analytics";
import { checkRateLimit, getSubmissionContext, hashPayload } from "@/lib/rate-limit";

const BUYER_TYPE_OPTIONS = [
  "Dealer",
  "Stockist",
  "Distributor",
  "Fertiliser company",
  "Formulator",
  "Farmer group or FPO",
  "Exporter",
  "Industrial buyer",
  "Individual farmer",
  "Other",
];

const schema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30)
    .regex(/^[+\d][\d\s\-()]{6,}$/, "Enter a valid phone number"),
  bags: z.coerce.number().int().positive("Number of bags is required").max(100000),
  quantity_estimate: z.string().trim().min(1, "Total estimated quantity is required").max(80),
  company: z.string().trim().min(1, "Company name is required").max(120),
  city: z.string().trim().min(1, "City is required").max(80),
  state: z.string().trim().min(1, "State is required").max(80),
  pincode: z.string().trim().min(1, "Pincode is required").max(16),
  buyer_type: z.string().min(1, "Buyer type is required"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please tick the consent box to continue" }) }),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  gst_number: z.string().trim().max(30).optional().or(z.literal("")),
  required_delivery_date: z.string().optional().or(z.literal("")),
  po_reference: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export const Route = createFileRoute("/order/$slug")({
  beforeLoad: ({ params }) => {
    if (!(params.slug in PRODUCTS)) throw notFound();
  },
  head: ({ params }) => {
    const p = PRODUCTS[params.slug as ProductKey];
    const title = p ? `Submit Bulk Order Requirement, ${p.name} | TARAON GLOBAL` : "Submit Bulk Order Requirement | TARAON GLOBAL";
    return {
      meta: [
        { title },
        { name: "description", content: `Share your bulk requirement for ${p?.name ?? "the product"}. TARAON GLOBAL will confirm price, availability and dispatch separately.` },
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
  const [placed, setPlaced] = useState<null | { reference: string; waHref: string; mailHref: string }>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const consent = raw.consent === "on";
    const parsed = schema.safeParse({ ...raw, consent });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    if (parsed.data.website) {
      setPlaced({ reference: "SILENT", waHref: "#", mailHref: "#" });
      return;
    }
    setSubmitting(true);
    const d = parsed.data;
    const context = getSubmissionContext();
    const hash = await hashPayload(`${d.customer_name}|${d.phone}|${product.slug}|${d.bags}`);
    const rl = await checkRateLimit("order", hash);
    if (!rl.ok) {
      setSubmitting(false);
      toast.error(
        rl.reason === "duplicate"
          ? "This looks like a duplicate submission. Our team will get back to you."
          : "Too many submissions from this device. Please try again later or contact us directly.",
      );
      return;
    }
    const { data, error } = await supabase
      .from("orders")
      .insert({
        product_slug: product.slug,
        product_name: product.name,
        quantity: d.bags,
        unit: "bags",
        bags: d.bags,
        customer_name: d.customer_name,
        phone: d.phone,
        whatsapp: d.whatsapp || null,
        email: d.email || null,
        company: d.company,
        city: d.city,
        state: d.state,
        pincode: d.pincode,
        buyer_type: d.buyer_type,
        gst_number: d.gst_number || null,
        po_reference: d.po_reference || null,
        required_delivery_date: d.required_delivery_date || null,
        notes: d.notes || null,
        consent: true,
        ...context,
      })
      .select("id, order_number")
      .single();
    setSubmitting(false);
    if (error || !data) {
      toast.error("We could not submit your requirement. Please try again or contact TARAON GLOBAL by phone or WhatsApp.");
      return;
    }
    const summary =
      `Bulk requirement, TARAON GLOBAL\n` +
      `Ref: ${data.order_number}\n` +
      `Product: ${product.name}\n` +
      `Bags: ${d.bags} (25 Kg)\n` +
      `Total qty: ${d.quantity_estimate}\n` +
      `Name: ${d.customer_name} (${d.company})\n` +
      `Phone: ${d.phone}\n` +
      (d.email ? `Email: ${d.email}\n` : "") +
      `Location: ${d.city}, ${d.state} ${d.pincode}\n` +
      `Buyer type: ${d.buyer_type}\n` +
      (d.gst_number ? `GST: ${d.gst_number}\n` : "") +
      (d.required_delivery_date ? `Required by: ${d.required_delivery_date}\n` : "") +
      (d.po_reference ? `PO ref: ${d.po_reference}\n` : "") +
      (d.notes ? `Notes: ${d.notes}\n` : "");
    const waHref = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(summary)}`;
    const mailHref = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(`Bulk requirement ${data.order_number}, ${product.name}`)}&body=${encodeURIComponent(summary)}`;
    trackOrder(product.slug, data.order_number, d.bags);
    setPlaced({ reference: data.order_number, waHref, mailHref });
  }

  if (placed) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/20 text-forest-deep font-display text-lg">✓</div>
            <h1 className="mt-4 font-display text-3xl text-forest-deep">Requirement Submitted</h1>
            {placed.reference !== "SILENT" ? (
              <p className="mt-3 text-ink/80">
                Your requirement has been saved with reference number{" "}
                <span className="font-semibold text-forest-deep">{placed.reference}</span>.
                It is not yet a confirmed order.
              </p>
            ) : null}
            <p className="mt-2 text-sm text-ink/70">
              The TARAON GLOBAL sales team will contact you to confirm price,
              availability, taxes, freight, payment terms and dispatch.
            </p>
          </div>
          {placed.reference !== "SILENT" ? (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={placed.waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-medium text-white">
                <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
              </a>
              <a href={placed.mailHref} className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/30 px-5 py-3 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10">
                <Mail className="h-4 w-4" /> Email Requirement
              </a>
            </div>
          ) : null}
          <div className="mt-6 text-center">
            <a
              href={`/products/${product.slug}`}
              className="text-sm text-ink/60 underline"
            >
              Return to Product Page
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-14">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Bulk requirement" title="Submit Bulk Order Requirement" />
        <div className="mt-4 rounded border border-border bg-secondary/40 p-4 text-sm text-ink/75">
          <p className="font-medium text-forest-deep">Product: {product.name}</p>
          <p className="mt-2">
            Complete this form to share your intended product and quantity. This
            is not a final order confirmation and no online payment will be
            collected. TARAON GLOBAL will confirm the current price, GST,
            freight, availability, payment terms and estimated dispatch date
            before accepting the order.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4">
          {/* honeypot */}
          <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Number of bags (25 Kg) *" name="bags" type="number" inputMode="numeric" min={1} max={100000} step={1} required />
            <Field label="Total estimated quantity *" name="quantity_estimate" required placeholder="Example: 5 tons, 500 kg" maxLength={80} />
          </div>
          <Field label="Full name *" name="customer_name" required minLength={2} maxLength={120} autoComplete="name" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone *" name="phone" type="tel" required inputMode="tel" autoComplete="tel" minLength={7} maxLength={30} />
            <Field label="WhatsApp (if different)" name="whatsapp" type="tel" inputMode="tel" maxLength={30} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" maxLength={255} autoComplete="email" />
            <Field label="Company name *" name="company" required maxLength={120} autoComplete="organization" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="City *" name="city" required maxLength={80} autoComplete="address-level2" />
            <Field label="State *" name="state" required maxLength={80} autoComplete="address-level1" />
            <Field label="Pincode *" name="pincode" required maxLength={16} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-forest-deep">Buyer type *</label>
              <select name="buyer_type" required className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm">
                <option value="">Select</option>
                {BUYER_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <Field label="GST number" name="gst_number" maxLength={30} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Required delivery date" name="required_delivery_date" type="date" />
            <Field label="Purchase order reference" name="po_reference" maxLength={80} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-forest-deep">Notes</label>
            <textarea name="notes" rows={3} maxLength={2000} className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
          </div>
          <label className="flex cursor-pointer items-start gap-3 rounded border border-border bg-secondary/40 p-3 text-sm text-ink/80">
            <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-forest-deep" required />
            <span>
              I agree that TARAON GLOBAL may contact me by phone, WhatsApp or
              email regarding this requirement.
            </span>
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Submit Requirement for Confirmation
          </button>
          <p className="text-xs text-ink/60">
            Submitting this form does not create a confirmed purchase order.
            Product availability and commercial terms will be confirmed
            separately.
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
