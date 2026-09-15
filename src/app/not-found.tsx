import Link from "next/link";
import Divider from "@/components/Divider";
import { IconArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory py-28">
      <div className="container-luxe text-center">
        <Divider align="center" className="mb-6" />
        <p className="eyebrow mb-3">404</p>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">
          This Page Has Wandered Off
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
          The page you&apos;re looking for doesn&apos;t exist, or has moved.
          Let&apos;s get you back to somewhere calm.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-charcoal"
        >
          RETURN HOME
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
