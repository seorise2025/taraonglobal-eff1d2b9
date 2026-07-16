import { createFileRoute, Link } from "@tanstack/react-router";
import productBigImg from "@/assets/super-f-humate-bag.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpecTable } from "@/components/site/SpecTable";
import { FAQ } from "@/components/site/FAQ";
import { ProductDisclaimer } from "@/components/site/ProductDisclaimer";
import { CTABand } from "@/components/site/CTABand";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { InquiryCTA } from "@/components/site/InquiryCTA";

const SPECS = [
  { label: "Product Type", value: "Water Soluble Potassium Humate Shiny Flakes" },
  { label: "Purity", value: "98%" },
  { label: "Appearance", value: "Big black shiny flakes" },
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
  { label: "Product", value: "Super F Humate Big Shiny Flakes" },
  { label: "Brand", value: "TARAON GLOBAL" },
  { label: "Purity / Assay", value: "98%" },
  { label: "Form", value: "Big black shiny flakes, low dust, water soluble" },
  { label: "Packing", value: "25 Kgs kraft bag" },
  { label: "MOQ", value: "Available on enquiry" },
  { label: "COA", value: "Available on request" },
  { label: "Dispatch from", value: "Ahmedabad, Gujarat" },
  { label: "Supply coverage", value: "Across India" },
  { label: "Suitable for", value: "Dealers, distributors, repackers, fertilizer formulators, blending lines" },
  { label: "Quote", value: "Request current batch price" },
];

const FAQS = [
  {
    q: "Where is Super F Humate Big Shiny Flakes sourced from?",
    a: "The flakes are produced from natural leonardite by our overseas partner facility. TARAON GLOBAL imports the product, verifies each batch, and supplies it under our brand from Ahmedabad.",
  },
  {
    q: "Is TARAON GLOBAL the manufacturer?",
    a: "No. TARAON GLOBAL is a trading and supplier company. We do not manufacture - we source from a trusted producer and handle quality control, packaging, and India-wide distribution.",
  },
  {
    q: "What packaging is available?",
    a: "Standard packing is 25 Kgs kraft bags - the pack format used across dealer and distributor supply.",
  },
  {
    q: "Do you supply dealers and distributors in bulk?",
    a: "Yes. This grade is built for that buyer. Dealer terms, bulk pricing and repeat-order support are available on request.",
  },
  {
    q: "Can it go into a fertilizer blend?",
    a: "Yes. Fertilizer companies commonly blend it into NPK and organic input lines.",
  },
  {
    q: "Do you ship outside Gujarat?",
    a: "Yes, across India from our Ahmedabad base.",
  },
];

