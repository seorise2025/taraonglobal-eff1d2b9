import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <div className="mb-3 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-gold">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-forest-deep sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}
