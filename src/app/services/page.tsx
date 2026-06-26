import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import { IconBoxGrid } from "@/components/IconBoxGrid";
import { CtaBand } from "@/components/CtaBand";
import { serviceHighlights } from "@/content/home";
import { servicesIntro, maintenanceBoxes, featuredServices } from "@/content/services";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Residential and commercial pool services, equipment repair, renovations, leak detection, pressure washing and more — across the Daytona Beach area.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Our Services" crumbs={[{ label: "Services" }]} />

      <section className="section">
        <div className="container">
          <p className="lead text-center" style={{ maxWidth: 880, margin: "0 auto 44px" }}>
            {servicesIntro}
          </p>
          <IconBoxGrid boxes={serviceHighlights} columns={3} />
        </div>
      </section>

      <section className={`section ${styles.maintenance}`}>
        <div className="container">
          <SectionTitle title="Pool Maintenance" />
          <IconBoxGrid boxes={maintenanceBoxes} columns={4} compact />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Everything We Offer" title="Featured Services" />
          <div className={`grid grid-4 ${styles.featured}`}>
            {featuredServices.map((s) => (
              <article key={s.title} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 980px) 50vw, 270px"
                    className={styles.img}
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.desc}>{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Need a service not listed here?" text="Give us a call — chances are, Pool Smith can help." />
    </>
  );
}
