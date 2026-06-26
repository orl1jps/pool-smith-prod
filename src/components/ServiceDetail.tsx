import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { ContactForm } from "./ContactForm";
import { nav, site } from "@/content/site";
import type { ServiceDetail as Detail } from "@/content/service-details";
import styles from "./ServiceDetail.module.css";

const serviceNav = nav.find((n) => n.label === "Services")?.children ?? [];

export function ServiceDetail({
  detail,
  activeSlug,
}: {
  detail: Detail;
  activeSlug: string;
}) {
  return (
    <section className="section">
      <div className={`container ${styles.layout}`}>
        <article className={styles.main}>
          <div className={styles.media}>
            <Image
              src={detail.image}
              alt={detail.h1}
              width={820}
              height={460}
              className={styles.img}
              priority
            />
          </div>

          {detail.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "lead" : undefined}>
              {p}
            </p>
          ))}

          {detail.blocks.map((b, i) => (
            <div key={i} className={styles.block}>
              {b.heading && <h2 className={styles.blockHeading}>{b.heading}</h2>}
              {b.paragraphs?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {b.bullets && b.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {b.bullets.map((bl, k) => (
                    <li key={k}>
                      <Icon name="check" size={17} className={styles.check} />
                      <span>{bl}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className={styles.cta}>
            <Link href="/contact-us" className="btn btn-primary">
              Request Pool Service
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              Call {site.phoneDisplay}
            </a>
          </div>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Our Services</h3>
            <ul className={styles.serviceList}>
              {serviceNav.map((s) => {
                const slug = s.href.split("/").pop();
                return (
                  <li key={s.href} className={slug === activeSlug ? styles.active : ""}>
                    <Link href={s.href}>
                      {s.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={`${styles.widget} ${styles.callout}`}>
            <span className={styles.calloutIcon}>
              <Icon name="phone" size={26} />
            </span>
            <h3>Have Questions?</h3>
            <p>Speak with a Pool Smith specialist today.</p>
            <a href={site.phoneHref} className="btn btn-accent">
              {site.phoneDisplay}
            </a>
          </div>

          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Request Service</h3>
            <ContactForm siteKey={process.env.TURNSTILE_SITE_KEY} withSubject={false} />
          </div>
        </aside>
      </div>
    </section>
  );
}
