import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import productImg from "@/assets/vigora-bio-stimulant.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpecTable } from "@/components/site/SpecTable";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";
import { RelatedLinks } from "@/components/site/RelatedLinks";

const SPECS = [
  { label: "Product Type", value: "Concentrated powder plant biostimulant" },
  { label: "Form", value: "99% pure powder, 100% water soluble" },
  { label: "Dose (foliar)", value: "0.5 to 1 gram per litre of water" },
  { label: "Knapsack sprayer (15 L)", value: "7.5 to 15 grams per tank" },
  { label: "Best application time", value: "Active growth, before and during flowering" },
  { label: "Best time of day", value: "Early morning or late evening" },
  { label: "Packing", value: "25 Kgs bag" },
  { label: "Buyer Type", value: "Farmers, dealers, distributors" },
];

const CROPS = [
  "Soybean", "Groundnut", "Cotton", "Rice", "Wheat", "Maize",
  "Tomato", "Chilli", "Grapes", "Pomegranate", "Banana", "Mango",
];

const FAQS = [
  {
    q: "What is Vigora?",
    a: "Vigora is a concentrated powder plant biostimulant designed for Indian farming conditions. It is 99% pure and 100% water soluble. It supports overall plant health, better flowering, stronger root development and higher yield quality.",
  },
  {
    q: "Which crops is Vigora suitable for?",
    a: "Vigora works across a wide range of crops including soybean, groundnut, cotton, rice, wheat, maize, tomato, chilli, grapes, pomegranate, banana and mango, among many others.",
  },
  {
    q: "How do I apply Vigora?",
    a: "Dissolve in water and use as a foliar spray at 0.5 to 1 gram per litre of water. For a standard 15 litre knapsack sprayer that works out to roughly 7.5 to 15 grams per tank. Best applied during active growth stages and before or during flowering, preferably in the early morning or late evening.",
  },
  {
    q: "When is the best time to spray?",
    a: "Early morning or late evening, during active vegetative growth and before or during flowering. Avoid spraying in strong midday sun.",
  },
  {
    q: "Is Vigora a fertilizer?",
    a: "No. Vigora is a plant biostimulant. It supports plant growth, flowering, fruit set and vigor. It is meant to complement your regular fertilizer schedule, not replace it.",
  },
  {
    q: "Does TARAON GLOBAL supply Vigora in bulk?",
    a: "Yes. Bulk dealer and distributor pricing is available on request. Call Rajesh Kumar Trivedi on +91 63591 93666 or send an enquiry.",
  },
];

