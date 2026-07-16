import { createFileRoute, Link } from "@tanstack/react-router";
import fieldAvif from "@/assets/applications-field.jpg?w=640;960;1600&format=avif&as=srcset";
import fieldWebp from "@/assets/applications-field.jpg?w=640;960;1600&format=webp&as=srcset";
import fieldImg from "@/assets/applications-field.jpg?w=1200&format=webp";
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
    a: "Typical field use ranges from about 2 to 5 kg per acre per season, split across soil, drip or foliar applications. Exact dose depends on crop, soil test and stage , share your crop and system with our team for a specific recommendation.",
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
      { title: "Potassium Humate Applications, Uses and Dosage Guide" },
      {
        name: "description",
        content:
          "Applications of potassium humate, Glycine and Vigora biostimulant across soil, drip fertigation, foliar spray, fertilizer blending and formulation, with practical dosage guidance.",
      },
      { name: "keywords", content: "potassium humate uses, potassium humate application, potassium humate dosage, potassium humate for fertigation, potassium humate for foliar spray, potassium humate for fertilizer blending, glycine uses in agriculture, biostimulant application guide, agri input dosage guide" },
      {
        property: "og:title",
        content: "Potassium Humate Applications, Uses and Dosage Guide",
      },
      {
        property: "og:description",
        content:
          "How potassium humate, Glycine and Vigora fit in real Indian farming: soil, drip, fertigation, foliar, blending and formulation.",
      },
      { property: "og:url", content: "https://taraonglobal.com/applications" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://taraonglobal.com/applications" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://taraonglobal.com/" },
            { "@type": "ListItem", position: 2, name: "Applications", item: "https://taraonglobal.com/applications" },
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

const BY_PRODUCT: Array<{
  slug: string;
  name: string;
  tag: string;
  uses: string[];
}> = [
  {
    slug: "super-potassium-shiny-flakes-98",
    name: "Super Potassium Shiny Flakes 98%",
    tag: "Potassium humate, 98% water soluble",
    uses: [
      "Soil application before or during crop stage",
      "Drip irrigation and fertigation, clean dissolve",
      "Foliar spray at agronomist recommended dose",
      "NPK and organic fertilizer blending",
    ],
  },
  {
    slug: "super-f-humate-big-shiny-flakes",
    name: "Super F Humate Big Shiny Flakes",
    tag: "Big flake grade for dealers and blenders",
    uses: [
      "Dealer and distributor repacking",
      "Fertilizer plant blending lines",
      "Soil conditioning programs",
      "Bulk supply to formulators",
    ],
  },
  {
    slug: "glycine",
    name: "Glycine 99%",
    tag: "Bulk amino acid, fertilizer synergist",
    uses: [
      "Fertilizer formulation as a natural chelator",
      "Blending with folic acid and other amino acids",
      "Food, pharma and feed grade raw material",
      "Daily chemical and industrial use",
    ],
  },
  {
    slug: "vigora",
    name: "Vigora Plant Biostimulant",
    tag: "Powder biostimulant, 0.5 to 1 gram dose",
    uses: [
      "Yield enhancer on cotton, wheat, rice and vegetables",
      "Flowering and fruit setting support",
      "Foliar spray at recommended crop stage",
      "Tank mix with routine spray schedule",
    ],
  },
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
              Potassium Humate, Glycine and Biostimulant Applications in Indian Agriculture
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Four products, one supply desk. Potassium humate for soil and drip, big
              flake humate for dealers, Glycine as a bulk amino acid, and Vigora as a
              powder biostimulant. Here is where each one fits in the field.
            </p>
          </div>
          <picture>
            <source type="image/avif" srcSet={fieldAvif} sizes="100vw" />
            <source type="image/webp" srcSet={fieldWebp} sizes="100vw" />
            <img
              src={fieldImg}
              alt="Cross section of soil showing deep plant roots in a crop field"
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full rounded-lg object-cover shadow-xl"
            />
          </picture>
        </div>
      </section>

      <section className="container-page pb-4">
        <SectionHeading eyebrow="Potassium humate" title="How the flakes work in the field" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="container-page py-16">
        <SectionHeading eyebrow="By product" title="Applications across the full range" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {BY_PRODUCT.map((p) => (
            <div
              key={p.slug}
              className="rounded-lg border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-gold">{p.tag}</div>
              <h3 className="mt-2 font-display text-xl text-forest-deep">{p.name}</h3>
              <ul className="mt-4 space-y-2">
                {p.uses.map((u) => (
                  <li key={u} className="flex items-start gap-3 text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={"/products/$slug" as never}
                params={{ slug: p.slug } as never}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-deep hover:text-gold"
              >
                View product details <span aria-hidden>→</span>
              </Link>
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
