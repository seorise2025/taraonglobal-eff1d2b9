// Lightweight conversion tracking. Pushes to window.dataLayer (GA4 / GTM)
// and dispatches a browser CustomEvent so any listener (Meta, Clarity, etc.)
// can subscribe. Safe to call on the server, becomes a no-op.

export type LeadChannel = "whatsapp" | "email" | "phone" | "form" | "order";

export interface LeadEventPayload {
  channel: LeadChannel;
  product?: string;
  location?: string; // page path or component id
  value?: number;
  order_number?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackLead(event: string, payload: LeadEventPayload) {
  if (typeof window === "undefined") return;
  const data = {
    event,
    ...payload,
    page_path: typeof location !== "undefined" ? location.pathname : undefined,
    ts: Date.now(),
  };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
    window.dispatchEvent(new CustomEvent("taraon:lead", { detail: data }));
    if (import.meta.env.DEV) console.debug("[lead]", data);
  } catch {
    /* swallow */
  }
}

export const trackWhatsApp = (product?: string, location?: string) =>
  trackLead("whatsapp_click", { channel: "whatsapp", product, location });

export const trackEmail = (product?: string, location?: string) =>
  trackLead("email_click", { channel: "email", product, location });

export const trackPhone = (location?: string) =>
  trackLead("phone_click", { channel: "phone", location });

export const trackFormSubmit = (formId: string, product?: string) =>
  trackLead("form_submit", { channel: "form", product, location: formId });

export const trackOrder = (product: string, order_number: string, quantity?: number) =>
  trackLead("order_submit", { channel: "order", product, order_number, value: quantity });
