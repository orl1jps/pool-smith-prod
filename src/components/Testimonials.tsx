"use client";

import { useEffect, useState } from "react";
import styles from "./Testimonials.module.css";

type Item = { name: string; message: string; role?: string };

export function Testimonials({
  items,
  variant = "light",
}: {
  items: Item[];
  variant?: "light" | "boxed";
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className={`${styles.wrap} ${variant === "boxed" ? styles.boxed : ""}`}>
      <div className={styles.viewport}>
        {items.map((it, i) => (
          <blockquote
            key={i}
            className={`${styles.quote} ${i === active ? styles.active : ""}`}
            aria-hidden={i !== active}
          >
            <span className={styles.mark} aria-hidden="true">
              &ldquo;
            </span>
            <p className={styles.message}>{it.message}</p>
            <footer className={styles.cite}>
              <span className={styles.name}>{it.name}</span>
              {it.role && <span className={styles.role}>{it.role}</span>}
            </footer>
          </blockquote>
        ))}
      </div>
      {items.length > 1 && (
        <div className={styles.dots}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              aria-current={i === active}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
