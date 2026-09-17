"use client";

import { useEffect, useState } from "react";
import {
  IconWhatsapp,
  IconPhone,
  IconInstagram,
  IconClose,
} from "@/components/icons";
import { site, locationsContact } from "@/data/site";

type ModalMode = "whatsapp" | "call" | null;

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const locations = Object.values(locationsContact);

  useEffect(() => {
    if (!modalMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalMode(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalMode]);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7">
        {open && (
          <>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onClick={() => setOpen(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg shadow-charcoal/30 transition-transform hover:scale-105"
            >
              <IconInstagram className="h-5 w-5" />
            </a>
            <button
              type="button"
              aria-label="Call us"
              onClick={() => {
                setModalMode("call");
                setOpen(false);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-charcoal/30 transition-transform hover:scale-105"
            >
              <IconPhone className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Chat on WhatsApp"
              onClick={() => {
                setModalMode("whatsapp");
                setOpen(false);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-charcoal/30 transition-transform hover:scale-105"
            >
              <IconWhatsapp className="h-5 w-5" />
            </button>
          </>
        )}

        <button
          type="button"
          aria-label={open ? "Close contact menu" : "Open contact menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-charcoal/30 transition-transform hover:scale-105"
        >
          {open ? (
            <IconClose className="h-6 w-6" />
          ) : (
            <IconWhatsapp className="h-7 w-7" />
          )}
        </button>
      </div>

      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="floating-actions-modal-title"
          onClick={() => setModalMode(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm border border-gold/40 bg-cream px-7 py-9 text-center"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setModalMode(null)}
              className="absolute right-4 top-4 text-ink/40 transition-colors hover:text-ink"
            >
              <IconClose className="h-4 w-4" />
            </button>

            <p className="eyebrow mb-2">One Last Step</p>
            <h3 id="floating-actions-modal-title" className="font-display text-xl text-ink">
              Which branch should we {modalMode === "whatsapp" ? "message" : "call"}?
            </h3>

            <div className="mt-6 flex flex-col gap-3">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={modalMode === "whatsapp" ? loc.whatsappHref : loc.phoneHref}
                  target={modalMode === "whatsapp" ? "_blank" : undefined}
                  rel={modalMode === "whatsapp" ? "noreferrer" : undefined}
                  onClick={() => setModalMode(null)}
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
