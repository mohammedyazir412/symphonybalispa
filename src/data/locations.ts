import type { ImageKey } from "@/lib/images";
import { locationsContact, type LocationId } from "@/data/site";

export interface LocationContent {
  id: LocationId;
  name: string;
  title: string;
  intro: string;
  description: string;
  heroImage: ImageKey;
  galleryImages: ImageKey[];
}

export const locationsContent: Record<LocationId, LocationContent> = {
  madurai: {
    id: "madurai",
    name: "Madurai",
    title: "Symphony Bali Spa — Madurai",
    intro:
      "Tucked into Karpaga Nagar, our Madurai sanctuary brings Balinese-inspired ritual to the heart of the temple city.",
    description:
      "Step off the street and into a space designed for stillness — warm wood, soft lighting and the quiet hum of private treatment rooms. Our Madurai therapists are trained across our full range of massage and body rituals, and the space includes a steam room and jacuzzi for guests looking to extend their visit.",
    heroImage: "locationMadurai",
    galleryImages: [
      "deepTissueMassage",
      "saunaInterior",
      "spaFlatlay",
      "candlesIncense",
    ],
  },
  theni: {
    id: "theni",
    name: "Theni",
    title: "Symphony Bali Spa — Theni",
    intro:
      "Opposite the New Bus Stand at Hotel Sivasakthi Towers, our Theni location offers the same Symphony ritual in a warm, boutique setting.",
    description:
      "Designed for easy access without compromising on calm, our Theni spa offers private treatment rooms, a full menu of massage and body rituals, and the same attention to hygiene and therapist training found at every Symphony location.",
    heroImage: "locationTheni",
    galleryImages: [
      "hotStoneMassage",
      "handsMassage",
      "facialMask",
      "oilBottlePedestal",
    ],
  },
};

export const locationsList = Object.values(locationsContent).map((content) => ({
  ...content,
  contact: locationsContact[content.id],
}));
