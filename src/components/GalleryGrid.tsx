"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./GalleryGrid.module.css";

type GalleryImage = { src: string; alt?: string };

export function GalleryGrid({
  images,
  columns = 3,
}: {
  images: GalleryImage[];
  columns?: 3 | 4;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  return (
    <>
      <div className={`grid grid-${columns}`}>
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            className={styles.tile}
            onClick={() => setOpen(i)}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              fill
              sizes="(max-width: 980px) 50vw, 380px"
              className={styles.img}
            />
            <span className={styles.zoom} aria-hidden="true">
              +
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button className={styles.close} onClick={close} aria-label="Close">
            ×
          </button>
          <button
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[open].src}
              alt={images[open].alt ?? ""}
              width={1200}
              height={800}
              className={styles.full}
            />
          </div>
          <button
            className={`${styles.nav} ${styles.nextBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
