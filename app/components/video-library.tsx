"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { InstagramReelEmbed } from "@/app/components/instagram-reel-embed";
import type { OnlineVideo } from "@/app/data/videos";

type VideoLibraryProps = {
  videos: OnlineVideo[];
};

export function VideoLibrary({ videos }: VideoLibraryProps) {
  const [active, setActive] = useState<OnlineVideo | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setActive(null);
  }, []);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [active, close]);

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            aria-label={`Open video: ${video.title}`}
            onClick={() => setActive(video)}
            className="group text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-sage/20 bg-sage-soft shadow-soft transition group-hover:border-sage/40 group-hover:shadow-glow">
              <Image
                src={video.thumbnailSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-ink">
                {video.duration}
              </span>
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-sage-dark shadow-soft ring-1 ring-sage/25 transition group-hover:scale-105 group-hover:bg-white"
                aria-hidden
              >
                <PlayIcon className="ml-0.5 h-6 w-6" />
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink transition group-hover:text-sage-dark">
              {video.title}
            </h3>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          role="presentation"
          onClick={close}
        >
          <div
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`relative z-10 w-full rounded-[1.5rem] border border-white/80 bg-white p-5 shadow-glow sm:p-8 ${
              active.kind === "instagram" ? "max-w-[560px]" : "max-w-4xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 id={titleId} className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {active.title}
              </h3>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="shrink-0 rounded-full border border-sage/25 bg-cream px-3 py-1.5 text-sm font-medium text-muted transition hover:border-sage/40 hover:text-ink"
              >
                Close
              </button>
            </div>
            <p className="mt-1 text-sm text-muted">{active.duration}</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-sage/20 bg-ink/5">
              {active.kind === "instagram" ? (
                <InstagramReelEmbed permalink={active.permalink} />
              ) : (
                <video
                  key={active.id}
                  className="aspect-video w-full bg-ink"
                  controls
                  playsInline
                  autoPlay
                  preload="metadata"
                  poster={active.thumbnailSrc}
                >
                  <source src={active.playbackUrl} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}
