import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/916359193666?text=Hi%20Taraon%20Global%2C%20I%27d%20like%20a%20quote%20for%20potassium%20humate."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Taraon Global on WhatsApp"
      className="pulse-wa fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
