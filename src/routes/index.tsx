import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Package,
  Droplets,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import heroImg from "@/assets/hero-flakes.jpg";
import productBigImg from "@/assets/product-big-flakes.jpg";
import fieldImg from "@/assets/applications-field.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABand } from "@/components/site/CTABand";
import { CountUp } from "@/components/site/CountUp";
import { IndiaMapCoverage } from "@/components/site/IndiaMapCoverage";
import { FAQ } from "@/components/site/FAQ";


const HOME_FAQS = [
  {
    q: "What is potassium humate and what is it used for?",
    a: "Potassium humate is a soil conditioner and plant growth support input made from natural humic substances (leonardite, lignite or oxidised brown coal) reacted with potassium hydroxide. Farmers, dealers and fertilizer companies use it to improve soil structure, root growth, nutrient uptake and fertiliser efficiency across field crops, vegetables, fruit and plantation crops.",
  },
  {
    q: "What is the price of potassium humate shiny flakes in India?",
    a: "TARAON GLOBAL supplies potassium humate shiny flakes in a standard 25 Kgs pack with bulk and dealer pricing on request. Rates depend on quantity, destination and current stock. Call Rajesh Kumar Trivedi on +91 63591 93666 or send your quantity through the contact page for a same-day quote.",
  },
  {
    q: "What is the 25 kg price and pack details?",
    a: "Everything ships in the same 25 Kgs kraft bag - the standard pack for farmers, dealers and distributors. Batch numbers are printed on every bag and a current-batch COA is available on request. Quotations for 25 kg, half-tonne, tonne and container quantities are available.",
  },
  {
    q: "What are the main humic acid fertilizer uses?",
    a: "Humic acid fertilizer is used in soil application, drip irrigation, fertigation, foliar spray and NPK blending. It helps soil hold water and nutrients so the plant can actually use what you are feeding it, and supports microbial activity around the root zone.",
  },
  {
    q: "Do you supply potassium humate across India?",
    a: "Yes. We dispatch from our Ahmedabad warehouse to buyers across Gujarat and every Indian state and union territory. Dealer, distributor and fertilizer-company orders are handled from the same location.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Potassium Humate Fertilizer Supplier in India | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "TARAON GLOBAL is an Ahmedabad based trading company supplying 98% potassium humate shiny flakes to farmers, dealers and distributors. 25 Kgs packs, shipped across India.",
      },
      { property: "og:title", content: "Potassium Humate Fertilizer Supplier in India | TARAON GLOBAL" },
      {
        property: "og:description",
        content:
          "Trading company supplying potassium humate shiny flakes. Farmers use it. Dealers stock it. Distributors move it in bulk.",
      },
      { property: "og:url", content: "https://taraonglobal.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
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
      {/* HERO — framed grid + data overlay */}
      <section className="relative overflow-hidden">
        <div className="container-page py-8 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 border border-forest-deep/10 bg-card/50 lg:grid-cols-12"
          >
            {/* LEFT — Headline column */}
            <div className="flex flex-col justify-between border-b border-forest-deep/10 p-6 sm:p-10 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-14">
              <div>
                <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-px w-8 bg-gold" /> Since day one, one product done right
                </div>
                <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl lg:text-[4.25rem]">
                  Potassium Humate That Actually{" "}
                  <span className="italic font-normal text-gold">Dissolves</span>{" "}
                  the Way It Should
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                  TARAON GLOBAL is an{" "}
                  <Link to="/about" className="underline decoration-gold/60 underline-offset-4 hover:text-forest-deep">
                    Ahmedabad based trading company
                  </Link>{" "}
                  supplying 98% potassium humate shiny flakes derived from natural
                  leonardite, lignite or oxidised brown coal. Rich in humic acid,
                  fulvic acid and potassium. Built for soil that needs to work harder.
                </p>
                <p className="mt-3 max-w-xl text-ink/60">
                  Farmers use it in{" "}
                  <Link to="/applications" className="underline decoration-gold/60 underline-offset-4 hover:text-forest-deep">
                    drip irrigation and fertigation
                  </Link>
                  . Dealers stock it. Distributors move it in bulk across India.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="group inline-flex min-h-11 items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
                  >
                    Request Bulk Price
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href="https://wa.me/916359193666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-medium text-forest-deep transition-colors hover:border-gold hover:text-forest hover:bg-gold/10"
                  >
                    <MessageCircle className="h-4 w-4" /> Talk on WhatsApp
                  </a>
                </div>
              </div>

              {/* Spec strip */}
              <div className="mt-14 grid grid-cols-2 gap-6 border-t border-forest-deep/10 pt-6 sm:grid-cols-4">
                {[
                  { k: "98%", v: "Water soluble" },
                  { k: "55-60%", v: "Humic acid" },
                  { k: "25 Kg", v: "Standard pack" },
                  { k: "India", v: "Wide supply" },
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

            {/* RIGHT — Framed visual + data card */}
            <div className="relative min-h-[380px] overflow-hidden bg-forest-deep lg:col-span-5 lg:min-h-0">
              <img
                src={heroImg}
                alt="Black shiny potassium humate flakes in warm golden light"
                width={1200}
                height={1600}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity"
              />
              {/* Gold frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 border border-gold/30"
              />
              {/* Data overlay card */}
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
                  Premium leonardite-sourced flakes, numbered and COA-backed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card" aria-label="Product guarantees">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Package, label: "25 Kgs standard pack" },
            { icon: Droplets, label: "98% water soluble" },
            { icon: BadgeCheck, label: "Batch tested, batch numbered" },
            { icon: MapPin, label: "Ahmedabad based, India wide supply" },
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

      {/* THE TWO PRODUCTS */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Our range"
          title="Two Products. One Standard."
          intro="We don't stock twenty products with small differences. We stand behind two, and we supply them right."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <ProductCard
            image={heroImg}
            name="Super Potassium Shiny Flakes 98%"
            desc="Black shiny flakes. 98% purity, 55 to 60% humic acid. Built for soil, drip, fertigation and foliar spray."
            to="/products/super-potassium-shiny-flakes-98"
          />
          <ProductCard
            image={productBigImg}
            name="Super F Humate Big Shiny Flakes"
            desc="Same strength, bigger flake. Made for dealers who move stock fast."
            to="/products/super-f-humate-big-shiny-flakes"
          />
        </div>
      </section>

      {/* WHY HUMATE */}
      <section className="bg-forest-deep py-20 text-cream">
        <div className="container-page grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> Why humate, why now
            </div>
            <h2 className="font-display text-4xl leading-tight text-cream">
              Soil Gets Tired Too
            </h2>
            <p className="mt-5 text-cream/80">
              Years of chemical fertilizer without a break leaves soil weaker. It holds
              less water. It feeds roots less. Humic acid brings some of that back.
            </p>
            <p className="mt-3 text-cream/60">
              This is not a magic fix. It is a proven input that fertilizer formulators
              and farmers have used for years. We just make it well.
            </p>
          </div>
          <ul className="grid gap-3">
            {[
              "Better soil structure",
              "Roots that go deeper",
              "Fertilizer that actually gets used, not wasted",
              "More microbe activity in the soil",
              "Crops that hold up under stress",
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

      {/* WHERE IT WORKS */}
      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="relative order-2 md:order-1">
            <img
              src={fieldImg}
              alt="Deep plant roots in fertile soil under a crop row"
              width={1600}
              height={1000}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-lg object-cover shadow-xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <SectionHeading
              eyebrow="Where it works"
              title="From the Field to the Drip Line"
            />
            <dl className="mt-8 grid gap-5">
              {[
                ["Soil Application", "Mix it in before or during the season."],
                ["Drip Irrigation", "Dissolves fast, no clogging mess."],
                ["Fertigation", "Fits straight into your nutrient schedule."],
                ["Foliar Spray", "Use as advised for your crop stage."],
                ["Fertilizer Blending", "Mixes clean with NPK and organic inputs."],
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

      {/* INDIA COVERAGE MAP */}
      <IndiaMapCoverage />

      {/* WHY BUYERS STAY */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Why buyers stay"
          title="No Guesswork on What You're Buying"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Real spec sheet, not a marketing sheet",
            "Batch numbers on every bag",
            "25 Kgs standard pack, consistent batch to batch",
            "One person answers the phone. His name is Rajesh.",
          ].map((t, i) => (
            <div
              key={t}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
            >
              <div className="mb-4 font-display text-3xl text-gold">
                0{i + 1}
              </div>
              <p className="text-ink/85">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Potassium humate price, pack and use questions"
        />
        <div className="mt-6 max-w-3xl">
          <FAQ items={HOME_FAQS} />
        </div>
      </section>

      <CTABand
        title="Ready to Order or Just Have Questions?"
        subtitle="Send your product and quantity. You'll get a real answer, not a bot reply."
      />
    </>
  );
}

function ProductCard({
  image,
  name,
  desc,
  to,
}: {
  image: string;
  name: string;
  desc: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[5/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-forest-deep">{name}</h3>
        <p className="mt-2 text-ink/70">{desc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors group-hover:text-gold">
          See the product <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
