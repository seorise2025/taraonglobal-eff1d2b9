import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import productBigImg from "@/assets/super-f-humate-bag.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpecTable } from "@/components/site/SpecTable";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";

const SPECS = [
  { label: "Appearance", value: "Big black shiny flakes" },
  { label: "Humic Acid", value: "60% to 65%" },
  { label: "Fulvic Acid", value: "5% to 15%" },
  { label: "Potassium (K₂O)", value: "10% to 12%" },
  { label: "Water Solubility", value: "Up to 100%" },
  { label: "pH", value: "9 to 10" },
  { label: "Moisture", value: "Max 15%" },
  { label: "Packaging", value: "1 kg, 5 kg, 10 kg, 25 kg, 50 kg bags" },
];

const QUICK = [
  { label: "Product Name", value: "Super F Humate Big Shiny Flakes" },
  { label: "Brand", value: "TARAON GLOBAL" },
  { label: "Form", value: "Big black shiny flakes" },
  { label: "Packaging", value: "1 kg, 5 kg, 10 kg, 25 kg, 50 kg" },
  { label: "Source", value: "Natural leonardite" },
  {
    label: "Buyer Type",
    value: "Dealers, distributors, fertilizer companies, farmers",
  },
];

const FAQS = [
  {
    q: "Where is Super F Humate Big Shiny Flakes sourced from?",
    a: "The flakes are produced from natural leonardite by our overseas partner facility. TARAON GLOBAL imports the product, verifies each batch, and supplies it under our brand from Ahmedabad.",
  },
  {
    q: "Is TARAON GLOBAL the manufacturer?",
    a: "No. TARAON GLOBAL is a trading and supplier company. We do not manufacture — we source from a trusted producer and handle quality control, packaging, and India-wide distribution.",
  },
  {
    q: "What packaging is available?",
    a: "1 kg, 5 kg, 10 kg, 25 kg, and 50 kg kraft bags. The 25 kg bag is the standard pack for dealers and distributors.",
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
      { title: "Super F Humate Big Shiny Flakes | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "Super F Humate Big Shiny Flakes for bulk buyers and dealers. Same strength as our 98% flakes, built for volume. Packs from 1 kg to 50 kg.",
      },
      {
        property: "og:title",
        content: "Super F Humate Big Shiny Flakes | TARAON GLOBAL",
      },
      {
        property: "og:description",
        content:
          "Bigger flake, same strength. Made for dealers who move volume without extra handling headaches.",
      },
      {
        property: "og:url",
        content: "/products/super-f-humate-big-shiny-flakes",
      },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "/products/super-f-humate-big-shiny-flakes" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Super F Humate Big Shiny Flakes",
          brand: { "@type": "Brand", name: "TARAON GLOBAL" },
          category: "Potassium Humate Fertilizer",
          description:
            "Big black shiny potassium humate flakes from natural leonardite. 60-65% humic acid, 5-15% fulvic acid, 10-12% K2O, up to 100% water soluble. Bulk-ready packs from 1 kg to 50 kg.",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "TARAON GLOBAL",
              url: "/",
              description: "Ahmedabad based trading company and supplier of potassium humate shiny flakes.",
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
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Products",
              item: "/#products",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Super F Humate Big Shiny Flakes",
              item: "/products/super-f-humate-big-shiny-flakes",
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
            Super F Humate Big Shiny Flakes
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            Same core strength as our main product, in a bigger flake. Built for dealers
            who need volume without extra handling headaches.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
            >
              Request Bulk Price
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://wa.me/916359193666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-medium text-forest-deep hover:border-gold hover:bg-gold/10"
            >
              <MessageCircle className="h-4 w-4" /> Talk on WhatsApp
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-gold/25 via-transparent to-forest/20 blur-2xl" />
          <img
            src={productBigImg.url}
            alt="Super F Humate Big Shiny Flakes — 25 kg kraft bag by TARAON GLOBAL"
            width={1400}
            height={1200}
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
                Rajesh Kumar Trivedi — Founder, TARAON GLOBAL
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

      <CTABand
        title="Looking for bulk stock?"
        subtitle="Send your quantity and destination. Dealer terms available on request."
        primaryLabel="Send Enquiry"
      />
    </>
  );
}
