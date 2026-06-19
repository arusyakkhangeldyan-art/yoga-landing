import type { SanityImageSource } from "@sanity/image-url";

export type ScheduleItem = {
  _id: string;
  date?: string;
  time?: string;
  title?: string;
  level?: string;
  notes?: string;
};

export type FaqItem = {
  _key?: string;
  question: string;
  answer: string;
};

export type TestimonialItem = {
  _key?: string;
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
};

export type LandingPage = {
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: SanityImageSource;
  aboutTitle?: string;
  aboutDescription?: string;
  contactTitle?: string;
  contactDescription?: string;
  faqEyebrow?: string;
  faqTitle?: string;
  faqDescription?: string;
  faqs?: FaqItem[];
  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  testimonials?: Array<{
    _key?: string;
    quote?: string;
    name?: string;
    role?: string;
    avatar?: {
      asset?: { _ref: string };
    };
  }>;
};
