import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/PageBanner";
import { ServiceDetail } from "@/components/ServiceDetail";
import { CtaBand } from "@/components/CtaBand";
import {
  serviceDetails,
  serviceSlugs,
  getServiceDetail,
} from "@/content/service-details";

export const dynamicParams = false; // unknown slugs → 404

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getServiceDetail(slug);
  if (!d) return {};
  return {
    title: d.title,
    description: d.metaDescription,
    alternates: { canonical: `/pool-services/${slug}` },
    openGraph: {
      title: d.title,
      description: d.metaDescription,
      images: [d.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) notFound();

  return (
    <>
      <PageBanner
        title={detail.h1}
        image={detail.image}
        crumbs={[{ label: "Services", href: "/services" }, { label: detail.title }]}
      />
      <ServiceDetail detail={detail} activeSlug={slug} />
      <CtaBand />
    </>
  );
}
