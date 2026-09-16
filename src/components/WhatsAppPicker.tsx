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
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Choose your branch"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-gold/40 bg-charcoal px-6 py-10 shadow-2xl sm:px-10"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-ivory/60 transition-colors hover:text-gold"
            >
              <IconClose className="h-5 w-5" />
            </button>

            <h3 className="text-balance text-center font-display text-2xl text-gold sm:text-3xl">
              Choose Your Branch
            </h3>
            <p className="mt-2 text-center text-[0.9rem] text-ivory/60">
              Select your preferred spa location to continue on WhatsApp
            </p>

            <div className="mt-8 space-y-3">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={loc.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
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
