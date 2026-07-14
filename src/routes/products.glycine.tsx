import { createFileRoute, Link } from "@tanstack/react-router";
import productImg from "@/assets/glycine-pack.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpecTable } from "@/components/site/SpecTable";
import { FAQ } from "@/components/site/FAQ";
import { ProductDisclaimer } from "@/components/site/ProductDisclaimer";
import { CTABand } from "@/components/site/CTABand";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { InquiryCTA } from "@/components/site/InquiryCTA";

const SPECS = [
  { label: "Product Type", value: "Glycine, high-purity amino acid" },
  { label: "Purity", value: "99%" },
  { label: "Appearance", value: "White crystalline powder / granules" },
  { label: "Chloride", value: "0.25%" },
  { label: "Loss on Drying", value: "0.18%" },
  { label: "pH", value: "6.2" },
  { label: "Packing", value: "25 Kgs" },
  { label: "Source", value: "Imported bulk raw material" },
];

const QUICK = [
  { label: "Product Name", value: "Glycine (High-Quality Amino Acid)" },
  { label: "Brand", value: "TARAON GLOBAL" },
  { label: "Form", value: "White crystalline" },
  { label: "Purity", value: "99%" },
  { label: "Packing", value: "25 Kgs" },
  { label: "Industries", value: "Agriculture, food, pharma, feed, daily chemical" },
  { label: "Buyer Type", value: "Formulators, dealers, industrial buyers" },
];

const FAQS = [
  {
    q: "What is Glycine used for?",
    a: "Glycine is a bulk amino acid used in food, medicine, feed, pesticides, daily chemicals and agriculture. In farming it supports crop photosynthesis, growth and sugar content, and acts as a natural metal chelator and fertilizer synergist.",
  },
  {
    q: "Where does TARAON GLOBAL source Glycine from?",
    a: "We import Glycine in bulk from a trusted overseas producer, batch check it in Ahmedabad, and supply across India in 25 Kgs packs. TARAON GLOBAL is a trading and supplier company, not a manufacturer.",
  },
  {
    q: "Can Glycine be blended with other amino acids?",
    a: "Yes. Formulators commonly blend Glycine with folic acid and other monomer amino acids to build agricultural and industrial formulas.",
  },
  {
    q: "Do you supply Glycine for fertilizer formulation?",
    a: "Yes. Fertilizer companies use Glycine as a chelator and synergist. Bulk pricing and COA are available on request.",
  },
  {
    q: "What is the standard pack size?",
    a: "25 Kgs bags, dispatched from our Ahmedabad warehouse across India.",
  },
];

