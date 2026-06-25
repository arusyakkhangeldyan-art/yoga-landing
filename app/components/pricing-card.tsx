"use client";

import type { PricingPlan } from "@/app/data/content";

type PricingCardProps = {
  plan: PricingPlan;
  onRequestMembership: (planName: string) => void;
};

export function PricingCard({ plan, onRequestMembership }: PricingCardProps) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl border p-9 shadow-soft transition duration-300 hover:-translate-y-0.5 ${
        plan.featured
          ? "border-sage-rich/90 bg-sage-rich text-white lg:scale-[1.02] lg:shadow-glow"
          : "border-sage/20 bg-white/95 hover:border-sage/35"
      }`}
    >
      {plan.featured ? (
        <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
          Popular
        </span>
      ) : null}
      <h3
        className={`font-display text-2xl font-semibold ${
          plan.featured ? "text-white" : "text-ink"
        }`}
      >
        {plan.name}
      </h3>
      <p className="mt-6 flex items-baseline gap-1">
        <span
          className={`font-display text-4xl font-semibold tracking-tight ${
            plan.featured ? "text-white" : "text-ink"
          }`}
        >
          {plan.price}
        </span>
        <span
          className={`text-sm font-medium ${
            plan.featured ? "text-white/80" : "text-muted"
          }`}
        >
          {plan.cadence}
        </span>
      </p>
      <p
        className={`mt-2 text-sm font-medium ${
          plan.featured ? "text-white/85" : "text-sage-dark"
        }`}
      >
        {plan.details}
      </p>
      <p
        className={`mt-4 text-sm leading-relaxed ${
          plan.featured ? "text-white/88" : "text-muted"
        }`}
      >
        {plan.description}
      </p>
      <ul
        className={`mt-8 space-y-3 text-sm ${
          plan.featured ? "text-white/92" : "text-muted"
        }`}
      >
        {plan.perks.map((perk) => (
          <li key={perk} className="flex gap-3">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                plan.featured ? "bg-white/70" : "bg-sage"
              }`}
              aria-hidden
            />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onRequestMembership(plan.name)}
        className={`mt-10 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition ${
          plan.featured
            ? "bg-white text-sage-dark hover:bg-sage-soft"
            : "bg-sage-dark text-white hover:bg-sage-hover"
        }`}
      >
        Request Membership
      </button>
    </article>
  );
}
