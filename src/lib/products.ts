export type ProductKey =
  | "super-potassium-shiny-flakes-98"
  | "super-f-humate-big-shiny-flakes"
  | "glycine"
  | "vigora";

export const PRODUCTS: Record<
  ProductKey,
  { slug: ProductKey; name: string; unit: string; pack: string; short: string }
> = {
  "super-potassium-shiny-flakes-98": {
    slug: "super-potassium-shiny-flakes-98",
    name: "Super Potassium Shiny Flakes 98%",
    unit: "bags",
    pack: "25 Kgs",
    short: "Super Potassium Shiny Flakes 98%",
  },
  "super-f-humate-big-shiny-flakes": {
    slug: "super-f-humate-big-shiny-flakes",
    name: "Super F Humate Big Shiny Flakes",
    unit: "bags",
    pack: "25 Kgs",
    short: "Super F Humate Big Shiny Flakes",
  },
  glycine: {
    slug: "glycine",
    name: "Glycine 99%",
    unit: "bags",
    pack: "25 Kgs",
    short: "Glycine 99%",
  },
  vigora: {
    slug: "vigora",
    name: "Vigora Plant Biostimulant",
    unit: "bags",
    pack: "25 Kgs",
    short: "Vigora Plant Biostimulant",
  },
};

export const ADMIN_WHATSAPP = "916359193666";
export const ADMIN_EMAIL = "info@taraonglobal.com";
