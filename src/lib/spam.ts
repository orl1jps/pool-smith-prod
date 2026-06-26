// Honeypot + Cloudflare Turnstile spam protection.
//
// Honeypot: a hidden field real users never fill but bots tend to populate.
// Non-empty => spam, silently dropped (caller still returns success so the bot
// can't tell). The hidden input is rendered by ContactForm.tsx.
//
// Turnstile: the widget injects a `cf-turnstile-response` token; we verify it
// against Cloudflare. If TURNSTILE_SECRET_KEY is unset, verification is SKIPPED
// (returns true) so the form works in dev. Set BOTH keys in production.

import { HONEYPOT_FIELD } from "./contact-state";
export { HONEYPOT_FIELD };

export function isHoneypotTripped(
  data: FormData | Record<string, string>
): boolean {
  const value =
    data instanceof FormData ? data.get(HONEYPOT_FIELD) : data[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn(
      "[spam] TURNSTILE_SECRET_KEY not set — Turnstile verification skipped."
    );
    return true;
  }
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[spam] Turnstile verification failed:", err);
    return false;
  }
}
