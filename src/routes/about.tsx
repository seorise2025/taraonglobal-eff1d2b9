import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin } from "lucide-react";
import warehouseImg from "@/assets/about-warehouse.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABand } from "@/components/site/CTABand";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { FAQ } from "@/components/site/FAQ";

const ABOUT_FAQS = [
  {
    q: "Where is TARAON GLOBAL located?",
    a: "TARAON GLOBAL operates from A-210, Signature-2, Sarkhej Sanand Cross Road, Ahmedabad 382210, Gujarat, India. Warehousing, packing and dispatch of all potassium humate shiny flakes happen from this location.",
  },
  {
    q: "Is TARAON GLOBAL a manufacturer or a supplier?",
    a: "TARAON GLOBAL is a trading and supplier company. We source potassium humate shiny flakes from a trusted producer, verify every batch, and handle warehousing, packing and dispatch to farmers, dealers, distributors and fertilizer companies.",
  },
  {
    q: "Who runs TARAON GLOBAL?",
    a: "The business is led by Rajesh Kumar Trivedi, who brings over 20 years of hands-on experience in the humate and agri-inputs industry. He personally oversees supplier selection, batch verification and dealer relationships.",
  },
  {
    q: "What is the standard 25 kg pack and how do I request pricing?",
    a: "All grades ship in a standard 25 Kgs kraft bag with a printed batch number. For 25 kg price, bulk pricing, dealer terms or a current-batch COA, call Rajesh Kumar Trivedi on +91 63591 93666 or send an enquiry from the contact page.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TARAON GLOBAL | Potassium Humate Supplier, Ahmedabad" },
      {
        name: "description",
        content:
          "TARAON GLOBAL is an Ahmedabad based supplier of potassium humate shiny flakes for farmers, dealers, and distributors across Gujarat and India.",
      },
      {
        property: "og:title",
        content: "About TARAON GLOBAL | Potassium Humate Supplier, Ahmedabad",
      },
      {
        property: "og:description",
        content:
          "One product done properly. Led by Rajesh Kumar Trivedi from Sarkhej Sanand Cross Road, Ahmedabad.",
      },
      { property: "og:url", content: "https://taraonglobal.lovable.app/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://taraonglobal.lovable.app/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://taraonglobal.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://taraonglobal.lovable.app/about" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About TARAON GLOBAL",
          url: "https://taraonglobal.lovable.app/about",
          mainEntity: { "@id": "https://taraonglobal.lovable.app/#organization" },
          about: { "@id": "https://taraonglobal.lovable.app/#rajesh-kumar-trivedi" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ABOUT_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="container-page grid gap-12 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24">
        <div>
          <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> About
          </div>
          <h1 className="font-display text-4xl leading-tight text-forest-deep sm:text-5xl">
            About TARAON GLOBAL
          </h1>
          <div className="mt-6 space-y-4 text-ink/80">
            <p>
              TARAON GLOBAL is a trading company built around one product line done
              properly, not ten done halfway. We source and supply just two grades of
              potassium humate shiny flakes for agriculture.
            </p>
            <p>
              We're based at Sarkhej Sanand Cross Road in Ahmedabad. Our focus is a
              single category, handled well - from sourcing and quality checks to
              packing, dispatch, and after-sale support.
            </p>
            <p>
              Every bag carries a batch number so you know exactly what you're
              buying, and when. Standard packing is 25 Kgs - the same pack for
              farmers, dealers and distributors, so every buyer gets the same
              product quality.
            </p>
            <p>
              We answer our own phone. If you call, you'll speak with Rajesh, not a call
              center.
            </p>
          </div>
        </div>
        <img
          src={warehouseImg}
          alt="Neatly stacked bags of TARAON GLOBAL potassium humate in the Ahmedabad warehouse"
          width={1400}
          height={1000}
          loading="lazy"
          className="aspect-[7/5] w-full rounded-lg object-cover shadow-xl"
        />
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <SectionHeading eyebrow="Leadership" title="Led by Rajesh Kumar Trivedi" />
            <p className="mt-5 text-ink/75">
              Rajesh Kumar Trivedi runs TARAON GLOBAL out of Ahmedabad and brings over
              20 years of hands-on experience in the humate and agri-inputs industry.
              That experience shows up in the way we pick suppliers, check every
              consignment, and stand behind what we ship. For product questions, dealer
              pricing, or bulk orders, call him directly.
            </p>
            <a
              href="tel:+916359193666"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-forest-deep px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
            >
              <Phone className="h-4 w-4" /> +91 63591 93666
            </a>
          </div>

          <div className="rounded-lg border border-border bg-cream p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
              <MapPin className="h-3.5 w-3.5" /> Address
            </div>
            <div className="font-display text-xl leading-relaxed text-forest-deep">
              TARAON GLOBAL<br />
              A-210, Signature-2<br />
              Sarkhej Sanand Cross Road<br />
              Ahmedabad-382210<br />
              Gujarat, India
            </div>
            <Link
              to="/contact"
              className="mt-6 inline-flex text-sm font-medium text-forest hover:text-gold"
            >
              Contact us →
            </Link>
          </div>
        </div>
      </section>


      <RelatedLinks
        eyebrow="Our products"
        title="What TARAON GLOBAL supplies"
        items={[
          {
            to: "/products/super-potassium-shiny-flakes-98",
            title: "Super Potassium Shiny Flakes 98%",
            desc: "Flagship potassium humate flakes for farmers and dealers.",
          },
          {
            to: "/products/super-f-humate-big-shiny-flakes",
            title: "Super F Humate Big Shiny Flakes",
            desc: "Big flake grade built for bulk buyers and blenders.",
          },
          {
            to: "/applications",
            title: "How the products are used",
            desc: "Soil, drip, fertigation, foliar and NPK blending in the field.",
          },
        ]}
      />

      <CTABand
        title="Have a question you'd rather ask a person?"
        subtitle="Send us a note or call Rajesh direct. Same-day replies most days."
      />
    </>
  );
}
