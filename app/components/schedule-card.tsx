"use client";

import type { ScheduleItem } from "@/sanity/lib/types";

type ScheduleCardProps = {
  item: ScheduleItem;
  onBookClass: (item: ScheduleItem) => void;
};

function hasText(value: string | undefined) {
  return Boolean(value?.trim());
}

function formatScheduleDate(date?: string) {
  if (!hasText(date)) return null;

  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(parsed);
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-sage/10 pb-2.5 last:border-0 last:pb-0">
      <dt className="shrink-0 font-medium text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

export function ScheduleCard({ item, onBookClass }: ScheduleCardProps) {
  const formattedDate = formatScheduleDate(item.date);
  const dateTimeLine = [formattedDate, item.time?.trim()]
    .filter(Boolean)
    .join(" · ");

  const hasDetails =
    hasText(item.duration) ||
    hasText(item.instructor) ||
    item.capacity != null ||
    hasText(item.locationType);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-sage/20 bg-white/95 p-6 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-sage/35 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
          {item.title?.trim() || "Untitled Class"}
        </h3>
        {hasText(item.level) ? (
          <span className="shrink-0 rounded-full bg-sage-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sage-dark">
            {item.level}
          </span>
        ) : null}
      </div>

      {dateTimeLine ? (
        <p className="mt-4 text-base font-semibold tracking-tight text-sage-dark md:text-lg">
          {dateTimeLine}
        </p>
      ) : null}

      {hasDetails ? (
        <dl className="mt-5 space-y-2.5 text-sm">
          {hasText(item.duration) ? (
            <DetailRow label="Duration" value={item.duration!.trim()} />
          ) : null}
          {hasText(item.instructor) ? (
            <DetailRow label="Instructor" value={item.instructor!.trim()} />
          ) : null}
          {item.capacity != null ? (
            <DetailRow
              label="Capacity"
              value={`${item.capacity} ${item.capacity === 1 ? "spot" : "spots"}`}
            />
          ) : null}
          {hasText(item.locationType) ? (
            <DetailRow label="Location" value={item.locationType!.trim()} />
          ) : null}
        </dl>
      ) : null}

      {hasText(item.description) ? (
        <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
          {item.description!.trim()}
        </p>
      ) : (
        <div className="flex-1" />
      )}

      <button
        type="button"
        onClick={() => onBookClass(item)}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sage-dark px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-sage-hover"
      >
        Book This Class
      </button>
    </article>
  );
}
