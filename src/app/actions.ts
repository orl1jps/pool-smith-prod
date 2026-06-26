"use server";

// Server Action behind the native React ContactForm. A "use server" file may
// export ONLY async functions — shared types/constants live in contact-state.ts.

import { headers } from "next/headers";
import { sendContactEmail } from "@/lib/email";
import { isHoneypotTripped, verifyTurnstile } from "@/lib/spam";
import { saveSubmission, markEmailStatus } from "@/lib/db";
import type { ContactState } from "@/lib/contact-state";

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // The whole action is wrapped so it can NEVER throw — an uncaught error in a
  // Server Action surfaces to the user as a generic 500. We always return a
  // friendly ContactState instead.
  try {
    if (isHoneypotTripped(formData))
      // silently accept bots
      return { ok: true, message: "Thank you! Your message has been sent." };

    const h = await headers();
    const remoteIp =
      h.get("cf-connecting-ip") ??
      h.get("x-forwarded-for")?.split(",")[0].trim() ??
      undefined;

    const token = String(formData.get("cf-turnstile-response") ?? "");
    if (!(await verifyTurnstile(token, remoteIp)))
      return {
        ok: false,
        message:
          "Sorry, we couldn't verify you weren't a robot. Please reload and try again.",
      };

    const get = (k: string) => String(formData.get(k) ?? "").trim();
    const name = get("your-name"),
      email = get("your-email"),
      phone = get("your-phone"),
      subject = get("your-subject"),
      message = get("your-message");
    if (!name || !email || !message)
      return {
        ok: false,
        message: "Please fill in your name, email, and message.",
      };

    const rowId = saveSubmission({
      // persist BEFORE emailing
      form: "contact",
      name,
      email,
      phone,
      message: subject ? `[${subject}]\n\n${message}` : message,
      source: h.get("referer") ?? "contact-form",
      ip: remoteIp,
    });
    const sent = await sendContactEmail({ name, email, phone, message, subject });
    if (rowId) markEmailStatus(rowId, sent ? "sent" : "failed");

    // As long as the lead was captured, tell the visitor it went through — a
    // failed email is an internal concern, not the visitor's problem.
    if (rowId)
      return {
        ok: true,
        message: "Thank you! Your message has been sent. We'll be in touch shortly.",
      };

    return {
      ok: false,
      message:
        "Sorry, something went wrong on our end. Please call us at 844-985-7665.",
    };
  } catch (err) {
    console.error("[contact] submitContact failed:", err);
    return {
      ok: false,
      message:
        "Sorry, something went wrong. Please try again or call us at 844-985-7665.",
    };
  }
}
