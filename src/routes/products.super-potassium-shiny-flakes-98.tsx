import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroImg from "@/assets/super-potassium-98-product.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpecTable } from "@/components/site/SpecTable";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";

const SPECS = [
  { label: "Appearance", value: "Black shiny flakes" },
  { label: "Humic Acid", value: "60% to 65%" },
  { label: "Fulvic Acid", value: "5% to 15%" },
  { label: "Potassium (K₂O)", value: "10% to 12%" },
  { label: "Water Solubility", value: "Up to 100%" },
  { label: "pH", value: "9 to 10" },
  { label: "Moisture", value: "Max 15%" },
  { label: "Packaging", value: "1 kg, 5 kg, 10 kg, 25 kg, 50 kg bags" },
];

const QUICK = [
  { label: "Product Name", value: "Super Potassium Shiny Flakes 98%" },
  { label: "Brand", value: "TARAON GLOBAL" },
  { label: "Form", value: "Black shiny flakes" },
  { label: "Packaging", value: "1 kg, 5 kg, 10 kg, 25 kg, 50 kg" },
  { label: "Source", value: "Natural leonardite" },
  { label: "Buyer Type", value: "Farmers, dealers, distributors, bulk buyers" },
];

const FAQS = [
  {
    q: "What is Super Potassium Shiny Flakes 98% used for?",
    a: "Soil health, root growth, and getting more out of the fertilizer you're already applying.",
  },
  {
    q: "Is it really water soluble?",
    a: "Yes, up to 100%. That's the point of the flake form over powder.",
  },
  { q: "What pack sizes do you sell?", a: "1 kg, 5 kg, 10 kg, 25 kg, and 50 kg." },
  {
    q: "Can I use it in a drip system?",
    a: "Yes. It's built for that. Dissolve fully before running it through your line.",
  },
  {
    q: "Do you work with dealers?",
    a: "Yes. Bulk pricing and dealer terms are available on request.",
  },
];

export const Route = createFileRoute("/products/super-potassium-shiny-flakes-98")({
  head: () => ({
    meta: [
      { title: "Potassium Humate 98 Shiny Flakes | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "Super Potassium Shiny Flakes 98% by TARAON GLOBAL. 60-65% humic acid, up to 100% water soluble. Packs from 1 kg to 50 kg.",
      },
      {
        property: "og:title",
        content: "Super Potassium Shiny Flakes 98% | TARAON GLOBAL",
      },
      {
        property: "og:description",
        content:
          "Made from natural leonardite. Dust free, up to 100% water soluble. Built for soil, drip and spray.",
      },
      {
        property: "og:url",
        content: "/products/super-potassium-shiny-flakes-98",
      },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "/products/super-potassium-shiny-flakes-98" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Super Potassium Shiny Flakes 98%",
          brand: { "@type": "Brand", name: "TARAON GLOBAL" },
          category: "Potassium Humate Fertilizer",
          description:
            "Black shiny potassium humate flakes made from natural leonardite. 60-65% humic acid, 5-15% fulvic acid, 10-12% K2O, up to 100% water soluble. Available in 1 kg, 5 kg, 10 kg, 25 kg, 50 kg packs.",
          manufacturer: { "@type": "Organization", name: "TARAON GLOBAL" },
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
            Made from natural leonardite. High in humic acid, fulvic acid, and potassium.
            Dissolves fast, no residue left behind in your tank.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
            >
              Request Price
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
            src={heroImg.url}
            alt="Super Potassium Shiny Flakes 98% — glossy black potassium humate flakes"
            width={1600}
            height={1200}
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl"
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

      <section className="container-page py-16">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mt-6">
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        title="Want a quote for your quantity?"
        subtitle="Call Rajesh Kumar Trivedi on +91 63591 93666, or message on WhatsApp."
      />
    </>
  );
}
