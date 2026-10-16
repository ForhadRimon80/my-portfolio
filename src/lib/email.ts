import { Resend } from "resend";
import "server-only";
import { ServiceError } from "./db";
export function emailReady() {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM)
    throw new ServiceError(
      "Email is not connected yet. Please use LinkedIn to get in touch.",
    );
}
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
) {
  emailReady();
  const r = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
    replyTo,
  });
  if (r.error)
    throw new ServiceError("Email could not be sent. Please try again later.");
}
