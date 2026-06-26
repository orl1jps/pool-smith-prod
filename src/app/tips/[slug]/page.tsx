import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { tipPosts, tipSlugs, getTip } from "@/content/tips";
import styles from "./post.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return tipSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getTip(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/tips/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      publishedTime: post.date,
    },
  };
}

export default async function TipPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getTip(slug);
  if (!post) notFound();

  const others = tipPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <PageBanner
        title={post.title}
        image={post.image}
        crumbs={[{ label: "Pool Smith Tips", href: "/tips" }, { label: post.title }]}
      />

      <section className="section">
        <div className={`container ${styles.wrap}`}>
          <article className={styles.article}>
            <div className={styles.media}>
              <Image
                src={post.image}
                alt={post.title}
                width={820}
                height={420}
                className={styles.img}
                priority
              />
            </div>
            <time className={styles.date} dateTime={post.date}>
              {post.dateLabel}
            </time>
            {post.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}>
                {p}
              </p>
            ))}
          </article>

          {others.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.relatedTitle}>More Tips</h2>
              <ul>
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/tips/${p.slug}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
