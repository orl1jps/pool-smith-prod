import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { IconBoxGrid } from "@/components/IconBoxGrid";
import { ServiceThumbGrid } from "@/components/ServiceThumbGrid";
import { PricingTable } from "@/components/PricingTable";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Testimonials";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ContactForm } from "@/components/ContactForm";
import {
  heroSlides,
  serviceHighlights,
  serviceThumbs,
  specialOffers,
  whyChooseUs,
  howItWorks,
  homeGallery,
  homeTestimonials,
} from "@/content/home";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <>
      <Hero slides={heroSlides} />

      {/* Service highlights */}
      <section className="section">
        <div className="container">
          <IconBoxGrid boxes={serviceHighlights} columns={3} />
        </div>
      </section>

      {/* Service & repair thumbnails */}
      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow="What We Do" title="Service and Repair" />
          <ServiceThumbGrid items={serviceThumbs} />
        </div>
      </section>

      {/* Special offer pricing */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Special Offer"
            title="Weekly Cleaning Plans"
            subtitle="Simple monthly pricing for dependable, professional pool care."
          />
          <PricingTable tiers={specialOffers} />
        </div>
      </section>

      {/* Why choose us */}
      <section className="section section--tint">
        <div className="container">
          <SectionTitle eyebrow="The Pool Smith Difference" title="Why Choose Us?" />
          <IconBoxGrid boxes={whyChooseUs} columns={3} compact />
        </div>
      </section>

      {/* How it works */}
      <section className={`section ${styles.howSection}`}>
        <div className="container">
          <SectionTitle title="How It Works" />
          <Steps steps={howItWorks} />
        </div>
      </section>

      {/* Featured projects / gallery */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Our Work"
            title="Featured Projects"
            subtitle="We pay special attention to the details of every project to ensure complete satisfaction. View examples of our work below, or contact us for more information."
          />
          <GalleryGrid images={homeGallery.map((src) => ({ src }))} />
          <div className="text-center" style={{ marginTop: 36 }}>
            <Link href="/gallery" className="btn btn-ghost">
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials + contact */}
      <section className={`section section--tint ${styles.contactSection}`}>
        <div className={`container ${styles.contactGrid}`}>
          <div>
            <SectionTitle align="left" eyebrow="Reviews" title="What Our Clients Say" />
            <Testimonials items={homeTestimonials} />
          </div>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Request Pool Service</h3>
            <p className={styles.formIntro}>
              Tell us about your pool and we&apos;ll be in touch shortly.
            </p>
            <ContactForm siteKey={process.env.TURNSTILE_SITE_KEY} />
          </div>
        </div>
      </section>
    </>
  );
}
