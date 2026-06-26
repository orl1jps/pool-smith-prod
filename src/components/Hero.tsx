"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import styles from "./Hero.module.css";

type Slide = { image: string; heading: string; subHeading: string };

export function Hero({ slides }: { slides: readonly Slide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      6000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className={styles.hero} aria-roledescription="carousel">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === active ? styles.active : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={styles.bg}
          />
          <div className={styles.overlay} />
          <div className={`container ${styles.inner}`}>
            <p className={styles.sub}>{s.subHeading}</p>
            <h1 className={styles.heading}>
              {s.heading.split("\n").map((line, j) => (
                <span key={j}>{line}</span>
              ))}
            </h1>
            <div className={styles.actions}>
              <Link href="/contact-us" className="btn btn-accent">
                Request Pool Service
              </Link>
              <a href={site.phoneHref} className="btn btn-outline">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.dots} role="tablist" aria-label="Slides">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
