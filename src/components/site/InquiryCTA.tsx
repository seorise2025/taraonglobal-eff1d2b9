import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Mail, FileText } from "lucide-react";
import {
  buildEmailHref,
  buildWaHref,
  buildCoaEmailHref,
  buildCoaWaHref,
} from "@/lib/inquiry";
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
  showCoa = true,
  className = "",
}: {
  product: ProductKey;
  showOrder?: boolean;
  showCoa?: boolean;
  className?: string;
}) {
  const waHref = buildWaHref(product);
  const emailHref = buildEmailHref(product);
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link
        to="/contact"
        onClick={() => trackLead("bulk_price_click", { channel: "form", product, location: "inquiry_cta" })}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-forest-deep px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-gold hover:text-forest-deep"
      >
        Request Current Price
        <ArrowRight className="h-4 w-4" />
      </Link>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp(product, "inquiry_cta")}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp Product Enquiry
      </a>
      <a
        href={emailHref}
        onClick={() => trackEmail(product, "inquiry_cta")}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
      >
        <Mail className="h-4 w-4" /> Email
      </a>
      {showOrder && product !== "general" ? (
        <Link
          to="/order/$slug"
          params={{ slug: product }}
          onClick={() => trackLead("order_cta_click", { channel: "order", product, location: "inquiry_cta" })}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-forest-deep/25 px-6 py-3.5 text-sm font-semibold text-forest-deep hover:border-gold hover:bg-gold/10"
        >
          Start Bulk Order
        </Link>
      ) : null}
      {showCoa && product !== "general" ? (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-ink/50">Request Current COA:</span>
          <a
            href={buildCoaWaHref(product)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp(product, "coa_request")}
            className="inline-flex items-center gap-1 font-medium text-forest-deep underline underline-offset-4 hover:text-gold"
          >
            <FileText className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <a
            href={buildCoaEmailHref(product)}
            onClick={() => trackEmail(product, "coa_request")}
            className="inline-flex items-center gap-1 font-medium text-forest-deep underline underline-offset-4 hover:text-gold"
          >
            <Mail className="h-3.5 w-3.5" /> Email
          </a>
        </div>
      ) : null}
    </div>
  );
}
