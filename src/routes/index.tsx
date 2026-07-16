import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  
  Phone,
  Handshake,
  Users,
  Warehouse,
  Factory,
  Sprout,
  Ship,
} from "lucide-react";
import heroWebp from "@/assets/home-hero.jpg?w=640;960;1280&format=webp&as=srcset";
import heroAvif from "@/assets/home-hero.jpg?w=640;960;1280&format=avif&as=srcset";
import heroImgFallback from "@/assets/home-hero.jpg?w=960&format=webp";
import heroFlakes640 from "@/assets/home-hero.jpg?w=640&format=webp";
import rajeshAvif from "@/assets/rajesh-kumar-trivedi.jpg?w=112;224&format=avif&as=srcset";
import rajeshWebp from "@/assets/rajesh-kumar-trivedi.jpg?w=112;224&format=webp&as=srcset";
import rajeshJpg from "@/assets/rajesh-kumar-trivedi.jpg?w=224&format=webp";
import { SectionHeading } from "@/components/site/SectionHeading";

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

const CANONICAL = "https://taraonglobal.com/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TARAON GLOBAL | Ahmedabad Agri Input Sourcing Desk" },
      {
        name: "description",
        content:
          "Ahmedabad based agri input sourcing desk led by Rajesh Kumar Trivedi. Potassium humate, Glycine, and biostimulants supplied across India in 25 Kg packs.",
      },
      { name: "keywords", content: "agri input sourcing India, potassium humate supplier Ahmedabad, bulk agri input trading company, humate biostimulant supplier India, Rajesh Kumar Trivedi TARAON GLOBAL, humate exporter India" },
      { property: "og:title", content: "TARAON GLOBAL | Ahmedabad Agri Input Sourcing Desk" },
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
        imagesrcset: heroWebp,
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
      {/* HERO, editorial */}
      <section className="relative overflow-hidden border-b border-forest-deep/10">
        <div className="container-page grid gap-10 py-12 md:py-20 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >

            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] text-forest-deep sm:text-6xl lg:text-[4.25rem]">
              Precision{" "}
              <span className="italic font-normal text-gold">Sourcing</span> for
              agri inputs.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
              TARAON GLOBAL is an{" "}
              <Link to="/about" className="underline decoration-gold/60 underline-offset-4 hover:text-forest-deep">
                Ahmedabad based
              </Link>{" "}
              trading desk for potassium humate, Glycine, and Vigora plant biostimulant. One responsive team led by Rajesh Kumar Trivedi, 20+ years in the trade.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/contact"
                className="group inline-flex min-h-12 items-center justify-between gap-4 rounded-sm bg-forest-deep px-6 py-4 text-sm font-semibold text-cream transition-colors hover:bg-gold hover:text-forest-deep sm:justify-start"
              >
                Request Bulk Price
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={buildWaHref("general")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp(undefined, "home_hero")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={buildEmailHref("general")}
                onClick={() => trackEmail(undefined, "home_hero")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-4 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </motion.div>

          {/* Right visual, editorial frame */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-forest-deep">
              <picture>
                <source type="image/avif" srcSet={heroAvif} sizes="(min-width: 1024px) 42vw, 100vw" />
                <source type="image/webp" srcSet={heroWebp} sizes="(min-width: 1024px) 42vw, 100vw" />
                <img
                  src={heroImgFallback}
                  alt="Young crop rows at golden hour on rich soil, representing TARAON GLOBAL's supply across India"
                  width={1200}
                  height={1500}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
              <div aria-hidden="true" className="pointer-events-none absolute inset-4 border border-gold/40" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 border border-forest-deep/10 bg-cream p-5 shadow-sm sm:left-auto sm:right-6 sm:max-w-[15rem]">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                Reply time
              </div>
              <div className="mt-1 font-display text-4xl leading-none text-forest-deep">
                <CountUp to={24} suffix=" hrs" />
              </div>
              <p className="mt-2 text-[11px] leading-snug text-ink/60">
                Handled by leadership, not a call queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MATRIX, deep green typographic band */}
      <section className="bg-forest-deep text-cream" aria-label="How we operate">
        <div className="container-page py-4">
          <div className="grid grid-cols-2 divide-x divide-y divide-cream/10 border-y border-cream/10 md:grid-cols-4 md:divide-y-0">
            {[
              { k: "Direct", v: "Dealing, no middle layers" },
              { k: "Tested", v: "Batch verified supply" },
              { k: "25 Kg", v: "Standard packing" },
              { k: "India", v: "Wide dispatch from Ahmedabad" },
            ].map((s, i) => (
              <div key={s.k} className={`p-8 text-center ${i < 2 ? "border-b border-cream/10 md:border-b-0" : ""}`}>
                <div className="font-display text-3xl italic text-gold">{s.k}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cream/70">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM FRAMING, editorial with gold rules */}
      <section className="container-page py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              The sourcing gap
            </div>
            <h2 className="font-display text-4xl italic leading-tight text-forest-deep sm:text-5xl">
              Fragmented supply lists cost buyers time and margin.
            </h2>
            <p className="mt-6 text-ink/75">
              Most bulk buyers waste weeks pinging five suppliers, comparing inconsistent specs, and still not knowing what will land on the truck. TARAON GLOBAL removes that friction with a single accountable desk in Ahmedabad.
            </p>
          </div>
          <div className="space-y-8 lg:col-span-7 lg:pt-4">
            {[
              {
                t: "Inconsistent specifications?",
                d: "You get the actual spec sheet, batch identity, and pack detail before you commit. Current batch COA on request.",
              },
              {
                t: "Slow, routed responses?",
                d: "Enquiries land with the leadership team. Price, availability, and dispatch confirmation come back the same day in most cases.",
              },
              {
                t: "Logistics uncertainty?",
                d: "Dispatched from our Ahmedabad base to every Indian state and union territory, with tracking and delivery updates end to end.",
              },
            ].map((item) => (
              <div key={item.t} className="border-l-2 border-gold pl-5">
                <h3 className="font-display text-xl text-forest-deep">{item.t}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK, subtle band with numbered rhythm */}
      <section className="bg-forest-deep/[0.04] py-20 lg:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              How we work
            </div>
            <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl">
              From enquiry to dispatch, four clean steps.
            </h2>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Requirement", d: "Share product, quantity, and delivery city by WhatsApp, phone, form, or email." },
              { t: "Batch quote", d: "Current spec sheet, packing detail, and a firm quotation from the sales team." },
              { t: "Confirm with COA", d: "Batch identity and current batch COA on request before you commit to the order." },
              { t: "Dispatch and update", d: "Order dispatched from the Ahmedabad warehouse with tracking and delivery updates." },
            ].map((s, i) => (
              <li key={s.t} className="border-t border-forest-deep/15 pt-6">
                <div className="font-display text-3xl italic text-gold">0{i + 1}</div>
                <h3 className="mt-3 font-display text-lg text-forest-deep">{s.t}</h3>
                <p className="mt-2 text-sm text-ink/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BUYER SEGMENTS */}
      <section className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Who we serve"
          title="Built around how bulk buyers actually work"
          intro="Every buyer has a different sourcing rhythm. The desk adapts to yours, whether you buy monthly, seasonally, or in container loads."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Sprout, t: "Farmer groups and FPOs", d: "Consolidated humate and biostimulant supply for cluster demand and seasonal purchases." },
            { icon: Warehouse, t: "Dealers and stockists", d: "Regular refills with consistent packing and predictable dispatch windows." },
            { icon: Users, t: "Distributors", d: "State and regional distributors sourcing multiple lines from one accountable desk." },
            { icon: Factory, t: "Fertiliser formulators", d: "Blending grade humate and Glycine with batch identity for formulation consistency." },
            { icon: Ship, t: "Exporters and re-packers", d: "Bulk supply for onward export markets with standard 25 Kgs packing and documentation." },
            { icon: Handshake, t: "Trading partners", d: "Long term supply arrangements built on repeat orders and transparent pricing." },
          ].map(({ icon: Icon, t, d }) => (
            <article
              key={t}
              className="border-t border-forest-deep/15 pt-6 transition-colors hover:border-gold"
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

      {/* FOUNDER, pull quote */}
      <section className="container-page pb-20 lg:pb-24">
        <div className="grid gap-10 border-y border-forest-deep/15 py-14 md:grid-cols-12 md:gap-14 md:py-20">
          <div className="relative md:col-span-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-1 -top-8 select-none font-display text-8xl italic leading-none text-gold/25"
            >
              &ldquo;
            </div>
            <p className="font-display text-2xl italic leading-snug text-forest-deep sm:text-3xl">
              Two decades in agri inputs taught me one thing. Trust is the only ingredient that cannot be synthesized. Buyers stay because the 100th bag lands exactly like the first.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <picture>
                <source type="image/avif" srcSet={rajeshAvif} sizes="112px" />
                <source type="image/webp" srcSet={rajeshWebp} sizes="112px" />
                <img
                  src={rajeshJpg}
                  alt="Portrait of Rajesh Kumar Trivedi, Founder of TARAON GLOBAL, Ahmedabad based potassium humate supplier with over 20 years of experience in the agri inputs trade"
                  width={112}
                  height={112}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/60"
                />
              </picture>
              <div>
                <p className="font-semibold text-forest-deep">Rajesh Kumar Trivedi</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                  Founder, TARAON GLOBAL. 20+ years experience
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 md:border-l md:border-forest-deep/15 md:pl-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Direct line
            </div>
            <a
              href="tel:+916359193666"
              className="mt-3 flex items-center gap-2 font-display text-2xl text-forest-deep hover:text-gold"
            >
              <Phone className="h-5 w-5 text-gold" /> +91 63591 93666
            </a>
            <p className="mt-4 text-sm text-ink/70">
              Sales enquiries handled by leadership. Straight answers on price, packing, and dispatch.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-gold"
            >
              Read the company story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE, text links only */}
      <section className="container-page pb-20">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              What the desk supplies
            </div>
            <h2 className="font-display text-3xl italic text-forest-deep">
              A focused range.
            </h2>
            <p className="mt-3 text-sm text-ink/70">
              Full specifications, packing, and order buttons live on each product page.
            </p>
            <Link
              to="/applications"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-gold"
            >
              See applications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-forest-deep/10 md:col-span-8">
            {[
              { name: "Super Potassium Shiny Flakes 98%", to: "/products/super-potassium-shiny-flakes-98" as const },
              { name: "Super F Humate Big Shiny Flakes", to: "/products/super-f-humate-big-shiny-flakes" as const },
              { name: "Glycine", to: "/products/glycine" as const },
              { name: "Vigora Plant Biostimulant", to: "/products/vigora" as const },
            ].map((p, i) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="group flex items-center justify-between gap-4 py-5 text-forest-deep hover:text-gold"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm italic text-gold">0{i + 1}</span>
                    <span className="font-display text-lg sm:text-xl">{p.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INDIA MAP */}
      <IndiaMapCoverage />

      {/* FAQ */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Buyer Questions"
        />
        <div className="mt-6 max-w-3xl">
          <FAQ items={HOME_FAQS} />
        </div>
      </section>

      {/* CLOSING CTA BAND, gold */}
      <section className="bg-gold text-forest-deep">
        <div className="container-page py-16 lg:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-forest-deep/70">
                Direct sales support
              </div>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Ready to secure your next batch?
              </h2>
              <p className="mt-4 max-w-lg text-forest-deep/80">
                Send the product name, quantity, and delivery location. You get a direct reply from the sales team, no automated response, no middle layer.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-5">
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-between gap-4 rounded-sm bg-forest-deep px-6 py-4 text-sm font-semibold text-cream transition-transform hover:scale-[1.01]"
              >
                Request Bulk Price <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWaHref("general")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp(undefined, "home_close")}
                className="inline-flex min-h-12 items-center justify-between gap-4 rounded-sm bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-sm"
              >
                WhatsApp <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={buildEmailHref("general")}
                onClick={() => trackEmail(undefined, "home_close")}
                className="inline-flex min-h-12 items-center justify-between gap-4 rounded-sm border border-forest-deep px-6 py-4 text-sm font-semibold text-forest-deep hover:bg-forest-deep hover:text-cream"
              >
                Email <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

