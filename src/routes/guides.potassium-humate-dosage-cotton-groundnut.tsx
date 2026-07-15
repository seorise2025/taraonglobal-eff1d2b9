import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABand } from "@/components/site/CTABand";
import { SpecTable } from "@/components/site/SpecTable";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { FAQ } from "@/components/site/FAQ";

const CANONICAL =
  "https://taraonglobal.com/guides/potassium-humate-dosage-cotton-groundnut";

const FAQS = [
  {
    q: "How much potassium humate per acre for cotton?",
    a: "For cotton, a typical seasonal use is about 3 to 5 kg per acre of potassium humate shiny flakes, split across a soil basal, two to three drip or fertigation doses, and one or two foliar sprays at square and boll formation stages.",
  },
  {
    q: "How much potassium humate per acre for groundnut?",
    a: "For groundnut, plan for about 2 to 4 kg per acre per season. Split it into a soil dose at sowing, a drip or drench dose at pegging, and a foliar spray at pod development. Adjust based on soil organic carbon and past humate use.",
  },
  {
    q: "Can I mix potassium humate with urea or DAP?",
    a: "Yes. Dissolve the flakes fully first, then combine in the tank. Avoid mixing with calcium nitrate or strongly acidic inputs in the same stock tank as it can precipitate. Use separate tanks and dose in sequence when in doubt.",
  },
  {
    q: "Soil application or drip, which is better for cotton and groundnut?",
    a: "Both work. Soil application at sowing builds a base of humic carbon. Drip and fertigation deliver small, frequent doses that keep root activity high through the season. Most Gujarat and Maharashtra farms combine the two.",
  },
  {
    q: "How soon will I see results after applying potassium humate?",
    a: "Early root response is often visible within 2 to 3 weeks. Field level gains in canopy, boll count for cotton and pod fill for groundnut show over the full season, especially in sandy or low organic carbon soils.",
  },
];

