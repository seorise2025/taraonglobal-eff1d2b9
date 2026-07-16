import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, MapPin, MessageCircle, Loader2, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { trackFormSubmit } from "@/lib/analytics";
import { checkRateLimit, getSubmissionContext, hashPayload } from "@/lib/rate-limit";
import { buildEmailHref, buildWaHref } from "@/lib/inquiry";

const SITE = "https://taraonglobal.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Agri Input Supplier Ahmedabad | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "Contact TARAON GLOBAL in Ahmedabad for bulk potassium humate, Glycine and biostimulant pricing, COA and dispatch across India. Share quantity and delivery location.",
      },
      { name: "keywords", content: "contact potassium humate supplier, agri input supplier contact Ahmedabad, TARAON GLOBAL contact, bulk potassium humate price enquiry, potassium humate quote India, agri input enquiry Ahmedabad" },
      { property: "og:title", content: "Contact Agri Input Supplier Ahmedabad | TARAON GLOBAL" },
      { property: "og:description", content: "Ahmedabad based agri input supply desk. Share product, quantity and delivery location for current price, COA and dispatch timeline." },
      { property: "og:url", content: `${SITE}/contact` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE}/contact` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Request Bulk Agri Input Price | TARAON GLOBAL",
          url: `${SITE}/contact`,
          mainEntity: { "@id": `${SITE}/#organization` },
        }),
      },
    ],
  }),
  component: Contact,
});

const PRODUCT_OPTIONS = [
  "Super Potassium Shiny Flakes 98%",
  "Super F Humate Big Shiny Flakes",
  "Glycine 99%",
  "Vigora Plant Biostimulant",
  "Multiple products",
  "Documentation request",
  "Other requirement",
];

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
  name: z.string().trim().min(1, "Full name is required").max(100),
  phone: z.string().trim().min(5, "Phone number is required").max(30)
    .regex(/^[+\d][\d\s\-()]{4,}$/, "Enter a valid phone number"),
  product_needed: z.string().min(1, "Please select a product"),
  quantity: z.string().trim().min(1, "Required quantity is required").max(80),
  buyer_type: z.string().min(1, "Please select buyer type"),
  city: z.string().trim().min(1, "City is required").max(80),
  state: z.string().trim().min(1, "State is required").max(80),
  pincode: z.string().trim().min(1, "Delivery pincode is required").max(16),
  consent: z.literal(true, { errorMap: () => ({ message: "Please tick the consent box to continue" }) }),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  gst_number: z.string().trim().max(30).optional().or(z.literal("")),
  expected_order_date: z.string().optional().or(z.literal("")),
  monthly_requirement: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

type FormState = Omit<z.infer<typeof schema>, "consent"> & { consent: boolean };

const emptyForm: FormState = {
  name: "", phone: "", product_needed: "", quantity: "", buyer_type: "",
  city: "", state: "", pincode: "", consent: false,
  company: "", whatsapp: "", email: "", gst_number: "",
  expected_order_date: "", monthly_requirement: "", message: "",
  website: "",
};

