import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE = "https://taraonglobal.com";

// RFC 9728 style OAuth Protected Resource Metadata.
// This site is a public read only resource with no bearer token protected APIs.
// Agents can discover the authentication posture via auth.md.
export const Route = createFileRoute("/.well-known/oauth-protected-resource")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          resource: BASE,
          resource_name: "TARAON GLOBAL public website",
          resource_documentation: `${BASE}/auth.md`,
          authorization_servers: [`${BASE}/.well-known/oauth-authorization-server`],
          bearer_methods_supported: [],
          scopes_supported: ["public:read"],
          resource_policy_uri: `${BASE}/auth.md`,
          resource_tos_uri: `${BASE}/`,
          access: {
            public_read: true,
            authenticated_write: false,
            agent_write_channel: "email",
            contact: "info@taraonglobal.com",
          },
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
