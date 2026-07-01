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
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-10 py-14 md:grid-cols-[1.05fr_1fr] md:items-center md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> Since day one, one product done right
            </div>
            <h1 className="font-display text-4xl leading-[1.05] text-forest-deep sm:text-5xl md:text-[3.8rem]">
              Potassium Humate That Actually Dissolves the Way It Should
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">
              TARAON GLOBAL is an Ahmedabad based trading company supplying 98%
              potassium humate shiny flakes derived from natural leonardite, lignite
              or oxidised brown coal. Rich in humic acid, fulvic acid and potassium.
              Built for soil that needs to work harder.
            </p>
            <p className="mt-3 text-ink/60">
              Farmers use it. Dealers stock it. Distributors move it in bulk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
              >
                Request Bulk Price
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://wa.me/916359193666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-medium text-forest-deep transition-colors hover:border-gold hover:text-forest hover:bg-gold/10"
              >
                <MessageCircle className="h-4 w-4" /> Talk on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-gold/25 via-transparent to-forest/20 blur-2xl" />
            <img
              src={heroImg}
              alt="Black shiny potassium humate flakes in warm golden light"
              width={1600}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-sm border border-gold/40 bg-cream px-5 py-3 shadow-lg sm:block">
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Humic acid</div>
              <div className="font-display text-2xl text-forest-deep">
                <CountUp to={60} suffix="%" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Package, label: "25 Kgs standard pack" },
            { icon: Droplets, label: "98% water soluble" },
            { icon: BadgeCheck, label: "Batch tested, batch numbered" },
            { icon: MapPin, label: "Ahmedabad based, India wide supply" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-sm bg-secondary text-forest-deep">
                <Icon className="h-5 w-5" />
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
