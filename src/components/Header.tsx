"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/MobileMenu";
import { IconMenu } from "@/components/icons";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenOnMobile, setHiddenOnMobile] = useState(false);
  const lastScrollY = useRef(0);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const activeIndex = navLinks.findIndex((link) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
  );

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const highlightIndex = hoverIndex ?? activeIndex;

  const updatePill = useCallback(() => {
    const el = highlightIndex >= 0 ? linkRefs.current[highlightIndex] : null;
    if (!el) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    setPillStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  }, [highlightIndex]);

  useLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  // The nav grows/shrinks while the logo and button slide in or out;
  // keep the highlight pill aligned with the links throughout.
  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => updatePill());
    observer.observe(nav);
    return () => observer.disconnect();
  }, [updatePill]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 20 : y > 60));

      // Mobile: hide the header while scrolling down, show it on any scroll up.
      const delta = y - lastScrollY.current;
      if (y < 40) {
        setHiddenOnMobile(false);
      } else if (delta > 6) {
        setHiddenOnMobile(true);
      } else if (delta < -6) {
        setHiddenOnMobile(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-transparent transition-transform duration-300 ease-out",
          hiddenOnMobile && !menuOpen && "max-lg:-translate-y-full",
        )}
      >
        <div className="container-luxe flex h-20 items-center justify-between sm:h-24">
          <Link
            href="/"
            aria-label="Symphony Bali Spa — Home"
            tabIndex={scrolled ? -1 : undefined}
            className={cn(
              "flex items-center transition-all duration-500 ease-out",
              scrolled &&
                "lg:pointer-events-none lg:translate-x-10 lg:scale-75 lg:opacity-0",
            )}
            onClick={handleHomeClick}
          >
            <span className="relative h-12 w-14 shrink-0 sm:h-14 sm:w-16">
              <Image
                src="/images/logo.png"
                alt="Symphony Bali Spa"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </span>
          </Link>

          <nav
            ref={navContainerRef}
            onMouseLeave={() => setHoverIndex(null)}
            className="relative hidden items-center gap-1 rounded-full border border-ink/10 bg-ivory/80 p-1.5 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-ink/75 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:flex"
          >
            <span
              aria-hidden="true"
              className="absolute top-1.5 bottom-1.5 rounded-full bg-gold/15 transition-[left,width,opacity] duration-300 ease-out"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
              }}
            />
            <Link
              href="/"
              aria-label="Symphony Bali Spa — Home"
              tabIndex={scrolled ? undefined : -1}
              onClick={handleHomeClick}
              className={cn(
                "relative z-10 flex shrink-0 items-center overflow-hidden transition-[max-width,opacity,margin] duration-500 ease-out",
                scrolled ? "ml-1 mr-1 max-w-14 opacity-100" : "-ml-1 max-w-0 opacity-0",
              )}
            >
              <span className="relative block h-9 w-12 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </span>
            </Link>
            {navLinks.map((link, i) => {
              const active = i === activeIndex;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setHoverIndex(i)}
                  onClick={link.href === "/" ? handleHomeClick : undefined}
                  className={cn(
                    "relative z-10 rounded-full px-4 py-2 transition-colors duration-300",
                    active ? "text-gold" : "hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/book"
              tabIndex={scrolled ? undefined : -1}
              className={cn(
                "relative z-10 shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-gold text-[0.72rem] font-semibold tracking-[0.14em] text-charcoal transition-[max-width,opacity,margin,padding] duration-500 ease-out hover:bg-champagne",
                scrolled
                  ? "ml-1 max-w-40 px-5 py-2 opacity-100"
                  : "-ml-1 max-w-0 px-0 py-2 opacity-0",
              )}
            >
              BOOK NOW
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/book"
              tabIndex={scrolled ? -1 : undefined}
              className={cn(
                "hidden rounded-full bg-gold px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.14em] text-charcoal transition-all duration-500 ease-out hover:scale-105 hover:bg-champagne hover:shadow-[0_6px_20px_rgba(185,154,98,0.4)] sm:inline-block",
                scrolled &&
                  "lg:pointer-events-none lg:-translate-x-10 lg:scale-75 lg:opacity-0",
              )}
            >
              BOOK NOW
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-ivory/80 text-ink shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
