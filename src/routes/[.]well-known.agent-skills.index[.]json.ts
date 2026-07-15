import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE = "https://taraonglobal.com";

// Agent Skills Discovery RFC v0.2.0
// https://github.com/cloudflare/agent-skills-discovery-rfc
export const Route = createFileRoute("/.well-known/agent-skills/index.json")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          $schema:
            "https://agentskills.io/schemas/v0.2.0/agent-skills-index.schema.json",
          version: "0.2.0",
          site: {
            name: "TARAON GLOBAL",
            url: BASE,
            description:
              "Ahmedabad based agri input sourcing desk supplying potassium humate, Glycine, and Vigora plant biostimulant across India in 25 Kg packs.",
          },
          skills: [
            {
              name: "site-summary",
              type: "reference",
              description:
                "Plain markdown summary of the site, its pages, and its products for AI assistants.",
              url: `${BASE}/llms.txt`,
              contentType: "text/markdown",
            },
            {
              name: "product-catalog",
              type: "reference",
              description:
                "Sitemap listing every public product and content page on the site.",
              url: `${BASE}/sitemap.xml`,
              contentType: "application/xml",
            },
            {
              name: "contact-sales",
              type: "reference",
              description:
                "Contact page with phone, WhatsApp, and email for bulk pricing and dispatch enquiries.",
              url: `${BASE}/contact`,
              contentType: "text/html",
            },
          ],
        };
        return new Response(JSON.stringify(body, null, 2), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
