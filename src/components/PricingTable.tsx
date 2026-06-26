import Link from "next/link";
import styles from "./PricingTable.module.css";

type Tier = {
  title: string;
  description: string;
  endTitle: string;
  sign: string;
  amount: string;
  amountText: string;
};

export function PricingTable({
  tiers,
  featuredIndex = 1,
}: {
  tiers: Tier[];
  featuredIndex?: number;
}) {
  return (
    <div className="grid grid-3">
      {tiers.map((t, i) => (
        <div
          key={i}
          className={`${styles.card} ${i === featuredIndex ? styles.featured : ""}`}
        >
          <h3 className={styles.title}>{t.title}</h3>
          <div className={styles.price}>
            <span className={styles.end}>{t.endTitle}</span>
            <span className={styles.amount}>
              <sup>{t.sign}</sup>
              {t.amount}
            </span>
            <span className={styles.per}>{t.amountText}</span>
          </div>
          <p className={styles.desc}>{t.description}</p>
          <Link href="/contact-us" className="btn btn-primary">
            Order Now
          </Link>
        </div>
      ))}
    </div>
  );
}
