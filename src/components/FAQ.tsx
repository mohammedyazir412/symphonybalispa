"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { IconPlus, IconMinus } from "@/components/icons";
import Reveal from "@/components/Reveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <Reveal key={faq.question} delay={i * 50}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-lg text-ink sm:text-xl">
                  {faq.question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-gold">
                  {open ? (
                    <IconMinus className="h-4 w-4" />
                  ) : (
                    <IconPlus className="h-4 w-4" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-[0.925rem] leading-relaxed text-ink/65">
                  {faq.answer}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
