import type { ImageKey } from "@/lib/images";

export type TreatmentCategory =
  | "signature-therapies"
  | "luxury-rituals"
  | "exclusive-experience"
  | "body-scrub-cream"
  | "couple-experiences"
  | "wellness-therapies"
  | "spa-facilities";

export const categories: { id: TreatmentCategory; label: string }[] = [
  { id: "signature-therapies", label: "Signature Therapies" },
  { id: "luxury-rituals", label: "Luxury Rituals" },
  { id: "exclusive-experience", label: "Exclusive Experience" },
  { id: "body-scrub-cream", label: "Body Scrub & Cream" },
  { id: "couple-experiences", label: "Couple Experiences" },
  { id: "wellness-therapies", label: "Wellness Therapies" },
  { id: "spa-facilities", label: "Spa Facilities" },
];

export interface Treatment {
  slug: string;
  name: string;
  category: TreatmentCategory;
  featured: boolean;
  duration: string;
  shortDescription: string;
  description: string;
  experience: string;
  benefits: string[];
  style: string;
  image: ImageKey;
  safetyNotes?: string;
  tagline?: string;
}

export const treatments: Treatment[] = [
  {
    slug: "balinese-massage",
    name: "Balinese Massage",
    category: "signature-therapies",
    featured: true,
    duration: "60 / 90 min",
    shortDescription:
      "Deep pressure techniques that release knots, improve circulation and ease muscle tension.",
    description:
      "Balinese massage is renowned for its deep pressure techniques, addressing areas of deep tissue and muscle tension. This method aids in releasing knots, improving circulation, and alleviating pain.",
    experience:
      "Your therapist blends gentle stretching, skin rolling and deep pressure along key muscle groups, using warmed aromatic oil throughout. It's a full-body ritual designed to unwind the effects of a demanding week.",
    benefits: [
      "Releases deep-seated muscle tension",
      "Improves circulation and flexibility",
      "Calms the nervous system",
      "Leaves skin nourished and soft",
    ],
    style: "Firm, rhythmic pressure with warm aromatic oils",
    image: "treatmentBalineseMassage",
  },
  {
    slug: "thai-traditional-massage",
    name: "Thai Traditional Massage",
    category: "signature-therapies",
    featured: true,
    duration: "60 / 90 min",
    shortDescription:
      "Deep tissue pressure combined with muscle and joint stretching, performed traditionally.",
    description:
      "Thai massage is a traditional massage technique that combines deep tissue pressure, muscle and joint stretching, and gentle manipulations of the body.",
    experience:
      "Performed fully clothed on a floor mat, your therapist guides your body through a sequence of stretches and pressure-point work reminiscent of gentle yoga.",
    benefits: [
      "Increases flexibility and range of motion",
      "Relieves chronic muscle stiffness",
      "Improves posture and energy flow",
    ],
    style: "Assisted stretching with rhythmic compression",
    image: "treatmentThaiMassage",
  },
  {
    slug: "bali-aroma-therapy",
    name: "Aroma Therapy Massage",
    category: "signature-therapies",
    featured: true,
    duration: "60 / 90 min",
    shortDescription:
      "A soothing massage incorporating scented essential oils.",
    description:
      "Aromatherapy is a specific type of therapy that incorporates scented essential oils into a massage.",
    experience:
      "Your therapist selects an aromatic blend suited to your mood, then applies smooth, gliding strokes designed to melt away everyday stress.",
    benefits: [
      "Eases stress and mental fatigue",
      "Improves mood through aromatic oils",
      "Softens and hydrates the skin",
    ],
    style: "Slow, gliding strokes with essential oil blends",
    image: "treatmentAromaTherapy",
  },
  {
    slug: "swedish-massage",
    name: "Swedish Relaxation Massage",
    category: "signature-therapies",
    featured: true,
    duration: "60 / 90 min",
    shortDescription: "Classic full-body massage that relaxes muscles and mind.",
    description:
      "Classic full-body massage that relaxes muscles and mind. Swedish massage is one of the most common types of massage therapy. It's often used to relax you, relieve stress and relieve pain.",
    experience:
      "Smooth, continuous strokes are applied at a moderate, comforting pressure — ideal for guests new to massage or seeking pure relaxation.",
    benefits: [
      "Promotes deep relaxation",
      "Reduces muscle tension",
      "Improves blood circulation",
    ],
    style: "Long, gentle strokes at moderate pressure",
    image: "treatmentSwedishMassage",
  },
  {
    slug: "hot-oil-massage",
    name: "Hot Oil Massage",
    category: "signature-therapies",
    featured: true,
    duration: "60 / 90 min",
    shortDescription:
      "Warm oils applied to relax muscles, improve circulation and nourish the skin.",
    description:
      "Hot oil massage is a therapeutic treatment in which warm oils are applied to the body. The warmth of the oil helps relax muscles, improve circulation, nourish the skin, and promote overall physical and mental well-being. It is commonly used to reduce stress, alleviate pain, and enhance relaxation.",
    experience:
      "The warmth of the oil helps muscles release more readily, allowing your therapist to work through tension with comfortable, sustained pressure.",
    benefits: [
      "Relaxes tight, tired muscles",
      "Boosts circulation",
      "Deeply moisturises the skin",
    ],
    style: "Warmed oil with firm, flowing strokes",
    image: "treatmentHotOil",
  },
  {
    slug: "four-hand-massage",
    name: "Four Hand Massage",
    category: "exclusive-experience",
    featured: false,
    duration: "60 / 90 min",
    shortDescription:
      "Two therapists, synchronised movements, matched pressure and pace.",
    description:
      "A Four Hand massage is a kind of massage that has 2 masseurs or therapists for one client. They practice synchronized technical massage movements and apply the same pressure and pace on both sides of the body.",
    experience:
      "Every stroke is mirrored and timed between both therapists, creating a rhythm that makes it easy to let go completely.",
    benefits: [
      "An unmatched depth of relaxation",
      "Full-body tension release",
      "A truly indulgent, immersive ritual",
    ],
    style: "Two therapists, perfectly synchronised",
    image: "treatmentFourHand",
  },
  {
    slug: "six-hand-massage",
    name: "Six Hand Massage",
    category: "exclusive-experience",
    featured: false,
    duration: "60 / 90 min",
    shortDescription:
      "Three therapists, synchronised movements, matched pressure and pace.",
    description:
      "A Six Hand massage is a kind of massage that has 3 masseurs or therapists for one client. They practice synchronized technical massage movements and apply the same pressure and pace on both sides of the body.",
    experience:
      "Designed for guests seeking the deepest possible state of release, this ritual is best paired with a longer, unhurried visit.",
    benefits: [
      "The deepest level of full-body relaxation",
      "Complete mental and physical release",
      "An extraordinary, once-in-a-while indulgence",
    ],
    style: "Three therapists, continuous layered touch",
    image: "treatmentSixHand",
  },
  {
    slug: "potli-massage",
    name: "Herbal Potli Massage",
    category: "luxury-rituals",
    featured: false,
    duration: "60 / 90 min",
    shortDescription:
      "Heated herbal cloth bundles pressed onto the body for warmth and relief.",
    description:
      "Potli massage is a traditional therapy where small cloth bundles filled with herbs, spices, and other natural ingredients are heated and gently pressed or massaged onto the body. The warm potlis are rhythmically applied to specific areas, combining heat therapy with herbal benefits.",
    experience:
      "The gentle heat and herbal fragrance work together with massage strokes to soothe stiffness and ease you into deep relaxation.",
    benefits: [
      "Soothes muscular stiffness",
      "Warms and relaxes the body",
      "Infuses skin with herbal aromatics",
    ],
    style: "Warmed herbal potlis pressed and rolled",
    image: "treatmentPotliMassage",
  },
  {
    slug: "wax-candle-massage",
    name: "Wax Candle Massage",
    category: "luxury-rituals",
    featured: false,
    duration: "60 / 90 min",
    shortDescription:
      "Warm, silky oil melted from specialty massage candles, nourishing the skin.",
    description:
      "Wax candle massage is a spa therapy where specially formulated massage candles are used to provide both warmth and nourishment to the skin. These candles melt at a lower temperature, transforming into a warm, silky oil that's applied to the skin during massage.",
    experience:
      "The candle's gentle warmth melts tension away while the oil leaves skin remarkably soft and nourished.",
    benefits: [
      "Deeply moisturises and softens skin",
      "Warmth eases muscular tension",
      "A distinctive, sensory experience",
    ],
    style: "Warm candle oil with slow, gliding strokes",
    image: "treatmentWaxCandle",
  },
  {
    slug: "hot-stone-massage",
    name: "Hot Stone Massage",
    category: "luxury-rituals",
    featured: false,
    duration: "60 / 90 min",
    shortDescription:
      "Heated basalt stones that relax muscles and provide deep relief from tension.",
    description:
      "Hot stone massage is a therapeutic technique where smooth, heated basalt stones are placed on specific parts of the body. The heat helps relax muscles, improve circulation, and provide deep relief from tension and stress.",
    experience:
      "Stones are glided across the body and occasionally rested on key points, combining heat therapy with hands-on massage.",
    benefits: [
      "Penetrating relief for deep tension",
      "Improves circulation",
      "Promotes long-lasting relaxation",
    ],
    style: "Heated basalt stones with deep pressure",
    image: "hotStoneMassage",
  },
  {
    slug: "body-scrub",
    name: "Body Scrub",
    category: "body-scrub-cream",
    featured: false,
    duration: "45 / 60 min",
    shortDescription:
      "Exfoliation with natural ingredients that removes dead skin and improves circulation.",
    description:
      "Scrub massage combines exfoliation with massage techniques using natural ingredients like salt, sugar, or coffee to remove dead skin cells, improve circulation, and nourish the skin while providing relaxation.",
    experience:
      "The scrub is massaged in circular motions across the body before being rinsed away, often paired with a nourishing oil finish.",
    benefits: [
      "Removes dull, dry skin",
      "Improves skin texture and tone",
      "Leaves skin soft and radiant",
    ],
    style: "Full-body exfoliation with natural ingredients",
    image: "treatmentBodyScrub",
  },
  {
    slug: "body-massage-cream",
    name: "Body Massage Cream",
    category: "body-scrub-cream",
    featured: false,
    duration: "60 / 90 min",
    shortDescription:
      "A smooth, hydrating cream massage that stimulates circulation.",
    description:
      "Massage cream provides a smooth glide to reduce friction during massage while deeply hydrating and nourishing the skin. The physical rubbing combined with the cream stimulates blood flow, helping deliver oxygen and nutrients to tissues.",
    experience:
      "Your therapist works the cream into the skin with smooth, gliding strokes, easing tension while leaving skin deeply moisturised.",
    benefits: [
      "Deeply hydrates and nourishes the skin",
      "Stimulates blood flow and circulation",
      "Reduces friction for a smoother massage",
    ],
    style: "Smooth, gliding strokes with hydrating cream",
    image: "treatmentMassageCream",
  },
  {
    slug: "couple-massage",
    name: "Signature Couple Massage",
    category: "couple-experiences",
    featured: false,
    duration: "60 / 90 min",
    shortDescription:
      "A shared massage experience designed for two to relax and reconnect.",
    description:
      "Relax, reconnect, and enjoy a peaceful massage experience together. Our Couple Massage is designed for two people to unwind, reduce stress, and enjoy quality time in a calm and comfortable environment.",
    experience:
      "Performed side by side in a shared treatment room, two therapists work in tandem so you and your partner can relax together, at the same pace.",
    benefits: [
      "Reduces stress and body tension",
      "Relieves muscle tiredness",
      "Promotes relaxation and better sleep",
      "Improves blood circulation",
      "Refreshes the body and mind",
      "Enjoy quality time together",
    ],
    style: "Side-by-side massage in a shared private room",
    image: "treatmentCoupleMassage",
    safetyNotes:
      "Your comfort and safety are our priority. Please inform our therapist about any health conditions, injuries, pregnancy, allergies, or areas of discomfort before the session. Our therapists maintain professional draping, hygiene, and respectful care throughout the treatment.",
    tagline: "Relax Together. Reconnect. Feel Refreshed.",
  },
  {
    slug: "head-shoulder-massage",
    name: "Head & Shoulder Massage",
    category: "wellness-therapies",
    featured: false,
    duration: "30 / 45 min",
    shortDescription:
      "Relieves muscle spasms and improves circulation to reduce headache pain.",
    description:
      "It promotes relieving muscle spasms and helps better blood circulation which reduces pressure in the head. Reduce headache pain with regular neck, shoulder and head massage treatment.",
    experience:
      "Firm, targeted pressure is applied across the scalp, neck and shoulders to relieve tightness and ease tension headaches.",
    benefits: [
      "Relieves neck and shoulder tension",
      "Eases tension headaches",
      "A quick, effective reset",
    ],
    style: "Focused pressure on head, neck and shoulders",
    image: "treatmentHeadShoulder",
  },
  {
    slug: "foot-reflexology",
    name: "Foot Reflexology",
    category: "wellness-therapies",
    featured: false,
    duration: "30 / 45 min",
    shortDescription: "Gentle pressure-point therapy for the feet to support wellness.",
    description:
      "Reflexology is a type of therapy that uses gentle pressure on specific points along your feet (and possibly on your hands or ears as well) to help you feel better.",
    experience:
      "Your therapist works methodically across the soles, arches and toes, adjusting pressure for comfort and lasting relief.",
    benefits: [
      "Relieves tired, aching feet",
      "Promotes full-body relaxation",
      "A grounding end to any visit",
    ],
    style: "Targeted pressure-point therapy on the feet",
    image: "treatmentFootMassage",
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    category: "signature-therapies",
    featured: true,
    duration: "60 / 90 min",
    shortDescription:
      "Slow, firm pressure that targets deeper layers of muscle and connective tissue.",
    description:
      "Deep Tissue Massage is a therapeutic massage technique that uses slow, firm pressure to target deeper layers of muscles and connective tissues. It is designed to help relieve muscle tension, reduce stiffness, and promote overall relaxation and well-being.",
    experience:
      "Your therapist uses sustained pressure and slower strokes, checking in throughout to keep intensity within your comfort.",
    benefits: [
      "Releases chronic muscle tightness",
      "Improves mobility in problem areas",
      "Long-lasting relief from tension",
    ],
    style: "Slow, firm strokes on deeper muscle layers",
    image: "treatmentDeepTissue",
  },
  {
    slug: "steam-bath",
    name: "Steam Bath",
    category: "spa-facilities",
    featured: false,
    duration: "20 / 30 min",
    shortDescription:
      "Opens pores, detoxifies and eases tension in a warm steam room.",
    description:
      "Steam therapy helps open pores, detoxify the body, improve blood circulation, relieve muscle tension, ease sinus congestion, and promote deep relaxation, leaving you feeling refreshed and rejuvenated.",
    experience:
      "Simply settle into our private steam room and let the warmth work through tired muscles at your own pace.",
    benefits: [
      "Supports the body's natural detoxification",
      "Opens pores and clears the skin",
      "Eases muscular tension",
    ],
    style: "Warm, enveloping steam in a private room",
    image: "treatmentSteam",
  },
  {
    slug: "jacuzzi-bath",
    name: "Jacuzzi Bath",
    category: "spa-facilities",
    featured: false,
    duration: "20 / 30 min",
    shortDescription:
      "Melts away stress and soothes tired muscles in warm, jetted water.",
    description:
      "A jacuzzi bath melts away stress, soothes tired muscles, boosts circulation, and leaves your body relaxed, refreshed, and re-energized.",
    experience:
      "Ease into the jacuzzi before or after your treatment and let the warm water work through the day's tension.",
    benefits: [
      "Relieves muscular tension",
      "Improves circulation",
      "A calming complement to any ritual",
    ],
    style: "Warm hydrotherapy in a private jacuzzi",
    image: "treatmentJacuzzi",
  },
];

export function getTreatmentBySlug(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function getFeaturedTreatments() {
  return treatments.filter((t) => t.featured);
}

export function getTreatmentsByCategory(category: TreatmentCategory) {
  return treatments.filter((t) => t.category === category);
}

export function getRelatedTreatments(current: Treatment, count = 3) {
  return treatments
    .filter((t) => t.slug !== current.slug && t.category === current.category)
    .slice(0, count);
}
