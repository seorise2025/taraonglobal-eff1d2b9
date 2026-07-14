import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

import appCss from "../styles.css?url";
import interLatinWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import frauncesLatinWoff2 from "@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url";

import { reportLovableError } from "../lib/lovable-error-reporting";
import logoGreen from "@/assets/taraon-logo-green.png.asset.json";
import logoDark from "@/assets/taraon-logo-dark.png.asset.json";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { LegalTrigger } from "@/components/site/LegalModals";

const NAV_PRIMARY = [{ to: "/", label: "Home" }] as const;
const NAV_SECONDARY = [
  { to: "/applications", label: "Applications" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const PRODUCT_NAV = [
  { to: "/products/super-potassium-shiny-flakes-98", label: "Super Potassium Shiny Flakes 98%" },
  { to: "/products/super-f-humate-big-shiny-flakes", label: "Super F Humate Big Shiny Flakes" },
  { to: "/products/glycine", label: "Glycine 99%" },
  { to: "/products/vigora", label: "Vigora Plant Biostimulant" },
] as const;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bulk Agri Input Supplier India | TARAON GLOBAL" },
      {
        name: "description",
        content:
          "Bulk potassium humate flakes, Glycine 99% and Vigora plant biostimulant supplied from Ahmedabad across India. Request current specifications, COA and pricing.",
      },
      { name: "author", content: "TARAON GLOBAL" },
      { property: "og:site_name", content: "TARAON GLOBAL" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F3D2E" },
      { property: "og:title", content: "Bulk Agri Input Supplier India | TARAON GLOBAL" },
      { name: "twitter:title", content: "Bulk Agri Input Supplier India | TARAON GLOBAL" },
      { property: "og:description", content: "Ahmedabad-based agri-input trading company supplying potassium humate, Glycine and plant biostimulants to bulk buyers across India." },
      { name: "twitter:description", content: "Ahmedabad-based agri-input trading company supplying potassium humate, Glycine and plant biostimulants to bulk buyers across India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52944d98-7caa-4c7a-95e7-c5ac66c0fd77/id-preview-e2e13192--ae029262-e42a-43c8-8c3d-149de90b9970.lovable.app-1782901346107.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52944d98-7caa-4c7a-95e7-c5ac66c0fd77/id-preview-e2e13192--ae029262-e42a-43c8-8c3d-149de90b9970.lovable.app-1782901346107.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: logoGreen.url, type: "image/png" },
      { rel: "apple-touch-icon", href: logoGreen.url },
      { rel: "shortcut icon", href: logoGreen.url, type: "image/png" },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: interLatinWoff2,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: frauncesLatinWoff2,
        crossOrigin: "anonymous",
      },
    ],


    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "WholesaleStore"],
          "@id": "https://taraonglobal.com/#organization",
          name: "TARAON GLOBAL",
          alternateName: "TARAON GLOBAL - Potassium Humate Supplier",
          url: "https://taraonglobal.com/",
          logo: "https://taraonglobal.com/favicon.ico",
          telephone: "+91-6359193666",
          foundingDate: "2020",
          founder: {
            "@type": "Person",
            "@id": "https://taraonglobal.com/#rajesh-kumar-trivedi",
            name: "Rajesh Kumar Trivedi",
            jobTitle: "Founder & Managing Partner",
            worksFor: { "@id": "https://taraonglobal.com/#organization" },
            knowsAbout: [
              "Potassium humate",
              "Humic acid",
              "Fulvic acid",
              "Leonardite based inputs",
              "Fertilizer trading and distribution",
            ],
            description:
              "Rajesh Kumar Trivedi has over 20 years of hands-on experience in the humate and agri-inputs industry, personally overseeing sourcing, batch verification and dealer relationships at TARAON GLOBAL.",
          },
          employee: { "@id": "https://taraonglobal.com/#rajesh-kumar-trivedi" },
          knowsAbout: [
            "Potassium humate",
            "Humic acid",
            "Fulvic acid",
            "Agricultural inputs",
            "Fertilizer supply",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "A-210, Signature-2, Sarkhej Sanand Cross Road",
            addressLocality: "Ahmedabad",
            postalCode: "382210",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "State", name: "Gujarat" },
          ],
          sameAs: ["https://wa.me/916359193666"],
          email: "info@taraonglobal.com",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-6359193666",
            email: "info@taraonglobal.com",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["en", "hi", "gu"],
          },
          description:
            "Trading and supplier company dealing in potassium humate shiny flakes, glycine amino acid and Vigora plant biostimulant for agriculture. Sources from trusted producers and supplies farmers, dealers, distributors and fertilizer companies across Gujarat and India. Led by Rajesh Kumar Trivedi with over 20 years of industry experience.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "TARAON GLOBAL Product Range",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Super Potassium Shiny Flakes 98%", url: "https://taraonglobal.com/products/super-potassium-shiny-flakes-98" } },
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Super F Humate Big Shiny Flakes", url: "https://taraonglobal.com/products/super-f-humate-big-shiny-flakes" } },
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Glycine (High-Quality Amino Acid)", url: "https://taraonglobal.com/products/glycine" } },
              { "@type": "Offer", itemOffered: { "@type": "Product", name: "Vigora Plant Biostimulant", url: "https://taraonglobal.com/products/vigora" } },
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://taraonglobal.com/#website",
          url: "https://taraonglobal.com/",
          name: "TARAON GLOBAL",
          publisher: { "@id": "https://taraonglobal.com/#organization" },
          inLanguage: "en-IN",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock body scroll while open + return focus + ESC to close
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = toggleRef.current;
    // Move focus into the panel
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 0);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logoGreen.url}
            alt="TARAON GLOBAL"
            width={44}
            height={44}
            decoding="async"
            fetchPriority="high"
            className="h-11 w-11 rounded-sm bg-[#F5F1E8] p-0.5 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight text-forest-deep">
              TARAON GLOBAL
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-gold">
              Agri-input Supply
            </span>
          </span>
        </Link>


        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_PRIMARY.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-forest-deep/80 transition-colors hover:text-forest-deep"
              activeProps={{ className: "text-forest-deep" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="text-sm font-medium text-forest-deep/80 transition-colors hover:text-forest-deep">
              Products
            </button>
            <div className="invisible absolute left-0 top-full w-72 translate-y-1 rounded-md border border-border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {PRODUCT_NAV.map((item) => (
                <Link key={item.to} to={item.to} className="block rounded-sm px-3 py-2 text-sm hover:bg-secondary">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {NAV_SECONDARY.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-forest-deep/80 transition-colors hover:text-forest-deep"
              activeProps={{ className: "text-forest-deep" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+916359193666"
            className="flex items-center gap-1.5 text-sm text-forest-deep/80 hover:text-forest-deep"
          >
            <Phone className="h-3.5 w-3.5" /> +91 63591 93666
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-sm bg-forest-deep px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-forest-deep"
          >
            Request Current Price
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href="tel:+916359193666"
            aria-label="Call TARAON GLOBAL"
            className="grid h-11 w-11 place-items-center rounded-sm text-forest-deep hover:bg-secondary"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            className="grid h-11 w-11 place-items-center rounded-sm text-forest-deep hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className="border-t border-border bg-cream lg:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_PRIMARY.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-3 text-sm font-medium text-forest-deep hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-border pt-3">
              <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                Products
              </div>
              {PRODUCT_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-3 text-sm font-medium text-forest-deep hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-border pt-3">
              {NAV_SECONDARY.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-3 text-sm font-medium text-forest-deep hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-sm bg-forest-deep px-4 py-2.5 text-sm font-medium text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Request Current Price
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-forest-deep text-cream/85">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <img
              src={logoDark.url}
              alt="TARAON GLOBAL"
              width={44}
              height={44}
              loading="lazy"
              decoding="async"
              className="h-11 w-11 rounded-sm object-contain"
            />
            <span className="font-display text-lg text-cream">TARAON GLOBAL</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            TARAON GLOBAL is an Ahmedabad-based trading company supplying
            selected potassium humate products, Glycine and plant biostimulants
            to professional and bulk buyers across India.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products/super-potassium-shiny-flakes-98" className="hover:text-gold">Super Potassium Shiny Flakes 98%</Link></li>
            <li><Link to="/products/super-f-humate-big-shiny-flakes" className="hover:text-gold">Super F Humate Big Shiny Flakes</Link></li>
            <li><Link to="/products/glycine" className="hover:text-gold">Glycine 99%</Link></li>
            <li><Link to="/products/vigora" className="hover:text-gold">Vigora Plant Biostimulant</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/applications" className="hover:text-gold">Applications</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Request Current Price</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>Rajesh Kumar Trivedi</li>
            <li><a href="tel:+916359193666" className="hover:text-gold">+91 63591 93666</a></li>
            <li><a href="mailto:info@taraonglobal.com" className="inline-flex items-center gap-2 hover:text-gold"><Mail className="h-3.5 w-3.5" aria-hidden="true" /> info@taraonglobal.com</a></li>
            <li className="pt-1 leading-relaxed">
              A-210, Signature-2<br />
              Sarkhej Sanand Cross Road<br />
              Ahmedabad 382210<br />
              Gujarat, India
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><LegalTrigger modal="privacy">Privacy Notice</LegalTrigger></li>
            <li><LegalTrigger modal="terms">Website Terms</LegalTrigger></li>
            <li><LegalTrigger modal="enquiry">Enquiry and Order Terms</LegalTrigger></li>
            <li><LegalTrigger modal="product">Product Information Disclaimer</LegalTrigger></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        <p>© {new Date().getFullYear()} TARAON GLOBAL. All rights reserved.</p>
        <p className="mt-1.5 text-cream/40">
          Website strategy and growth support by{" "}
          <a
            href="https://www.seorise.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cream/60 hover:text-gold hover:underline"
          >
            SEO Rise
          </a>
        </p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-forest-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster />
    </QueryClientProvider>
  );
}
