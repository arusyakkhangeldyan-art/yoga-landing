"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

type InstagramReelEmbedProps = {
  permalink: string;
};

/**
 * Renders Instagram’s oEmbed blockquote and loads `embed.js`, which replaces it
 * with an iframe. Matches the official embed pattern from Instagram.
 */
export function InstagramReelEmbed({ permalink }: InstagramReelEmbedProps) {
  useEffect(() => {
    const process = () => {
      window.instgrm?.Embeds?.process();
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`,
    );

    if (existing) {
      if (window.instgrm) {
        process();
      } else {
        existing.addEventListener("load", process);
        return () => existing.removeEventListener("load", process);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [permalink]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.instgrm?.Embeds?.process();
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [permalink]);

  return (
    <div className="flex min-h-[480px] justify-center bg-cream/30 py-2 sm:min-h-[540px] sm:py-4">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{
          background: "#fff",
          border: 0,
          borderRadius: 12,
          margin: 0,
          maxWidth: 540,
          minWidth: 280,
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      >
        {/* Instagram embed.js injects the iframe here */}
      </blockquote>
    </div>
  );
}
