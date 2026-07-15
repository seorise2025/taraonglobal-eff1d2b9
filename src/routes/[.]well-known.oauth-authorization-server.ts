import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE = "https://taraonglobal.com";
const CONTACT_EMAIL = "info@taraonglobal.com";

// RFC 8414 OAuth Authorization Server Metadata, extended with an
// agent_auth block per the auth.md convention.
// TARAON GLOBAL does not operate an OAuth server. This document
// declares that posture and points agents at the human registration
// channel described in /auth.md.
export const Route = createFileRoute(
  "/.well-known/oauth-authorization-server",
)({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          issuer: BASE,
          service_documentation: `${BASE}/auth.md`,
          op_policy_uri: `${BASE}/auth.md`,
          op_tos_uri: `${BASE}/`,
          // No OAuth endpoints are operated. Empty arrays are intentional.
          authorization_endpoint: null,
          token_endpoint: null,
          registration_endpoint: null,
          revocation_endpoint: null,
          jwks_uri: null,
          scopes_supported: ["public:read"],
          response_types_supported: [],
          grant_types_supported: [],
          token_endpoint_auth_methods_supported: [],
          // auth.md extension, describes how agents actually register and
          // authenticate with this site.
          agent_auth: {
            spec: "https://github.com/workos/auth.md",
            auth_md_url: `${BASE}/auth.md`,
            register_uri: `mailto:${CONTACT_EMAIL}?subject=Agent%20registration%20for%20TARAON%20GLOBAL`,
            registration_channel: "email",
            supported_identity_types: [
              "human_buyer",
              "buyer_represented_by_agent",
            ],
            supported_credential_types: [],
            credentials_issued: false,
            claims_uri: null,
            revocation_uri: `mailto:${CONTACT_EMAIL}?subject=Agent%20revocation%20request`,
            contact_uri: `mailto:${CONTACT_EMAIL}`,
            public_read: true,
            authenticated_write: false,
            notes:
              "Public marketing site. All content readable without auth. Write actions (enquiries, orders) go through the website UI or the sales email above.",
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
