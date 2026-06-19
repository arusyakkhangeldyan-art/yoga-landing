import type { LandingPage, TestimonialItem } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";

export function mapSanityTestimonials(
  landing: LandingPage | null,
): TestimonialItem[] | null {
  const items = landing?.testimonials;
  if (!items?.length) return null;

  const mapped = items
    .filter((item) => item.quote && item.name && item.role)
    .map((item) => ({
      _key: item._key,
      quote: item.quote!,
      name: item.name!,
      role: item.role!,
      avatarUrl: item.avatar
        ? urlFor(item.avatar).width(96).height(96).fit("crop").url()
        : undefined,
    }));

  return mapped.length > 0 ? mapped : null;
}
