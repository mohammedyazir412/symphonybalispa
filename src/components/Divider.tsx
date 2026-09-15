import { cn } from "@/lib/utils";

export default function Divider({
  align = "left",
  tone = "dark",
  className,
}: {
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          "h-px w-10",
          tone === "dark" ? "bg-gold" : "bg-champagne",
        )}
      />
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "h-3 w-3",
          tone === "dark" ? "text-gold" : "text-champagne",
        )}
        fill="currentColor"
      >
        <path d="M12 2c2 4 6 6 10 6-4 2-8 4-10 10-2-6-6-8-10-10 4 0 8-2 10-6Z" />
      </svg>
      <span
        className={cn(
          "h-px w-10",
          tone === "dark" ? "bg-gold" : "bg-champagne",
        )}
      />
    </div>
  );
}
