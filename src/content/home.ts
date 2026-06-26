// Home page content — extracted from the WordPress "Home" page (WPBakery
// shortcodes translated to typed data). Images live under /images/uploads/.

import type { IconName } from "@/components/Icon";

export const heroSlides = [
  {
    image: "/images/uploads/2016/11/slide2.jpg",
    heading: "We Do All The Work.\nYou Have All The Fun.",
    subHeading: "Serving Your Relaxation",
  },
  {
    image: "/images/uploads/2016/11/slide3.jpg",
    heading: "Pool Perfection, Every Time",
    subHeading: "Serving Your Relaxation",
  },
  {
    image: "/images/uploads/2019/10/slider_1-1.jpg",
    heading: "Reliable Service For 100% Pool Enjoyment",
    subHeading: "Serving Your Relaxation",
  },
] as const;

export type IconBox = {
  icon: IconName;
  title: string;
  description: string;
  href: string;
};

export const serviceHighlights: IconBox[] = [
  {
    icon: "pool",
    title: "Residential Pool Service",
    description:
      "A swimming pool should be enjoyed — why ruin the fun with constant maintenance? Our professionals give you peace of mind with a long list of residential pool services, keeping your pool clean and healthy for you and your family.",
    href: "/pool-services/residential-pool-service",
  },
  {
    icon: "waterpolo",
    title: "Commercial Pool Service",
    description:
      "We understand the special needs of commercial pools and can manage any problem that arises. Your pool reflects how your business views health and cleanliness — let Pool Smith keep it clean and ready for business.",
    href: "/pool-services/commercial-pool-service",
  },
  {
    icon: "wrench",
    title: "Pool Equipment Repair & Service",
    description:
      "Is your pool in need of repair? Pool Smith will order the parts you need and get them installed in a timely manner. Looking to upgrade your current equipment? We can help with that too and get your pool ready for the season.",
    href: "/pool-services/pool-equipment-and-repair",
  },
];

export type ServiceThumb = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export const serviceThumbs: ServiceThumb[] = [
  {
    title: "Maintenance",
    description:
      "Hiring a professional pool service protects one of your most valuable investments — your pool! Let us do the heavy lifting and keep it sparkling all season.",
    image: "/images/uploads/2016/11/category-img-01.jpg",
    href: "/pool-services/pool-maintenance",
  },
  {
    title: "Green Pool Clean-up",
    description:
      "Does your pool give you the blues? Pool Smith can restore and refresh old, green pools to look brand new and fit your lifestyle.",
    image: "/images/uploads/2019/10/pool-algae-service.jpg",
    href: "/pool-services/green-pool-clean-up",
  },
  {
    title: "Leak Detection",
    description:
      "We've got the knowledge to stop leaks fast — around the skimmer, drain or tile. Contact us so we can stop leaks from your pool.",
    image: "/images/uploads/2019/10/pool-leak-service-florida.jpg",
    href: "/pool-services/leak-detection",
  },
  {
    title: "Pool Resurfacing",
    description:
      "We bring new life to your old pool. If you're seeing hollow spots, chips, tears or cracks in your finish, it may be time to resurface.",
    image: "/images/uploads/2019/10/pool-surfacing-florida.jpg",
    href: "/pool-services/pool-surface",
  },
  {
    title: "Pressure Washing",
    description:
      "Remove rust, algae and dirt from around your home. Keep your pool deck, lanai or patio looking fresh and clean.",
    image: "/images/uploads/2016/11/category-img-05.jpg",
    href: "/pool-services/pressure-wash",
  },
  {
    title: "Acid Washing",
    description:
      "If your pool has stains that can't be eliminated through chemical treatment, an acid wash may restore the look.",
    image: "/images/uploads/2019/10/acid-pool-wash-service.jpg",
    href: "/pool-services/acid-washing",
  },
];

export type PriceTier = {
  title: string;
  description: string;
  endTitle: string;
  sign: string;
  amount: string;
  amountText: string;
};

