import Image from "next/image";
import type { TestimonialItem } from "@/sanity/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type TestimonialCardProps = {
  item: TestimonialItem;
};

export function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <blockquote className="flex h-full flex-col rounded-2xl border border-white/70 bg-white/45 p-7 shadow-soft backdrop-blur-md sm:p-8">
      <span
        className="font-display text-5xl leading-none text-sage/35"
        aria-hidden
      >
        “
      </span>
      <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
        {item.quote}
      </p>
      <footer className="mt-8 flex items-center gap-4 border-t border-sage/10 pt-6">
        {item.avatarUrl ? (
          <Image
            src={item.avatarUrl}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/80"
          />
        ) : (
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F4B87A] via-[#E8895C] to-[#8E4A7A] text-sm font-semibold text-white ring-2 ring-white/80"
            aria-hidden
          >
            {initials(item.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{item.name}</p>
          <p className="truncate text-sm text-muted">{item.role}</p>
        </div>
      </footer>
    </blockquote>
  );
}
