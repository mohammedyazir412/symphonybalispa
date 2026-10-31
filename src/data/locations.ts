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
      "Visit Symphony Bali Spa in Karpaga Nagar, Madurai, for traditional Bali massage, body treatments, and relaxing spa services. Our therapists offer a range of treatments in a comfortable setting, giving you a chance to take a break and enjoy some time for yourself.",
    description:
      "Step off the street and into a space designed for stillness — warm wood, soft lighting and the quiet hum of private treatment rooms. Our Madurai therapists are trained across our full range of massage and body rituals, and the space includes a steam room and jacuzzi for guests looking to extend their visit.",
    heroImage: "locationMadurai",
    galleryImages: [
      "maduraiOuter",
      "maduraiInside",
      "maduraiReception",
      "maduraiRoom",
    ],
  },
  theni: {
    id: "theni",
    name: "Theni",
    title: "Symphony Bali Spa — Theni",
    intro:
      "Just opposite the New Bus Stand at Hotel Sivasakthi Towers, Symphony Bali Spa brings a touch of Bali to Theni. Drop in for a relaxing massage, refreshing body treatments, and some well-deserved time for yourself.",
    description:
      "Designed for easy access without compromising on calm, our Theni spa offers private treatment rooms, a full menu of massage and body rituals, and the same attention to hygiene and therapist training found at every Symphony location.",
    heroImage: "locationTheni",
    galleryImages: [
      "theniLobby",
      "theniReception",
      "theniInside",
      "theniRoom",
    ],
  },
};

export const locationsList = Object.values(locationsContent).map((content) => ({
  ...content,
  contact: locationsContact[content.id],
}));
