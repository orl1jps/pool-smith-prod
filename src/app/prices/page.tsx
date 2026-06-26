import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import { PlanTable } from "@/components/PlanTable";
import { PricingTable } from "@/components/PricingTable";
import { CtaBand } from "@/components/CtaBand";
import { specialOffers } from "@/content/home";
import { pricesIntro, monthlyPlans, aLaCarte } from "@/content/prices";
import styles from "./prices.module.css";

export const metadata: Metadata = {
  title: "Our Prices & Plans",
  description:
    "Simple, transparent monthly pool service plans and à-la-carte pricing for repairs, renovations and more in the Daytona Beach area.",
  alternates: { canonical: "/prices" },
};

export default function PricesPage() {
  return (
    <>
      <PageBanner
        title="Our Prices & Plans"
        crumbs={[{ label: "Prices" }]}
      />

      <section className="section">
        <div className="container">
          <p className="lead text-center" style={{ maxWidth: 820, margin: "0 auto 50px" }}>
            {pricesIntro}
          </p>
          <PlanTable plans={monthlyPlans} />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow="À La Carte" title="Get the Best Pricing" />
          <div className="grid grid-3">
            {aLaCarte.map((item) => (
              <div key={item.title} className={styles.priceCard}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={380}
                  height={240}
                  className={styles.priceImg}
                />
                <div className={styles.priceBody}>
                  <h3 className={styles.priceTitle}>{item.title}</h3>
                  <span className={styles.priceTag}>
                    <small>from</small> {item.from}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Special Offer" title="Weekly Cleaning Plans" />
          <PricingTable tiers={specialOffers} />
        </div>
      </section>

      <CtaBand title="Not sure which plan fits your pool?" text="Call us for a free, no-obligation quote." />
    </>
  );
}
