"use client";

// Native React contact form wired to the submitContact Server Action.
// Render server-side passing the public Turnstile key:
//   <ContactForm siteKey={process.env.TURNSTILE_SITE_KEY} />

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Script from "next/script";
import { submitContact } from "@/app/actions";
import { CONTACT_INITIAL, HONEYPOT_FIELD } from "@/lib/contact-state";
import styles from "./ContactForm.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary"
      style={{ width: "100%" }}
      disabled={pending}
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export function ContactForm({
  siteKey,
  withSubject = true,
}: {
  siteKey?: string;
  withSubject?: boolean;
}) {
  const [state, action] = useActionState(submitContact, CONTACT_INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      // @ts-expect-error turnstile injected by the Cloudflare script
      window.turnstile?.reset?.();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className={styles.form} noValidate>
      {state.message && (
        <p
          className={`${styles.status} ${
            state.ok ? styles.statusOk : styles.statusErr
          }`}
          role="status"
        >
          {state.message}
        </p>
      )}

      {/* honeypot — hidden from users, tempting to bots */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="hp-website">Website</label>
        <input
          id="hp-website"
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.row}>
          <label htmlFor="your-name">Your Name *</label>
          <input id="your-name" name="your-name" type="text" autoComplete="name" required />
        </div>
        <div className={styles.row}>
          <label htmlFor="your-email">Your Email *</label>
          <input id="your-email" name="your-email" type="email" autoComplete="email" required />
        </div>
        <div className={styles.row}>
          <label htmlFor="your-phone">Your Phone</label>
          <input id="your-phone" name="your-phone" type="tel" autoComplete="tel" />
        </div>
        {withSubject && (
          <div className={styles.row}>
            <label htmlFor="your-subject">How can we help?</label>
            <select id="your-subject" name="your-subject" defaultValue="">
              <option value="" disabled>
                Select a service…
              </option>
              <option>Residential Pool Service</option>
              <option>Commercial Pool Service</option>
              <option>Pool Equipment &amp; Repair</option>
              <option>Above Ground Pool Cleanup</option>
              <option>Green Pool Clean-up</option>
              <option>One-time Cleaning / Quote</option>
              <option>Other</option>
            </select>
          </div>
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="your-message">Message *</label>
        <textarea id="your-message" name="your-message" rows={6} required />
      </div>

      {siteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-theme="light"
            style={{ marginBottom: 16 }}
          />
        </>
      )}
      <SubmitButton />
    </form>
  );
}
