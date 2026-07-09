import { urlFor } from "@/sanity/lib/image";
import type { LandingPage } from "@/sanity/lib/types";

export function getHeroImageUrl(landing: LandingPage | null): string | null {
  if (!landing?.heroImage) return null;
  // Preserve the original aspect ratio: no forced dimensions or crop.
  // next/image handles responsive sizing/optimization via the request URL.
  return urlFor(landing.heroImage).auto("format").url();
}

type Hotspot = { x?: number; y?: number };

/**
 * Maps the Sanity image hotspot to a CSS object-position value so the focal
 * point stays framed when the hero container crops with object-cover.
 * Falls back to centered framing when no hotspot is set.
 */
export function getHeroImagePosition(landing: LandingPage | null): string {
  const hotspot = (landing?.heroImage as { hotspot?: Hotspot } | undefined)
    ?.hotspot;

  if (
    !hotspot ||
    typeof hotspot.x !== "number" ||
    typeof hotspot.y !== "number"
  ) {
    return "50% 50%";
  }

  return `${(hotspot.x * 100).toFixed(2)}% ${(hotspot.y * 100).toFixed(2)}%`;
}
