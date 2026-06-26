// "Pool Smith Tips" blog. The source WordPress blog held demo placeholder posts
// (one article duplicated with broken fragment titles and a competitor name).
// Reproduced here as the same posts with corrected titles, deduplicated body
// copy, and the competitor reference removed.

export type TipPost = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  image: string;
  excerpt: string;
  paragraphs: string[];
};

const springMaintenance = [
  "There is still time to take advantage of our Spring Special filter maintenance and equipment check. This annual preventative maintenance on your pool's equipment is designed to get your pool ready for the swim season, which is upon us now.",
  "DE filters need to be disassembled and cleaned, and cartridges need to be checked and replaced if needed. Seals and O-rings should be checked, lubricated and replaced as necessary.",
  "A full safety inspection of the pool pump and filter, the timer and wiring, and the drain covers in the pool is also performed. All of this is included in the service.",
];

export const tipPosts: TipPost[] = [
  {
    slug: "getting-your-pool-ready-to-swim",
    title: "Getting Your Pool Ready to Swim",
    date: "2016-12-19",
    dateLabel: "December 19, 2016",
    image: "/images/uploads/2016/12/blog-post-img-1.jpg",
    excerpt:
      "Spring is the time to get your pool and its equipment ready for the swim season. Here's what our preventative maintenance covers.",
    paragraphs: springMaintenance,
  },
  {
    slug: "two-important-milestones",
    title: "Two Important Milestones",
    date: "2016-12-19",
    dateLabel: "December 19, 2016",
    image: "/images/uploads/2016/12/blog-post-img-3.jpg",
    excerpt:
      "Annual preventative maintenance keeps your pool equipment running efficiently and your water swim-ready all season long.",
    paragraphs: springMaintenance,
  },
  {
    slug: "spring-filter-maintenance",
    title: "Spring Filter Maintenance & Equipment Check",
    date: "2016-11-22",
    dateLabel: "November 22, 2016",
    image: "/images/uploads/2016/11/block-bg-2.jpg",
    excerpt:
      "DE filters, cartridges, seals, O-rings and a full safety inspection — everything included in our Spring Special.",
    paragraphs: springMaintenance,
  },
];

export const tipSlugs = tipPosts.map((p) => p.slug);
export const getTip = (s: string) => tipPosts.find((p) => p.slug === s) ?? null;
