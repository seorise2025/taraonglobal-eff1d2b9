// Central sales pre-fill copy for WhatsApp and Email CTAs.
// Professional, pre-formatted templates used across the site.

export const SALES_PHONE = "+916359193666";
export const SALES_WA = "916359193666";
export const SALES_EMAIL = "info@taraonglobal.com";

type ProductKey =
  | "super-potassium-shiny-flakes-98"
  | "super-f-humate-big-shiny-flakes"
  | "glycine"
  | "vigora"
  | "general";

const PRODUCT_LABEL: Record<ProductKey, string> = {
  "super-potassium-shiny-flakes-98": "Super Potassium Shiny Flakes 98%",
  "super-f-humate-big-shiny-flakes": "Super F Humate Big Shiny Flakes",
  glycine: "Glycine 99%",
  vigora: "Vigora Plant Biostimulant",
  general: "your agri-input range",
};

const SIGN_OFF = "Thank you,\nSent via taraonglobal.com";

function wa(text: string) {
  return `https://wa.me/${SALES_WA}?text=${encodeURIComponent(text)}`;
}

function mail(subject: string, body: string) {
  return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ---------------- Bulk price enquiry ----------------

export function buildWaHref(product: ProductKey = "general", qty?: string) {
  const label = PRODUCT_LABEL[product];
  const msg =
    `Hello TARAON GLOBAL,\n\n` +
    `I would like to enquire about *${label}*.\n\n` +
    `• Quantity: ${qty ?? "___ x 25 Kg bags"}\n` +
    `• Delivery city / state: ___\n` +
    `• Buyer type: Dealer / Distributor / Formulator / FPO / Exporter\n` +
    `• Required by: ___\n\n` +
    `Kindly share:\n` +
    `1. Current price (ex-Ahmedabad and delivered)\n` +
    `2. Latest specification and COA\n` +
    `3. Packing and dispatch timeline\n` +
    `4. Payment terms\n\n` +
    SIGN_OFF;
  return wa(msg);
}

export function buildEmailHref(product: ProductKey = "general") {
  const label = PRODUCT_LABEL[product];
  const subject = `Bulk enquiry, ${label}`;
  const body =
    `Dear TARAON GLOBAL team,\n\n` +
    `I would like to receive a formal quotation for ${label}.\n\n` +
    `Requirement details\n` +
    `-------------------\n` +
    `Quantity: ___ x 25 Kg bags\n` +
    `Delivery city / state: \n` +
    `Buyer type (Dealer / Distributor / Formulator / FPO / Exporter): \n` +
    `Preferred dispatch time: \n` +
    `GSTIN (if applicable): \n\n` +
    `Please share the current specification, COA, price (ex-Ahmedabad and delivered), packing, payment terms and dispatch timeline.\n\n` +
    `Regards,\n`;
  return mail(subject, body);
}

// ---------------- COA / specification request ----------------

export function buildCoaWaHref(product: ProductKey = "general") {
  const label = PRODUCT_LABEL[product];
  const msg =
    `Hello TARAON GLOBAL,\n\n` +
    `Please share the current batch COA and technical specification for *${label}*.\n\n` +
    `• Company: ___\n` +
    `• Intended use: ___\n\n` +
    SIGN_OFF;
  return wa(msg);
}

export function buildCoaEmailHref(product: ProductKey = "general") {
  const label = PRODUCT_LABEL[product];
  const subject = `COA and specification request, ${label}`;
  const body =
    `Dear TARAON GLOBAL team,\n\n` +
    `Kindly share the current batch COA and technical specification sheet for ${label}.\n\n` +
    `Company: \n` +
    `Intended use: \n\n` +
    `Regards,\n`;
  return mail(subject, body);
}

// ---------------- Generic default enquiry (FAB, footer) ----------------

export function buildDefaultWaHref() {
  const msg =
    `Hello TARAON GLOBAL,\n\n` +
    `I would like to connect regarding your agri-input products.\n\n` +
    `• Product of interest: ___\n` +
    `• Quantity: ___ x 25 Kg bags\n` +
    `• Delivery city / state: ___\n\n` +
    `Please share the latest price list, specification and dispatch timeline.\n\n` +
    SIGN_OFF;
  return wa(msg);
}

// ---------------- Admin outbound templates ----------------

export function buildOrderStatusWaMessage(opts: {
  name: string;
  reference: string;
  product: string;
  quantity: string;
  status: string;
}) {
  return (
    `Hello ${opts.name},\n\n` +
    `Update on your requirement *${opts.reference}* with TARAON GLOBAL.\n\n` +
    `• Product: ${opts.product}\n` +
    `• Quantity: ${opts.quantity}\n` +
    `• Current status: ${opts.status.replace(/_/g, " ")}\n\n` +
    `Our team will share the next update shortly. For any query, reply on this chat or call +91 63591 93666.\n\n` +
    `Regards,\nTARAON GLOBAL`
  );
}

export function buildEnquiryFollowUpMessage(opts: { name: string; reference?: string | null }) {
  const ref = opts.reference ? ` (Ref: ${opts.reference})` : "";
  return (
    `Hello ${opts.name},\n\n` +
    `Thank you for reaching out to TARAON GLOBAL${ref}. Our team has received your enquiry and will revert shortly with the requested details.\n\n` +
    `For urgent queries, call +91 63591 93666.\n\n` +
    `Regards,\nTARAON GLOBAL`
  );
}

// ---------------- Buyer-side order confirmation summary ----------------

export function buildBulkOrderSummary(opts: {
  reference: string;
  product: string;
  bags: number;
  quantityEstimate: string;
  name: string;
  company: string;
  phone: string;
  email?: string | null;
  city: string;
  state: string;
  pincode: string;
  buyerType: string;
  gst?: string | null;
  requiredBy?: string | null;
  po?: string | null;
  notes?: string | null;
}) {
  const lines = [
    `Hello TARAON GLOBAL,`,
    ``,
    `Please find my bulk requirement below.`,
    ``,
    `Reference: *${opts.reference}*`,
    `Product: ${opts.product}`,
    `Bags: ${opts.bags} x 25 Kg`,
    `Total quantity: ${opts.quantityEstimate}`,
    ``,
    `Buyer details`,
    `-------------`,
    `Name: ${opts.name}`,
    `Company: ${opts.company}`,
    `Phone: ${opts.phone}`,
  ];
  if (opts.email) lines.push(`Email: ${opts.email}`);
  lines.push(
    `Location: ${opts.city}, ${opts.state} ${opts.pincode}`,
    `Buyer type: ${opts.buyerType}`,
  );
  if (opts.gst) lines.push(`GSTIN: ${opts.gst}`);
  if (opts.requiredBy) lines.push(`Required by: ${opts.requiredBy}`);
  if (opts.po) lines.push(`PO reference: ${opts.po}`);
  if (opts.notes) lines.push(``, `Notes: ${opts.notes}`);
  lines.push(``, `Kindly confirm price, taxes, freight and dispatch timeline.`, ``, `Thank you.`);
  return lines.join("\n");
}
