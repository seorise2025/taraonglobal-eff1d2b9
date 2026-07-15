import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE = "https://taraonglobal.com";

export const Route = createFileRoute("/.well-known/api-catalog")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          linkset: [
            {
              anchor: `${BASE}/`,
              "service-doc": [
                { href: `${BASE}/llms.txt`, type: "text/markdown", title: "Site summary for AI clients" },
              ],
              describedby: [
                { href: `${BASE}/sitemap.xml`, type: "application/xml", title: "Sitemap" },
              ],
              author: [
                { href: `${BASE}/about`, title: "About TARAON GLOBAL" },
              ],
              contact: [
                { href: `${BASE}/contact`, title: "Contact TARAON GLOBAL" },
              ],
            },
          ],
        };
        return new Response(JSON.stringify(body, null, 2), {
          headers: {
            "Content-Type": "application/linkset+json",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
