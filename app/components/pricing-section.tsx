"use client";

import { useState } from "react";
import type { PricingPlan } from "@/app/data/content";
import { MembershipModal } from "@/app/components/membership-modal";
import { PricingCard } from "@/app/components/pricing-card";
import { SectionTitle } from "@/app/components/section-title";

type PricingSectionProps = {
  plans: PricingPlan[];
  eyebrow: string;
  title: string;
  description?: string;
};

export function PricingSection({
  plans,
  eyebrow,
  title,
  description,
}: PricingSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]?.name ?? "Single Class");

  const handleOpen = (planName: string) => {
    setSelectedPlan(planName);
    setOpen(true);
  };

  return (
    <section id="pricing" className="relative px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
          centered
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              onRequestMembership={handleOpen}
            />
          ))}
        </div>
      </div>

      <MembershipModal
        open={open}
        selectedPlan={selectedPlan}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
