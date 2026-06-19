import type { FaqItem, TestimonialItem } from "@/sanity/lib/types";

export const services = [
  {
    name: "Hatha Yoga",
    tag: "Grounding",
    description:
      "Slow, foundational sequences focused on posture, alignment, and steady breath.",
  },
  {
    name: "Vinyasa Flow",
    tag: "Energizing",
    description:
      "Fluid movement linked with breath to build strength, mobility, and focus.",
  },
  {
    name: "Yin Yoga",
    tag: "Restorative",
    description:
      "Long-held shapes that soften tension, hydrate fascia, and quiet the mind.",
  },
];
export const pricingPlans = [
  {
    name: "Essential",
    price: "$59",
    cadence: "/month",
    details: "4 classes monthly",
    description: "Perfect for a once-a-week rhythm and gentle consistency.",
    perks: ["Priority booking window", "Premium mats & props", "Member lounge access"],
  },
  {
    name: "Studio",
    price: "$99",
    cadence: "/month",
    details: "8 classes monthly",
    description: "Our most balanced option for regular practice with flexibility.",
    featured: true as const,
    perks: [
      "Guest pass each month",
      "Workshop previews at member pricing",
      "Everything in Essential",
    ],
  },
  {
    name: "Unlimited",
    price: "$139",
    cadence: "/month",
    details: "Unlimited classes",
    description: "For dedicated practitioners who want depth and momentum.",
    perks: ["Unlimited mat storage", "Quarterly posture consult", "Everything in Studio"],
  },
];

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "The studio feels peaceful the moment you walk in. Every session leaves me grounded.",
    name: "Maya R.",
    role: "Product designer",
  },
  {
    quote:
      "Teachers are attentive and precise. I finally found a place that feels personal, not crowded.",
    name: "Elena K.",
    role: "Physiotherapist",
  },
  {
    quote:
      "A refined space with classes that challenge and restore in the same hour.",
    name: "Sofia A.",
    role: "Founder",
  },
  {
    quote:
      "I leave every class feeling taller, calmer, and more present in my day.",
    name: "Nina T.",
    role: "Architect",
  },
  {
    quote:
      "The sunset-lit studio and thoughtful pacing make this my favorite reset each week.",
    name: "Leah M.",
    role: "Creative director",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Is the studio beginner friendly?",
    answer:
      "Yes. Every class includes layered options so you can honor your body while still progressing.",
  },
  {
    question: "Do I need to bring my own mat?",
    answer:
      "No. We provide premium mats, blocks, straps, and blankets. Bring your own mat if you prefer.",
  },
  {
    question: "Can I mix class styles on my plan?",
    answer:
      "Absolutely. Book Hatha, Vinyasa, or Yin interchangeably within your active membership.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancel or reschedule up to 12 hours before class without penalty. Late cancels may forfeit a session credit.",
  },
];
