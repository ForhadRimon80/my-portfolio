import { failure } from "@/lib/api";
import { ServiceError } from "@/lib/db";
import { emailReady, sendEmail } from "@/lib/email";
import { body, originCheck, rateLimit } from "@/lib/security";
import { contactSchema, escapeHtml } from "@/lib/validation";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    originCheck(req);
    const data = contactSchema.parse(await body(req));
    emailReady();
    if (!process.env.CONTACT_EMAIL)
      throw new ServiceError(
        "Contact email is not configured. Please use LinkedIn.",
      );
    await rateLimit(req, "contact", 3);
    await sendEmail(
      process.env.CONTACT_EMAIL,
      "Portfolio message from " + data.name,
      "<h2>New portfolio message</h2><p>From: " +
        escapeHtml(data.name) +
        "</p><p>" +
        escapeHtml(data.message).replace(/\n/g, "<br>") +
        "</p>",
      data.email,
    );
    return NextResponse.json({
      message: "Your message was sent. Thank you for reaching out!",
    });
  } catch (e) {
    return failure(e);
  }
}
