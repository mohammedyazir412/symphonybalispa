import Link from "next/link";
import Image from "next/image";
import { site, locationsContact, primaryWhatsapp } from "@/data/site";
import { navLinks } from "@/data/navigation";
import {
  IconInstagram,
  IconFacebook,
  IconWhatsapp,
  IconPhone,
  IconMail,
} from "@/components/icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const locations = Object.values(locationsContact);

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-luxe grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <span className="relative block h-14 w-16">
            <Image
              src="/images/logo.png"
              alt="Symphony Bali Spa"
              fill
              sizes="64px"
              className="object-contain object-left"
            />
          </span>
          <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-ivory/60">
            Discover peace.
            <br />
            Discover yourself.
            <br />
            Discover Symphony.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={primaryWhatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <IconWhatsapp className="h-4 w-4" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${locationsContact.madurai.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <IconMail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-champagne">Navigate</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.875rem] text-ivory/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-champagne">Locations</p>
          <ul className="mt-5 space-y-3">
            {locations.map((loc) => (
              <li key={loc.id}>
                <Link
                  href={`/locations/${loc.id}`}
                  className="text-[0.875rem] text-ivory/70 transition-colors hover:text-gold"
                >
                  {loc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-champagne">Contact</p>
          <ul className="mt-5 space-y-3 text-[0.875rem] text-ivory/70">
            {locations.map((loc) => (
              <li key={loc.id}>
                <a
                  href={loc.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <IconPhone className="h-3.5 w-3.5 shrink-0 text-gold" />
                  {loc.name}: {loc.phoneDisplay}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${locations[0].email}`}
                className="flex items-center gap-2 transition-colors hover:text-gold"
              >
                <IconMail className="h-3.5 w-3.5 shrink-0 text-gold" />
                {locations[0].email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-center text-[0.75rem] text-ivory/45 sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
