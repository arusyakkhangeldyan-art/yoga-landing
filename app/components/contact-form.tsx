"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState, type FormEvent } from "react";

const SERVICE_ID = "service_1o92i4c";
const TEMPLATE_ID = "template_370zzwq";
const PUBLIC_KEY = "Q-oktpRITeRvQ9J0V";

type FormStatus = {
  ok: boolean;
  message: string;
};

function validateForm(form: HTMLFormElement): FormStatus | null {
  const name = String(new FormData(form).get("name") ?? "").trim();
  const email = String(new FormData(form).get("email") ?? "").trim();
  const message = String(new FormData(form).get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in every field." };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  return null;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ ok: false, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const validationError = validateForm(form);
    if (validationError) {
      setStatus(validationError);
      return;
    }

    setPending(true);
    setStatus({ ok: false, message: "" });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      });

      setStatus({
        ok: true,
        message:
          "Thank you. We received your message and will reply within one business day.",
      });
      form.reset();
    } catch {
      setStatus({
        ok: false,
        message: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-8 grid gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Name
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            disabled={pending}
            className="rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-sage-dark disabled:opacity-60"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email
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
      </div>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Message
        <textarea
          name="message"
          rows={4}
          required
          disabled={pending}
          className="resize-y rounded-xl border border-sage/35 bg-cream px-4 py-3 font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-sage-dark disabled:opacity-60"
          placeholder="Preferred class, day, and time"
        />
      </label>
      {status.message ? (
        <p
          className={
            status.ok
              ? "text-sm font-medium text-sage-dark"
              : "text-sm font-medium text-red-800/90"
          }
          role="status"
        >
          {status.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-sage-dark px-8 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-sage-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
