import { MessageCircle } from "lucide-react";
import { trackWhatsApp } from "@/lib/analytics";
import { buildDefaultWaHref } from "@/lib/inquiry";

export function WhatsAppFab() {
  const href = buildDefaultWaHref();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp(undefined, "wa_fab")}
      aria-label="Chat with TARAON GLOBAL on WhatsApp"
      className="pulse-wa group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] pl-3 pr-4 py-2.5 text-white shadow-2xl ring-2 ring-gold/70 transition-transform hover:scale-105"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="hidden text-sm font-semibold tracking-wide sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
