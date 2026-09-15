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
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your branch"
          onClick={() => setModalMode(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-gold/40 bg-charcoal px-6 py-10 shadow-2xl sm:px-10"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setModalMode(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-ivory/60 transition-colors hover:text-gold"
            >
              <IconClose className="h-5 w-5" />
            </button>

            <h3 className="text-balance text-center font-display text-2xl text-gold sm:text-3xl">
              Choose Your Branch
            </h3>
            <p className="mt-2 text-center text-[0.9rem] text-ivory/60">
              Select your preferred spa location to continue
            </p>

            <div className="mt-8 space-y-3">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={modalMode === "whatsapp" ? loc.whatsappHref : loc.phoneHref}
                  target={modalMode === "whatsapp" ? "_blank" : undefined}
                  rel={modalMode === "whatsapp" ? "noreferrer" : undefined}
                  onClick={() => setModalMode(null)}
                  className="flex items-center justify-between rounded-full border border-ivory/15 px-6 py-4 transition-colors hover:border-gold"
                >
                  <span className="font-display text-lg text-gold">
                    {loc.name}
                  </span>
                  <span className="text-[0.9rem] text-ivory/70">
                    {loc.phoneDisplay}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
