import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { site } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Pool Smith for residential and commercial pool service in the Daytona Beach area. Call 844-985-7665 or request service online.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" crumbs={[{ label: "Contact Us" }]} />

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <aside className={styles.info}>
            <h2 className={styles.heading}>Get In Touch</h2>
            <p className={styles.intro}>
              Have a question or ready to schedule service? Reach out and a member of
              the Pool Smith team will be in touch.
            </p>

            <ul className={styles.list}>
              <li>
                <span className={styles.icon}>
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <strong>Call Us</strong>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <strong>Email Us</strong>
                  <a href={site.emailHref}>{site.email}</a>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <strong>Hours</strong>
                  <span>{site.hours}</span>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <Icon name="mapPin" size={20} />
                </span>
                <div>
                  <strong>Service Area</strong>
                  <span>{site.serviceArea}</span>
                </div>
              </li>
            </ul>
          </aside>

          <div className={styles.formWrap}>
            <h2 className={styles.heading}>Request Pool Service</h2>
            <ContactForm siteKey={process.env.TURNSTILE_SITE_KEY} />
          </div>
        </div>
      </section>
    </>
  );
}
