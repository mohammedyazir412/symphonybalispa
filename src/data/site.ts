export const site = {
  name: "Symphony Bali Spa",
  shortName: "Symphony",
  tagline: "Discover peace. Discover yourself. Discover Symphony.",
  description:
    "Authentic Balinese-inspired wellness rituals, luxury massage therapies and rejuvenating spa experiences at Symphony Bali Spa in Madurai and Theni.",
  url: "https://symphonybalispa.com",
  hours: "Daily, 10:30 AM – 8:00 PM",
  social: {
    instagram: "https://www.instagram.com/symphonybalispa",
    facebook: "https://www.facebook.com/symphonybalispa",
  },
} as const;

export type LocationId = "madurai" | "theni";

export const locationsContact: Record<
  LocationId,
  {
    id: LocationId;
    name: string;
    addressLines: string[];
    phoneDisplay: string;
    phoneHref: string;
    whatsappHref: string;
    email: string;
    mapsQuery: string;
  }
> = {
  madurai: {
    id: "madurai",
    name: "Madurai",
    addressLines: [
      "Plot No: 738, 4th Street, Karpaga Nagar,",
      "Madurai, Tamil Nadu – 625007",
    ],
    phoneDisplay: "+91 96007 02871",
    phoneHref: "tel:+919600702871",
    whatsappHref: "https://wa.me/919600702871",
    email: "symphonybalispa@gmail.com",
    mapsQuery:
      "Plot No 738, 4th Street, Karpaga Nagar, Madurai, Tamil Nadu 625007",
  },
  theni: {
    id: "theni",
    name: "Theni",
    addressLines: [
      "Hotel Sivasakthi Towers, Opp New Bus Stand,",
      "Theni, Tamil Nadu – 625531",
    ],
    phoneDisplay: "+91 84387 54561",
    phoneHref: "tel:+918438754561",
    whatsappHref: "https://wa.me/918438754561",
    email: "symphonybalispatheni@gmail.com",
    mapsQuery:
      "Hotel Sivasakthi Towers, Opp New Bus Stand, Theni, Tamil Nadu 625531",
  },
};

export const primaryWhatsapp = locationsContact.madurai.whatsappHref;
