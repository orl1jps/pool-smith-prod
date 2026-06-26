import Link from "next/link";
import { Icon } from "./Icon";
import styles from "./PlanTable.module.css";

export type Plan = {
  title: string;
  priceTop: string;
  price: string;
  priceNote?: string;
  features: string[];
  featured?: boolean;
};

export function PlanTable({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid grid-3">
      {plans.map((p) => (
        <div
          key={p.title}
          className={`${styles.plan} ${p.featured ? styles.featured : ""}`}
        >
          <div className={styles.head}>
            <h3 className={styles.title}>{p.title}</h3>
            <div className={styles.circle}>
              <span className={styles.top}>{p.priceTop}</span>
              <span className={styles.price}>{p.price}</span>
              {p.priceNote && <span className={styles.note}>{p.priceNote}</span>}
            </div>
          </div>
          <ul className={styles.features}>
            {p.features.map((f) => (
              <li key={f}>
                <Icon name="check" size={16} className={styles.check} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/contact-us" className="btn btn-primary">
            Order Now
          </Link>
        </div>
      ))}
    </div>
  );
}
