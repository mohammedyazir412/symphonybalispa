import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  basePath = "/blogs",
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (pageNumber: number) => {
    return pageNumber === 1 ? basePath : `${basePath}?page=${pageNumber}`;
  };

  const pages: (number | "...")[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (i === 2 || i === totalPages - 1) {
      if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      className="mt-16 flex items-center justify-center gap-2 sm:gap-2.5"
      aria-label="Blog pagination"
    >
      {/* Prev Button */}
      {hasPrev ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex h-10 items-center gap-1.5 rounded-full border border-ink/15 bg-white/80 px-4 text-[0.78rem] font-medium tracking-wider text-ink/80 transition-all hover:border-gold hover:bg-gold hover:text-charcoal shadow-sm"
          aria-label="Previous Page"
        >
          <IconChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">PREV</span>
        </Link>
      ) : (
        <span
          className="flex h-10 items-center gap-1.5 rounded-full border border-ink/8 bg-ink/3 px-4 text-[0.78rem] font-medium tracking-wider text-ink/30 cursor-not-allowed"
          aria-disabled="true"
        >
          <IconChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">PREV</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`dots-${idx}`}
                className="flex h-10 w-8 items-center justify-center text-gold font-serif"
              >
                …
              </span>
            );
          }

          const isCurrent = p === currentPage;

          return isCurrent ? (
            <span
              key={p}
              aria-current="page"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-[0.82rem] font-semibold text-charcoal shadow-[0_4px_12px_rgba(185,154,98,0.35)]"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={getPageUrl(p)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/80 text-[0.82rem] font-medium text-ink/80 transition-all hover:border-gold hover:bg-gold/15 hover:text-gold shadow-sm"
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {hasNext ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex h-10 items-center gap-1.5 rounded-full border border-ink/15 bg-white/80 px-4 text-[0.78rem] font-medium tracking-wider text-ink/80 transition-all hover:border-gold hover:bg-gold hover:text-charcoal shadow-sm"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">NEXT</span>
          <IconChevronRight className="h-3.5 w-3.5" />
        </Link>
      ) : (
        <span
          className="flex h-10 items-center gap-1.5 rounded-full border border-ink/8 bg-ink/3 px-4 text-[0.78rem] font-medium tracking-wider text-ink/30 cursor-not-allowed"
          aria-disabled="true"
        >
          <span className="hidden sm:inline">NEXT</span>
          <IconChevronRight className="h-3.5 w-3.5" />
        </span>
      )}
    </nav>
  );
}
