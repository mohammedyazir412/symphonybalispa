/**
 * Curated photography set. Swap any ID below for licensed Symphony Bali Spa
 * photography when available — every reference in the app flows through
 * this file, so replacing an image here updates it everywhere it's used.
 */
function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;
}

export const img = {
  justdialLogo: "/images/justdial-logo.png",
  heroHome: "/images/hero-home.png",
  heroHomeMobile: "/images/hero-home-mobile.png",
  aboutExperience: "/images/about-experience.png",
  locationMadurai: "/images/location-madurai.jpg",
  locationTheni: "/images/location-theni.jpg",
  aboutPageTeam: "/images/about-page.png",
  ctaSpaBed: "/images/cta-spa-bed.png",
  heroTreatments: "/images/hero-treatments.png",
  heroLocations: "/images/hero-locations.jpg",
  heroContact: "/images/hero-contact.jpg",
  heroAbout: "/images/hero-about.png",
  treatmentBalineseMassage: "/images/treatment-bali-massage.png",
  treatmentThaiMassage: "/images/treatment-thai-massage.png",
  treatmentAromaTherapy: "/images/treatment-aroma-therapy.png",
  treatmentSwedishMassage: "/images/treatment-swedish-massage.png",
  treatmentDeepTissue: "/images/treatment-deep-tissue.png",
  treatmentHotOil: "/images/treatment-hot-oil.png",
  treatmentPotliMassage: "/images/treatment-potli-massage.png",
  treatmentWaxCandle: "/images/treatment-wax-candle.png",
  hotStoneMassage: "/images/treatment-hot-stone.png",
  treatmentFourHand: "/images/treatment-four-hand.png",
  treatmentSixHand: "/images/treatment-six-hand.jpg",
  treatmentBodyScrub: "/images/treatment-body-scrub.png",
  treatmentMassageCream: "/images/treatment-massage-cream.png",
  treatmentCoupleMassage: "/images/treatment-couple-massage.png",
  treatmentHeadShoulder: "/images/treatment-head-shoulder.png",
  treatmentFootMassage: "/images/treatment-foot-massage.png",
  treatmentSteam: "/images/treatment-steam.png",
  treatmentJacuzzi: "/images/treatment-jacuzzi.png",
  spaFlatlay: unsplash("1540555700478-4be289fbecef"),
  oilMassageBack: unsplash("1544161515-4ab6ce6db874"),
  facialTreatment: unsplash("1552693673-1bf958298935"),
  resortPoolPalms: unsplash("1596178065887-1198b6148b2b"),
  handsMassage: unsplash("1519823551278-64ac92734fb1"),
  candlesIncense: unsplash("1620733723572-11c53f73a416"),
  saunaInterior: unsplash("1583416750470-965b2707b355"),
  facialBrush: unsplash("1570172619644-dfd03ed5d881"),
  deepTissueMassage: unsplash("1519824145371-296894a0daa9"),
  infinityPoolOcean: unsplash("1540541338287-41700207dee6"),
  outdoorMassageBw: unsplash("1591343395082-e120087004b4"),
  oilBottlePedestal: unsplash("1608571423902-eed4a5ad8108"),
  villaPlungePool: unsplash("1560750588-73207b1ef5b8"),
  oilDripMacro: unsplash("1573461160327-b450ce3d8e7f"),
  facialMask: unsplash("1616394584738-fc6e612e71b9"),
  villaBedroom: unsplash("1584132915807-fd1f5fbc078f"),
  meditationSilhouette: unsplash("1506126613408-eca07ce68773"),
  tropicalBeach: unsplash("1519046904884-53103b34b206"),
  oceanWaves: unsplash("1540206395-68808572332f"),
} as const;

export type ImageKey = keyof typeof img;