export const Route = createFileRoute("/products/glycine")({
  head: () => ({
    meta: [
      { title: "Glycine 99% Amino Acid Supplier in India | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "Glycine 99% purity from TARAON GLOBAL. Bulk amino acid for agriculture, food, pharma, feed and daily chemical industries. Supplied in 25 Kgs packs from Ahmedabad.",
      },
      { property: "og:title", content: "Glycine (High-Quality Amino Acid) | TARAON GLOBAL" },
      {
        property: "og:description",
        content:
          "Glycine 99% bulk amino acid. Fertilizer synergist, natural metal chelator, food and pharma grade options. 25 Kgs pack.",
      },
      { property: "og:url", content: "https://taraonglobal.com/products/glycine" },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "https://taraonglobal.com/products/glycine" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": "https://taraonglobal.com/products/glycine#product",
          name: "Glycine (High-Quality Amino Acid)",
          sku: "TG-GLY-99",
          mpn: "TG-GLY-99",
          brand: { "@type": "Brand", name: "TARAON GLOBAL" },
          image: [`https://taraonglobal.com${productImg.url}`],
          category: "Amino Acid",
          description:
            "Glycine 99% purity. Chloride 0.25%, loss on drying 0.18%, pH 6.2. Bulk amino acid used in food, medicine, agriculture, pesticides, feed and daily chemical industries. Supports crop photosynthesis, acts as a natural metal chelator and fertilizer synergist. Supplied in 25 Kgs packs.",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Purity", value: "99%" },
            { "@type": "PropertyValue", name: "Chloride", value: "0.25%" },
            { "@type": "PropertyValue", name: "Loss on Drying", value: "0.18%" },
            { "@type": "PropertyValue", name: "pH", value: "6.2" },
            { "@type": "PropertyValue", name: "Pack Size", value: "25 Kgs" },
          ],
          offers: {
            "@type": "Offer",
            url: "https://taraonglobal.com/products/glycine",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            priceCurrency: "INR",
            price: "0",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "INR",
              valueAddedTaxIncluded: false,
              description: "Bulk pricing on request. Farmer, dealer and distributor rates available.",
            },
            eligibleQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "BG", unitText: "25 Kg bag" },
            seller: {
              "@type": "Organization",
              "@id": "https://taraonglobal.com/#organization",
              name: "TARAON GLOBAL",
              url: "https://taraonglobal.com/",
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://taraonglobal.com/" },
            { "@type": "ListItem", position: 2, name: "Products", item: "https://taraonglobal.com/#products" },
            { "@type": "ListItem", position: 3, name: "Glycine", item: "https://taraonglobal.com/products/glycine" },
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
            <span className="h-px w-8 bg-gold" /> Amino acid range
          </div>
          <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl">
            Glycine, High-Quality Amino Acid
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            Glycine is a simple, versatile organic compound that has become a bulk raw material in food, medicine and agriculture. Widely used in pesticides, feed and daily chemical industries.
          </p>
          <p className="mt-3 text-ink/70">
            In the field, Glycine has a unique effect on crop photosynthesis, supports plant growth, improves sugar content and works as a natural metal chelator. It is a highly effective fertilizer synergist, usually blended with folic acid and other monomer amino acids to build formulas.
          </p>
          <InquiryCTA product="glycine" className="mt-8" />
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-gold/25 via-transparent to-forest/20 blur-2xl" />
          <img
            src={productImg.url}
            alt="Glycine 99% purity food and feed grade white crystalline amino acid powder, bulk 25 Kg supply by TARAON GLOBAL India"
            width={1200}
            height={1500}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/5] w-full rounded-lg object-contain bg-background p-3 shadow-xl border border-border/60"
          />
        </div>
      </section>

      <section className="container-page py-8">
        <SectionHeading eyebrow="Quick facts" title="At a glance" />
        <div className="mt-8">
          <SpecTable rows={QUICK} />
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionHeading eyebrow="Description" title="A bulk raw material with real range" />
            <div className="mt-6 space-y-4 text-ink/80">
              <p>
                Glycine is one of those workhorse inputs that sits behind more products than most people realise. Food, medicine, agriculture, pesticides, feed and daily chemical industries all pull from the same amino acid stream.
              </p>
              <p>
                On the farm side, it supports photosynthesis, better plant growth and higher sugar content in crops. It also chelates metals naturally, which is why fertilizer formulators pair it with folic acid and other amino acids when they build their own blends.
              </p>
              <p>
                We import in bulk, batch check it, and ship 25 Kgs packs across India from Ahmedabad.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl text-forest-deep">Key benefits</h3>
            <ul className="mt-5 space-y-3">
              {[
                "Supports crop photosynthesis",
                "Natural metal chelator",
                "Effective fertilizer synergist",
                "Improves sugar content in crops",
                "Blends well with folic acid and other amino acids",
                "Consistent 99% purity across batches",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                  <span className="text-ink/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Specifications" title="Spec sheet" />
          <div className="mt-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Where it fits" title="Industries and use cases" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Agriculture", "Photosynthesis support, chelation, fertilizer synergy."],
            ["Food Industry", "Bulk raw material for food-grade applications."],
            ["Pharma & Medicine", "Amino acid ingredient for formulations."],
            ["Feed & Daily Chemicals", "Widely used across feed and chemical lines."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-md">
              <div className="font-display text-lg text-forest-deep">{t}</div>
              <p className="mt-2 text-sm text-ink/70">{d}</p>
            </div>
          ))}
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
          { to: "/products/vigora", title: "Vigora Plant Biostimulant", desc: "Water soluble powder biostimulant for yield and flowering." },
          { to: "/products/super-potassium-shiny-flakes-98", title: "Super Potassium Shiny Flakes 98%", desc: "Flagship potassium humate for soil, drip and blending." },
          { to: "/products/super-f-humate-big-shiny-flakes", title: "Super F Humate Big Shiny Flakes", desc: "Big flake grade for dealers and blenders." },
          { to: "/applications", title: "How our inputs fit in the field", desc: "Fertigation, foliar spray, blending and soil support." },
          { to: "/contact", title: "Request Glycine bulk price", desc: "Send quantity and destination for a same-day quote." },
        ]}
      />

      <ProductDisclaimer />

      <CTABand
        title="Need bulk Glycine?"
        subtitle="Share your quantity and end-use. We will confirm price and dispatch."
        primaryLabel="Send Enquiry"
      />
    </>
  );
}
