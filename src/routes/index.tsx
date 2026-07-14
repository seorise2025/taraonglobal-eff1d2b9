import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Package,
  Droplets,
  BadgeCheck,
  MapPin,
  Phone,
} from "lucide-react";
import heroImg from "@/assets/hero-flakes.jpg?w=640;960;1280&format=webp&as=srcset";
import heroImgFallback from "@/assets/hero-flakes.jpg?w=960&format=webp";
import productBigImg from "@/assets/product-big-flakes.jpg?w=640;960&format=webp&as=srcset";
import productBigImgFallback from "@/assets/product-big-flakes.jpg?w=640&format=webp";
import heroFlakes640 from "@/assets/hero-flakes.jpg?w=640&format=webp";
import fieldImg from "@/assets/applications-field.jpg?w=640;960;1280&format=webp&as=srcset";
import fieldImgFallback from "@/assets/applications-field.jpg?w=960&format=webp";
import glycineImg from "@/assets/glycine-pack.jpg.asset.json";
import vigoraImg from "@/assets/vigora-bio-stimulant.jpg.asset.json";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABand } from "@/components/site/CTABand";
import { CountUp } from "@/components/site/CountUp";
import { IndiaMapCoverage } from "@/components/site/IndiaMapCoverage";
import { FAQ } from "@/components/site/FAQ";
import { buildEmailHref, buildWaHref } from "@/lib/inquiry";
import { trackEmail, trackWhatsApp } from "@/lib/analytics";


const HOME_FAQS = [
  {
    q: "What is potassium humate used for?",
    a: "Potassium humate is commonly used to support soil condition, nutrient use efficiency, root development, and crop management across application methods such as soil use, drip irrigation, fertigation, and foliar spray. Farmers, dealers, distributors, and fertiliser blenders use it as a dependable soil conditioning input.",
  },
  {
    q: "Do you supply only potassium humate?",
    a: "No. Potassium humate is the lead product line, but TARAON GLOBAL also supplies selected products such as Glycine and Vigora plant biostimulant as part of a focused trading range for buyers who prefer sourcing multiple agri inputs from one responsive team.",
  },
  {
    q: "Do you supply across India?",
    a: "Yes. TARAON GLOBAL dispatches from Ahmedabad, Gujarat to buyers across every Indian state and union territory. Orders from farmer groups, dealers, distributors, and formulation buyers are handled from the same location.",
  },
  {
    q: "How can I request price and packing details?",
    a: "Send your product name, quantity, and delivery city by WhatsApp, phone, contact form, or email. You get a direct reply from the sales team with price, packing, and dispatch details, not an automated response.",
  },
  {
    q: "What is the standard pack size?",
    a: "Every product ships in a standard 25 Kgs pack with batch numbers printed on every bag. Current batch COA is available on request. Quotations for 25 Kg, half tonne, tonne and container quantities are available.",
  },
];

