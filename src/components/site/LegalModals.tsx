import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalKey = "privacy" | "terms" | "enquiry" | "product";

const CONTENT: Record<ModalKey, { title: string; body: ReactNode }> = {
  privacy: {
    title: "Privacy Notice",
    body: (
      <>
        <p>
          When you submit an enquiry or bulk requirement, TARAON GLOBAL may
          receive your name, company, contact details, location, product
          requirement and message content.
        </p>
        <p>
          This information is used for communication, quotations, order
          coordination, customer support and internal business records.
        </p>
        <p>
          Personal information is not sold to unrelated third parties. Contact
          details are used only for legitimate business communication about
          your enquiry.
        </p>
        <p>
          For questions or requests about your information, contact us at
          info@taraonglobal.com.
        </p>
      </>
    ),
  },
  terms: {
    title: "Website Terms",
    body: (
      <>
        <p>
          The TARAON GLOBAL website is provided for general information about
          the products and services we supply. Content, images, specifications
          and pricing indications may change without notice.
        </p>
        <p>
          You may use the site to browse product information and submit
          enquiries. You must not misuse the site, attempt to disrupt it, or
          submit false or automated enquiries.
        </p>
        <p>
          All content, including logos and product photographs, remains the
          property of TARAON GLOBAL or the respective owner and is protected by
          applicable law.
        </p>
      </>
    ),
  },
  enquiry: {
    title: "Enquiry and Order Terms",
    body: (
      <>
        <p>
          Website submissions are expressions of interest or purchase
          requirements. They do not constitute accepted orders.
        </p>
        <p>
          An order becomes valid only after TARAON GLOBAL confirms product,
          quantity, price, taxes, freight, payment terms, availability and
          dispatch conditions.
        </p>
        <p className="font-medium text-forest-deep">Shipping</p>
        <p>
          Dispatch and delivery estimates depend on product availability,
          quantity, destination, transporter and payment confirmation.
        </p>
      </>
    ),
  },
  product: {
    title: "Product Information Disclaimer",
    body: (
      <>
        <p>
          Website information is general and may not represent the current
          batch specification. Buyers should review the latest product
          specification, COA, label and commercial document before purchase or
          application.
        </p>
        <p>
          Agricultural results vary according to crop, soil, climate, water
          quality, dose, application method and the wider crop programme.
        </p>
      </>
    ),
  },
};

export function LegalTrigger({
  modal,
  children,
}: {
  modal: ModalKey;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-sm text-cream/80 hover:text-gold hover:underline"
      >
        {children}
      </button>
      {open ? (
        <LegalModal modal={modal} onClose={() => setOpen(false)} />
      ) : null}
    </>
  );
}

function LegalModal({
  modal,
  onClose,
}: {
  modal: ModalKey;
  onClose: () => void;
}) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const { title, body } = CONTENT[modal];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [handleClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`legal-title-${modal}`}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-forest-deep/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-background p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={`legal-title-${modal}`}
            className="font-display text-2xl text-forest-deep"
          >
            {title}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="rounded-sm p-1.5 text-ink/60 hover:bg-secondary hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/80">
          {body}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-sm bg-forest-deep px-5 py-2.5 text-sm font-medium text-cream hover:bg-gold hover:text-forest-deep"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
