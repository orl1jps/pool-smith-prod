import Link from "next/link";
import { site } from "@/content/site";
import styles from "./CtaBand.module.css";

export function CtaBand({
  title = "Ready for a sparkling, worry-free pool?",
  text = "Request service today and let Pool Smith handle the rest.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className={styles.band}>
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.actions}>
          <Link href="/contact-us" className="btn btn-accent">
            Request Service
          </Link>
          <a href={site.phoneHref} className="btn btn-outline">
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
