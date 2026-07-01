import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export type RelatedLink = {
  to: string;
  title: string;
  desc: string;
};

/**
 * Semantic internal-link block for SEO & AI-search readability.
 * Renders keyword-rich anchor text and short context, so crawlers
 * understand how our pages relate (topic clustering).
 */
export function RelatedLinks({
  eyebrow = "Related on TARAON GLOBAL",
  title = "Keep exploring",
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: RelatedLink[];
}) {
  return (
    <section
      aria-label="Related pages"
      className="container-page py-16"
    >
      <SectionHeading eyebrow={eyebrow} title={title} />
      <nav aria-label="Related content" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-md"
          >
            <div>
              <h3 className="font-display text-lg leading-snug text-forest-deep">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{item.desc}</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors group-hover:text-gold">
              Read more <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
