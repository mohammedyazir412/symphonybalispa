"use client";

import { useState } from "react";
import { IconWhatsapp, IconClose } from "@/components/icons";
import { locationsContact } from "@/data/site";

export default function WhatsAppPicker({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const locations = Object.values(locationsContact);

  return (
    <>
      <button
        type="button"
        aria-label="WhatsApp"
        onClick={() => setOpen(true)}
        className={className}
      >
        <IconWhatsapp className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-modal-title"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm border border-gold/40 bg-cream px-7 py-9 text-center"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-ink/40 transition-colors hover:text-ink"
            >
              <IconClose className="h-4 w-4" />
            </button>
            <p className="eyebrow mb-2">One Last Step</p>
            <h3 id="whatsapp-modal-title" className="font-display text-xl text-ink">
              Which branch should we message?
            </h3>
            <div className="mt-6 flex flex-col gap-3">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={loc.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 border border-ink/20 px-6 py-3 text-[0.8rem] font-semibold tracking-[0.1em] text-ink transition-colors hover:border-gold hover:bg-ink hover:text-ivory"
                >
                  {loc.name.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
