import type { Treatment } from "@/data/treatments";
import TreatmentCard from "@/components/TreatmentCard";
import Reveal, { type RevealVariant } from "@/components/Reveal";

export default function TreatmentGrid({
  treatments,
  variant = "up",
}: {
  treatments: Treatment[];
  variant?: RevealVariant;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {treatments.map((treatment, i) => (
        <Reveal key={treatment.slug} delay={(i % 3) * 90} variant={variant}>
          <TreatmentCard treatment={treatment} />
        </Reveal>
      ))}
    </div>
  );
}
