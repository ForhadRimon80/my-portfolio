"use client";

import { FormEvent, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import apiRequest from "@/lib/apiRequest";
import showToast from "@/lib/showToast";

const ContactForm = () => {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setBusy(true);
    setStatus("");

    try {
      const response = await apiRequest("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setStatus(response.message);
      showToast(response.message);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send your message. Please try again.";

      setStatus(message);
      showToast(message, true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="contact-form card" onSubmit={handleSubmit} aria-busy={busy}>
      {/* Name */}
      <label htmlFor="contact-name">Your name</label>
      <input id="contact-name" name="name" type="text" required minLength={2} maxLength={60} autoComplete="name" placeholder="What should I call you?" />

      {/* Email */}
      <label htmlFor="contact-email">Email address</label>
      <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" />

      {/* Message */}
      <label htmlFor="contact-message">What’s on your mind?</label>
      <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={6} placeholder="Tell me a little about your idea…" />

      {/* Hidden spam detection field */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Submit */}
      <button type="submit" className="button primary" disabled={busy}>
        {busy ? "Sending…" : "Send message"}
        <FiArrowUpRight />
      </button>

      <p role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
};

export default ContactForm;
