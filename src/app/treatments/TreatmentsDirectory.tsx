"use client";

import { useState } from "react";
import { categories, treatments, type TreatmentCategory } from "@/data/treatments";
import TreatmentGrid from "@/components/TreatmentGrid";
import { cn } from "@/lib/utils";

export default function TreatmentsDirectory() {
  const [active, setActive] = useState<TreatmentCategory | "all">("all");

  const filtered =
    active === "all" ? treatments : treatments.filter((t) => t.category === active);

  return (
    <div>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 sm:flex-wrap">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={cn(
            "shrink-0 border px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.12em] transition-colors",
            active === "all"
              ? "border-gold bg-gold text-charcoal"
              : "border-ink/20 text-ink/60 hover:border-gold hover:text-gold",
          )}
        >
          ALL TREATMENTS
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            className={cn(
              "shrink-0 border px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors",
              active === cat.id
                ? "border-gold bg-gold text-charcoal"
                : "border-ink/20 text-ink/60 hover:border-gold hover:text-gold",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[0.8rem] text-ink/45">
        {filtered.length} treatment{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8">
        <TreatmentGrid treatments={filtered} />
      </div>
    </div>
  );
}
