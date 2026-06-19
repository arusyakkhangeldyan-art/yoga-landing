"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { TestimonialCard } from "@/app/components/testimonial-card";
import { SectionTitle } from "@/app/components/section-title";
import type { TestimonialItem } from "@/sanity/lib/types";

type TestimonialsSliderProps = {
  items: TestimonialItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

const INTERVAL_MS = 5500;
const TRANSITION_MS = 900;
const MOBILE_PER_VIEW = 2;
const DESKTOP_PER_VIEW = 4;
/** Match Tailwind `lg` — true desktop widths for a 4-column row */
const DESKTOP_MQ = "(min-width: 1024px)";

const gridClassName =
  "grid w-full shrink-0 grid-cols-2 gap-4 px-1 sm:gap-5 lg:grid-cols-4 lg:gap-6";

function getPerView(): number {
  if (typeof window === "undefined") return MOBILE_PER_VIEW;
  return window.matchMedia(DESKTOP_MQ).matches
    ? DESKTOP_PER_VIEW
    : MOBILE_PER_VIEW;
}

function subscribePerView(onStoreChange: () => void) {
  const mq = window.matchMedia(DESKTOP_MQ);
  const notify = () => onStoreChange();
  mq.addEventListener("change", notify);
  window.addEventListener("resize", notify);
  return () => {
    mq.removeEventListener("change", notify);
    window.removeEventListener("resize", notify);
  };
}

function slideGroups(
  items: TestimonialItem[],
  perView: number,
): TestimonialItem[][] {
  if (items.length === 0) return [];
  const groups: TestimonialItem[][] = [];
  for (let i = 0; i < items.length; i++) {
    const group: TestimonialItem[] = [];
    for (let j = 0; j < perView; j++) {
      group.push(items[(i + j) % items.length]!);
    }
    groups.push(group);
  }
  return groups;
}

export function TestimonialsSlider({
  items,
  eyebrow = "Testimonials",
  title = "Voices from our community",
  description = "Thoughtful feedback from members who value craft, calm, and consistency.",
}: TestimonialsSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const perView = useSyncExternalStore(
    subscribePerView,
    getPerView,
    () => MOBILE_PER_VIEW,
  );

  const groups = useMemo(() => slideGroups(items, perView), [items, perView]);
  const loopGroups = useMemo(
    () => (groups.length > 1 ? [...groups, groups[0]!] : groups),
    [groups],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const safeIndex =
    groups.length > 0 ? Math.min(index, groups.length) : 0;

  const advance = useCallback(() => {
    if (groups.length <= 1) return;
    setIndex((prev) => prev + 1);
  }, [groups.length]);

  const goNext = useCallback(() => {
    if (groups.length <= 1) return;
    setIndex((prev) => prev + 1);
  }, [groups.length]);

  const goPrev = useCallback(() => {
    if (groups.length <= 1) return;
    setIndex((prev) => (prev === 0 ? groups.length - 1 : prev - 1));
  }, [groups.length]);

  useEffect(() => {
    if (paused || reducedMotion || groups.length <= 1) return;
    const id = window.setInterval(advance, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [advance, paused, reducedMotion, groups.length]);

  const handleTransitionEnd = () => {
    if (safeIndex === groups.length) {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = "none";
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (track) track.style.transition = "";
        });
      });
    }
  };

  if (items.length === 0) return null;

  const useStaticGrid = reducedMotion || groups.length <= 1;
  const visible = useStaticGrid
    ? reducedMotion
      ? items
      : (groups[0] ?? items.slice(0, perView))
    : [];

  if (useStaticGrid) {
    return (
      <section id="testimonials" className="relative px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {visible.map((item, i) => (
              <TestimonialCard
                key={item._key ?? `${item.name}-${i}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="relative px-6 py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={eyebrow} title={title} description={description} />

        <div className="relative mt-12 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-cream/90 to-transparent lg:w-12"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cream/90 to-transparent lg:w-12"
            aria-hidden
          />

          <div
            ref={trackRef}
            className="flex ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${safeIndex * 100}%)`,
              transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopGroups.map((group, slideIndex) => (
              <div
                key={`slide-${slideIndex}-${perView}`}
                className={gridClassName}
                aria-hidden={slideIndex === loopGroups.length - 1 && safeIndex === 0}
              >
                {group.map((item, cardIndex) => (
                  <TestimonialCard
                    key={`${item._key ?? item.name}-${slideIndex}-${cardIndex}`}
                    item={item}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonials"
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-sage/30 bg-white/70 px-4 text-lg font-medium text-sage-dark shadow-soft backdrop-blur-sm transition hover:border-sage/50 hover:bg-white hover:text-ink"
          >
            ←
          </button>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {groups.map((_, i) => {
              const active =
                safeIndex === i || (safeIndex === groups.length && i === 0);
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Go to testimonial slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    active
                      ? "w-8 bg-sage-dark"
                      : "w-2 bg-sage/40 hover:bg-sage/60"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonials"
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-sage/30 bg-white/70 px-4 text-lg font-medium text-sage-dark shadow-soft backdrop-blur-sm transition hover:border-sage/50 hover:bg-white hover:text-ink"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
