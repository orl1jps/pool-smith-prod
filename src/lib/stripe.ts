import Stripe from "stripe";

// Server-side Stripe client. Returns null when STRIPE_SECRET_KEY is unset so
// the /payments page can render a graceful "payments unavailable" state in dev
// or before keys are configured.

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripe) {
    // Omit apiVersion to use the account's default pinned version.
    stripe = new Stripe(key);
  }
  return stripe;
}

// Bill-pay accepts any custom amount; clamp to sane bounds (in dollars).
export const MIN_PAYMENT = 5;
export const MAX_PAYMENT = 10000;

export function dollarsToCents(amount: number): number {
  return Math.round(amount * 100);
}
