"use client";

import { useState } from "react";
import {
  ClassBookingModal,
  type ClassBookingSelection,
} from "@/app/components/class-booking-modal";
import { ScheduleCard } from "@/app/components/schedule-card";
import { SectionTitle } from "@/app/components/section-title";
import type { ScheduleItem } from "@/sanity/lib/types";

type ScheduleSectionProps = {
  items: ScheduleItem[];
  eyebrow: string;
  title: string;
  description?: string;
};

const emptySelection: ClassBookingSelection = {
  className: "",
  date: "",
  time: "",
};

function toBookingSelection(item: ScheduleItem): ClassBookingSelection {
  return {
    className: item.title?.trim() || "Untitled Class",
    date: item.date?.trim() ?? "",
    time: item.time?.trim() ?? "",
  };
}

export function ScheduleSection({
  items,
  eyebrow,
  title,
  description,
}: ScheduleSectionProps) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] =
    useState<ClassBookingSelection>(emptySelection);

  const handleBookClass = (item: ScheduleItem) => {
    setSelection(toBookingSelection(item));
    setOpen(true);
  };

  return (
    <section id="schedule" className="relative px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {items.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <li key={item._id} className="h-full">
                <ScheduleCard item={item} onBookClass={handleBookClass} />
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
          Arrive ten minutes early. Herbal tea, filtered water, and soft
          lighting are always waiting.
        </p>
      </div>

      <ClassBookingModal
        open={open}
        selection={selection}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
