import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE = "https://taraonglobal.com";
const CONTACT_EMAIL = "info@taraonglobal.com";

// auth.md — agent registration and authentication metadata
// Spec: https://github.com/workos/auth.md
export const Route = createFileRoute("/auth.md")({
  server: {
    handlers: {
      GET: async () => {
        const body = `# TARAON GLOBAL, agent authentication

Site: ${BASE}
Contact: ${CONTACT_EMAIL}
Last updated: 2026-07-15

## Summary

TARAON GLOBAL is a public marketing and sales website for an
Ahmedabad based agri input trading company. All product, application,
and dosage content is public and can be read by any agent without
authentication.

There is no user account system, no user generated content, and no
per user API. Agents do not need tokens to read pages, the sitemap,
llms.txt, the image sitemap, or the API catalog.

## Public read access, no auth required

Agents may fetch the following without registration or credentials:

- ${BASE}/
- ${BASE}/sitemap.xml
- ${BASE}/image-sitemap.xml
- ${BASE}/llms.txt
- ${BASE}/robots.txt
- ${BASE}/.well-known/api-catalog
- ${BASE}/.well-known/agent-skills/index.json
- All product, guide, applications, about, and contact pages linked from the sitemap

Rate limit guidance: no more than 60 requests per minute per IP.
Respect Cache-Control headers.

## Write access, sales enquiries and orders

Write endpoints (enquiry form, bulk order form) accept submissions
from human buyers through the website UI. Automated submissions from
agents are not accepted through the web forms.

Agents acting on behalf of a human buyer should contact the sales
desk directly. This is the only supported agent write channel today.

- Email: ${CONTACT_EMAIL}
- WhatsApp: linked from ${BASE}/contact
- Web form: ${BASE}/contact

## Agent registration

TARAON GLOBAL does not run an OAuth authorization server. There is no
programmatic client registration endpoint and no machine issued
credentials for the website.

To register an agent for ongoing buyer communications, email
${CONTACT_EMAIL} with:

1. Agent or product name
2. Operator company and website
3. Purpose (buyer research, procurement, price watch, integration)
4. Preferred contact channel for replies
5. Volume estimate (requests per day)

The sales desk will reply during Indian business hours with a
confirmation and any special guidance.

## Identity and credential types

- Supported identity types: human buyer, buyer represented by agent
- Supported credential types: none machine issued; human email and
  WhatsApp identity only
- Token endpoint: not applicable
- Revocation endpoint: not applicable, revocation is by email request
  to ${CONTACT_EMAIL}
- Claims endpoint: not applicable

## Data handling

Enquiry and order submissions are stored in the site backend and used
only to reply to the buyer. Data is not resold. Deletion requests can
be sent to ${CONTACT_EMAIL}.

## References

- Protected resource metadata: ${BASE}/.well-known/oauth-protected-resource
- Authorization server metadata: ${BASE}/.well-known/oauth-authorization-server
- Agent skills index: ${BASE}/.well-known/agent-skills/index.json
- API catalog: ${BASE}/.well-known/api-catalog
`;
        return new Response(body, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
