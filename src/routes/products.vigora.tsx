import { createFileRoute, Link } from "@tanstack/react-router";
import productImg from "@/assets/vigora-bio-stimulant.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpecTable } from "@/components/site/SpecTable";
import { FAQ } from "@/components/site/FAQ";
import { ProductDisclaimer } from "@/components/site/ProductDisclaimer";
import { CTABand } from "@/components/site/CTABand";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { InquiryCTA } from "@/components/site/InquiryCTA";

const SPECS = [
  { label: "Product Type", value: "Concentrated water soluble powder plant biostimulant" },
  { label: "Form", value: "100% water soluble powder (99% water soluble content)" },
  { label: "Dose (foliar)", value: "0.5 to 1 gram per litre of water" },
  { label: "Knapsack sprayer (15 L)", value: "7.5 to 15 grams per tank" },
  { label: "Best application time", value: "Active growth, before and during flowering" },
  { label: "Best time of day", value: "Early morning or late evening" },
  { label: "Packing", value: "25 Kgs bag" },
  { label: "Buyer Type", value: "Farmers, dealers, distributors" },
];

const QUICK = [
  { label: "Product", value: "Vigora Water-Soluble Plant Biostimulant" },
  { label: "Brand", value: "TARAON GLOBAL" },
  { label: "Form", value: "Water soluble powder (99% water soluble content)" },
  { label: "Packing", value: "25 Kgs kraft bag" },
  { label: "MOQ", value: "Available on enquiry" },
  { label: "COA", value: "Available on request" },
  { label: "Dispatch from", value: "Ahmedabad, Gujarat" },
  { label: "Supply coverage", value: "Across India" },
  { label: "Suitable for", value: "Farmers, dealers, distributors, agri-input formulators" },
  { label: "Quote", value: "Request current batch price" },
];

const CROPS = [
  "Soybean", "Groundnut", "Cotton", "Rice", "Wheat", "Maize",
  "Tomato", "Chilli", "Grapes", "Pomegranate", "Banana", "Mango",
];

const FAQS = [
  {
    q: "What is Vigora?",
    a: "Vigora is a water-soluble powder plant biostimulant. The 99% figure refers to water soluble content. It feeds the crop at key growth stages so plants build stronger roots, better flowering and a cleaner yield.",
  },
  {
    q: "What is the recommended dose?",
    a: "Foliar spray: 0.5 to 1 gram per litre of water. That is about 7.5 to 15 grams in a standard 15 litre knapsack tank. Start at the lower end for young crops and vegetables, and use the higher end for field crops during flowering.",
  },
  {
    q: "How often should Vigora be sprayed?",
    a: "Two to three sprays per crop cycle work well for most crops. Time them at active vegetative growth, at bud or flower initiation, and again at fruit or grain filling. Keep at least 10 to 15 days between sprays.",
  },
  {
    q: "Can Vigora be mixed with other inputs?",
    a: "Yes, Vigora mixes with most common water soluble fertilizers, micronutrients and neem based sprays. Avoid tank mixing with strong alkaline products, Bordeaux mixture, or copper and sulphur fungicides. When in doubt, do a small jar test before spraying the full tank.",
  },
  {
    q: "Is Vigora a fertilizer?",
    a: "No. Vigora is a biostimulant. It works alongside your regular fertilizer plan to help the plant use nutrients better, not to replace them.",
  },
  {
    q: "Which crops is Vigora suitable for?",
    a: "Field crops like soybean, groundnut, cotton, rice, wheat and maize, vegetables like tomato and chilli, and fruit and plantation crops like grapes, pomegranate, banana and mango. It fits most Indian farming systems.",
  },
  {
    q: "How should Vigora be stored?",
    a: "Store the bag in a cool, dry place away from direct sunlight, moisture and children. Keep the bag sealed after use so the powder stays dry and free flowing. Shelf life is 24 months from the date of packing when stored correctly.",
  },
  {
    q: "What size does Vigora come in?",
    a: "Standard packing is a 25 Kgs bag. Bulk pricing for dealers and distributors is available on request.",
  },
  {
    q: "Does TARAON GLOBAL supply Vigora in bulk?",
    a: "Yes. For bulk pricing and dispatch, call Rajesh Kumar Trivedi on +91 63591 93666 or send an enquiry through the contact form.",
  },
];

