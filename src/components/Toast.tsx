"use client";

import { useEffect } from "react";
import { IconClose } from "@/components/icons";

export default function Toast({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      className="fixed inset-x-4 top-5 z-[100] mx-auto flex max-w-md items-start justify-between gap-3 border border-red-900/20 bg-ink px-5 py-4 text-ivory shadow-lg sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
    >
      <p className="text-[0.85rem] leading-relaxed">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="mt-0.5 shrink-0 text-ivory/50 transition-colors hover:text-gold"
      >
        <IconClose className="h-4 w-4" />
      </button>
    </div>
  );
}
