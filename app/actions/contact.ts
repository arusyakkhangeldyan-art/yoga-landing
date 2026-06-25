"use server";

import { getContactTemplateId, sendEmailWithEmailJs } from "@/lib/emailjs";

export type ContactState = {
  ok: boolean;
  message: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in every field." };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  try {
    await sendEmailWithEmailJs({
      templateId: getContactTemplateId(),
      templateParams: {
        name,
        email,
        message,
      },
    });

    return {
      ok: true,
      message:
        "Thank you for reaching out. We will get back to you shortly.",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong. Please try again in a moment.",
    };
  }
}
