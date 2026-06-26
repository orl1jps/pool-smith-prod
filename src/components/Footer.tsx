import Link from "next/link";
import Image from "next/image";
import { footerLinks, nav, site } from "@/content/site";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

const serviceLinks =
  nav.find((n) => n.label === "Services")?.children ?? [];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.col}>
            <Image
              src="/images/logo-invert.png"
              alt={site.name}
              width={300}
              height={125}
              className={styles.logo}
            />
            <p className={styles.about}>{site.description}</p>
            <p className={styles.hours}>
              <strong>Hours:</strong> {site.hours}
            </p>
          </div>

          <div className={styles.col}>
            <h3 className={styles.heading}>Our Services</h3>
            <ul className={styles.links}>
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.heading}>Quick Links</h3>
            <ul className={styles.links}>
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.heading}>Get in Touch</h3>
            <ul className={styles.contact}>
              <li>
                <span>Call</span>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </li>
              <li>
                <span>Email</span>
                <a href={site.emailHref}>{site.email}</a>
              </li>
              <li>
                <span>Service Area</span>
                {site.serviceArea}
              </li>
            </ul>
            <Link href="/contact-us" className="btn btn-accent">
              Request Service
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={`container ${styles.stripInner}`}>
          <p>
            &copy; {year} {site.copyright}. All rights reserved.
          </p>
          <p>
            Serving {site.region}.
          </p>
        </div>
      </div>
    </footer>
  );
}
