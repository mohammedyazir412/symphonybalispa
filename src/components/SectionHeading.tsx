import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", tone === "light" && "text-champagne")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-[2.1rem] leading-[1.1] sm:text-4xl md:text-[2.75rem]",
          tone === "dark" ? "text-ink" : "text-ivory",
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-balance text-[0.975rem] leading-relaxed sm:text-base",
            tone === "dark" ? "text-ink/70" : "text-ivory/70",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
