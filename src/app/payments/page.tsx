import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { PaymentForm } from "@/components/PaymentForm";
import { Icon } from "@/components/Icon";
import { site } from "@/content/site";
import styles from "./payments.module.css";

export const metadata: Metadata = {
  title: "Make a Payment",
  description:
    "Pay your Pool Smith pool service bill securely online. Enter any amount and pay by card.",
  alternates: { canonical: "/payments" },
  robots: { index: true, follow: true },
};

export default function PaymentsPage() {
  return (
    <>
      <PageBanner title="Make a Payment" crumbs={[{ label: "Payments" }]} />

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.intro}>
            <h2 className={styles.heading}>Pay Your Bill Online</h2>
            <p>
              Paying your Pool Smith bill is quick and secure. Enter the amount you&apos;d
              like to pay, your details, and your card information — we&apos;ll email you a
              receipt right away.
            </p>
            <ul className={styles.points}>
              <li>
                <Icon name="shield" size={20} className={styles.icon} />
                <span>Secure payments processed by Stripe</span>
              </li>
              <li>
                <Icon name="check" size={20} className={styles.icon} />
                <span>Pay any amount — invoices, deposits or balances</span>
              </li>
              <li>
                <Icon name="mail" size={20} className={styles.icon} />
                <span>Instant email receipt for your records</span>
              </li>
            </ul>
            <div className={styles.help}>
              <strong>Prefer to pay by phone?</strong>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </div>
          </div>

          <div className={styles.formCard}>
            <PaymentForm publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY} />
          </div>
        </div>
      </section>
    </>
  );
}
