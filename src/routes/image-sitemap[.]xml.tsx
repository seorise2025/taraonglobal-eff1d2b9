import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import potassiumBag from "@/assets/super-potassium-98-bag.jpg.asset.json";
import humateBag from "@/assets/super-f-humate-bag.jpg.asset.json";
import glycinePack from "@/assets/glycine-pack.jpg.asset.json";
import vigoraImg from "@/assets/vigora-bio-stimulant.jpg.asset.json";

const BASE_URL = "https://taraonglobal.com";

interface ImageEntry {
  loc: string;
  title: string;
  caption: string;
}

interface PageWithImages {
  path: string;
  images: ImageEntry[];
}

export const Route = createFileRoute("/image-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const pages: PageWithImages[] = [
          {
            path: "/products/super-potassium-shiny-flakes-98",
            images: [
              {
                loc: `${BASE_URL}${potassiumBag.url}`,
                title: "Super Potassium Shiny Flakes 98% 25 Kg Bag",
                caption: "Potassium humate shiny flakes 98% purity in 25 Kg standard packing supplied by TARAON GLOBAL, Ahmedabad.",
              },
            ],
          },
          {
            path: "/products/super-f-humate-big-shiny-flakes",
            images: [
              {
                loc: `${BASE_URL}${humateBag.url}`,
                title: "Super F Humate Big Shiny Flakes 25 Kg Bag",
                caption: "Fulvic enriched humate big shiny flakes 25 Kg pack for soil conditioning and irrigation use.",
              },
            ],
          },
          {
            path: "/products/glycine",
            images: [
              {
                loc: `${BASE_URL}${glycinePack.url}`,
                title: "Glycine Amino Acid 25 Kg Pack",
                caption: "High purity glycine amino acid in 25 Kg pack, supplied for agriculture and industrial buyers.",
              },
            ],
          },
          {
            path: "/products/vigora",
            images: [
              {
                loc: `${BASE_URL}${vigoraImg.url}`,
                title: "Vigora Bio Stimulant Powder 25 Kg",
                caption: "Vigora 99% pure water soluble powder bio stimulant for foliar and drip use, 25 Kg pack.",
              },
            ],
          },
        ];

        const esc = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

        const urls = pages
          .map((p) => {
            const imgs = p.images
              .map(
                (i) =>
                  `    <image:image>\n      <image:loc>${esc(i.loc)}</image:loc>\n      <image:title>${esc(i.title)}</image:title>\n      <image:caption>${esc(i.caption)}</image:caption>\n    </image:image>`,
              )
              .join("\n");
            return `  <url>\n    <loc>${BASE_URL}${p.path}</loc>\n${imgs}\n  </url>`;
          })
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
