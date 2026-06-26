// About page content. The source WordPress page carried unedited theme-demo
// copy (references to New Jersey / Surrey, UK). Those geographic placeholders
// are corrected to Pool Smith's real Florida service area; section structure,
// stats and team are preserved as published.

import type { IconName } from "@/components/Icon";

export const aboutIntro =
  "Pool Smith is a family-owned and operated business providing expert maintenance and repair services, pool renovations, emergency repairs and more for homeowners and commercial pool managers throughout the Daytona Beach area and Volusia County, Florida. We respond quickly when our customers call and keep a well-stocked inventory of parts and supplies so you're never left waiting while your pool sits unused.";

export const aboutImage = "/images/uploads/2016/11/about-img-03.jpg";

export const aboutColumns: { heading: string; text: string }[] = [
  {
    heading: "Leading By Example",
    text: "Pool Smith is known as a leading swimming pool service company across the Daytona Beach area — staying at the forefront of industry best practices and the latest technological advancements in pool care.",
  },
  {
    heading: "We Are Professional",
    text: "Have you ever called for a service and the technician shows up with a messy vehicle, a bad attitude, or acts like they would rather be somewhere else? We have too — and we built Pool Smith to be the opposite.",
  },
  {
    heading: "Why Choose Us Over Our Competitors?",
    text: "We want you to have a pool experience you can enjoy without the stress of maintaining it. We promise to treat you with honor and integrity while providing you with excellent service.",
  },
];

export const aboutFeatures: string[] = [
  "Real-time GPS-tracked trucks for quick emergency service",
  "Factory-trained and certified pool service technicians",
  "Openings, closings, valet pool cleaning, repairs and equipment storage",
  "Expert leak detection using the latest technology, including fiber optics and sonar",
  "Major pool renovation and resurfacing",
  "Honest, dependable service backed by a worry-free guarantee",
];

export const aboutFeaturesImage = "/images/uploads/2016/11/8.jpg";

export const aboutStats: {
  icon: IconName;
  label: string;
  value: number;
  suffix?: string;
}[] = [
  { icon: "pool", label: "Pools Serviced", value: 1000, suffix: "+" },
  { icon: "wrench", label: "Pools Repaired", value: 500, suffix: "+" },
  { icon: "droplet", label: "Green Pool Clean-ups", value: 100, suffix: "+" },
  { icon: "handshake", label: "Happy Clients", value: 2500, suffix: "+" },
];

export const missionVision = [
  {
    title: "Our Vision",
    text: "Pool Smith will continue to place our clients' needs above all else. As we grow our client list, we maintain our personal assurance to each property. We will continue to operate as a family-run business with the availability to support the families of our employees.",
    image: "/images/uploads/2016/11/about-img-01.jpg",
  },
  {
    title: "Our Mission",
    text: "Our principal objectives are to provide an exceptional level of service to customers, build close and mutually beneficial partnerships with suppliers, offer rewarding careers for employees, and grow responsibly while making a worthwhile contribution to our community and environment.",
    image: "/images/uploads/2016/11/8.jpg",
  },
];

export const team = [
  {
    name: "James D. Mann",
    role: "Owner / Operator",
    description: "With over twenty years of experience in the pool industry.",
    photo: "/images/uploads/2016/11/person-01.jpg",
  },
  {
    name: "Charles S. Cade",
    role: "Pool & Spa Technician",
    description: "Charles has a background in heating and air conditioning.",
    photo: "/images/uploads/2016/11/person-02.jpg",
  },
  {
    name: "Audrey R. Terry",
    role: "Senior Administrator",
    description: "Sets a high standard of organization for the whole company.",
    photo: "/images/uploads/2016/11/person-03.jpg",
  },
  {
    name: "Royce J. Sawyer",
    role: "Pool / Spa Mechanic",
    description: "With over twenty years of experience in the pool industry.",
    photo: "/images/uploads/2016/11/person-04.jpg",
  },
];
