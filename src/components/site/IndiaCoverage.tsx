import { motion } from "motion/react";
import { MapPin, Sprout } from "lucide-react";

export const indiaCoverage = {
  origin: { city: "Ahmedabad", state: "Gujarat" },
  states: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
  unionTerritories: [
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ],
  benefits: [
    "Improves soil structure",
    "Supports strong root growth",
    "Improves nutrient uptake",
    "Supports microbial activity",
    "Improves fertiliser efficiency",
    "Helps healthier crop development",
  ],
} as const;

export function IndiaCoverage() {
  const all = [...indiaCoverage.states, ...indiaCoverage.unionTerritories].sort();

  return (
    <section className="border-y border-border bg-card">
      <div className="container-page py-16 md:py-20">
        <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
          <span className="h-px w-8 bg-gold" /> India coverage
        </div>
        <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl">
          From Ahmedabad to Farms Across India
        </h2>
        <div className="mt-5 max-w-3xl space-y-3 text-ink/75">
          <p>
            Our humate-based products are supplied from Ahmedabad to Gujarat and
            across India. From large farming belts to local growers, Super F
            Humate Big Shiny Flakes and Super Potassium Shiny Flakes 98% support
            better soil structure, stronger root growth, improved nutrient
            uptake, and efficient fertiliser use.
          </p>
          <p className="font-display text-xl text-forest-deep">
            Good soil changes everything.
          </p>
          <p>
            It helps roots grow deeper. It helps plants take in nutrients
            better. It helps farmers get more value from every fertiliser
            application. That is why our products are made available across
            every Indian state and Union Territory.
          </p>
        </div>

        {/* Origin → destinations animation */}
        <div className="mt-10 rounded-lg border border-border bg-cream p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-sm bg-forest-deep px-4 py-2 text-sm font-medium text-cream shadow"
            >
              <MapPin className="h-4 w-4 text-gold" />
              {indiaCoverage.origin.city}, {indiaCoverage.origin.state}
            </motion.span>
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-px bg-gold"
              aria-hidden
            />
            <span className="text-sm uppercase tracking-[0.2em] text-ink/50">
              Ships to
            </span>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.03, delayChildren: 0.4 } },
            }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {all.map((name) => (
              <motion.li
                key={name}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  show: { opacity: 1, y: 0 },
                }}
                className="rounded-sm border border-border bg-card px-3 py-1.5 text-sm text-forest-deep"
              >
                {name}
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-6 text-xs text-ink/55">
            {indiaCoverage.states.length} states ·{" "}
            {indiaCoverage.unionTerritories.length} union territories
          </div>
        </div>

        {/* Benefits */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {indiaCoverage.benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-sm border border-border bg-card px-4 py-3"
            >
              <Sprout className="mt-0.5 h-4 w-4 flex-none text-gold" />
              <span className="text-sm text-ink/80">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
