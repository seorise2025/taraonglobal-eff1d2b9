import { createFileRoute } from "@tanstack/react-router";
import fieldImg from "@/assets/applications-field.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABand } from "@/components/site/CTABand";
import { SpecTable } from "@/components/site/SpecTable";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Potassium Humate Uses in Agriculture | Taraon Global" },
      {
        name: "description",
        content:
          "How potassium humate works in soil, drip irrigation, fertigation, foliar spray, and fertilizer blending. Practical guide from Taraon Global.",
      },
      {
        property: "og:title",
        content: "Potassium Humate Uses in Agriculture | Taraon Global",
      },
      {
        property: "og:description",
        content:
          "Where potassium humate fits in real farming — soil, drip, fertigation, foliar, and NPK blending.",
      },
      { property: "og:url", content: "/applications" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/applications" }],
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

      <CTABand
        title="Not sure which product suits your crop and system?"
        subtitle="Tell us the crop, system, and area. We'll point you to the right pack size and dose."
        primaryLabel="Talk to Taraon Global"
      />
    </>
  );
}
