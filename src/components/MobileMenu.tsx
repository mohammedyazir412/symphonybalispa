"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { IconClose, IconInstagram, IconFacebook } from "@/components/icons";
import { site } from "@/data/site";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] bg-charcoal text-ivory transition-opacity duration-300 lg:hidden",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="container-luxe flex h-20 items-center justify-between sm:h-24">
        <Link href="/" aria-label="Symphony Bali Spa — Home" onClick={onClose}>
          <span className="relative block h-11 w-12">
            <Image
              src="/images/logo.png"
              alt="Symphony Bali Spa"
              fill
              sizes="48px"
              className="object-contain"
            />
          </span>
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center"
        >
          <IconClose className="h-6 w-6" />
        </button>
      </div>

      <nav className="container-luxe mt-6 flex flex-col gap-1">
        {navLinks.map((link, i) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-b border-ivory/10 py-4 font-display text-3xl transition-colors",
                active ? "text-gold" : "text-ivory hover:text-champagne",
              )}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="container-luxe mt-8 flex flex-col gap-6">
        <Link
          href="/book"
          className="inline-flex w-fit items-center border border-gold px-7 py-3 text-[0.75rem] font-semibold tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
        >
          BOOK NOW
        </Link>

        <div className="flex items-center gap-5 text-ivory/70">
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-gold"
          >
            <IconInstagram className="h-5 w-5" />
          </a>
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="transition-colors hover:text-gold"
          >
            <IconFacebook className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
