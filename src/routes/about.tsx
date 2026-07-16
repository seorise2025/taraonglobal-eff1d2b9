import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin } from "lucide-react";
import warehouseAvif from "@/assets/about-warehouse.jpg?w=640;960;1400&format=avif&as=srcset";
import warehouseWebp from "@/assets/about-warehouse.jpg?w=640;960;1400&format=webp&as=srcset";
import warehouseImg from "@/assets/about-warehouse.jpg?w=960&format=webp";
import rajeshAvif from "@/assets/rajesh-kumar-trivedi.jpg?w=320;640&format=avif&as=srcset";
import rajeshWebp from "@/assets/rajesh-kumar-trivedi.jpg?w=320;640&format=webp&as=srcset";
import rajeshJpg from "@/assets/rajesh-kumar-trivedi.jpg?w=640&format=webp";
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
      { title: "About TARAON GLOBAL | Agri Input Supplier Ahmedabad" },
      {
        name: "description",
        content:
          "TARAON GLOBAL is an Ahmedabad based agri input trading company supplying potassium humate, Glycine and biostimulants to dealers, distributors and formulators across India.",
      },
      { name: "keywords", content: "agri input supplier Ahmedabad, potassium humate trading company India, Rajesh Kumar Trivedi TARAON GLOBAL, agri input trading company Ahmedabad, potassium humate supplier Ahmedabad, agricultural raw material trading company" },
      {
        property: "og:title",
        content: "About TARAON GLOBAL | Agri Input Supplier Ahmedabad",
      },
      {
        property: "og:description",
        content:
          "Ahmedabad based agri input trading desk led by Rajesh Kumar Trivedi. Verified bulk supply of potassium humate, Glycine and biostimulants across India.",
      },
      { property: "og:url", content: "https://taraonglobal.com/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://taraonglobal.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://taraonglobal.com/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://taraonglobal.com/about" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About TARAON GLOBAL",
          url: "https://taraonglobal.com/about",
          mainEntity: { "@id": "https://taraonglobal.com/#organization" },
          about: { "@id": "https://taraonglobal.com/#rajesh-kumar-trivedi" },
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
        <picture>
          <source type="image/avif" srcSet={warehouseAvif} sizes="(min-width: 1024px) 900px, 100vw" />
          <source type="image/webp" srcSet={warehouseWebp} sizes="(min-width: 1024px) 900px, 100vw" />
          <img
            src={warehouseImg}
            alt="Neatly stacked bags of TARAON GLOBAL potassium humate in the Ahmedabad warehouse"
            width={1400}
            height={1000}
            loading="lazy"
            decoding="async"
            className="aspect-[7/5] w-full rounded-lg object-cover shadow-xl"
          />
        </picture>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page grid gap-10 py-16 md:grid-cols-12 md:items-center md:gap-12">
          <picture className="md:col-span-4">
            <source type="image/avif" srcSet={rajeshAvif} sizes="(min-width: 768px) 288px, 224px" />
            <source type="image/webp" srcSet={rajeshWebp} sizes="(min-width: 768px) 288px, 224px" />
            <img
              src={rajeshJpg}
              alt="Portrait of Rajesh Kumar Trivedi, Founder of TARAON GLOBAL, Ahmedabad based potassium humate supplier with over 20 years of experience in the agri inputs trade"
              width={640}
              height={1137}
              loading="lazy"
              decoding="async"
              className="mx-auto aspect-[9/16] w-56 rounded-lg object-cover shadow-xl ring-2 ring-gold/60 md:w-full"
            />
          </picture>
          <div className="md:col-span-5">
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

          <div className="rounded-lg border border-border bg-cream p-6 sm:p-8 md:col-span-3">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
              <MapPin className="h-3.5 w-3.5" /> Address
            </div>
            <div className="font-display text-lg leading-relaxed text-forest-deep">
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


      <section className="container-page py-16">
        <SectionHeading eyebrow="FAQ" title="About TARAON GLOBAL - questions we get" />
        <div className="mt-6 max-w-3xl">
          <FAQ items={ABOUT_FAQS} />
        </div>
      </section>

      <RelatedLinks
        eyebrow="Our products"
        title="What TARAON GLOBAL supplies"
        items={[
          { to: "/products/super-potassium-shiny-flakes-98", title: "Super Potassium Shiny Flakes 98%", desc: "Flagship potassium humate flakes for farmers and dealers." },
          { to: "/products/super-f-humate-big-shiny-flakes", title: "Super F Humate Big Shiny Flakes", desc: "Big flake grade built for bulk buyers and blenders." },
          { to: "/products/glycine", title: "Glycine (Amino Acid)", desc: "99% purity Glycine, bulk supply for agri and industry." },
          { to: "/products/vigora", title: "Vigora Plant Biostimulant", desc: "Water soluble powder biostimulant for Indian crops." },
          { to: "/applications", title: "How the products are used", desc: "Soil, drip, fertigation, foliar and NPK blending in the field." },
          { to: "/contact", title: "Talk to Rajesh", desc: "WhatsApp, call or email for pricing and dispatch." },
        ]}
      />

      <CTABand
        title="Have a question you'd rather ask a person?"
        subtitle="Send us a note or call Rajesh direct. Same-day replies most days."
      />
    </>
  );
}
