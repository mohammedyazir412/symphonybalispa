"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/MobileMenu";
import { IconMenu } from "@/components/icons";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
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
  const highlightIndex = hoverIndex ?? activeIndex;

  useLayoutEffect(() => {
    const el = highlightIndex >= 0 ? linkRefs.current[highlightIndex] : null;
    if (!el) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    setPillStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  }, [highlightIndex]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          solid
            ? "bg-ivory/95 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur"
            : "bg-transparent",
        )}
      >
        {!solid && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/65 via-charcoal/25 to-transparent"
          />
        )}
        <div className="container-luxe flex h-20 items-center justify-between sm:h-24">
          <Link href="/" aria-label="Symphony Bali Spa — Home" className="flex items-center">
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
            className={cn(
              "relative hidden items-center gap-1 rounded-full border p-1.5 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-colors duration-500 lg:flex",
              solid
                ? "border-ink/10 bg-ink/[0.03] text-ink/75"
                : "border-ivory/15 bg-ivory/5 text-ivory/90 backdrop-blur-sm",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 bottom-1.5 rounded-full transition-[left,width,opacity] duration-300 ease-out",
                solid ? "bg-gold/15" : "bg-ivory/15",
              )}
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
              }}
            />
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
                  className={cn(
                    "relative z-10 rounded-full px-4 py-2 transition-colors duration-300",
                    active ? "text-gold" : "hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/book"
              className="hidden rounded-full bg-gold px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.14em] text-charcoal transition-all duration-300 hover:scale-105 hover:bg-champagne hover:shadow-[0_6px_20px_rgba(185,154,98,0.4)] sm:inline-block"
            >
              BOOK NOW
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={cn(
                "flex h-10 w-10 items-center justify-center lg:hidden",
                solid ? "text-ink" : "text-ivory",
              )}
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
