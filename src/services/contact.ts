import emailjs from "@emailjs/browser";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  // EmailJS Credentials
  // These should be configured in EmailJS dashboard.
  // Using environment variables or fallback placeholders for local testing.
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_default";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_default";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";

  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    phone_number: data.phone || "Not Provided",
    subject: data.subject,
    message: data.message,
    to_name: "Parth Prajapati",
  };

  // 1. Send email via EmailJS
  const emailPromise = emailjs.send(serviceId, templateId, templateParams, publicKey);

  // 2. Google Sheets Webhook Integration (Optional - Easily enabled by adding URL in .env)
  // The Google Apps Script should handle a POST request and write the JSON body to sheets.
  const sheetsWebhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
  let sheetsPromise: Promise<Response | null> = Promise.resolve(null);

  if (sheetsWebhookUrl) {
    sheetsPromise = fetch(sheetsWebhookUrl, {
      method: "POST",
      mode: "no-cors", // Useful for Google Apps Script web app URLs
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data,
      }),
    }).catch((err) => {
      console.error("Google Sheets submission failed:", err);
      return null;
    });
  }

  // Execute both in parallel
  await Promise.all([emailPromise, sheetsPromise]);
}
