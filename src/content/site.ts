// Single source of truth for brand, contact, navigation.
// Pulled from the WordPress export (Redux theme options + primary menu).

export const site = {
  name: "Pool Smith",
  legalName: "Pool Smith Services",
  tagline: "Everything we do helps people live healthier lives.",
  description:
    "Professional residential & commercial pool services in the Daytona Beach area — cleaning, maintenance, equipment repair, green-pool clean-ups and more.",
  // Real business contact (from theme options header bar).
  phoneDisplay: "844-985-POOL (7665)",
  phone: "844-985-7665",
  phoneHref: "tel:8449857665",
  email: "poolsmithofflorida@gmail.com",
  emailHref: "mailto:poolsmithofflorida@gmail.com",
  hours: "9:00 AM – 6:00 PM / 6 Days",
  serviceArea: "Daytona Beach, Ormond Beach, Port Orange, Ponce Inlet & New Smyrna Beach, Florida",
  region: "Volusia County, Florida",
  url: "https://pool-smith.com",
  copyright: "Pool Smith Services",
  social: {
    facebook: "https://www.facebook.com/poolsmithofflorida",
    instagram: "",
    twitter: "",
    youtube: "",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// Mirrors the WordPress "Primary Menu" (term 44), 1:1 with the rebuilt routes.
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Residential Pool Service", href: "/pool-services/residential-pool-service" },
      { label: "Commercial Pool Service", href: "/pool-services/commercial-pool-service" },
      { label: "Pool Equipment & Repair", href: "/pool-services/pool-equipment-and-repair" },
      { label: "Above Ground Pool Cleanup", href: "/pool-services/above-ground-pool-clean-up" },
      { label: "Green Pool Clean-ups", href: "/pool-services/green-pool-clean-up" },
    ],
  },
  { label: "Prices", href: "/prices" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Daytona Beach", href: "/locations/daytona-beach" },
      { label: "Ormond Beach", href: "/locations/ormond-beach" },
      { label: "Port Orange", href: "/locations/port-orange" },
      { label: "Ponce Inlet", href: "/locations/ponce-inlet" },
      { label: "New Smyrna Beach", href: "/locations/new-smyrna-beach" },
    ],
  },
  { label: "Pool Smith Tips", href: "/tips" },
  { label: "Payments", href: "/payments" },
  { label: "Contact Us", href: "/contact-us" },
];

// Footer quick links.
export const footerLinks: { label: string; href: string }[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Prices", href: "/prices" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pool Smith Tips", href: "/tips" },
  { label: "Make a Payment", href: "/payments" },
  { label: "Contact Us", href: "/contact-us" },
];
