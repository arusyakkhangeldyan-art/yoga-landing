import { urlFor } from "@/sanity/lib/image";
import type { LandingPage } from "@/sanity/lib/types";

export function getHeroImageUrl(landing: LandingPage | null): string | null {
  if (!landing?.heroImage) return null;
  return urlFor(landing.heroImage)
    .width(1200)
    .height(1400)
    .fit("crop")
    .auto("format")
    .url();
}
