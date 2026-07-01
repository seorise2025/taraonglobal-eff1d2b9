import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle } from "lucide-react";

export function CTABand({
  title,
  subtitle,
  primaryLabel = "Request Bulk Price",
}: {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="container-page my-20">
      <div className="relative overflow-hidden rounded-lg bg-forest-deep px-6 py-14 text-cream shadow-xl sm:px-12">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(201,162,75,0.25),transparent_60%)] md:block" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.22em] text-gold">
              Let's talk
            </div>
            <h3 className="font-display text-3xl leading-tight text-cream sm:text-4xl">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-3 max-w-xl text-cream/75">{subtitle}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-sm bg-gold px-5 py-3 text-sm font-medium text-forest-deep transition-colors hover:bg-cream"
            >
              {primaryLabel}
            </Link>
            <a
              href="https://wa.me/916359193666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-cream/30 px-5 py-3 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" /> Talk on WhatsApp
            </a>
            <a
              href="tel:+916359193666"
              className="inline-flex items-center justify-center gap-2 text-sm text-cream/80 hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5" /> +91 63591 93666
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
