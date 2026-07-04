/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// vite-imagetools query variants used across the app.
declare module "*&as=srcset" {
  const src: string;
  export default src;
}
declare module "*&format=webp" {
  const src: string;
  export default src;
}
declare module "*&format=avif" {
  const src: string;
  export default src;
}
