// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pre-render every public route at build so crawlers and AI tools get
    // fully-rendered HTML without executing JavaScript.
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: false,
    },
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/applications" },
      { path: "/contact" },
      { path: "/products/super-potassium-shiny-flakes-98" },
      { path: "/products/super-f-humate-big-shiny-flakes" },
      { path: "/products/glycine" },
      { path: "/products/vigora" },
      { path: "/guides/potassium-humate-dosage-cotton-groundnut" },
    ],
  },
  vite: {
    plugins: [imagetools()],
  },
});
