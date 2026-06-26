import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { tipPosts } from "@/content/tips";
import styles from "./tips.module.css";

export const metadata: Metadata = {
  title: "Pool Smith Tips",
  description:
    "Pool care tips, seasonal maintenance advice and news from the Pool Smith team in the Daytona Beach area.",
  alternates: { canonical: "/tips" },
};

export default function TipsPage() {
  return (
    <>
      <PageBanner title="Pool Smith Tips" crumbs={[{ label: "Pool Smith Tips" }]} />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {tipPosts.map((post) => (
              <article key={post.slug} className={styles.card}>
                <Link href={`/tips/${post.slug}`} className={styles.media}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 980px) 50vw, 380px"
                    className={styles.img}
                  />
                  <time className={styles.date} dateTime={post.date}>
                    {post.dateLabel}
                  </time>
                </Link>
                <div className={styles.body}>
                  <h2 className={styles.title}>
                    <Link href={`/tips/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <Link href={`/tips/${post.slug}`} className={styles.more}>
                    Read More →
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
