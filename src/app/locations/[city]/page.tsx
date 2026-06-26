import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { locations, locationSlugs, getLocation } from "@/content/locations";
import { site } from "@/content/site";
import styles from "./city.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locationSlugs.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) return {};
  const title = `${loc.name} Pool Cleaning & Repair`;
  return {
    title,
    description: `Professional pool cleaning, maintenance and repair in ${loc.name}, Florida. Call Pool Smith for a free quote.`,
    alternates: { canonical: `/locations/${city}` },
    openGraph: { title, images: [loc.image] },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) notFound();

  return (
    <>
      <PageBanner
        title={`${loc.name} Pool Service`}
        image={loc.image}
        crumbs={[{ label: "Locations", href: "/locations" }, { label: loc.name }]}
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <article className={styles.main}>
            {loc.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}>
                {p}
              </p>
            ))}
            <div className={styles.cta}>
              <Link href="/contact-us" className="btn btn-primary">
                Request Service in {loc.name}
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                Call {site.phoneDisplay}
              </a>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Other Locations</h3>
              <ul className={styles.locList}>
                {locations.map((l) => (
                  <li key={l.slug} className={l.slug === city ? styles.active : ""}>
                    <Link href={`/locations/${l.slug}`}>
                      <Icon name="mapPin" size={16} className={styles.pin} />
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Get a Free Quote</h3>
              <ContactForm siteKey={process.env.TURNSTILE_SITE_KEY} withSubject={false} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