export const Route = createFileRoute("/products/vigora")({
  head: () => ({
    meta: [
      { title: "Vigora Water-Soluble Plant Biostimulant Supplier India" },
      {
        name: "description",
        content:
          "Vigora is a water-soluble powder plant biostimulant supplied in 25 Kg packs for farmers, dealers and distributors, with COA on request and dispatch across India.",
      },
      { name: "keywords", content: "plant biostimulant supplier India, water soluble plant biostimulant, bulk biostimulant powder, biostimulant for foliar spray, biostimulant for flowering, biostimulant for yield enhancement, agricultural biostimulant supplier, biostimulant dealer supply, Vigora biostimulant" },
      { property: "og:title", content: "Vigora Water-Soluble Plant Biostimulant Supplier India" },
      {
        property: "og:description",
        content:
          "Water soluble powder biostimulant for Indian crops. Foliar dose 0.5 to 1 gram per litre. 25 Kgs bags, COA on request.",
      },
      { property: "og:url", content: "https://taraonglobal.com/products/vigora" },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "https://taraonglobal.com/products/vigora" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": "https://taraonglobal.com/products/vigora#product",
          name: "Vigora Plant Biostimulant",
          sku: "TG-VIG-25",
          mpn: "TG-VIG-25",
          brand: { "@type": "Brand", name: "TARAON GLOBAL" },
          image: [`https://taraonglobal.com${productImg.url}`],
          category: "Plant Biostimulant",
          description:
            "Concentrated powder plant biostimulant and yield enhancer for Indian farming conditions. 99% pure, 100% water soluble. Supports plant health, flowering, root development, fruit set and yield quality. Foliar dose 0.5 to 1 gram per litre of water, roughly 7.5 to 15 grams per 15 litre knapsack tank. Best applied during active growth stages and before or during flowering, in early morning or late evening.",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Form", value: "Powder, 100% water soluble" },
            { "@type": "PropertyValue", name: "Purity", value: "99%" },
            { "@type": "PropertyValue", name: "Foliar Dose", value: "0.5-1 g/litre" },
            { "@type": "PropertyValue", name: "Knapsack Dose (15 L)", value: "7.5-15 g/tank" },
            { "@type": "PropertyValue", name: "Pack Size", value: "25 Kgs" },
          ],
          offers: {
            "@type": "Offer",
            url: "https://taraonglobal.com/products/vigora",
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
            eligibleQuantity: { "@type": "QuantitativeValue", value: 25, unitCode: "KGM", unitText: "25 Kgs bag" },
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
            { "@type": "ListItem", position: 3, name: "Vigora", item: "https://taraonglobal.com/products/vigora" },
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
            Vigora Water-Soluble Plant Biostimulant
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            Vigora is a water-soluble powder plant biostimulant supplied in bulk for foliar and drip application. Used by farmers, dealers and distributors to support root development, flowering and fruit or grain filling in Indian crop conditions.
          </p>
          <p className="mt-3 text-ink/70">
            The 99% figure refers to the water soluble content of the powder. Foliar dose is 0.5 to 1 gram per litre of water, or 7.5 to 15 grams in a 15 litre knapsack tank. Spray during active growth and around flowering, in the early morning or late evening. Supplied in 25 Kgs packing from Ahmedabad, with COA on request and dispatch across India.
          </p>
          <InquiryCTA product="vigora" className="mt-8" />
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-gold/25 via-transparent to-forest/20 blur-2xl" />
          <img
            src={productImg.url}
            alt="Vigora water soluble powder plant biostimulant and yield enhancer for Indian crops, cotton, wheat, rice and vegetables, 25 Kgs bag supplied by TARAON GLOBAL"
            width={1024}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="aspect-square w-full rounded-lg object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="container-page py-8">
        <SectionHeading eyebrow="Why farmers use it" title="What Vigora does in the field" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Deeper roots", "Builds a stronger root system so the crop stays firm and takes up water and nutrients better."],
            ["Stronger flowering", "More flowers open together and hold on the plant, which improves fruit and pod set."],
            ["Better yield quality", "Fills grain, pods and fruit more evenly for a cleaner harvest with better market grade."],
            ["Stress recovery", "Helps the plant push through heat, transplant shock and short dry spells."],
            ["Fits any crop plan", "Works across field crops, vegetables, fruits and plantation crops without changing the schedule."],
            ["Simple to use", "Fully water soluble powder. Weigh, mix and spray with a standard knapsack."],
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

      <ProductDisclaimer />

      <CTABand
        title="Want Vigora for your dealer network or farm?"
        subtitle="Send quantity and destination. Same-day pricing on WhatsApp or email."
        primaryLabel="Send Enquiry"
      />
    </>
  );
}
