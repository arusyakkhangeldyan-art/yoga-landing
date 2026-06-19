"use server";

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

  return {
    ok: true,
    message:
      "Thank you. We received your message and will reply within one business day.",
  };
}
