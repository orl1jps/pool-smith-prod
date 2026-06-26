import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CtaBand } from "@/components/CtaBand";
import { galleryImages } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of pool cleaning, resurfacing and renovation projects completed by Pool Smith across the Daytona Beach area.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" crumbs={[{ label: "Gallery" }]} />

      <section className="section">
        <div className="container">
          <p className="lead text-center" style={{ maxWidth: 720, margin: "0 auto 44px" }}>
            We pay special attention to the details of every project. Browse a few
            examples of our work below.
          </p>
          <GalleryGrid
            images={galleryImages.map((src) => ({ src, alt: "Pool Smith project" }))}
            columns={4}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