export const Route = createFileRoute(
  "/guides/potassium-humate-dosage-cotton-groundnut",
)({
  head: () => ({
    meta: [
      {
        title:
          "Potassium Humate Dosage for Cotton and Groundnut | TARAON GLOBAL",
      },
      {
        name: "description",
        content:
          "Practical dosage and application guide for potassium humate on cotton and groundnut. Kg per acre, soil vs drip vs foliar, timing by crop stage.",
      },
      {
        property: "og:title",
        content:
          "Potassium Humate Dosage for Cotton and Groundnut | TARAON GLOBAL",
      },
      {
        property: "og:description",
        content:
          "How to use potassium humate on cotton and groundnut. Dosage in kg per acre, soil, drip and foliar timings.",
      },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://taraonglobal.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Guides",
              item: "https://taraonglobal.com/guides",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Potassium Humate Dosage for Cotton and Groundnut",
              item: CANONICAL,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to use potassium humate on cotton and groundnut",
          description:
            "Dosage and application guide for potassium humate shiny flakes on cotton and groundnut, covering soil, drip and foliar routes.",
          totalTime: "P1D",
          supply: [
            { "@type": "HowToSupply", name: "Potassium humate shiny flakes 98%" },
          ],
          step: [
            {
              "@type": "HowToStep",
              name: "Soil application at sowing",
              text: "Broadcast 1 to 2 kg per acre of shiny flakes with the basal fertilizer or FYM, then incorporate into the top 10 to 15 cm of soil.",
            },
            {
              "@type": "HowToStep",
              name: "Drip or fertigation dose",
              text: "Dissolve 500 g to 1 kg per acre in a stock tank and dose through drip at branching for cotton or pegging for groundnut. Repeat once or twice mid-season.",
            },
            {
              "@type": "HowToStep",
              name: "Foliar spray",
              text: "Spray a 0.1 to 0.2 percent solution (1 to 2 g per litre) at square and boll formation in cotton, and at pod development in groundnut.",
            },
          ],
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
  component: GuidePage,
});

function GuidePage() {
  return (
    <div className="pt-6">
      <section className="container-page pt-10 pb-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink/60">
          <Link to="/" className="hover:text-forest">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Guides</span>
          <span className="mx-2">/</span>
          <span className="text-forest-deep">
            Potassium Humate Dosage for Cotton and Groundnut
          </span>
        </nav>
        <SectionHeading
          eyebrow="Field Guide"
          title="Potassium Humate Dosage for Cotton and Groundnut"
        />
        <p className="mt-4 max-w-3xl text-lg text-ink/75">
          A practical, farm-level guide to using potassium humate shiny flakes
          on cotton and groundnut in Indian conditions. Dosage in kg per acre,
          timing by crop stage, and how to split it across soil, drip and
          foliar routes.
        </p>
      </section>

      <section className="container-page pb-10">
        <h2 className="font-display text-2xl text-forest-deep">
          Cotton, season plan per acre
        </h2>
        <p className="mt-2 max-w-3xl text-ink/75">
          Cotton responds well to humate through the season. The plan below
          totals about 3 to 5 kg per acre of shiny flakes, split for steady
          root and canopy activity.
        </p>
        <div className="mt-6">
          <SpecTable
            rows={[
              { label: "Basal, at sowing (soil)", value: "1.0 to 2.0 kg per acre" },
              { label: "Drip / fertigation, at branching", value: "500 g to 1 kg per acre" },
              { label: "Drip / fertigation, at square", value: "500 g to 1 kg per acre" },
              { label: "Foliar spray, at boll formation", value: "0.1 to 0.2% (1 to 2 g/L)" },
              { label: "Seasonal total (guideline)", value: "3 to 5 kg per acre" },
            ]}
          />
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="font-display text-2xl text-forest-deep">
          Groundnut, season plan per acre
        </h2>
        <p className="mt-2 max-w-3xl text-ink/75">
          Groundnut needs a lighter, better-timed schedule. Focus on pegging
          and pod fill stages where humate supports root activity and nutrient
          uptake.
        </p>
        <div className="mt-6">
          <SpecTable
            rows={[
              { label: "Basal, at sowing (soil)", value: "1.0 kg per acre" },
              { label: "Drip or drench, at pegging", value: "500 g to 1 kg per acre" },
              { label: "Foliar spray, at pod development", value: "0.1 to 0.15% (1 to 1.5 g/L)" },
              { label: "Optional, late pod fill (foliar)", value: "0.1% (1 g/L)" },
              { label: "Seasonal total (guideline)", value: "2 to 4 kg per acre" },
            ]}
          />
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="font-display text-2xl text-forest-deep">
          Soil vs drip vs foliar, how to choose
        </h2>
        <div className="mt-6">
          <SpecTable
            rows={[
              {
                label: "Soil application",
                value:
                  "Best for building humic carbon. Use at sowing with basal fertilizer or FYM.",
              },
              {
                label: "Drip / fertigation",
                value:
                  "Best for steady, in-season delivery. Dissolve fully in a stock tank first.",
              },
              {
                label: "Foliar spray",
                value:
                  "Best for stage-linked boosts. Use dilute solutions, early morning or late evening.",
              },
              {
                label: "NPK blending",
                value:
                  "Flakes mix clean with urea, DAP and MOP for uniform field application.",
              },
            ]}
          />
        </div>
      </section>

      <section className="container-page pb-10">
        <h2 className="font-display text-2xl text-forest-deep">
          Mixing and safety notes
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/80">
          <li>Always dissolve flakes fully in warm water before tank mixing.</li>
          <li>
            Avoid combining in the same stock tank with calcium nitrate or
            strongly acidic inputs. Use separate tanks and dose in sequence.
          </li>
          <li>
            Spray foliar doses in early morning or late evening for better
            uptake and lower leaf stress.
          </li>
          <li>
            Adjust dose based on soil organic carbon, crop stage and past
            humate use. When in doubt, start low and observe response.
          </li>
        </ul>
        <p className="mt-4 max-w-3xl text-sm text-ink/60">
          Ranges above are general field guidance from trade experience. Final
          dose should follow your agronomist and soil test recommendation.
        </p>
      </section>

      <section className="container-page pb-10">
        <SectionHeading eyebrow="Questions" title="Common questions from growers" />
        <div className="mt-6 max-w-3xl">
          <FAQ items={FAQS} />
        </div>
      </section>

      <RelatedLinks
        items={[
          {
            to: "/products/super-potassium-shiny-flakes-98",
            title: "Super Potassium Shiny Flakes 98%",
            desc: "Product used in this guide. 25 Kg standard packing, 98% solubility.",
          },
          {
            to: "/products/super-f-humate-big-shiny-flakes",
            title: "Super F Humate Big Shiny Flakes",
            desc: "Fulvic-rich humate for foliar and fertigation programmes.",
          },
          {
            to: "/applications",
            title: "Potassium Humate Uses in Agriculture",
            desc: "Broader guide on soil, drip, fertigation, foliar and NPK blending.",
          },
        ]}
      />

      <CTABand
        title="Need a crop-specific dosage plan?"
        subtitle="Share your crop, acreage and irrigation setup. We will share a written schedule and a bulk quote."
        primaryLabel="Request Bulk Price"
      />
    </div>
  );
}
