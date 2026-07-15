import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://taraonglobal.com";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "daily";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const CONTENT_UPDATED = "2026-07-15";
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: CONTENT_UPDATED },
          { path: "/products/super-potassium-shiny-flakes-98", changefreq: "monthly", priority: "0.9", lastmod: CONTENT_UPDATED },
          { path: "/products/super-f-humate-big-shiny-flakes", changefreq: "monthly", priority: "0.9", lastmod: CONTENT_UPDATED },
          { path: "/products/glycine", changefreq: "monthly", priority: "0.9", lastmod: CONTENT_UPDATED },
          { path: "/products/vigora", changefreq: "monthly", priority: "0.9", lastmod: CONTENT_UPDATED },
          { path: "/applications", changefreq: "monthly", priority: "0.8", lastmod: CONTENT_UPDATED },
          { path: "/about", changefreq: "monthly", priority: "0.7", lastmod: CONTENT_UPDATED },
          { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod: CONTENT_UPDATED },
        ];

        const urls = entries
          .map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
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
