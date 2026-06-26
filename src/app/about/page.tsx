import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import { StatsCounter } from "@/components/StatsCounter";
import { TextWithImage } from "@/components/TextWithImage";
import { TeamGrid } from "@/components/TeamGrid";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import {
  aboutIntro,
  aboutImage,
  aboutColumns,
  aboutFeatures,
  aboutFeaturesImage,
  aboutStats,
  missionVision,
  team,
} from "@/content/about";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Pool Smith is a family-owned pool service company serving the Daytona Beach area and Volusia County, Florida — maintenance, repairs, renovations and more.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" crumbs={[{ label: "About Us" }]} />

      <section className="section">
        <div className="container">
          <p className="lead text-center" style={{ maxWidth: 880, margin: "0 auto 40px" }}>
            {aboutIntro}
          </p>
          <div className={styles.hero}>
            <Image
              src={aboutImage}
              alt="Pool Smith service"
              width={1170}
              height={560}
              className={styles.heroImg}
            />
          </div>

          <div className={`grid grid-3 ${styles.cols}`}>
            {aboutColumns.map((c) => (
              <div key={c.heading}>
                <h3 className={styles.colHeading}>{c.heading}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className={`container ${styles.featuresRow}`}>
          <div className={styles.featuresMedia}>
            <Image
              src={aboutFeaturesImage}
              alt="Pool Smith technicians"
              width={560}
              height={420}
              className={styles.featuresImg}
            />
          </div>
          <div>
            <SectionTitle
              align="left"
              eyebrow="Why Pool Smith"
              title="Quality Service, Quick Response"
            />
            <p>
              Pool Smith takes pride in providing high-quality service with a timely
              response to our customers&apos; needs. We feature:
            </p>
            <ul className={styles.features}>
              {aboutFeatures.map((f) => (
                <li key={f}>
                  <Icon name="check" size={18} className={styles.check} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`section ${styles.statsSection}`}>
        <div className="container">
          <SectionTitle title="More Than 20 Years of Experience" />
          <StatsCounter stats={aboutStats} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="What Drives Us" title="Mission & Vision" />
          <TextWithImage blocks={missionVision} />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow="The People" title="Our Team" />
          <TeamGrid members={team} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
