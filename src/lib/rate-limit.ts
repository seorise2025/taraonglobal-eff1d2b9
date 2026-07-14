import { supabase } from "@/integrations/supabase/client";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

async function getClientKey(): Promise<string> {
  // Client-side fingerprint fallback (we cannot read the real IP from the
  // browser). Server-enforced limits are still applied at DB row insert time
  // via RLS length checks + duplicate detection below.
  try {
    const nav = navigator?.userAgent ?? "ua";
    return `${window.location.hostname}::${nav.slice(0, 40)}`;
  } catch {
    return "anon";
  }
}

export async function checkRateLimit(
  formType: "enquiry" | "order",
  contentHash: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    const key = await getClientKey();
    const since = new Date(Date.now() - WINDOW_MS).toISOString();

    // Duplicate submission (same hash in the last hour)
    const { data: dup } = await supabase
      .from("submission_log")
      .select("id")
      .eq("form_type", formType)
      .eq("content_hash", contentHash)
      .gte("created_at", since)
      .limit(1);
    if (dup && dup.length > 0) {
      return { ok: false, reason: "duplicate" };
    }

    const { data: recent } = await supabase
      .from("submission_log")
      .select("id")
      .eq("ip_address", key)
      .gte("created_at", since);
    if (recent && recent.length >= MAX_PER_WINDOW) {
      return { ok: false, reason: "rate_limit" };
    }

    await supabase
      .from("submission_log")
      .insert({ ip_address: key, form_type: formType, content_hash: contentHash });
    return { ok: true };
  } catch {
    // Fail open, do not block real users on network issues
    return { ok: true };
  }
}

export async function hashPayload(input: string): Promise<string> {
  try {
    const enc = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return String(input.length);
  }
}

export function getSubmissionContext() {
  if (typeof window === "undefined") {
    return {
      source_page: null,
      referrer: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      user_agent: null,
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    source_page: window.location.pathname,
    referrer: document.referrer || null,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    user_agent: navigator.userAgent.slice(0, 200),
  };
}
