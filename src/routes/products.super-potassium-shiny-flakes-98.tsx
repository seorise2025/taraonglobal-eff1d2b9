import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroImg from "@/assets/super-potassium-98-bag.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpecTable } from "@/components/site/SpecTable";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";
import { RelatedLinks } from "@/components/site/RelatedLinks";

const SPECS = [
  { label: "Product Type", value: "Water Soluble Potassium Humate Shiny Flakes" },
  { label: "Purity", value: "98%" },
  { label: "Appearance", value: "Black shiny flakes" },
  { label: "Odour", value: "Mild earthy smell" },
  { label: "Humic Acid", value: "55% to 60%" },
  { label: "Fulvic Acid", value: "1% to 3%" },
  { label: "Potassium as K₂O", value: "3% to 5%" },
  { label: "pH", value: "9 to 10" },
  { label: "Moisture", value: "10% to 15%" },
  { label: "Water Solubility", value: "98%" },
  { label: "Packing", value: "25 Kgs" },
  {
    label: "Source Material",
    value: "Natural humic substances - leonardite, lignite, or oxidised brown coal",
  },
];

const QUICK = [
  { label: "Product Name", value: "Super Potassium Shiny Flakes 98%" },
  { label: "Brand", value: "TARAON GLOBAL" },
  { label: "Product Type", value: "Water Soluble Potassium Humate Shiny Flakes" },
  { label: "Form", value: "Black shiny flakes" },
  { label: "Packing", value: "25 Kgs" },
  { label: "Source", value: "Leonardite / lignite / oxidised brown coal" },
  { label: "Buyer Type", value: "Farmers, dealers, distributors, bulk buyers" },
];

const FAQS = [
  {
    q: "Where is Super Potassium Shiny Flakes 98% sourced from?",
    a: "The flakes are produced from natural leonardite by our overseas partner facility. TARAON GLOBAL is the trading and supply arm - we import, quality check, batch number, and distribute across India.",
  },
  {
    q: "Is TARAON GLOBAL the manufacturer?",
    a: "No. TARAON GLOBAL is a trading and supplier company based in Ahmedabad. We source from a trusted producer, verify every batch, and handle warehousing, packing and dispatch to farmers, dealers and distributors.",
  },
  {
    q: "What pack size do you supply?",
    a: "Standard packing is 25 Kgs kraft bags - the standard pack for farmers, dealers and distributors.",
  },
  {
    q: "Do you offer dealer and distributor pricing?",
    a: "Yes. Bulk pricing, credit terms and dealer support are available on request - call Rajesh Kumar Trivedi on +91 63591 93666.",
  },
  {
    q: "Can I use it in a drip system?",
    a: "Yes. It's 98% water soluble - built for drip irrigation, fertigation and foliar spray. Dissolve fully before running it through your line.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes. We dispatch from Ahmedabad to buyers across Gujarat and the rest of India.",
  },
];

