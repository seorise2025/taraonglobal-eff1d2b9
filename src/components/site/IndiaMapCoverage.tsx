import { motion, useReducedMotion } from "motion/react";
import indiaPaths from "@/data/india-paths.json";

type StateShape = { id: string; name: string; d: string; cx: number; cy: number };

const AHM = indiaPaths.ahmedabad as { x: number; y: number };
const STATES = indiaPaths.states as StateShape[];

const BENEFITS = [
  "Improves soil structure",
  "Supports strong root growth",
  "Improves nutrient uptake",
  "Supports microbial activity",
  "Improves fertiliser efficiency",
  "Helps healthier crop development",
];

// quadratic bezier arc between two points, bulging outward
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // perpendicular offset - arc curves upward (toward -y)
  const nx = -dy / dist;
  const ny = dx / dist;
  const bulge = Math.min(120, dist * 0.35);
  const cx = mx + nx * bulge;
  const cy = my + ny * bulge - dist * 0.05;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function IndiaMapCoverage() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-border bg-card">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-8 bg-gold" /> India coverage
            </div>
            <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl md:text-[2.75rem]">
              From Ahmedabad to Farms Across India
            </h2>
            <div className="mt-5 space-y-3 text-ink/75">
              <p>
                Our humate-based products are supplied from Ahmedabad to Gujarat
                and across India. From large farming belts to local growers,
                Super F Humate Big Shiny Flakes and Super Potassium Shiny Flakes
                98% support better soil structure, stronger root growth,
                improved nutrient uptake, and efficient fertiliser use.
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

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 rounded-sm border border-border bg-cream px-3 py-2 text-sm text-ink/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 text-xs uppercase tracking-[0.18em] text-ink/50">
              28 states · 8 union territories · shipped from Ahmedabad
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-gold/20 via-transparent to-forest/15 blur-2xl" />
            <div className="rounded-lg border border-border bg-cream p-4 shadow-xl sm:p-6">
              <svg
                viewBox="0 0 1000 1100"
                role="img"
                aria-label="Map of India showing product supply routes from Ahmedabad, Gujarat to every state and union territory"
                className="h-auto w-full"
              >
                {/* State shapes */}
                <g>
                  {STATES.map((s, i) => (
                    <motion.path
                      key={s.id}
                      d={s.d}
                      initial={reduce ? false : { fill: "oklch(0.94 0.02 90)" }}
                      whileInView={{
                        fill: [
                          "oklch(0.94 0.02 90)",
                          "oklch(0.55 0.09 150)",
                          "oklch(0.35 0.06 155)",
                        ],
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.6 + i * 0.045,
                        times: [0, 0.5, 1],
                      }}
                      stroke="oklch(0.35 0.06 155)"
                      strokeWidth={0.6}
                      style={{ fill: "oklch(0.94 0.02 90)" }}
                    />
                  ))}
                </g>

                {/* Arcs from Ahmedabad to each state centroid */}
                <g fill="none" stroke="oklch(0.72 0.14 75)" strokeWidth={1.4} strokeLinecap="round">
                  {STATES.map((s, i) => (
                    <motion.path
                      key={"arc-" + s.id}
                      d={arcPath(AHM.x, AHM.y, s.cx, s.cy)}
                      initial={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
                      whileInView={
                        reduce
                          ? { pathLength: 1, opacity: 0.5 }
                          : { pathLength: [0, 1, 1], opacity: [0, 0.9, 0.35] }
                      }
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 1.6,
                        delay: 0.8 + i * 0.045,
                        times: [0, 0.7, 1],
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </g>

                {/* Destination dots */}
                <g>
                  {STATES.map((s, i) => (
                    <motion.circle
                      key={"dot-" + s.id}
                      cx={s.cx}
                      cy={s.cy}
                      r={3.5}
                      fill="oklch(0.72 0.14 75)"
                      stroke="oklch(0.2 0.03 155)"
                      strokeWidth={0.6}
                      initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.35,
                        delay: 1.9 + i * 0.045,
                        ease: "backOut",
                      }}
                    />
                  ))}
                </g>

                {/* Ahmedabad origin - pulsing ring + solid dot */}
                <g>
                  <motion.circle
                    cx={AHM.x}
                    cy={AHM.y}
                    r={8}
                    fill="oklch(0.72 0.14 75)"
                    initial={reduce ? { opacity: 0.4, scale: 1 } : { opacity: 0.6, scale: 0.6 }}
                    animate={
                      reduce
                        ? { opacity: 0.4 }
                        : { opacity: [0.6, 0, 0.6], scale: [0.6, 2.4, 0.6] }
                    }
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                  <circle cx={AHM.x} cy={AHM.y} r={5} fill="oklch(0.2 0.03 155)" />
                  <circle cx={AHM.x} cy={AHM.y} r={2.2} fill="oklch(0.85 0.12 80)" />
                  <text
                    x={AHM.x + 12}
                    y={AHM.y + 4}
                    fontSize={20}
                    fontFamily="Fraunces, serif"
                    fill="oklch(0.2 0.03 155)"
                  >
                    Ahmedabad
                  </text>
                </g>
              </svg>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/60">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold" />
                  Origin - Ahmedabad
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-0.5 w-6 bg-gold" />
                  Supply route
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-sm bg-forest-deep" />
                  Delivered state / UT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
