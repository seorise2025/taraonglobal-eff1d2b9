import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, MapPin, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RelatedLinks } from "@/components/site/RelatedLinks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TARAON GLOBAL | Potassium Humate Supplier, Ahmedabad" },
      {
        name: "description",
        content:
          "Reach TARAON GLOBAL for potassium humate shiny flakes and bulk supply. Based in Ahmedabad, shipping across Gujarat and India.",
      },
      {
        property: "og:title",
        content: "Contact TARAON GLOBAL | Potassium Humate Supplier",
      },
      {
        property: "og:description",
        content:
          "Send your product and quantity. Real replies, same day. Call Rajesh direct: +91 63591 93666.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "/contact" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact TARAON GLOBAL",
          url: "/contact",
          mainEntity: { "@id": "/#organization" },
        }),
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().min(5, "Phone required").max(30),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  product_needed: z.string().max(80).optional().or(z.literal("")),
  quantity: z.string().trim().max(80).optional().or(z.literal("")),
  buyer_type: z.string().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const emptyForm = {
  name: "",
  company: "",
  phone: "",
  whatsapp: "",
  email: "",
  city: "",
  state: "",
  product_needed: "",
  quantity: "",
  buyer_type: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);

  const update = (k: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    const payload = Object.fromEntries(
      Object.entries(parsed.data).map(([k, v]) => [k, v === "" ? null : v]),
    );
    const { error } = await supabase.from("enquiries").insert(payload as never);
    setBusy(false);
    if (error) {
      toast.error("Couldn't send. Try WhatsApp or call us directly.");
      return;
    }
    toast.success("Enquiry sent. We'll reply the same day.");
    setForm(emptyForm);
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
              Contact TARAON GLOBAL
            </h1>
            <p className="mt-5 text-lg text-ink/75">
              Tell us what you need and how much. You'll get a real reply, usually the
              same day.
            </p>

            <div className="mt-10 space-y-5 rounded-lg border border-border bg-card p-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold">Owner</div>
                <div className="mt-1 font-display text-lg text-forest-deep">
                  Rajesh Kumar Trivedi
                </div>
              </div>
              <a
                href="tel:+916359193666"
                className="flex items-center gap-3 text-forest-deep hover:text-gold"
              >
                <Phone className="h-4 w-4" /> +91 63591 93666
              </a>
              <a
                href="https://wa.me/916359193666"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-forest-deep hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <div className="flex items-start gap-3 text-ink/80">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                <div className="leading-relaxed">
                  TARAON GLOBAL<br />
                  A-210, Signature-2<br />
                  Sarkhej Sanand Cross Road<br />
                  Ahmedabad-382210, Gujarat
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-card p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl text-forest-deep">Bulk Enquiry</h2>
            <p className="mt-1 text-sm text-ink/60">
              All fields marked * are required.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name *" value={form.name} onChange={update("name")} required />
              <Field label="Company Name" value={form.company} onChange={update("company")} />
              <Field
                label="Phone Number *"
                value={form.phone}
                onChange={update("phone")}
                required
                type="tel"
              />
              <Field
                label="WhatsApp Number"
                value={form.whatsapp}
                onChange={update("whatsapp")}
                type="tel"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={update("email")}
                type="email"
              />
              <Field label="City" value={form.city} onChange={update("city")} />
              <Field label="State" value={form.state} onChange={update("state")} />
              <Field label="Quantity Needed" value={form.quantity} onChange={update("quantity")} placeholder="e.g. 500 kg" />

              <SelectField
                label="Product Needed"
                value={form.product_needed}
                onChange={update("product_needed")}
                options={[
                  "Super Potassium Shiny Flakes 98%",
                  "Super F Humate Big Shiny Flakes",
                  "Both",
                ]}
              />
              <SelectField
                label="Buyer Type"
                value={form.buyer_type}
                onChange={update("buyer_type")}
                options={[
                  "Farmer",
                  "Dealer",
                  "Distributor",
                  "Fertilizer Company",
                  "Export Buyer",
                ]}
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-forest-deep">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={update("message")}
                rows={4}
                maxLength={2000}
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-sm bg-forest-deep px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Submit Enquiry
              </button>
              <a
                href="https://wa.me/916359193666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10"
              >
                <MessageCircle className="h-4 w-4" /> Chat with TARAON GLOBAL on WhatsApp
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
          {
            to: "/products/super-potassium-shiny-flakes-98",
            title: "Super Potassium Shiny Flakes 98%",
            desc: "Flagship potassium humate - drip, fertigation and foliar ready.",
          },
          {
            to: "/products/super-f-humate-big-shiny-flakes",
            title: "Super F Humate Big Shiny Flakes",
            desc: "Big flake grade for dealers, distributors and blenders.",
          },
          {
            to: "/applications",
            title: "Potassium humate uses in agriculture",
            desc: "How the flakes fit soil, drip, fertigation and NPK blends.",
          },
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
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