const CANONICAL = "https://taraonglobal.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TARAON GLOBAL | Potassium Humate and Agri Input Supplier in India" },
      {
        name: "description",
        content:
          "Ahmedabad based trading company supplying potassium humate flakes, Glycine, and plant biostimulants with clear specs, standard 25 Kgs packing, and bulk supply across India.",
      },
      { name: "keywords", content: "potassium humate supplier India, potassium humate flakes Ahmedabad, humic acid fertilizer supplier, agri input trading company, glycine supplier India, plant biostimulant powder, bulk humate 25 kg" },
      { property: "og:title", content: "TARAON GLOBAL | Potassium Humate and Agri Input Supplier in India" },
      {
        property: "og:description",
        content:
          "Ahmedabad based trading company supplying potassium humate, Glycine, and plant biostimulants. Clear specs, 25 Kgs packing, India wide dispatch.",
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
                  <span className="h-px w-8 bg-gold" /> Ahmedabad based agri input trading company
                </div>
                <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl lg:text-[4.25rem]">
                  Potassium Humate Led Supply for India's{" "}
                  <span className="italic font-normal text-gold">Agri Trade</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                  TARAON GLOBAL is a trading company based in{" "}
                  <Link to="/about" className="underline decoration-gold/60 underline-offset-4 hover:text-forest-deep">
                    Ahmedabad, Gujarat
                  </Link>
                  , supplying potassium humate flakes and selected agri input products for farmers, dealers, distributors, and bulk buyers across India.
                </p>
                <p className="mt-3 max-w-xl text-ink/60">
                  We focus on clear specifications, practical packing, and direct response when you need price, dispatch, or product details.
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
                  { k: "98%", v: "Water soluble" },
                  { k: "25 Kg", v: "Standard pack" },
                  { k: "Batch", v: "Tested supply" },
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
                alt="Black shiny potassium humate flakes supplied by TARAON GLOBAL Ahmedabad"
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
                    Batch tested
                  </span>
                </div>
                <div className="my-3 h-px w-16 bg-forest-deep/15" />
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  Humic acid
                </div>
                <div className="font-display text-3xl leading-none text-forest-deep">
                  <CountUp to={60} suffix="%" />
                </div>
                <p className="mt-3 text-[11px] leading-snug text-ink/60">
                  Standard 25 Kgs pack, batch numbered, COA on request.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card" aria-label="Supply guarantees">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Droplets, label: "98% water soluble" },
            { icon: Package, label: "25 Kgs standard pack" },
            { icon: BadgeCheck, label: "Batch tested supply" },
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

      {/* INTRO */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            A focused product range, supplied with clarity
          </div>
          <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl">
            Built for buyers who want dependable quality and straight answers
          </h2>
          <p className="mt-5 text-ink/75">
            We are not a giant catalog company trying to sell everything. TARAON GLOBAL supplies a focused range of products where buyers need dependable quality, straightforward specifications, and clear communication before ordering.
          </p>
          <p className="mt-3 text-ink/60">
            Potassium humate is our lead product line, supported by selected products such as Glycine and Vigora plant biostimulant for buyers who want practical sourcing from one responsive team.
          </p>
        </div>
      </section>

      {/* PRODUCT RANGE */}
      <section className="container-page pb-20">
        <SectionHeading
          eyebrow="Products we supply"
          title="High Demand Agri Inputs for Bulk Trade"
          intro="Our range is built around agri input products for bulk trade, field use, blending, and distribution. Clear specs, 25 Kgs packing, direct ordering from TARAON GLOBAL."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <ProductCard
            image={heroImgFallback}
            srcSet={heroImg}
            sizes="(min-width: 768px) 48vw, 100vw"
            name="Super Potassium Shiny Flakes 98%"
            desc="Black shiny potassium humate flakes with 98% water solubility and 55 to 60% humic acid. Suitable for soil application, drip irrigation, fertigation, foliar spray, and fertiliser blending."
            to="/products/super-potassium-shiny-flakes-98"
            orderSlug="super-potassium-shiny-flakes-98"
          />
          <ProductCard
            image={productBigImgFallback}
            srcSet={productBigImg}
            sizes="(min-width: 768px) 48vw, 100vw"
            name="Super F Humate Big Shiny Flakes"
            desc="A larger flake humate option with the same core humate strength in a different physical form. Built for regular stock movement and bulk trading."
            to="/products/super-f-humate-big-shiny-flakes"
            orderSlug="super-f-humate-big-shiny-flakes"
          />
          <ProductCard
            image={glycineImg.url}
            sizes="(min-width: 768px) 48vw, 100vw"
            name="Glycine"
            imageAlt="High purity Glycine bulk supply by TARAON GLOBAL"
            desc="High purity Glycine supplied for multiple industries including agriculture, food, pharma, and daily chemical use. A useful adjacent product for buyers sourcing across categories."
            to="/products/glycine"
            orderSlug="glycine"
          />
          <ProductCard
            image={vigoraImg.url}
            sizes="(min-width: 768px) 48vw, 100vw"
            name="Vigora Plant Biostimulant"
            imageAlt="Vigora water soluble powder plant biostimulant 25 Kgs bag by TARAON GLOBAL"
            desc="Water soluble plant biostimulant powder supplied for crop support where buyers want better flowering, root strength, and overall crop quality."
            to="/products/vigora"
            orderSlug="vigora"
          />
        </div>
      </section>

      {/* WHY BUYERS CHOOSE US */}
      <section className="bg-forest-deep py-20 text-cream">
        <div className="container-page grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> Why buyers work with us
            </div>
            <h2 className="font-display text-4xl leading-tight text-cream">
              Straight Answers, Standard Packs, Repeat Supply
            </h2>
            <p className="mt-5 text-cream/80">
              Our business is built around practical movement of stock, quick response, and repeat supply confidence rather than sales talk.
            </p>
            <p className="mt-3 text-cream/60">
              The company is led by Rajesh Kumar Trivedi, with over 20 years of experience in this industry. One person answers the phone, and the answer is the same one you get by email.
            </p>
          </div>
          <ul className="grid gap-3">
            {[
              "Clear specifications before order, so you know what you are buying",
              "Batch tested product supply for better confidence",
              "Standard 25 Kgs packing built for practical bulk movement",
              "Direct communication on price, packing, and dispatch",
              "Ahmedabad based supply with India wide buyer support",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-sm border border-cream/10 bg-forest/40 px-5 py-4"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                <span className="text-cream/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="relative order-2 md:order-1">
            <img
              src={fieldImgFallback}
              srcSet={fieldImg}
              sizes="(min-width: 768px) 55vw, 100vw"
              alt="Potassium humate application in Indian farm field, drip irrigation and foliar use"
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full rounded-lg object-cover shadow-xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <SectionHeading
              eyebrow="Where our lead products fit"
              title="Clean Solubility, Consistent Handling"
              intro="Our potassium humate products are commonly supplied for practical farm and blending use cases where clean solubility and consistent handling matter."
            />
            <dl className="mt-8 grid gap-5">
              {[
                ["Soil Application", "Mix in before or during the season."],
                ["Drip Irrigation", "Dissolves fast without clogging."],
                ["Fertigation", "Fits into your existing nutrient schedule."],
                ["Foliar Spray", "Use as advised for your crop stage."],
                ["Fertiliser Blending", "Blends clean with NPK and organic inputs."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="flex gap-4 border-b border-border pb-4 last:border-0"
                >
                  <dt className="w-36 flex-none font-display text-forest-deep">{t}</dt>
                  <dd className="text-ink/75">{d}</dd>
                </div>
              ))}
            </dl>
            <Link
              to="/applications"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-gold"
            >
              See all applications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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

function ProductCard({
  image,
  srcSet,
  sizes,
  name,
  imageAlt,
  desc,
  to,
  orderSlug,
}: {
  image: string;
  srcSet?: string;
  sizes?: string;
  name: string;
  imageAlt?: string;
  desc: string;
  to: string;
  orderSlug: "super-potassium-shiny-flakes-98" | "super-f-humate-big-shiny-flakes" | "glycine" | "vigora";
}) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link to={to} className="block aspect-[5/3] overflow-hidden">
        <img
          src={image}
          srcSet={srcSet}
          sizes={sizes}
          alt={imageAlt ?? name}
          width={960}
          height={576}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <h3 className="font-display text-2xl text-forest-deep">
          <Link to={to} className="hover:text-gold">{name}</Link>
        </h3>
        <p className="mt-2 text-ink/70">{desc}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to="/order/$slug"
            params={{ slug: orderSlug }}
            className="inline-flex items-center gap-2 rounded-sm bg-forest-deep px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
          >
            Place Order <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={to}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors hover:text-gold"
          >
            See the product <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
