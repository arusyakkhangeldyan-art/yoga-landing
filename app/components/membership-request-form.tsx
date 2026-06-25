"use client";

import { useActionState } from "react";
import {
  submitMembershipRequest,
  type MembershipState,
} from "@/app/actions/membership";

const initial: MembershipState = { ok: false, message: "" };

type MembershipRequestFormProps = {
  selectedPlan: string;
  onClose: () => void;
};

export function MembershipRequestForm({
  selectedPlan,
  onClose,
}: MembershipRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    submitMembershipRequest,
    initial,
  );

  if (state.ok) {
    return (
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-muted">
          Thank you for your membership request.
          <br />
          We will contact you within one business day to confirm availability
          and next steps.
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
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="plan" value={selectedPlan} />

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2 text-sm font-medium text-ink">
          Selected Membership
          <div
            className="rounded-xl border border-sage/20 bg-sage-soft/50 px-4 py-3 font-normal text-ink"
            aria-readonly="true"
          >
            {selectedPlan}
          </div>
        </div>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Preferred Start Date *
          <input
            type="date"
            name="preferredStartDate"
            required
            disabled={pending}
            className="rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition focus:border-sage-dark disabled:opacity-60"
          />
        </label>
      </div>

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
        <p
          className="text-sm font-medium text-red-800/90"
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-sage-dark px-8 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-sage-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending..." : "Request Membership"}
      </button>
    </form>
  );
}
