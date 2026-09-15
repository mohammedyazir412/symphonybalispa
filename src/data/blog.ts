import type { ImageKey } from "@/lib/images";

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: ImageKey;
  content: string[];
}

export const posts: Post[] = [
  {
    slug: "the-art-of-balinese-massage",
    title: "The Art of Balinese Massage: A Tradition of Healing",
    category: "Rituals",
    date: "2026-01-14",
    excerpt:
      "A closer look at the technique behind our signature ritual, and why its blend of pressure and flow has endured for centuries.",
    image: "deepTissueMassage",
    content: [
      "Balinese massage draws on a lineage of healing traditions native to the island of Bali — combining acupressure, reflexology and gentle stretching into one continuous, flowing sequence.",
      "What sets it apart is the range of pressure within a single session: long, gliding strokes are used to warm the muscles, followed by firmer, targeted pressure along the body's key points to release deeper tension.",
      "Warmed aromatic oils are used throughout, both to ease the therapist's movement and to engage the senses — turning a physical treatment into a fuller, more restorative experience.",
      "At Symphony, this ritual remains our most requested treatment, and for good reason: it works as well for guests seeking pure relaxation as it does for those carrying tension from a demanding week.",
    ],
  },
  {
    slug: "preparing-for-your-spa-visit",
    title: "Five Ways to Prepare for Your Spa Visit",
    category: "Wellness",
    date: "2026-02-02",
    excerpt:
      "A few small habits before you arrive can make a noticeable difference to how deeply you're able to relax.",
    image: "meditationSilhouette",
    content: [
      "Arrive a little early. Rushing in from traffic keeps your nervous system in an alert state — ten quiet minutes beforehand helps your body settle before your treatment even begins.",
      "Hydrate well. Massage encourages circulation, and drinking water before and after your visit helps your body process that more comfortably.",
      "Eat lightly. A heavy meal just before a treatment can make lying face-down or being worked on less comfortable — a light snack an hour or two prior is ideal.",
      "Leave your phone behind, if you can. The quality of stillness during a treatment tends to mirror how willing we are to let go of distraction.",
      "Speak up about pressure. Every therapist adjusts to your comfort — a quick word during your session is always welcome.",
    ],
  },
  {
    slug: "understanding-hot-stone-therapy",
    title: "Understanding Hot Stone Therapy",
    category: "Rituals",
    date: "2026-02-20",
    excerpt:
      "Why heated basalt stones remain one of the most requested additions to a massage — and how the technique actually works.",
    image: "hotStoneMassage",
    content: [
      "Basalt stones are chosen for hot stone therapy because of their density — they hold heat for a long time and release it slowly and evenly into the skin.",
      "The warmth serves two purposes: it helps muscles relax more readily than they might otherwise, allowing the therapist to work deeper tension with less discomfort, and it simply feels good — a grounding, enveloping sensation from the first stone placed.",
      "Stones are typically glided across larger muscle groups along the back, legs and shoulders, and occasionally rested at specific points to let the heat sink in.",
      "It's a treatment particularly well suited to guests dealing with chronic tightness, or anyone who simply finds warmth soothing.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
