import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Package,
  
  BadgeCheck,
  MapPin,
  Phone,
  FileText,
  ClipboardCheck,
  Truck,
  Handshake,
  Users,
  Warehouse,
  Factory,
  Sprout,
  Ship,
} from "lucide-react";
import heroImg from "@/assets/hero-flakes.jpg?w=640;960;1280&format=webp&as=srcset";
import heroImgFallback from "@/assets/hero-flakes.jpg?w=960&format=webp";
import heroFlakes640 from "@/assets/hero-flakes.jpg?w=640&format=webp";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABand } from "@/components/site/CTABand";
import { CountUp } from "@/components/site/CountUp";
import { IndiaMapCoverage } from "@/components/site/IndiaMapCoverage";
import { FAQ } from "@/components/site/FAQ";
import { buildEmailHref, buildWaHref } from "@/lib/inquiry";
import { trackEmail, trackWhatsApp } from "@/lib/analytics";


const HOME_FAQS = [
  {
    q: "What kind of company is TARAON GLOBAL?",
    a: "TARAON GLOBAL is an Ahmedabad based agri input trading company. We source and supply potassium humate flakes, Glycine, and Vigora plant biostimulant to farmers, dealers, distributors, formulators, and bulk buyers across India. We are a trading business, not a manufacturer.",
  },
  {
    q: "Who runs the business?",
    a: "The company is led by Rajesh Kumar Trivedi, who has over 20 years of hands on experience in this industry. Sales enquiries are handled directly by the leadership, which is why buyers get straight answers on price, packing, and dispatch instead of routed responses.",
  },
  {
    q: "Why should a buyer use a sourcing desk instead of chasing suppliers individually?",
    a: "One point of contact, one set of standards, and one line of accountability. Instead of comparing scattered offers and inconsistent packing, buyers get a consolidated quote, batch tested product, and coordinated dispatch from a single Ahmedabad based team.",
  },
  {
    q: "Do you supply across India?",
    a: "Yes. TARAON GLOBAL dispatches from Ahmedabad, Gujarat to buyers in every Indian state and union territory. Farmer groups, dealers, distributors, and formulation buyers are handled from the same location.",
  },
  {
    q: "How do I get a price?",
    a: "Send your product name, quantity, and delivery city by WhatsApp, phone, contact form, or email. You get a direct reply from the sales team with current price, packing options, and dispatch timelines.",
  },
];

