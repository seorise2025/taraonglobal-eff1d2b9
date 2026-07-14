import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { buildEmailHref, buildWaHref } from "@/lib/inquiry";
import { trackEmail, trackLead, trackWhatsApp } from "@/lib/analytics";

type ProductKey =
  | "super-potassium-shiny-flakes-98"
  | "super-f-humate-big-shiny-flakes"
  | "glycine"
  | "vigora"
  | "general";

export function InquiryCTA({
  product,
  showOrder = true,
  className = "",
}: {
  product: ProductKey;
  showOrder?: boolean;
  className?: string;
}) {
  const waHref = buildWaHref(product);
  const emailHref = buildEmailHref(product);
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {showOrder && product !== "general" ? (
        <Link
          to="/order/$slug"
          params={{ slug: product }}
          onClick={() => trackLead("order_cta_click", { channel: "order", product, location: "inquiry_cta" })}
          className="group inline-flex min-h-11 items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-gold hover:text-forest-deep"
        >
          Place Order
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
      <Link
        to="/contact"
        onClick={() => trackLead("bulk_price_click", { channel: "form", product, location: "inquiry_cta" })}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
      >
        Request Bulk Price
      </Link>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp(product, "inquiry_cta")}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <a
        href={emailHref}
        onClick={() => trackEmail(product, "inquiry_cta")}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
      >
        <Mail className="h-4 w-4" /> Email Us
      </a>
    </div>
  );
}
