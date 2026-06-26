import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { locations } from "@/content/locations";
import { site } from "@/content/site";
import styles from "./locations.module.css";

export const metadata: Metadata = {
  title: "Service Locations",
  description: `Pool Smith provides pool cleaning and repair across ${site.serviceArea}.`,
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageBanner title="Service Locations" crumbs={[{ label: "Locations" }]} />

      <section className="section">
        <div className="container">
          <p className="lead text-center" style={{ maxWidth: 760, margin: "0 auto 50px" }}>
            Pool Smith proudly serves homeowners and businesses across {site.region}.
            Find your city below to learn more about our local pool services.
          </p>
          <div className={styles.list}>
            {locations.map((loc, i) => (
              <article
                key={loc.slug}
                className={`${styles.row} ${i % 2 === 1 ? styles.reverse : ""}`}
              >
                <Link href={`/locations/${loc.slug}`} className={styles.media}>
                  <Image
                    src={loc.image}
                    alt={`Pool service in ${loc.name}`}
                    fill
                    sizes="(max-width: 800px) 100vw, 440px"
                    className={styles.img}
                  />
                </Link>
                <div className={styles.body}>
                  <h2 className={styles.name}>{loc.name}</h2>
                  <p className={styles.summary}>{loc.summary}</p>
                  <Link href={`/locations/${loc.slug}`} className="btn btn-ghost">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