const CANONICAL = "https://taraonglobal.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TARAON GLOBAL | Ahmedabad Sourcing Desk for Bulk Agri Inputs in India" },
      {
        name: "description",
        content:
          "TARAON GLOBAL is an Ahmedabad based agri input trading company led by Rajesh Kumar Trivedi. One sourcing desk for potassium humate, Glycine, and biostimulants, supplied across India.",
      },
      { name: "keywords", content: "agri input sourcing India, potassium humate supplier Ahmedabad, bulk agri input trading company, humate biostimulant supplier India, Rajesh Kumar Trivedi TARAON GLOBAL, humate exporter India" },
      { property: "og:title", content: "TARAON GLOBAL | Ahmedabad Sourcing Desk for Bulk Agri Inputs in India" },
      {
        property: "og:description",
        content:
          "One responsive Ahmedabad based sourcing desk for potassium humate, Glycine, and plant biostimulants. Batch tested supply, 25 Kgs packing, India wide dispatch.",
      },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      {
        rel: "preload",
        as: "image",
        href: heroFlakes640,
        imagesrcset: heroImg,
        imagesizes: "(min-width: 1024px) 42vw, 100vw",
        fetchpriority: "high",
      } as unknown as Record<string, string>,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page py-8 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 border border-forest-deep/10 bg-card/50 lg:grid-cols-12"
          >
            {/* LEFT */}
            <div className="flex flex-col justify-between border-b border-forest-deep/10 p-6 sm:p-10 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-14">
              <div>
                <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-8 bg-gold" /> An Ahmedabad based agri input trading company
                </div>
                <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl lg:text-[4.25rem]">
                  The Sourcing Desk Serious{" "}
                  <span className="italic font-normal text-gold">Agri Buyers</span>{" "}
                  Rely On
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                  TARAON GLOBAL is a trading company based in{" "}
                  <Link to="/about" className="underline decoration-gold/60 underline-offset-4 hover:text-forest-deep">
                    Ahmedabad, Gujarat
                  </Link>
                  , led by Rajesh Kumar Trivedi with over 20 years in the agri input trade. One responsive team, one point of contact, and one set of standards for every enquiry.
                </p>
                <p className="mt-3 max-w-xl text-ink/60">
                  Buyers come to us when they want straight answers on price, packing, and dispatch instead of chasing scattered suppliers.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="group inline-flex min-h-11 items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-gold hover:text-forest-deep"
                  >
                    Request Bulk Price
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={buildWaHref("general")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsApp(undefined, "home_hero")}
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Sales
                  </a>
                  <a
                    href={buildEmailHref("general")}
                    onClick={() => trackEmail(undefined, "home_hero")}
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
                  >
                    <Mail className="h-4 w-4" /> Email for Quote
                  </a>
                </div>
              </div>

              {/* Trust strip */}
              <div className="mt-14 grid grid-cols-2 gap-6 border-t border-forest-deep/10 pt-6 sm:grid-cols-4">
                {[
                  { k: "20+ yrs", v: "Trade experience" },
                  { k: "1 desk", v: "Single point of contact" },
                  { k: "25 Kg", v: "Standard packing" },
                  { k: "India", v: "Wide dispatch" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-2xl text-forest-deep">{s.k}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT visual */}
            <div className="relative min-h-[380px] overflow-hidden bg-forest-deep lg:col-span-5 lg:min-h-0">
              <img
                src={heroImgFallback}
                srcSet={heroImg}
                sizes="(min-width: 1024px) 42vw, 100vw"
                alt="TARAON GLOBAL Ahmedabad sourcing desk for bulk agri inputs across India"
                width={1200}
                height={1600}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity dark:opacity-90 dark:mix-blend-normal"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 border border-gold/30"
              />
              <div className="absolute bottom-0 right-0 max-w-[16rem] border-l border-t border-forest-deep/10 bg-cream p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest-deep">
                    Direct sales
                  </span>
                </div>
                <div className="my-3 h-px w-16 bg-forest-deep/15" />
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  Reply time
                </div>
                <div className="font-display text-3xl leading-none text-forest-deep">
                  <CountUp to={24} suffix=" hrs" />
                </div>
                <p className="mt-3 text-[11px] leading-snug text-ink/60">
                  Enquiries handled by the leadership team, not a call queue.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card" aria-label="How we operate">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Handshake, label: "Direct dealing, no middle layers" },
            { icon: BadgeCheck, label: "Batch tested product supply" },
            { icon: Package, label: "25 Kgs standard packing" },
            { icon: MapPin, label: "Ahmedabad to India wide dispatch" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-secondary text-forest-deep">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-forest-deep">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* POSITIONING: The sourcing problem we solve */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Why a sourcing desk
          </div>
          <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl">
            Buying agri inputs shouldn't feel like a scavenger hunt
          </h2>
          <p className="mt-5 text-ink/75">
            Most bulk buyers waste weeks pinging five suppliers, comparing inconsistent specs, and still not knowing what will land on the truck. TARAON GLOBAL removes that friction.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Scattered suppliers, no accountability",
              d: "Different offers, different specs, different packing standards. We consolidate the sourcing so one team is answerable for the delivered product.",
            },
            {
              n: "02",
              t: "Unclear specifications before order",
              d: "You get the actual spec sheet, batch identity, and pack detail up front. No surprises at the warehouse.",
            },
            {
              n: "03",
              t: "Slow, routed responses",
              d: "Enquiries land with the leadership team. Price, availability, and dispatch confirmation come back the same day in most cases.",
            },
          ].map((item) => (
            <div
              key={item.n}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-gold/60"
            >
              <div className="font-display text-3xl text-gold">{item.n}</div>
              <h3 className="mt-3 font-display text-xl text-forest-deep">{item.t}</h3>
              <p className="mt-2 text-sm text-ink/75">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-forest-deep py-20 text-cream">
        <div className="container-page">
          <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> How we work
          </div>
          <h2 className="font-display text-4xl leading-tight text-cream">
            From enquiry to dispatch, in four clean steps
          </h2>
          <p className="mt-4 max-w-2xl text-cream/70">
            No lengthy onboarding, no chasing. The process is deliberately short because buyers want stock moving, not paperwork stacking.
          </p>

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FileText,
                t: "Send your enquiry",
                d: "Share the product, quantity, and delivery city by WhatsApp, phone, form, or email.",
              },
              {
                icon: ClipboardCheck,
                t: "Get spec and price",
                d: "You receive the current spec sheet, packing detail, and a firm quotation from the sales team.",
              },
              {
                icon: BadgeCheck,
                t: "Confirm with COA",
                d: "Batch identity and current batch COA are shared on request before you commit to the order.",
              },
              {
                icon: Truck,
                t: "Dispatch and update",
                d: "Order is dispatched from the Ahmedabad warehouse with tracking and delivery updates end to end.",
              },
            ].map(({ icon: Icon, t, d }, i) => (
              <li
                key={t}
                className="relative rounded-lg border border-cream/10 bg-forest/40 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-sm bg-gold text-forest-deep">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                    Step 0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg text-cream">{t}</h3>
                <p className="mt-2 text-sm text-cream/75">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BUYER TYPES WE SERVE */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Who we serve"
          title="Built around how bulk buyers actually work"
          intro="Every buyer has a different sourcing rhythm. The desk adapts to yours, whether you buy monthly, seasonally, or in container loads."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Sprout,
              t: "Farmer groups and FPOs",
              d: "Consolidated humate and biostimulant supply for cluster demand and seasonal purchases.",
            },
            {
              icon: Warehouse,
              t: "Dealers and stockists",
              d: "Regular refills with consistent packing and predictable dispatch windows.",
            },
            {
              icon: Users,
              t: "Distributors",
              d: "State and regional distributors sourcing multiple lines from one accountable desk.",
            },
            {
              icon: Factory,
              t: "Fertiliser formulators",
              d: "Blending grade humate and Glycine with batch identity for formulation consistency.",
            },
            {
              icon: Ship,
              t: "Exporters and re-packers",
              d: "Bulk supply for onward export markets with standard 25 Kgs packing and documentation.",
            },
            {
              icon: Handshake,
              t: "Trading partners",
              d: "Long term supply arrangements built on repeat orders and transparent pricing.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <article
              key={t}
              className="rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
            >
              <span className="grid h-10 w-10 place-items-center rounded-sm bg-secondary text-forest-deep">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl text-forest-deep">{t}</h3>
              <p className="mt-2 text-sm text-ink/75">{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* LEADERSHIP / EEAT */}
      <section className="container-page pb-20">
        <div className="grid gap-10 rounded-lg border border-border bg-card p-8 md:grid-cols-[1fr_1.4fr] md:items-center md:p-12">
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Led by the founder
            </div>
            <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl">
              Rajesh Kumar Trivedi
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-forest">
              Founder, TARAON GLOBAL
            </p>
            <p className="mt-4 text-ink/75">
              Over 20 years in the agri input trade across sourcing, quality, and buyer relationships. Sales enquiries come to him directly, which is why buyers get straight commercial answers instead of layered responses.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+916359193666"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-5 py-3 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
              >
                <Phone className="h-4 w-4 text-gold" /> +91 63591 93666
              </a>
              <Link
                to="/about"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-forest hover:text-gold"
              >
                Read the company story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { k: "20+ years", v: "Agri input trade experience" },
              { k: "Direct sales", v: "Handled by leadership" },
              { k: "Ahmedabad", v: "Base of operations" },
              { k: "India wide", v: "Buyer network" },
            ].map((s) => (
              <li key={s.v} className="rounded-sm border border-border bg-background p-4">
                <div className="font-display text-xl text-forest-deep">{s.k}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                  {s.v}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRODUCT RANGE AT A GLANCE (links only) */}
      <section className="container-page pb-20">
        <div className="rounded-lg border border-border bg-card p-8 sm:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                What the desk supplies
              </div>
              <h2 className="font-display text-2xl text-forest-deep sm:text-3xl">
                A focused range, full details on each product page
              </h2>
            </div>
            <Link
              to="/applications"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-gold"
            >
              See applications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Super Potassium Shiny Flakes 98%", to: "/products/super-potassium-shiny-flakes-98" as const },
              { name: "Super F Humate Big Shiny Flakes", to: "/products/super-f-humate-big-shiny-flakes" as const },
              { name: "Glycine", to: "/products/glycine" as const },
              { name: "Vigora Plant Biostimulant", to: "/products/vigora" as const },
            ].map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="flex items-center justify-between gap-3 rounded-sm border border-border bg-background px-4 py-3 text-sm font-medium text-forest-deep transition-colors hover:border-gold hover:text-gold"
                >
                  <span>{p.name}</span>
                  <ArrowRight className="h-4 w-4 text-gold" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/60">
            Specifications, packing, pricing context, and order buttons live on each product page.
          </p>
        </div>
      </section>

      {/* INDIA MAP */}
      <IndiaMapCoverage />

      {/* SALES SECTION */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 text-center sm:p-12">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Direct sales support
          </div>
          <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl">
            Need Price, Packing, or Dispatch Details?
          </h2>
          <p className="mt-4 text-ink/75">
            Send the product name, quantity, and delivery location. You get a direct reply from the sales team, not an automated answer.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-semibold text-cream hover:bg-gold hover:text-forest-deep"
            >
              Request Bulk Price <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildWaHref("general")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp(undefined, "home_sales")}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a
              href={buildEmailHref("general")}
              onClick={() => trackEmail(undefined, "home_sales")}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
            >
              <Mail className="h-4 w-4" /> Email Your Requirement
            </a>
          </div>
          <p className="mt-6 inline-flex items-center justify-center gap-2 text-sm text-ink/70">
            <Phone className="h-4 w-4 text-gold" />
            Call Rajesh Kumar Trivedi at{" "}
            <a href="tel:+916359193666" className="font-semibold text-forest-deep hover:text-gold">
              +91 63591 93666
            </a>{" "}
            for direct sales support
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Buyer Questions"
        />
        <div className="mt-6 max-w-3xl">
          <FAQ items={HOME_FAQS} />
        </div>
      </section>

      <CTABand
        title="Ready to Order or Just Have Questions?"
        subtitle="Send your product name, quantity, and city. You get a direct reply from the sales team."
      />
    </>
  );
}
