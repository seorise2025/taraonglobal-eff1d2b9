## Taraon Global — Full marketing site build

Six-page marketing site for a potassium humate supplier, built on the TanStack Start template with an "Earthy Premium" design system (forest green + gold on cream) and a Lovable Cloud–backed enquiry form.

### Pages (each its own route with unique SEO metadata)
- `/` — Home (hero, two products, benefits, applications, Gujarat section, closing CTA)
- `/products/super-potassium-shiny-flakes-98` — Product page with spec table + FAQ
- `/products/super-f-humate-big-shiny-flakes` — Product page with spec table + FAQ
- `/about` — About + owner + address
- `/applications` — Uses in agriculture (5 sections + fit table)
- `/contact` — Contact details + bulk enquiry form + Google Map embed

All copy comes verbatim from the provided content brief. Each route sets its own `title`, `description`, `og:title`, `og:description` inside `head()`. Product pages add JSON-LD Product + FAQPage schema for AI-search visibility (per the brief's GEO notes).

### Design system (Earthy Premium)
- Palette: `#0F3D2E` (deep forest, primary), `#1B5E3F` (green mid), `#C9A24B` (gold accent), `#F5F1E8` (cream bg), `#111111` (text). Tokens registered in `src/styles.css` under `@theme` + `:root` (oklch).
- Typography: Fraunces (serif display, headings) + Inter (body). Loaded via `<link>` in `__root.tsx` head (per Tailwind v4 rule — no CSS `@import` of remote fonts).
- Radius medium, generous whitespace, subtle gold hairlines, cream section backgrounds alternating with deep green feature bands.

### Shared UI
- Sticky header with logo mark + nav (Home, Products dropdown/inline, Applications, About, Contact) + "Request Bulk Price" CTA
- Four-column footer matching the brief
- Floating WhatsApp button (gentle pulse), links to `https://wa.me/916359193666`
- Reusable components: `Hero`, `SectionHeading`, `ProductCard`, `SpecTable`, `FAQ` (accordion), `CTABand`, `TrustBar`

### Animations (restrained, per brief)
- Hero bag/product image fade+rise on load (<1s)
- Spec numbers count up on scroll (humic acid 0→65%, etc.)
- Benefit cards: soft lift + shadow on hover
- CTA buttons: green↔gold hover shift
- WhatsApp FAB: slow pulse
Implemented with Motion for React + `IntersectionObserver` for counters.

### Images
Generated with imagegen and stored in `src/assets/`:
- Hero: black shiny humate flakes cascading in warm light (home + product 1)
- Big flakes close-up shot (product 2)
- Field / soil-and-roots shot for Applications
- Ahmedabad / warehouse shot for About
Placeholder-free — no leaf route gets `og:image` unless the generated hero is used as the share image (product pages will).

### Backend — Contact form
Enable Lovable Cloud, then:
- Migration creates `public.enquiries` (id, created_at, name, company, phone, whatsapp, email, city, state, product_needed, quantity, buyer_type, message) with `GRANT INSERT TO anon` + RLS policy allowing anonymous inserts only; SELECT restricted to service_role.
- Client submits via the browser Supabase client with Zod validation (trim, length caps per input-validation rules).
- Success toast + WhatsApp fallback button. No email notification in v1 (can add later via Lovable Emails).

### SEO / AI-search
- Per-page `head()` with exact titles/descriptions from the brief
- Canonical + `og:url` (relative paths) on each leaf
- Product JSON-LD (name, brand "Taraon Global", description, packaging) + FAQPage JSON-LD on product pages
- Organization JSON-LD on `__root.tsx` (name, address, phone)
- `public/robots.txt` allowing all; `public/sitemap.xml` with all six routes (relative, no host baked in)

### Out of scope for v1
- No blog / CMS
- No auth (public marketing site)
- No email notifications on form submit (DB storage only)
- No i18n (English only, though CTA mentions Gujarati availability)

### Technical notes
- Route files under `src/routes/` using dot-flat convention (`products.super-potassium-shiny-flakes-98.tsx`, etc.)
- Google Map: plain iframe embed of the Ahmedabad address (no Maps JS API needed → no connector required)
- Phone/WhatsApp links use `tel:` and `wa.me`
- Fonts via `<link rel="preconnect">` + `<link href="fonts.googleapis.com/…">` in `__root.tsx` (NOT `@import` in styles.css)
