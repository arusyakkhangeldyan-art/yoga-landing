"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MembershipRequestForm } from "@/app/components/membership-request-form";

type MembershipModalProps = {
  open: boolean;
  selectedPlan: string;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MembershipModal({
  open,
  selectedPlan,
  onClose,
}: MembershipModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [formResetKey, setFormResetKey] = useState(0);

  const handleClose = useCallback(() => {
    onClose();
    setFormResetKey((key) => key + 1);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close membership modal"
        onClick={handleClose}
        className={`absolute inset-0 bg-ink/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="membership-modal-title"
        className={`relative z-10 w-full max-w-2xl rounded-[2rem] border border-sage/25 bg-white/95 p-6 shadow-glow transition-all duration-300 sm:p-8 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage/25 bg-cream text-sage-dark transition hover:border-sage/40 hover:text-ink"
        >
          ×
        </button>

        <h3
          id="membership-modal-title"
          className="pr-10 font-display text-3xl font-semibold tracking-tight text-ink"
        >
          Request Membership
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tell us your preferences and we will contact you with the best next
          class options.
        </p>

        <div className="mt-6">
          {open ? (
            <MembershipRequestForm
              key={formResetKey}
              selectedPlan={selectedPlan}
              onClose={handleClose}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
