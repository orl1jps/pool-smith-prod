import Link from "next/link";
import Image from "next/image";
import styles from "./ServiceThumbGrid.module.css";

type Thumb = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export function ServiceThumbGrid({ items }: { items: Thumb[] }) {
  return (
    <div className="grid grid-3">
      {items.map((t) => (
        <Link key={t.href} href={t.href} className={styles.card}>
          <div className={styles.media}>
            <Image
              src={t.image}
              alt={t.title}
              fill
              sizes="(max-width: 980px) 50vw, 380px"
              className={styles.img}
            />
            <span className={styles.plus} aria-hidden="true">
              +
            </span>
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>{t.title}</h3>
            <p className={styles.desc}>{t.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
