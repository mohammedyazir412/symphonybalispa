"use client";

import { useState } from "react";
import { locationsContact } from "@/data/site";
import { IconArrowRight, IconWhatsapp } from "@/components/icons";

interface FormState {
  name: string;
  contact: string;
  message: string;
}

const inputClasses =
  "w-full border border-ink/20 bg-ivory px-4 py-3 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold";
const labelClasses = "eyebrow mb-2 block text-ink/50";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const locations = Object.values(locationsContact);

  const buildWhatsappHref = (loc: (typeof locations)[number]) => {
    const lines = [
      `Hi Symphony Bali Spa,`,
      form.name && `Name: ${form.name}`,
      form.contact && `Contact: ${form.contact}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);
    return `${loc.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.contact.trim()) next.contact = "Please enter a phone or email.";
    if (!form.message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    if (Object.keys(next).length === 0) setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="border border-gold/40 bg-cream px-8 py-12 text-center">
        <p className="eyebrow mb-3">Message Received</p>
        <h3 className="font-display text-2xl text-ink">Thank you, {form.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-4 max-w-sm text-[0.9rem] leading-relaxed text-ink/65">
          We&apos;ll get back to you shortly. For a faster reply, message either
          branch directly on WhatsApp.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {locations.map((loc) => (
            <a
              key={loc.id}
              href={buildWhatsappHref(loc)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-[0.75rem] font-semibold tracking-[0.12em] text-white transition-opacity hover:opacity-90"
            >
              <IconWhatsapp className="h-4 w-4" />
              MESSAGE {loc.name.toUpperCase()} BRANCH
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className={labelClasses} htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className={inputClasses}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
      </div>
      <div>
        <label className={labelClasses} htmlFor="contact-info">
          Phone or Email
        </label>
        <input
          id="contact-info"
          className={inputClasses}
          value={form.contact}
          onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
          placeholder="How can we reach you?"
        />
        {errors.contact && <p className="mt-1.5 text-xs text-red-700">{errors.contact}</p>}
      </div>
      <div>
        <label className={labelClasses} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={inputClasses}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="How can we help?"
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-700">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-charcoal"
      >
        SEND MESSAGE
        <IconArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
