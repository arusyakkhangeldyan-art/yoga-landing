"use server";

import {
  getMembershipTemplateId,
  sendEmailWithEmailJs,
} from "@/lib/emailjs";

export type MembershipState = {
  ok: boolean;
  message: string;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitMembershipRequest(
  _prev: MembershipState,
  formData: FormData,
): Promise<MembershipState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const plan = String(formData.get("plan") ?? "").trim();
  const preferredStartDate = String(formData.get("preferredStartDate") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!fullName || !email || !plan || !preferredStartDate) {
    return { ok: false, message: "Please fill in every required field." };
  }

  if (!validateEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const templateId = getMembershipTemplateId();
  if (!templateId) {
    return {
      ok: false,
      message:
        "Membership email template is not configured yet. Please add EMAILJS_TEMPLATE_ID_MEMBERSHIP.",
    };
  }

  try {
    const details = [
      `Membership Plan: ${plan}`,
      `Preferred Start Date: ${preferredStartDate}`,
    ].join("\n");

    await sendEmailWithEmailJs({
      templateId,
      templateParams: {
        subject: `New Membership Request - ${plan}`,
        full_name: fullName,
        email,
        phone,
        details,
        notes,
      },
    });

    return {
      ok: true,
      message:
        "Thank you for your membership request. We will contact you within one business day to confirm availability and next steps.",
    };
  } catch (error) {
    console.error("MEMBERSHIP EMAIL ERROR:", error);

    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment.",
    };
  }
}
