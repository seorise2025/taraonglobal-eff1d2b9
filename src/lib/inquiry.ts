// Central sales pre-fill copy for WhatsApp and Email CTAs.
// Keep messaging uniform and intent oriented across the site.

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
  general: "your products",
};

export function buildWaHref(product: ProductKey = "general", qty?: string) {
  const label = PRODUCT_LABEL[product];
  const msg =
    `Hi TARAON GLOBAL, I want the current price and availability for ${label}. ` +
    `Please share the latest specification, packing and dispatch time. ` +
    `Quantity: ${qty ?? "___ (25 Kg bags)"}. City / State: ___.`;
  return `https://wa.me/${SALES_WA}?text=${encodeURIComponent(msg)}`;
}

export function buildCoaWaHref(product: ProductKey = "general") {
  const label = PRODUCT_LABEL[product];
  const msg =
    `Hi TARAON GLOBAL, please share the current batch COA and specification ` +
    `for ${label}. Thank you.`;
  return `https://wa.me/${SALES_WA}?text=${encodeURIComponent(msg)}`;
}

export function buildEmailHref(product: ProductKey = "general") {
  const label = PRODUCT_LABEL[product];
  const subject = `Bulk enquiry, ${label}`;
  const body =
    `Hello TARAON GLOBAL team,\n\n` +
    `I would like the current price and availability for ${label}.\n\n` +
    `Quantity needed: \n` +
    `City / State: \n` +
    `Buyer type (Dealer / Distributor / Formulator / FPO / Exporter / Other): \n` +
    `Preferred dispatch time: \n\n` +
    `Please share the current specification, COA and commercial terms.\n\n` +
    `Thanks.`;
  return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildCoaEmailHref(product: ProductKey = "general") {
  const label = PRODUCT_LABEL[product];
  const subject = `COA request, ${label}`;
  const body =
    `Hello TARAON GLOBAL team,\n\n` +
    `Please share the current batch COA and specification for ${label}.\n\n` +
    `Thank you.`;
  return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
