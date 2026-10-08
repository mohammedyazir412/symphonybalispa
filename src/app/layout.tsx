import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import JsonLd from "@/components/JsonLd";
import { site, locationsContact } from "@/data/site";

const batangas = localFont({
  src: "../fonts/batangas-bold.otf",
  variable: "--font-script",
  weight: "700",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Symphony Bali Spa | Luxury Bali Spa in Madurai & Theni",
    template: "%s | Symphony Bali Spa",
  },
  description: site.description,
  openGraph: {
    title: "Symphony Bali Spa | Luxury Bali Spa in Madurai & Theni",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Symphony Bali Spa | Luxury Bali Spa in Madurai & Theni",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    sameAs: [site.social.instagram, site.social.facebook],
    department: Object.values(locationsContact).map((loc) => ({
      "@type": "DaySpa",
      name: `${site.name} — ${loc.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.addressLines.join(", "),
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      telephone: loc.phoneDisplay,
      email: loc.email,
    })),
  };

  return (
    <html lang="en" className={`${batangas.variable} ${cormorant.variable} ${jost.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory text-ink antialiased">
        <JsonLd data={organizationLd} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