export const specialOffers: PriceTier[] = [
  {
    title: "Pool Cleaning Service",
    description:
      "Our weekly residential pool cleaning is designed for unscreened pools, with or without spas, that may require extra attention because of leaves or debris.",
    endTitle: "Starting at",
    sign: "$",
    amount: "95",
    amountText: "A month",
  },
  {
    title: "Pool Cleaning Service",
    description:
      "Our weekly residential pool cleaning is designed for unscreened pools, with or without spas, that may require extra attention because of leaves or debris.",
    endTitle: "Starting at",
    sign: "$",
    amount: "80",
    amountText: "A month",
  },
  {
    title: "Pool Cleaning Service",
    description:
      "Our weekly residential pool cleaning is designed for unscreened pools, with or without spas, that may require extra attention because of leaves or debris.",
    endTitle: "Starting at",
    sign: "$",
    amount: "65",
    amountText: "A month",
  },
];

export const whyChooseUs: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "medal",
    title: "Worry-Free Guarantee",
    description:
      "Forget about fluctuating water chemistry. In fact, forget about buying and lugging chemicals, troubleshooting problems, remembering to latch the gate, or wondering whether it's safe to swim.",
  },
  {
    icon: "handshake",
    title: "Licensed & Insured",
    description:
      "We provide a level of excellence unparalleled in the pool service industry — a full-service maintenance and repair company specializing in residential and commercial pools, spas and fountains.",
  },
  {
    icon: "wrench",
    title: "Priority Repair",
    description:
      "When your pool filter breaks down in the middle of a heat wave, it makes all the difference to know you'll get help quickly. Contact us for a free quote.",
  },
  {
    icon: "test-tube",
    title: "Maintenance Appointments",
    description:
      "We recognize the importance of service and maintenance and are dedicated to offering the best service available. Let us take the hassle out of keeping up your pool.",
  },
  {
    icon: "sweep",
    title: "Total Clean Promise",
    description:
      "We don't endorse 'spot cleaning.' Our knowledgeable staff keeps your pool clean and performs every task needed so that your pool is sparkling and sanitized.",
  },
  {
    icon: "clock",
    title: "Show Up On Time",
    description:
      "You can always trust we'll be there, on time, even if you're at work. We use GPS-enabled trucks and log each scheduled service visit online with our data center.",
  },
];

export const howItWorks = [
  {
    number: 1,
    heading: "Submit your service request",
    description:
      "It's important to us that customers meet the owner and give the history of their pool so any kinks can be worked out before regular service begins. Pool service can't be quoted properly over the phone.",
  },
  {
    number: 2,
    heading: "We connect you with a certified technician",
    description:
      "In some cases the pool won't be ready for weekly service. If so, customers are informed of repairs or clean-ups needed before service can begin. Work is only completed with customer approval.",
  },
  {
    number: 3,
    heading: "A technician reaches out to you shortly",
    description:
      "Our Service Manager services the pool for the first two weeks. During this time all equipment is logged and a detailed report is given to your permanent pool service technician.",
  },
  {
    number: 4,
    heading: "Back to enjoying your backyard",
    description: "Your assigned service tech starts regular service.",
  },
];

export const homeGallery = [
  "/images/uploads/2019/10/swimming-pool4.jpg",
  "/images/uploads/2019/10/swimming-pool3-1.jpg",
  "/images/uploads/2019/10/swimming-pool2-1.jpg",
  "/images/uploads/2019/10/featured-3.jpg",
  "/images/uploads/2019/10/fetured-2.jpg",
  "/images/uploads/2019/10/pool-florida.jpg",
];

export const homeTestimonials = [
  {
    name: "Zachary Tinley",
    message:
      "We have two pools that Pool Smith services and maintains. Since hiring them, my pools are spotless and free from debris, the salt chemistry is good, and the water feels clear and fresh.",
  },
  {
    name: "Paul Bernstein",
    message:
      "Excellent service throughout! The pool tech was so thorough in explaining how my pool works and the cleaning process. They left my pool looking clean and ready.",
  },
  {
    name: "Jackie Frazier",
    message:
      "Very professional and great customer service. They are honest and trustworthy, and always treat my pool like their very own.",
  },
];
