"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form action={formAction} className="mt-8 grid gap-4">
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
          placeholder="Your message"
        />
      </label>
      {state.message ? (
        <p
          className={
            state.ok
              ? "text-sm font-medium text-sage-dark"
              : "text-sm font-medium text-red-800/90"
          }
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
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