export const Route = createFileRoute("/products/vigora")({
  head: () => ({
    meta: [
      { title: "Vigora Plant Biostimulant, Yield Enhancer | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "Vigora is a concentrated liquid plant biostimulant for Indian crops. Improves flowering, root development, fruit set and yield. Foliar dose 0.5 to 1 ml per litre.",
      },
      { property: "og:title", content: "Vigora Plant Biostimulant | TARAON GLOBAL" },
      {
        property: "og:description",
        content:
          "Concentrated liquid biostimulant for soybean, cotton, wheat, tomato, grapes, banana and more. Supports growth, flowering and yield.",
      },
      { property: "og:url", content: "https://taraonglobal.lovable.app/products/vigora" },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "https://taraonglobal.lovable.app/products/vigora" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": "https://taraonglobal.lovable.app/products/vigora#product",
          name: "Vigora Plant Biostimulant",
          sku: "TG-VIG-1L",
          mpn: "TG-VIG-1L",
          brand: { "@type": "Brand", name: "TARAON GLOBAL" },
          image: [`https://taraonglobal.lovable.app${productImg.url}`],
          category: "Plant Biostimulant",
          description:
            "Concentrated liquid plant biostimulant and yield enhancer for Indian farming conditions. Supports plant health, flowering, root development, fruit set and yield quality. Foliar dose 0.5 to 1 ml per litre of water, roughly 7.5 to 15 ml per 15 litre knapsack tank. Best applied during active growth stages and before or during flowering, in early morning or late evening.",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Form", value: "Liquid concentrate" },
            { "@type": "PropertyValue", name: "Foliar Dose", value: "0.5-1 ml/litre" },
            { "@type": "PropertyValue", name: "Knapsack Dose (15 L)", value: "7.5-15 ml/tank" },
            { "@type": "PropertyValue", name: "Pack Size", value: "1 Litre" },
          ],
          offers: {
            "@type": "Offer",
            url: "https://taraonglobal.lovable.app/products/vigora",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            priceCurrency: "INR",
            price: "0",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "INR",
              valueAddedTaxIncluded: false,
              description: "Farmer, dealer and distributor pricing on request",
            },
            eligibleQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "LTR", unitText: "1 Litre bottle" },
            seller: {
              "@type": "Organization",
              "@id": "https://taraonglobal.lovable.app/#organization",
              name: "TARAON GLOBAL",
              url: "https://taraonglobal.lovable.app/",
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://taraonglobal.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "Products", item: "https://taraonglobal.lovable.app/#products" },
            { "@type": "ListItem", position: 3, name: "Vigora", item: "https://taraonglobal.lovable.app/products/vigora" },
          ],
        }),
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  return (
    <>
      <section className="container-page grid gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
        <div>
          <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> Plant biostimulant
          </div>
          <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl">
            Vigora, Yield and Growth Enhancer
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            A concentrated liquid biostimulant built for Indian farming conditions. Vigora supports overall plant health, better flowering, stronger roots and higher yield quality across a wide range of crops.
          </p>
          <p className="mt-3 text-ink/70">
            Use as a foliar spray at 0.5 to 1 ml per litre of water. For a 15 litre knapsack tank, that works out to roughly 7.5 to 15 ml. Best applied during active growth and before or during flowering, in the early morning or late evening.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/order/$slug"
              params={{ slug: "vigora" }}
              className="group inline-flex items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
            >
              Place Order
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10"
            >
              Request Price
            </Link>
            <a
              href="https://wa.me/916359193666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-gold/25 via-transparent to-forest/20 blur-2xl" />
          <img
            src={productImg.url}
            alt="Vigora liquid plant biostimulant and yield enhancer for Indian crops, cotton, wheat, rice and vegetables, supplied by TARAON GLOBAL"
            width={1024}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="aspect-square w-full rounded-lg object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="container-page py-8">
        <SectionHeading eyebrow="How it helps" title="Growth, flowering, yield" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Vegetative growth", "Supports healthier vegetative development from early stages."],
            ["Flowering & fruit set", "Better flowering, stronger fruit set, more even development."],
            ["Root development", "Encourages stronger root systems that hold up under stress."],
            ["Yield quality", "Improves overall vigor and quality of harvest."],
            ["Wide crop range", "Field crops, vegetables, fruit and plantation crops."],
            ["Easy to use", "Standard foliar spray with a simple dose per litre."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-border bg-card p-6">
              <div className="font-display text-lg text-forest-deep">{t}</div>
              <p className="mt-2 text-sm text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Dose & timing" title="How to apply Vigora" />
          <div className="mt-8">
            <SpecTable rows={SPECS} />
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Always follow crop-specific advice from your agronomist or local dealer. Avoid spraying in strong midday sun.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Crops" title="Suitable for a wide range of crops" />
        <div className="mt-8 flex flex-wrap gap-2">
          {CROPS.map((c) => (
            <span key={c} className="rounded-full border border-forest-deep/20 bg-card px-4 py-1.5 text-sm text-forest-deep">
              {c}
            </span>
          ))}
          <span className="rounded-full border border-forest-deep/10 bg-transparent px-4 py-1.5 text-sm text-ink/60">
            and more
          </span>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mt-6">
          <FAQ items={FAQS} />
        </div>
      </section>

      <RelatedLinks
        items={[
          { to: "/products/glycine", title: "Glycine (Amino Acid)", desc: "99% purity amino acid, fertilizer synergist and chelator." },
          { to: "/products/super-potassium-shiny-flakes-98", title: "Super Potassium Shiny Flakes 98%", desc: "Flagship potassium humate for soil and drip." },
          { to: "/products/super-f-humate-big-shiny-flakes", title: "Super F Humate Big Shiny Flakes", desc: "Big flake grade for dealers and blenders." },
          { to: "/applications", title: "How our inputs fit in the field", desc: "Fertigation, foliar spray, blending and soil support." },
          { to: "/contact", title: "Request Vigora bulk price", desc: "Same-day pricing on WhatsApp or email." },
        ]}
      />

      <CTABand
        title="Want Vigora for your dealer network or farm?"
        subtitle="Send quantity and destination. Same-day pricing on WhatsApp or email."
        primaryLabel="Send Enquiry"
      />
    </>
  );
}