export const Route = createFileRoute("/products/super-potassium-shiny-flakes-98")({
  head: () => ({
    meta: [
      { title: "Potassium Humate 98 Shiny Flakes | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "Super Potassium Shiny Flakes 98% by TARAON GLOBAL. 98% purity, 55-60% humic acid, 3-5% K2O, pH 9-10, 98% water soluble. 25 Kgs pack.",
      },
      {
        property: "og:title",
        content: "Super Potassium Shiny Flakes 98% | TARAON GLOBAL",
      },
      {
        property: "og:description",
        content:
          "From natural leonardite, lignite or oxidised brown coal. 98% water soluble. Built for soil, drip, fertigation and foliar spray.",
      },
      {
        property: "og:url",
        content: "https://taraonglobal.lovable.app/products/super-potassium-shiny-flakes-98",
      },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "https://taraonglobal.lovable.app/products/super-potassium-shiny-flakes-98" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": "https://taraonglobal.lovable.app/products/super-potassium-shiny-flakes-98#product",
          name: "Super Potassium Shiny Flakes 98%",
          sku: "TG-SPSF-98",
          mpn: "TG-SPSF-98",
          brand: {
            "@type": "Brand",
            name: "TARAON GLOBAL",
          },
          category: "Potassium Humate Fertilizer",
          image: [
            "https://taraonglobal.lovable.app/og-super-potassium-98.jpg",
          ],
          description:
            "Water soluble potassium humate shiny flakes. 98% purity, 55-60% humic acid, 1-3% fulvic acid, 3-5% K2O, pH 9-10, 10-15% moisture, 98% water soluble. Derived from natural leonardite, lignite or oxidised brown coal. Supplied in 25 Kgs packs. Soil conditioner and plant growth support input - not a complete NPK fertiliser.",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Purity", value: "98%" },
            { "@type": "PropertyValue", name: "Humic Acid", value: "55-60%" },
            { "@type": "PropertyValue", name: "Fulvic Acid", value: "1-3%" },
            { "@type": "PropertyValue", name: "Potassium as K2O", value: "3-5%" },
            { "@type": "PropertyValue", name: "pH", value: "9-10" },
            { "@type": "PropertyValue", name: "Water Solubility", value: "98%" },
            { "@type": "PropertyValue", name: "Pack Size", value: "25 Kgs" },
          ],
          offers: {
            "@type": "Offer",
            url: "https://taraonglobal.lovable.app/products/super-potassium-shiny-flakes-98",
            availability: "https://schema.org/InStock",
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "INR",
              valueAddedTaxIncluded: false,
              description: "Bulk and dealer pricing on request",
            },
            seller: { "@id": "https://taraonglobal.lovable.app/#organization" },
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
            {
              "@type": "ListItem",
              position: 3,
              name: "Super Potassium Shiny Flakes 98%",
              item: "https://taraonglobal.lovable.app/products/super-potassium-shiny-flakes-98",
            },
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
            <span className="h-px w-8 bg-gold" /> Our flagship
          </div>
          <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl">
            Super Potassium Shiny Flakes 98%
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            This is our main product, and it earns that spot.
          </p>
          <p className="mt-3 text-ink/70">
            Water soluble potassium humate shiny flakes derived from natural
            leonardite, lignite or oxidised brown coal. 98% purity, 55-60% humic
            acid, 3-5% K₂O and pH 9-10. A soil conditioner and plant growth support input -
            not a complete NPK fertiliser.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/order/$slug"
              params={{ slug: "super-potassium-shiny-flakes-98" }}
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
            src={heroImg.url}
            alt="Super Potassium Shiny Flakes 98% - 25 kg kraft bag by TARAON GLOBAL"
            width={1400}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/3] w-full rounded-lg object-contain bg-cream shadow-2xl"
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
            <SectionHeading eyebrow="Description" title="Built to dissolve, not to sit" />
            <div className="mt-6 space-y-4 text-ink/80">
              <p>
                You've probably seen humate powder that clumps in the bag and takes
                forever to dissolve. This isn't that.
              </p>
              <p>
                Super Potassium Shiny Flakes 98% is dust free and shiny by design. Drop
                it in water and it goes to work fast, which matters when you're running a
                drip line and don't have time to babysit a mixing tank.
              </p>
              <p>
                It's built for field crops, vegetables, fruit, and plantation crops.
                Farmers use it straight in soil. Dealers stock it because it moves.
                Fertilizer companies blend it into their own NPK lines.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl text-forest-deep">Key benefits</h3>
            <ul className="mt-5 space-y-3">
              {[
                "Better soil structure and water holding",
                "Roots that grow stronger and deeper",
                "Nutrients the plant can actually use, not lose",
                "More activity from the good microbes in soil",
                "Better crop quality, season after season",
                "Works across field crops, vegetables, fruit, and ornamentals",
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
          <SectionHeading eyebrow="Specifications" title="What's actually in the bag" />
          <div className="mt-8">
            <SpecTable rows={SPECS} />
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Specs shift a little between batches, which is normal in this category. Ask
            for the current batch COA if you need it in writing.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Where to use it" title="Fits your workflow" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Soil Application", "Mix into soil for root zone support."],
            ["Drip & Fertigation", "Dissolves clean, no clogged emitters."],
            ["Foliar Spray", "Use per crop stage and recommended dose."],
            ["Fertilizer Blending", "Blends well with NPK and organic inputs."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
            >
              <div className="font-display text-lg text-forest-deep">{t}</div>
              <p className="mt-2 text-sm text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="rounded-lg border border-gold/40 bg-card p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> Verified by
          </div>
          <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-forest-deep font-display text-xl text-cream">
              RT
            </div>
            <div>
              <div className="font-display text-lg text-forest-deep">
                Rajesh Kumar Trivedi - Founder, TARAON GLOBAL
              </div>
              <p className="mt-1 text-sm text-ink/75">
                20+ years of hands-on experience in the humate and agri-inputs
                industry. Every consignment is personally batch-checked before dispatch
                from our Ahmedabad warehouse. Batch numbers on every bag; current
                batch COA available on request.
              </p>
              <p className="mt-2 text-xs text-ink/50">
                Page reviewed {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
              </p>
            </div>
          </div>
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
          {
            to: "/products/super-f-humate-big-shiny-flakes",
            title: "Super F Humate Big Shiny Flakes",
            desc: "Same potassium humate, bigger flake, dealer and blender pack.",
          },
          {
            to: "/applications",
            title: "Potassium humate uses in agriculture",
            desc: "Soil, drip irrigation, fertigation, foliar spray and NPK blending.",
          },
          {
            to: "/about",
            title: "About TARAON GLOBAL",
            desc: "Ahmedabad based supplier led by Rajesh Kumar Trivedi.",
          },
        ]}
      />

      <CTABand
        title="Want a quote for your quantity?"
        subtitle="Call Rajesh Kumar Trivedi on +91 63591 93666, or message on WhatsApp."
      />
    </>
  );
}
