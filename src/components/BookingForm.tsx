"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { treatments } from "@/data/treatments";
import { locationsContact } from "@/data/site";
import { IconWhatsapp, IconArrowRight } from "@/components/icons";

interface FormState {
  name: string;
  phone: string;
  location: string;
  treatment: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

const emptyState: FormState = {
  name: "",
  phone: "",
  location: "",
  treatment: "",
  date: "",
  time: "",
  guests: "1",
  message: "",
};

const inputClasses =
  "w-full border border-ink/20 bg-ivory px-4 py-3 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold";
const labelClasses = "eyebrow mb-2 block text-ink/50";

export default function BookingForm() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<FormState>(() => ({
    ...emptyState,
    treatment: searchParams.get("treatment") ?? "",
    location: searchParams.get("location") ?? "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const locations = useMemo(() => Object.values(locationsContact), []);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[0-9+()\s-]{7,}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!form.location) next.location = "Please choose a location.";
    if (!form.treatment) next.treatment = "Please choose a treatment.";
    if (!form.date) next.date = "Please choose a preferred date.";
    if (!form.time) next.time = "Please choose a preferred time.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("success");
  };

  const whatsappHref = useMemo(() => {
    const loc = locationsContact[form.location as keyof typeof locationsContact];
    const treatment = treatments.find((t) => t.slug === form.treatment);
    const lines = [
      `Hi Symphony Bali Spa, I'd like to book an appointment.`,
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      loc && `Location: ${loc.name}`,
      treatment && `Treatment: ${treatment.name}`,
      form.date && `Preferred date: ${form.date}`,
      form.time && `Preferred time: ${form.time}`,
      form.guests && `Guests: ${form.guests}`,
      form.message && `Note: ${form.message}`,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    const base = loc?.whatsappHref ?? locationsContact.madurai.whatsappHref;
    return `${base}?text=${text}`;
  }, [form]);

  if (status === "success") {
    return (
      <div className="border border-gold/40 bg-cream px-8 py-14 text-center sm:px-14">
        <p className="eyebrow mb-3">Request Received</p>
        <h3 className="font-display text-2xl text-ink sm:text-3xl">
          Thank you, {form.name.split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[0.925rem] leading-relaxed text-ink/65">
          We&apos;ve noted your preferred details. Our team will call you at{" "}
          {form.phone} to confirm your appointment. For the fastest response,
          send us the same details on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-[0.75rem] font-semibold tracking-[0.12em] text-white transition-opacity hover:opacity-90"
          >
            <IconWhatsapp className="h-4 w-4" />
            CONFIRM ON WHATSAPP
          </a>
          <button
            type="button"
            onClick={() => {
              setForm(emptyState);
              setStatus("idle");
            }}
            className="text-[0.75rem] font-semibold tracking-[0.12em] text-ink/60 underline-offset-4 hover:text-gold hover:underline"
          >
            BOOK ANOTHER VISIT
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClasses}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="+91 90000 00000"
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="location">
            Location
          </label>
          <select
            id="location"
            className={inputClasses}
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            aria-invalid={Boolean(errors.location)}
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1.5 text-xs text-red-700">{errors.location}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="treatment">
            Treatment
          </label>
          <select
            id="treatment"
            className={inputClasses}
            value={form.treatment}
            onChange={(e) => update("treatment", e.target.value)}
            aria-invalid={Boolean(errors.treatment)}
          >
            <option value="">Select a treatment</option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
          {errors.treatment && (
            <p className="mt-1.5 text-xs text-red-700">{errors.treatment}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="date">
            Preferred Date
          </label>
          <input
            id="date"
            type="date"
            className={inputClasses}
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => update("date", e.target.value)}
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date && (
            <p className="mt-1.5 text-xs text-red-700">{errors.date}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="time">
            Preferred Time
          </label>
          <input
            id="time"
            type="time"
            className={inputClasses}
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
            aria-invalid={Boolean(errors.time)}
          />
          {errors.time && (
            <p className="mt-1.5 text-xs text-red-700">{errors.time}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="guests">
            Number of Guests
          </label>
          <select
            id="guests"
            className={inputClasses}
            value={form.guests}
            onChange={(e) => update("guests", e.target.value)}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClasses} htmlFor="message">
            Message <span className="normal-case text-ink/30">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            className={inputClasses}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Anything we should know ahead of your visit?"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-charcoal"
        >
          REQUEST APPOINTMENT
          <IconArrowRight className="h-4 w-4" />
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-ink transition-colors hover:border-[#25D366] hover:text-[#25D366]"
        >
          <IconWhatsapp className="h-4 w-4" />
          BOOK VIA WHATSAPP
        </a>
      </div>
    </form>
  );
}
