import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products/super-potassium-shiny-flakes-98", label: "Super Potassium 98%" },
  { to: "/products/super-f-humate-big-shiny-flakes", label: "Super F Big Flakes" },
  { to: "/applications", label: "Applications" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
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
      { title: "Taraon Global — Potassium Humate Shiny Flakes | Ahmedabad" },
      {
        name: "description",
        content:
          "Taraon Global manufactures potassium humate shiny flakes for farmers, dealers and fertilizer companies. Based in Ahmedabad, ships across India.",
      },
      { name: "author", content: "Taraon Global" },
      { property: "og:site_name", content: "Taraon Global" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F3D2E" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Taraon Global",
          url: "/",
          telephone: "+91-6359193666",
          founder: "Rajesh Kumar Trivedi",
          address: {
            "@type": "PostalAddress",
            streetAddress: "A-210, Signature-2, Sarkhej Sanand Cross Road",
            addressLocality: "Ahmedabad",
            postalCode: "382210",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
          areaServed: "IN",
          description:
            "Manufacturer and supplier of potassium humate shiny flakes for agriculture. Serving farmers, dealers, distributors and fertilizer companies across Gujarat and India.",
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
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span
            className="grid h-9 w-9 place-items-center rounded-sm bg-forest-deep font-display text-lg text-cream"
            aria-hidden
          >
            T
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight text-forest-deep">
              Taraon Global
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-gold">
              Potassium Humate
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.slice(0, 1).concat(NAV.slice(3)).map((item) => (
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
            <div className="invisible absolute right-0 top-full w-72 translate-y-1 rounded-md border border-border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link
                to="/products/super-potassium-shiny-flakes-98"
                className="block rounded-sm px-3 py-2 text-sm hover:bg-secondary"
              >
                Super Potassium Shiny Flakes 98%
              </Link>
              <Link
                to="/products/super-f-humate-big-shiny-flakes"
                className="block rounded-sm px-3 py-2 text-sm hover:bg-secondary"
              >
                Super F Humate Big Shiny Flakes
              </Link>
            </div>
          </div>
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
            Request Bulk Price
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-2 text-sm font-medium text-forest-deep hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-forest-deep px-4 py-2.5 text-sm font-medium text-cream"
            >
              Request Bulk Price
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
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-gold font-display text-lg text-forest-deep">
              T
            </span>
            <span className="font-display text-lg text-cream">Taraon Global</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Taraon Global makes potassium humate shiny flakes for agriculture. Based in
            Ahmedabad, sold across Gujarat and India.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Products</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/products/super-potassium-shiny-flakes-98"
                className="hover:text-gold"
              >
                Super Potassium Shiny Flakes 98%
              </Link>
            </li>
            <li>
              <Link
                to="/products/super-f-humate-big-shiny-flakes"
                className="hover:text-gold"
              >
                Super F Humate Big Shiny Flakes
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About Taraon Global</Link></li>
            <li><Link to="/applications" className="hover:text-gold">Applications</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-[0.18em] text-gold">Get in touch</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>Rajesh Kumar Trivedi</li>
            <li>
              <a href="tel:+916359193666" className="hover:text-gold">
                +91 63591 93666
              </a>
            </li>
            <li className="pt-1 leading-relaxed">
              A-210, Signature-2<br />
              Sarkhej Sanand Cross Road<br />
              Ahmedabad-382210, Gujarat, India
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Taraon Global. All rights reserved.
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster />
    </QueryClientProvider>
  );
}
