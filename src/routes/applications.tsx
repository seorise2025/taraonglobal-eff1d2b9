import { createFileRoute } from "@tanstack/react-router";
import fieldImg from "@/assets/applications-field.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABand } from "@/components/site/CTABand";
import { SpecTable } from "@/components/site/SpecTable";
import { IndiaMapCoverage } from "@/components/site/IndiaMapCoverage";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { FAQ } from "@/components/site/FAQ";

const APP_FAQS = [
  {
    q: "What are the main humic acid fertilizer uses in agriculture?",
    a: "Humic acid fertilizer is used to improve soil structure, increase water and nutrient holding capacity, support root growth and boost microbial activity. Potassium humate shiny flakes deliver those benefits through soil application, drip irrigation, fertigation, foliar spray and NPK blending.",
  },
  {
    q: "How is potassium humate used in drip irrigation and fertigation?",
    a: "Dissolve the shiny flakes fully in a stock tank, then dose through your drip or fertigation line at the rate your agronomist recommends. The 98% water solubility keeps emitters clear and lets the humate reach the root zone with every irrigation cycle.",
  },
  {
    q: "What is the potassium humate dose per acre?",
    a: "Typical field use ranges from about 2 to 5 kg per acre per season, split across soil, drip or foliar applications. Exact dose depends on crop, soil test and stage — share your crop and system with our team for a specific recommendation.",
  },
  {
    q: "Can potassium humate be blended with NPK fertilizers?",
    a: "Yes. Fertilizer companies routinely blend the flakes into NPK and organic input lines. It mixes clean, does not clump, and helps improve the efficiency of the applied NPK.",
  },
  {
    q: "Is potassium humate suitable for organic and regenerative farming?",
    a: "Potassium humate is derived from natural leonardite, lignite or oxidised brown coal and fits well into regenerative and low-input systems focused on soil health. It is a soil conditioner and plant growth support input, not a complete NPK fertiliser.",
  },
];

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Potassium Humate Uses in Agriculture | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "How potassium humate works in soil, drip irrigation, fertigation, foliar spray, and fertilizer blending. Practical guide from TARAON GLOBAL.",
      },
      {
        property: "og:title",
        content: "Potassium Humate Uses in Agriculture | TARAON GLOBAL",
      },
      {
        property: "og:description",
        content:
          "Where potassium humate fits in real farming - soil, drip, fertigation, foliar, and NPK blending.",
      },
      { property: "og:url", content: "https://taraonglobal.lovable.app/applications" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://taraonglobal.lovable.app/applications" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://taraonglobal.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "Applications", item: "https://taraonglobal.lovable.app/applications" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: APP_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Applications,
});

const USES: Array<{ title: string; body: string }> = [
  {
    title: "Soil Application",
    body: "Mix it into the soil before planting, or during active growth. It works on the root zone directly, improving structure and how well the soil holds moisture.",
  },
  {
    title: "Drip Irrigation",
    body: "This is where the flake form matters most. It dissolves fully, so you're not fighting clogged emitters halfway through the season.",
  },
  {
    title: "Fertigation",
    body: "Add it into your existing nutrient water schedule. It doesn't need a separate system or extra equipment.",
  },
  {
    title: "Foliar Spray",
    body: "Apply on leaves at the right crop stage, at the dose your agronomist recommends. This isn't a guess-and-spray product.",
  },
  {
    title: "Fertilizer Blending",
    body: "Mixes clean with NPK and organic fertilizer. A lot of our bulk buyers are formulators doing exactly this.",
  },
];

const FIT = [
  { label: "Soil application", value: "Strong" },
  { label: "Drip irrigation", value: "Strong" },
  { label: "Fertigation", value: "Strong" },
  { label: "Foliar spray", value: "Use as advised" },
  { label: "Fertilizer blending", value: "Strong" },
];

function Applications() {
  return (
    <>
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> Applications
            </div>
            <h1 className="font-display text-4xl leading-tight text-forest-deep sm:text-5xl">
              Potassium Humate Uses in Agriculture
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Potassium humate does one basic job well. It helps soil hold nutrients and
              water so your plants can actually use what you're feeding them. Here's how
              that plays out in the field.
            </p>
          </div>
          <img
            src={fieldImg}
            alt="Cross section of soil showing deep plant roots in a crop field"
            width={1600}
            height={1000}
            loading="lazy"
            className="aspect-[16/10] w-full rounded-lg object-cover shadow-xl"
          />
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {USES.map((u, i) => (
            <div
              key={u.title}
              className="group rounded-lg border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
            >
              <div className="mb-4 font-display text-3xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl text-forest-deep">{u.title}</h3>
              <p className="mt-3 text-ink/75">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Where it fits" title="Fit by application" />
          <div className="mt-8">
            <SpecTable rows={FIT} />
          </div>
        </div>
      </section>

      <IndiaMapCoverage />

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Humic acid fertilizer uses - common questions"
        />
        <div className="mt-6 max-w-3xl">
          <FAQ items={APP_FAQS} />
        </div>
      </section>


      <RelatedLinks
        eyebrow="See the products in use"
        title="Products for these applications"
        items={[
          { to: "/products/super-potassium-shiny-flakes-98", title: "Super Potassium Shiny Flakes 98%", desc: "98% water soluble potassium humate for drip, fertigation and foliar use." },
          { to: "/products/super-f-humate-big-shiny-flakes", title: "Super F Humate Big Shiny Flakes", desc: "Big flake grade for dealers, distributors and fertilizer blenders." },
          { to: "/products/glycine", title: "Glycine (Amino Acid)", desc: "99% purity Glycine, fertilizer synergist and natural chelator." },
          { to: "/products/vigora", title: "Vigora Plant Biostimulant", desc: "Yield enhancer and flowering booster for cotton, wheat, rice and vegetables." },
          { to: "/about", title: "Who supplies these products", desc: "TARAON GLOBAL, Ahmedabad based agri-inputs trading company." },
        ]}
      />

      <CTABand
        title="Not sure which product suits your crop and system?"
        subtitle="Tell us the crop, system, and area. We'll point you to the right dose for your 25 Kgs bag order."
        primaryLabel="Talk to TARAON GLOBAL"
      />
    </>
  );
}
