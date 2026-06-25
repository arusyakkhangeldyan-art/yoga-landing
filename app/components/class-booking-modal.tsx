"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ClassBookingRequestForm,
  type ClassBookingSelection,
} from "@/app/components/class-booking-request-form";

export type { ClassBookingSelection };

type ClassBookingModalProps = {
  open: boolean;
  selection: ClassBookingSelection;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ClassBookingModal({
  open,
  selection,
  onClose,
}: ClassBookingModalProps) {
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
        aria-label="Close class booking modal"
        onClick={handleClose}
        className={`absolute inset-0 bg-ink/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="class-booking-modal-title"
        className={`relative z-10 flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-[2rem] border border-sage/25 bg-white/95 p-6 shadow-glow transition-all duration-300 sm:p-8 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-sage/25 bg-cream text-sage-dark transition hover:border-sage/40 hover:text-ink"
        >
          ×
        </button>

        <div className="shrink-0 pr-10">
          <h3
            id="class-booking-modal-title"
            className="font-display text-3xl font-semibold tracking-tight text-ink"
          >
            Book This Class
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Share your details and we will contact you shortly to confirm your
            place.
          </p>
        </div>

        <div className="mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
          {open ? (
            <ClassBookingRequestForm
              key={formResetKey}
              selection={selection}
              onClose={handleClose}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
