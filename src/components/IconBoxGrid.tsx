import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import styles from "./IconBoxGrid.module.css";

type Box = {
  icon: IconName;
  title: string;
  description: string;
  href?: string;
};

export function IconBoxGrid({
  boxes,
  columns = 3,
  compact = false,
}: {
  boxes: Box[];
  columns?: 3 | 4;
  compact?: boolean;
}) {
  return (
    <div className={`grid grid-${columns}`}>
      {boxes.map((b) => {
        const inner = (
          <>
            <span className={styles.iconWrap}>
              <Icon name={b.icon} size={compact ? 30 : 38} />
            </span>
            <h3 className={styles.title}>{b.title}</h3>
            <p className={styles.desc}>{b.description}</p>
            {b.href && <span className={styles.more}>Learn more →</span>}
          </>
        );
        return b.href ? (
          <Link
            key={b.title + b.icon}
            href={b.href}
            className={`${styles.box} ${compact ? styles.compact : ""}`}
          >
            {inner}
          </Link>
        ) : (
          <div
            key={b.title + b.icon}
            className={`${styles.box} ${compact ? styles.compact : ""}`}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
