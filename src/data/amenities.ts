export const amenities = [
  {
    name: "Private Treatment Rooms",
    description: "Total privacy and comfort for individual and couple rituals.",
    icon: "room" as const,
  },
  {
    name: "Steam Room",
    description: "Detoxify and rejuvenate before or after your treatment.",
    icon: "steam" as const,
  },
  {
    name: "Jacuzzi Bath",
    description: "Hydrotherapy to relax muscles and calm the senses.",
    icon: "jacuzzi" as const,
  },
  {
    name: "Premium Products",
    description: "Natural oils and ingredients, chosen with care.",
    icon: "product" as const,
  },
] as const;

export type AmenityIcon = (typeof amenities)[number]["icon"];
