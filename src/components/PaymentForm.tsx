"use client";

import { useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { site } from "@/content/site";
import styles from "./PaymentForm.module.css";

type Details = { amount: string; name: string; email: string; note: string };

function PayStep({
  details,
  onBack,
}: {
  details: Details;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please check your payment details.");
      setBusy(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        receipt_email: details.email || undefined,
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment could not be completed.");
      setBusy(false);
      return;
    }
    setDone(true);
    setBusy(false);
  }

  if (done) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>Payment Received</h3>
        <p>
          Thank you, {details.name || "valued customer"}! Your payment of{" "}
          <strong>${Number(details.amount).toFixed(2)}</strong> was successful. A
          receipt has been sent to {details.email || "your email"}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.payForm}>
      <div className={styles.summary}>
        <span>Amount to pay</span>
        <strong>${Number(details.amount).toFixed(2)}</strong>
      </div>
      <PaymentElement options={{ layout: "tabs" }} />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <button type="button" className="btn btn-ghost" onClick={onBack} disabled={busy}>
          Back
        </button>
        <button type="submit" className="btn btn-primary" disabled={!stripe || busy}>
          {busy ? "Processing…" : `Pay $${Number(details.amount).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

export function PaymentForm({ publishableKey }: { publishableKey?: string }) {
  const stripePromise = useMemo<Promise<Stripe | null> | null>(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey]
  );

  const [details, setDetails] = useState<Details>({
    amount: "",
    name: "",
    email: "",
    note: "",
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!publishableKey || !stripePromise) {
    return (
      <div className={styles.unavailable}>
        <h3>Online Payments Coming Soon</h3>
        <p>
          Our secure online payment system isn&apos;t available just yet. Please call
          us at <a href={site.phoneHref}>{site.phoneDisplay}</a> to make a payment.
        </p>
      </div>
    );
  }

  async function startPayment(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not start the payment.");
        setBusy(false);
        return;
      }
      setClientSecret(data.clientSecret);
    } catch {
      setError("Network error. Please try again.");
    }
    setBusy(false);
  }

  if (clientSecret) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#005395" } } }}
      >
        <PayStep
          details={details}
          onBack={() => {
            setClientSecret(null);
          }}
        />
      </Elements>
    );
  }

  return (
    <form onSubmit={startPayment} className={styles.detailsForm}>
      <div className={styles.row}>
        <label htmlFor="pay-amount">Payment Amount (USD) *</label>
        <div className={styles.amountWrap}>
          <span className={styles.dollar}>$</span>
          <input
            id="pay-amount"
            type="number"
            min={5}
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            required
            value={details.amount}
            onChange={(e) => setDetails((d) => ({ ...d, amount: e.target.value }))}
          />
        </div>
      </div>
      <div className={styles.grid2}>
        <div className={styles.row}>
          <label htmlFor="pay-name">Your Name *</label>
          <input
            id="pay-name"
            type="text"
            autoComplete="name"
            required
            value={details.name}
            onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="pay-email">Email (for receipt) *</label>
          <input
            id="pay-email"
            type="email"
            autoComplete="email"
            required
            value={details.email}
            onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
          />
        </div>
      </div>
      <div className={styles.row}>
        <label htmlFor="pay-note">Note (optional)</label>
        <input
          id="pay-note"
          type="text"
          placeholder="Invoice # or what this payment is for"
          value={details.note}
          onChange={(e) => setDetails((d) => ({ ...d, note: e.target.value }))}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={busy}>
        {busy ? "Please wait…" : "Continue to Payment"}
      </button>
    </form>
  );
}
