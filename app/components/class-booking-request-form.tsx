"use client";

import { useActionState } from "react";
import {
  submitClassBooking,
  type ClassBookingState,
} from "@/app/actions/class-booking";

const initial: ClassBookingState = { ok: false, message: "" };

const experienceLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "All Levels",
] as const;

export type ClassBookingSelection = {
  className: string;
  date: string;
  time: string;
};

type ClassBookingRequestFormProps = {
  selection: ClassBookingSelection;
  onClose: () => void;
};

export function ClassBookingRequestForm({
  selection,
  onClose,
}: ClassBookingRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    submitClassBooking,
    initial,
  );

  if (state.ok) {
    return (
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-muted">
          Thank you.
          <br />
          Your booking request has been received.
          <br />
          We will contact you shortly to confirm your place.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-full bg-sage-dark px-7 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-sage-hover"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      key={`${selection.className}-${selection.date}-${selection.time}`}
      action={formAction}
      className="grid gap-4"
    >
      <input type="hidden" name="class_name" value={selection.className} />
      <input type="hidden" name="date" value={selection.date} />
      <input type="hidden" name="time" value={selection.time} />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2 text-sm font-medium text-ink">
          Class Name
          <div
            className="rounded-xl border border-sage/20 bg-sage-soft/50 px-4 py-3 font-normal text-ink"
            aria-readonly="true"
          >
            {selection.className}
          </div>
        </div>
        <div className="grid gap-2 text-sm font-medium text-ink">
          Date
          <div
            className="rounded-xl border border-sage/20 bg-sage-soft/50 px-4 py-3 font-normal text-ink"
            aria-readonly="true"
          >
            {selection.date}
          </div>
        </div>
        <div className="grid gap-2 text-sm font-medium text-ink">
          Time
          <div
            className="rounded-xl border border-sage/20 bg-sage-soft/50 px-4 py-3 font-normal text-ink"
            aria-readonly="true"
          >
            {selection.time}
          </div>
        </div>
      </div>

      <label className="grid gap-2 text-sm font-medium text-ink">
        Full Name *
        <input
          type="text"
          name="fullName"
          required
          autoComplete="name"
          disabled={pending}
          className="rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-sage-dark disabled:opacity-60"
          placeholder="Your full name"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email *
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            disabled={pending}
            className="rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-sage-dark disabled:opacity-60"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Phone Number
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            disabled={pending}
            className="rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-sage-dark disabled:opacity-60"
            placeholder="+1 555 123 4567"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-ink">
        Experience Level
        <select
          name="experienceLevel"
          disabled={pending}
          defaultValue=""
          className="rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition focus:border-sage-dark disabled:opacity-60"
        >
          <option value="">Select experience level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-ink">
        Questions / Notes
        <textarea
          name="notes"
          rows={4}
          disabled={pending}
          className="resize-y rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-sage-dark disabled:opacity-60"
          placeholder="Anything you'd like us to know?"
        />
      </label>

      {state.message ? (
        <p className="text-sm font-medium text-red-800/90" role="status">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-sage-dark px-8 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-sage-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending..." : "Book This Class"}
      </button>
    </form>
  );
}
