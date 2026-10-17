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
    const path = pageNumber === 1 ? basePath : `${basePath}/page/${pageNumber}`;
    return `${path}#articles`;
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

  const edge =
    "group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors";
  const edgeActive = "text-ink hover:text-gold";
  const edgeDisabled = "cursor-not-allowed text-ink/25";

  return (
    <nav
      className="mt-16 flex items-center justify-between gap-4 border-t border-ink/10 pt-8 sm:mt-20"
      aria-label="Blog pagination"
    >
      {hasPrev ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className={`${edge} ${edgeActive}`}
          aria-label="Previous Page"
        >
          <IconChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Prev</span>
        </Link>
      ) : (
        <span className={`${edge} ${edgeDisabled}`} aria-disabled="true">
          <IconChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </span>
      )}

      <div className="flex items-center gap-4 sm:gap-7">
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <span key={`dots-${idx}`} className="text-ink/30">
                …
              </span>
            );
          }

          const isCurrent = p === currentPage;

          return isCurrent ? (
            <span
              key={p}
              aria-current="page"
              className="border-b-2 border-gold pb-1 font-display text-2xl font-semibold leading-none text-gold"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={getPageUrl(p)}
              className="border-b-2 border-transparent pb-1 font-display text-2xl leading-none text-ink/65 transition-colors hover:border-gold/50 hover:text-ink"
            >
              {p}
            </Link>
          );
        })}
      </div>

      {hasNext ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className={`${edge} ${edgeActive}`}
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <IconChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <span className={`${edge} ${edgeDisabled}`} aria-disabled="true">
          <span className="hidden sm:inline">Next</span>
          <IconChevronRight className="h-3.5 w-3.5" />
        </span>
      )}
    </nav>
  );
}
