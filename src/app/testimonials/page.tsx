import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { allTestimonials } from "@/content/testimonials";
import styles from "./testimonials.module.css";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "See what Pool Smith customers across the Daytona Beach area say about our pool cleaning, maintenance and repair services.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageBanner title="Testimonials" crumbs={[{ label: "Testimonials" }]} />

      <section className="section">
        <div className="container">
          <p className="lead text-center" style={{ maxWidth: 720, margin: "0 auto 50px" }}>
            Don&apos;t just take our word for it — here&apos;s what our customers have to
            say about working with Pool Smith.
          </p>
          <div className={styles.grid}>
            {allTestimonials.map((t, i) => (
              <figure key={i} className={styles.card}>
                <div className={styles.stars} aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s}>★</span>
                  ))}
                </div>
                <blockquote className={styles.quote}>{t.message}</blockquote>
                <figcaption className={styles.cite}>
                  <span className={styles.avatar} aria-hidden="true">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{t.name}</strong>
                    {t.role && <small>{t.role}</small>}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to join our happy customers?"
        text="Request service today and see the Pool Smith difference."
      />
    </>
  );
}
