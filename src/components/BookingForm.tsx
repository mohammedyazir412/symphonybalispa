"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { treatments } from "@/data/treatments";
import { locationsContact } from "@/data/site";
import { IconWhatsapp, IconArrowRight, IconClose } from "@/components/icons";
import Toast from "@/components/Toast";

const BOOKING_OPEN_TIME = "10:30";
const BOOKING_CLOSE_TIME = "19:30";

function todayDateStr() {
  return new Date().toISOString().split("T")[0];
}

function nowTimeStr() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

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

    if (!form.date) {
      next.date = "Please choose a preferred date.";
    } else if (form.date < todayDateStr()) {
      next.date = "Please choose a date from today onward.";
    }

    if (!form.time) {
      next.time = "Please choose a preferred time.";
    } else if (form.time < BOOKING_OPEN_TIME || form.time > BOOKING_CLOSE_TIME) {
      next.time = "We only take bookings between 10:30 AM and 7:30 PM.";
    } else if (form.date === todayDateStr() && form.time <= nowTimeStr()) {
      next.time = "Please choose a later time today.";
    }

    setErrors(next);
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    if (next.date || next.time) {
      setToastMessage(next.date ?? next.time ?? null);
      return;
    }
    if (Object.keys(next).length > 0) return;
    setStatus("success");
  };

  const buildWhatsappHref = (loc: (typeof locations)[number]) => {
    const treatment = treatments.find((t) => t.slug === form.treatment);
    const lines = [
      `Hi Symphony Bali Spa, I'd like to book an appointment.`,
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      treatment && `Treatment: ${treatment.name}`,
      form.date && `Preferred date: ${form.date}`,
      form.time && `Preferred time: ${form.time}`,
      form.guests && `Guests: ${form.guests}`,
      form.message && `Note: ${form.message}`,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    return `${loc.whatsappHref}?text=${text}`;
  };


  if (status === "success") {
    return (
      <>
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
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
          {locations.map((loc) => (
            <a
              key={loc.id}
              href={buildWhatsappHref(loc)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-[0.75rem] font-semibold tracking-[0.12em] text-white transition-opacity hover:opacity-90"
            >
              <IconWhatsapp className="h-4 w-4" />
              CONFIRM WITH {loc.name.toUpperCase()}
            </a>
          ))}
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
      </>
    );
  }

  return (
    <>
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
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
            min={BOOKING_OPEN_TIME}
            max={BOOKING_CLOSE_TIME}
            onChange={(e) => update("time", e.target.value)}
            aria-invalid={Boolean(errors.time)}
          />
          {errors.time ? (
            <p className="mt-1.5 text-xs text-red-700">{errors.time}</p>
          ) : (
            <p className="mt-1.5 text-xs text-ink/40">Available 10:30 AM – 7:30 PM</p>
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
        <button
          type="button"
          onClick={() => setShowWhatsappModal(true)}
          className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-ink transition-colors hover:border-[#25D366] hover:text-[#25D366]"
        >
          <IconWhatsapp className="h-4 w-4" />
          BOOK VIA WHATSAPP
        </button>
      </div>
      </form>

      {showWhatsappModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-whatsapp-modal-title"
          onClick={() => setShowWhatsappModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm border border-gold/40 bg-cream px-7 py-9 text-center"
          >
            <button
              type="button"
              onClick={() => setShowWhatsappModal(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-ink/40 transition-colors hover:text-ink"
            >
              <IconClose className="h-4 w-4" />
            </button>
            <p className="eyebrow mb-2">One Last Step</p>
            <h3 id="book-whatsapp-modal-title" className="font-display text-xl text-ink">
              Which branch should we message?
            </h3>
            <div className="mt-6 flex flex-col gap-3">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={buildWhatsappHref(loc)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowWhatsappModal(false)}
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