function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState<null | { reference: string }>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    if (parsed.data.website) {
      // honeypot filled, silently treat as success
      setSubmitted({ reference: "SILENT" });
      return;
    }
    setBusy(true);
    const context = getSubmissionContext();
    const hash = await hashPayload(
      `${parsed.data.name}|${parsed.data.phone}|${parsed.data.product_needed}|${parsed.data.quantity}`,
    );
    const rl = await checkRateLimit("enquiry", hash);
    if (!rl.ok) {
      setBusy(false);
      toast.error(
        rl.reason === "duplicate"
          ? "This looks like a duplicate submission. Our team will get back to you."
          : "Too many submissions from this device. Please try again later or contact us directly.",
      );
      return;
    }
    const payload = {
      name: parsed.data.name,
      phone: parsed.data.phone,
      product_needed: parsed.data.product_needed,
      quantity: parsed.data.quantity,
      buyer_type: parsed.data.buyer_type,
      city: parsed.data.city,
      state: parsed.data.state,
      pincode: parsed.data.pincode,
      consent: parsed.data.consent,
      company: parsed.data.company || null,
      whatsapp: parsed.data.whatsapp || null,
      email: parsed.data.email || null,
      gst_number: parsed.data.gst_number || null,
      expected_order_date: parsed.data.expected_order_date || null,
      monthly_requirement: parsed.data.monthly_requirement || null,
      message: parsed.data.message || null,
      ...context,
    };
    const { data, error } = await supabase
      .from("enquiries")
      .insert(payload)
      .select("reference_number")
      .single();
    setBusy(false);
    if (error || !data) {
      toast.error("We could not submit your requirement. Please try again or contact TARAON GLOBAL by phone or WhatsApp.");
      return;
    }
    trackFormSubmit("contact_form", parsed.data.product_needed);
    void fetch("/api/public/notify-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "enquiry", reference: data.reference_number }),
    }).catch(() => {});
    setSubmitted({ reference: data.reference_number });
  }

  if (submitted) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 sm:p-10">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/20 font-display text-lg text-forest-deep">✓</div>
            <h1 className="mt-4 font-display text-3xl text-forest-deep">Requirement submitted</h1>
            <p className="mt-3 text-ink/75">
              Your requirement has been submitted. The TARAON GLOBAL team will
              review the product, quantity and delivery location before responding.
            </p>
            {submitted.reference !== "SILENT" ? (
              <p className="mt-4 text-sm text-ink/60">
                Reference number: <span className="font-semibold text-forest-deep">{submitted.reference}</span>
              </p>
            ) : null}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={buildWaHref("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-medium text-white"
            >
              <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
            </a>
            <a
              href="tel:+916359193666"
              className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-5 py-3 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10"
            >
              <Phone className="h-4 w-4" /> Call sales
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-5 py-3 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> Contact
            </div>
            <h1 className="font-display text-4xl leading-tight text-forest-deep sm:text-5xl">
              Request Bulk Agri-Input Pricing
            </h1>
            <p className="mt-5 text-lg text-ink/75">
              Share the product, required quantity and delivery location. The
              TARAON GLOBAL sales team will review the requirement and confirm
              the available specification, current price, taxes, freight and
              estimated dispatch timeline.
            </p>
            <p className="mt-3 text-sm text-ink/60">
              No payment is collected through this form.
            </p>

            <div className="mt-10 space-y-5 rounded-lg border border-border bg-card p-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold">Owner</div>
                <div className="mt-1 font-display text-lg text-forest-deep">Rajesh Kumar Trivedi</div>
                <div className="text-sm text-ink/70">TARAON GLOBAL</div>
              </div>
              <a href="tel:+916359193666" className="flex items-center gap-3 text-forest-deep hover:text-gold">
                <Phone className="h-4 w-4" /> +91 63591 93666
              </a>
              <a href="mailto:info@taraonglobal.com" className="flex items-center gap-3 text-forest-deep hover:text-gold">
                <Mail className="h-4 w-4" /> info@taraonglobal.com
              </a>
              <a
                href={buildWaHref("general")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-forest-deep hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <div className="flex items-start gap-3 text-ink/80">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                <div className="leading-relaxed">
                  A-210, Signature-2<br />
                  Sarkhej Sanand Cross Road<br />
                  Ahmedabad 382210<br />
                  Gujarat, India
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl text-forest-deep">Bulk Product Enquiry</h2>
            <p className="mt-1 text-sm text-ink/60">Fields marked * are required.</p>

            {/* honeypot */}
            <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </label>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name *" value={form.name} onChange={(e) => set("name", e.target.value)} required maxLength={100} />
              <Field label="Phone number *" value={form.phone} onChange={(e) => set("phone", e.target.value)} required type="tel" maxLength={30} />
              <SelectField label="Product required *" value={form.product_needed} onChange={(e) => set("product_needed", e.target.value)} options={PRODUCT_OPTIONS} />
              <Field label="Required quantity *" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} required placeholder="Example: 500 kg or 20 bags" maxLength={80} />
              <SelectField label="Buyer type *" value={form.buyer_type} onChange={(e) => set("buyer_type", e.target.value)} options={BUYER_TYPE_OPTIONS} />
              <Field label="City *" value={form.city} onChange={(e) => set("city", e.target.value)} required maxLength={80} />
              <Field label="State *" value={form.state} onChange={(e) => set("state", e.target.value)} required maxLength={80} />
              <Field label="Delivery pincode *" value={form.pincode} onChange={(e) => set("pincode", e.target.value)} required maxLength={16} />
              <Field label="Company name" value={form.company ?? ""} onChange={(e) => set("company", e.target.value)} maxLength={120} />
              <Field label="WhatsApp (if different)" value={form.whatsapp ?? ""} onChange={(e) => set("whatsapp", e.target.value)} type="tel" maxLength={30} />
              <Field label="Email" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} type="email" maxLength={255} />
              <Field label="GST number" value={form.gst_number ?? ""} onChange={(e) => set("gst_number", e.target.value)} maxLength={30} />
              <Field label="Expected order date" value={form.expected_order_date ?? ""} onChange={(e) => set("expected_order_date", e.target.value)} type="date" />
              <Field label="Monthly requirement" value={form.monthly_requirement ?? ""} onChange={(e) => set("monthly_requirement", e.target.value)} placeholder="Example: 5 tons per month" maxLength={120} />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-forest-deep">Additional message</label>
              <textarea
                value={form.message ?? ""}
                onChange={(e) => set("message", e.target.value)}
                rows={4}
                maxLength={2000}
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded border border-border bg-secondary/40 p-3 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-forest-deep"
              />
              <span>
                I agree that TARAON GLOBAL may contact me by phone, WhatsApp or
                email regarding this enquiry.
              </span>
            </label>

            <p className="mt-3 text-xs text-ink/60">
              Submitting this form does not create a confirmed purchase order.
              Product availability and commercial terms will be confirmed
              separately.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-sm bg-forest-deep px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                Request Price and Availability
              </button>
              <a
                href={buildEmailHref("general")}
                className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10"
              >
                <Mail className="h-4 w-4" /> Email instead
              </a>
            </div>
          </form>
        </div>
      </section>

      <section className="container-page pb-24">
        <SectionHeading eyebrow="Find us" title="Sarkhej Sanand Cross Road, Ahmedabad" />
        <div className="mt-8 overflow-hidden rounded-lg border border-border shadow-md">
          <iframe
            title="TARAON GLOBAL on Google Maps"
            src="https://www.google.com/maps?q=Sarkhej+Sanand+Cross+Road+Ahmedabad+382210&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <RelatedLinks
        eyebrow="While you're here"
        title="Explore the range"
        items={[
          { to: "/products/super-potassium-shiny-flakes-98", title: "Super Potassium Shiny Flakes 98%", desc: "Potassium humate supplied to dealers, distributors and formulators." },
          { to: "/products/super-f-humate-big-shiny-flakes", title: "Super F Humate Big Shiny Flakes", desc: "Big flake grade for bulk trade and repacking buyers." },
          { to: "/products/glycine", title: "Glycine 99%", desc: "Bulk Glycine supplied to formulators and industrial buyers." },
          { to: "/products/vigora", title: "Vigora Plant Biostimulant", desc: "Water-soluble powder biostimulant for crop programmes." },
          { to: "/applications", title: "Product applications", desc: "How the range is used across soil, drip and formulation." },
        ]}
      />
    </>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-forest-deep">{label}</label>
      <input
        {...props}
        className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
      />
    </div>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-forest-deep">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
