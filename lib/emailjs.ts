const DEFAULT_SERVICE_ID = "service_1o92i4c";
const DEFAULT_CONTACT_TEMPLATE_ID = "template_370zzwq";
const DEFAULT_PUBLIC_KEY = "Q-oktpRITeRvQ9J0V";

type EmailJSPayload = {
  serviceId?: string;
  templateId: string;
  templateParams: Record<string, string>;
};

function getEmailJsConfig() {
  return {
    serviceId: process.env.EMAILJS_SERVICE_ID ?? DEFAULT_SERVICE_ID,
    contactTemplateId:
      process.env.EMAILJS_TEMPLATE_ID_CONTACT ?? DEFAULT_CONTACT_TEMPLATE_ID,
    membershipTemplateId: process.env.EMAILJS_TEMPLATE_ID_MEMBERSHIP,
    publicKey: process.env.EMAILJS_PUBLIC_KEY ?? DEFAULT_PUBLIC_KEY,
  };
}

export function getContactTemplateId() {
  return getEmailJsConfig().contactTemplateId;
}

export function getMembershipTemplateId() {
  return getEmailJsConfig().membershipTemplateId;
}

export async function sendEmailWithEmailJs({
  serviceId,
  templateId,
  templateParams,
}: EmailJSPayload) {
  const config = getEmailJsConfig();
  const selectedServiceId = serviceId ?? config.serviceId;

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: selectedServiceId,
      template_id: templateId,
      user_id: config.publicKey,
      template_params: templateParams,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `EmailJS request failed (${response.status}): ${body || "Unknown error"}`,
    );
  }
}
