type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconLeaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 20c8-1 14-7 15-15-8 1-14 7-15 15Z" />
      <path d="M6 18c3-3 7-7 11-11" />
    </svg>
  );
}

export function IconAward({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 6.7l.8 1.7 1.9.2-1.4 1.3.4 1.9-1.7-1-1.7 1 .4-1.9-1.4-1.3 1.9-.2.8-1.7Z" />
      <path d="M9 13.8 7.3 20l4.7-2.6 4.7 2.6-1.7-6.2" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c.8-3.4 3-5.2 5.5-5.2s4.7 1.8 5.5 5.2" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.3c2.1.3 3.7 1.9 4.3 4.7" />
    </svg>
  );
}

export function IconStethoscope({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7.5 3v4.3a3.3 3.3 0 0 0 6.6 0V3" />
      <path d="M10.8 10v1.8a5 5 0 0 0 10 0V10" />
      <circle cx="20.8" cy="10" r="1.7" />
      <circle cx="9" cy="15.5" r="2.8" />
    </svg>
  );
}

export function IconGoogle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.04 12.27c0-.82-.07-1.42-.22-2.05H12.24v3.72h6.19c-.12 1.02-.8 2.56-2.31 3.6l-.02.14 3.36 2.6.23.02c2.14-1.97 3.35-4.88 3.35-8.03Z" />
      <path d="M12.24 23.5c3.04 0 5.6-1 7.46-2.72l-3.55-2.75c-.95.66-2.23 1.13-3.91 1.13-2.99 0-5.52-1.97-6.42-4.7l-.13.01-3.5 2.7-.05.12c1.85 3.68 5.65 6.21 10.1 6.21Z" />
      <path d="M5.82 14.46a6.4 6.4 0 0 1-.35-2.07c0-.72.13-1.42.34-2.07l-.01-.14-3.55-2.76-.12.06A11.5 11.5 0 0 0 .84 12.4c0 1.86.45 3.62 1.28 5.17l3.7-3.11Z" />
      <path d="M12.24 5.62c2.11 0 3.54.91 4.35 1.67l3.18-3.1C17.82 2.4 15.28 1.3 12.24 1.3c-4.45 0-8.25 2.53-10.1 6.21l3.68 2.9c.9-2.73 3.43-4.79 6.42-4.79Z" />
    </svg>
  );
}

export function IconSmiley({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9" cy="10.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10.2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8 14.2c1 1.5 2.4 2.2 4 2.2s3-.7 4-2.2" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" />
    </svg>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function IconRoom({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="4" y="9" width="16" height="11" rx="0.5" />
      <path d="M2 10 12 3l10 7" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function IconSteam({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 3c-1 1.5.6 2-0.2 3.6C7 8 7.4 9.4 8.4 10" />
      <path d="M13 3c-1 1.5.6 2-.2 3.6-.8 1.4-.4 2.8.6 3.4" />
      <path d="M17 3c-1 1.5.6 2-.2 3.6-.8 1.4-.4 2.8.6 3.4" />
      <rect x="4" y="12" width="16" height="8" rx="1" />
    </svg>
  );
}

export function IconJacuzzi({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3 16h18" />
      <path d="M4 16v3a1 1 0 0 0 1 1h1" />
      <path d="M20 16v3a1 1 0 0 1-1 1h-1" />
      <path d="M3 12c1.2-1.4 2.4-1.4 3.6 0s2.4 1.4 3.6 0 2.4-1.4 3.6 0 2.4 1.4 3.6 0 2.4-1.4 3.6 0" />
      <circle cx="7" cy="9" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <circle cx="17" cy="9" r="1" />
    </svg>
  );
}

export function IconProduct({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M10 3h4" />
      <path d="M11 3v3.2c0 .4-.15.7-.4 1L9 9.4c-.5.5-.8 1.2-.8 2v7.6c0 .55.45 1 1 1h5.6c.55 0 1-.45 1-1v-7.6c0-.8-.3-1.5-.8-2L13.4 7.2c-.25-.3-.4-.6-.4-1V3" />
      <path d="M8.2 14h7.6" />
    </svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 4h3.4l1.4 4.2-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 4.2 1.4V19a2 2 0 0 1-2 2C11.5 21 3 12.5 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function IconWhatsapp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.5A9.5 9.5 0 0 0 3.6 17l-1.1 4.5 4.6-1.2a9.5 9.5 0 1 0 5-17.8Zm0 17.3a7.8 7.8 0 0 1-4-1.1l-.3-.2-2.8.7.7-2.7-.2-.3a7.8 7.8 0 1 1 6.6 3.6Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4s-.5-1.2-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.5.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M14 21v-7h2.4l.4-3H14V9c0-.9.3-1.5 1.7-1.5H17V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8.5v3H11v7h3Z" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconMinus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconHeart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 20.2s-7.3-4.5-9.8-9C.7 8 1.8 4.6 5 3.7c2-.6 3.9.2 5 1.9 1.1-1.7 3-2.5 5-1.9 3.2.9 4.3 4.3 2.8 7.5-2.5 4.5-9.8 9-9.8 9Z" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 6.5l8 6.5 8-6.5" />
    </svg>
  );
}

export function IconPlay({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.5 8.5l5.5 3.5-5.5 3.5v-7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