export const Route = createFileRoute("/products/super-f-humate-big-shiny-flakes")({
  head: () => ({
    meta: [
      { title: "Big Shiny Potassium Humate Flakes Wholesale Supplier" },
      {
        name: "description",
        content:
          "Bulk supply of Big Shiny Potassium Humate Flakes for dealers, distributors, repackers and fertilizer formulators, with COA and India-wide dispatch.",
      },
      { name: "keywords", content: "big shiny potassium humate flakes, potassium humate big shiny flakes, wholesale potassium humate flakes, potassium humate for distributors, potassium humate for repacking, potassium humate for fertilizer blending, bulk humate flakes supplier, low-dust potassium humate flakes, potassium humate dealer supply" },
      {
        property: "og:title",
        content: "Big Shiny Potassium Humate Flakes Wholesale Supplier",
      },
      {
        property: "og:description",
        content:
          "Large-flake, low-dust potassium humate for dealer repacking and fertilizer blending. 25 Kgs bulk supply with COA and India-wide dispatch.",
      },
      {
        property: "og:url",
        content: "https://taraonglobal.com/products/super-f-humate-big-shiny-flakes",
      },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "https://taraonglobal.com/products/super-f-humate-big-shiny-flakes" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": "https://taraonglobal.com/products/super-f-humate-big-shiny-flakes#product",
          name: "Super F Humate Big Shiny Flakes",
          sku: "TG-SFHB-98",
          mpn: "TG-SFHB-98",
          brand: { "@type": "Brand", name: "TARAON GLOBAL" },
          category: "Potassium Humate Fertilizer",
          image: [
            "https://taraonglobal.com/og-super-f-humate-big.jpg",
          ],
          description:
            "Water soluble potassium humate shiny flakes in big flake form. 98% purity, 55-60% humic acid, 1-3% fulvic acid, 3-5% K2O, pH 9-10, 10-15% moisture, 98% water soluble. Derived from natural leonardite, lignite or oxidised brown coal. Supplied in 25 Kgs packs. Soil conditioner and plant growth support input - not a complete NPK fertiliser.",
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
            url: "https://taraonglobal.com/products/super-f-humate-big-shiny-flakes",
            availability: "https://schema.org/InStock",
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "INR",
              valueAddedTaxIncluded: false,
              description: "Bulk and dealer pricing on request",
            },
            seller: { "@id": "https://taraonglobal.com/#organization" },
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
            {
              "@type": "ListItem",
              position: 3,
              name: "Super F Humate Big Shiny Flakes",
              item: "https://taraonglobal.com/products/super-f-humate-big-shiny-flakes",
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
            <span className="h-px w-8 bg-gold" /> Built for volume
          </div>
          <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl">
            Big Shiny Potassium Humate Flakes for Bulk Supply
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            Big Shiny Potassium Humate Flakes is a large-flake, low-dust grade of potassium humate supplied in bulk for dealer repacking, distributor stock and fertilizer blending lines. TARAON GLOBAL supplies verified batches in 25 Kgs packing from Ahmedabad, with COA on request and dispatch across India.
          </p>
          <p className="mt-3 text-ink/70">
            Same 98% purity, 55 to 60% humic acid and 3 to 5% K₂O as our standard shiny flakes. The difference is flake size, low dust and easier handling for repackers, blenders and formulators moving volume.
          </p>
          <InquiryCTA product="super-f-humate-big-shiny-flakes" className="mt-8" />

        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-gold/25 via-transparent to-forest/20 blur-2xl" />
          <img
            src={productBigImg.url}
            alt="Super F Humate Big Shiny Flakes - 25 kg kraft bag by TARAON GLOBAL"
            width={1400}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/3] w-full rounded-lg object-contain bg-background p-3 shadow-xl border border-border/60"
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
            <SectionHeading eyebrow="Description" title="Volume without the dust" />
            <div className="mt-6 space-y-4 text-ink/80">
              <p>
                Some buyers want the finer flake. Others, mostly dealers moving large
                volume, want something that scoops, pours, and packs easier at their end.
                This is that product.
              </p>
              <p>
                Same humic acid and potassium range as our standard flakes. The
                difference is size, not strength. It stores well, ships well, and holds
                up in a warehouse without turning into dust at the bottom of the bag.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl text-forest-deep">Key benefits</h3>
            <ul className="mt-5 space-y-3">
              {[
                "Better soil structure",
                "Stronger root systems",
                "Better nutrient uptake",
                "More microbial activity in soil",
                "Easy to handle in bulk",
                "Good fit for fertilizer blending lines",
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
        <SectionHeading eyebrow="Where to use it" title="Fits your workflow" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Agriculture Use", "Root and soil support across crops."],
            ["Fertigation", "Fits standard nutrient water systems."],
            ["Fertilizer Blending", "A common base for organic and NPK blends."],
            ["Bulk Dealer Supply", "Packed to move, not just to sit on a shelf."],
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
                20+ years in the humate and agri-inputs industry. Sourcing, batch
                verification, and dealer relationships are handled personally.
                Every 25 kg dealer pack ships with a batch number and traceable
                dispatch record from Ahmedabad.
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
            to: "/products/super-potassium-shiny-flakes-98",
            title: "Super Potassium Shiny Flakes 98%",
            desc: "Standard flake grade, drip friendly, farmer and dealer pack.",
          },
          {
            to: "/products/glycine",
            title: "Glycine (Amino Acid)",
            desc: "99% purity Glycine, blends well with humates in formulations.",
          },
          {
            to: "/products/vigora",
            title: "Vigora Plant Biostimulant",
            desc: "Water soluble powder yield enhancer for Indian crops.",
          },
          {
            to: "/applications",
            title: "Where potassium humate fits",
            desc: "Fertilizer blending, fertigation, foliar and soil use in the field.",
          },
          {
            to: "/contact",
            title: "Request dealer and bulk pricing",
            desc: "Send quantity and destination for a same-day 25 Kgs quote.",
          },
        ]}
      />

      <ProductDisclaimer />

      <CTABand
        title="Looking for bulk stock?"
        subtitle="Send your quantity and destination. Dealer terms available on request."
        primaryLabel="Send Enquiry"
      />
    </>
  );
}
