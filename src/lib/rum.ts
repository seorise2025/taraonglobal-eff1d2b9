// Real User Monitoring. Core Web Vitals + JS errors, pushed to dataLayer
// (GA4 / GTM) and dispatched as CustomEvents. Safe on server (no-op).

type Metric = {
  name: "LCP" | "CLS" | "INP" | "FCP" | "TTFB";
  value: number;
  id: string;
  rating?: "good" | "needs-improvement" | "poor";
};

function push(event: string, detail: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const data = {
    event,
    ...detail,
    page_path: location.pathname,
    ts: Date.now(),
  };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
    window.dispatchEvent(new CustomEvent("taraon:rum", { detail: data }));
    if (import.meta.env.DEV) console.debug("[rum]", data);
  } catch {
    /* swallow */
  }
}

let started = false;

export async function startRUM() {
  if (typeof window === "undefined" || started) return;
  started = true;

  // Core Web Vitals
  try {
    const { onLCP, onCLS, onINP, onFCP, onTTFB } = await import("web-vitals");
    const report = (m: Metric) =>
      push("web_vital", {
        metric: m.name,
        value: Math.round(m.value * 1000) / 1000,
        rating: m.rating,
        id: m.id,
      });
    onLCP(report);
    onCLS(report);
    onINP(report);
    onFCP(report);
    onTTFB(report);
  } catch {
    /* web-vitals not loaded */
  }

  // JS runtime errors
  window.addEventListener("error", (e) => {
    push("js_error", {
      message: e.message,
      source: e.filename,
      line: e.lineno,
      col: e.colno,
      stack: e.error?.stack?.slice(0, 500),
    });
  });

  // Unhandled promise rejections
  window.addEventListener("unhandledrejection", (e) => {
    const reason = e.reason;
    push("js_unhandled_rejection", {
      message: typeof reason === "string" ? reason : reason?.message ?? String(reason),
      stack: reason?.stack?.slice(0, 500),
    });
  });
}
