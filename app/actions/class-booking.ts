"use server";

import {
  getMembershipTemplateId,
  sendEmailWithEmailJs,
} from "@/lib/emailjs";

export type ClassBookingState = {
  ok: boolean;
  message: string;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitClassBooking(
  _prev: ClassBookingState,
  formData: FormData,
): Promise<ClassBookingState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const className = String(
    formData.get("class_name") ?? formData.get("className") ?? "",
  ).trim();
  const date = String(formData.get("date") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim();
  const experienceLevel = String(formData.get("experienceLevel") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!fullName || !email || !className || !date || !time) {
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
    const detailsLines = [
      `Class: ${className}`,
      `Date: ${date}`,
      `Time: ${time}`,
    ];

    if (experienceLevel) {
      detailsLines.push(`Experience: ${experienceLevel}`);
    }

    const emailSubject = `New Class Booking - ${className}`;

    await sendEmailWithEmailJs({
      templateId,
      templateParams: {
        subject: emailSubject,
        full_name: fullName,
        email,
        phone,
        class_name: className,
        details: detailsLines.join("\n"),
        notes,
      },
    });

    return {
      ok: true,
      message:
        "Thank you. Your booking request has been received. We will contact you shortly to confirm your place.",
    };
  } catch (error) {
    console.error("CLASS BOOKING EMAIL ERROR:", error);

    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment.",
    };
  }
}
