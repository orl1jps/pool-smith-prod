import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Original WordPress URLs map 1:1 to the new routes; the few that need
  // collapsing are redirected here so existing links/rankings survive.
  async redirects() {
    return [
      // WooCommerce pages were dropped (dormant demo store, zero orders).
      { source: "/shop", destination: "/", permanent: true },
      { source: "/cart", destination: "/", permanent: true },
      { source: "/checkout", destination: "/payments", permanent: true },
      { source: "/my-account", destination: "/", permanent: true },
      { source: "/coupon", destination: "/prices", permanent: true },
      // Theme demo duplicates / singular<->plural aliases.
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/blog", destination: "/tips", permanent: true },
      { source: "/blog-post-card", destination: "/tips", permanent: true },
      // Old page-based service URLs → canonical /pool-services/<slug> (matches the menu).
      { source: "/residential-pool-services", destination: "/pool-services/residential-pool-service", permanent: true },
      { source: "/commercial-pool-services", destination: "/pool-services/commercial-pool-service", permanent: true },
      { source: "/pool-equipment-repair", destination: "/pool-services/pool-equipment-and-repair", permanent: true },
      { source: "/above-ground-pool-clean-up", destination: "/pool-services/above-ground-pool-clean-up", permanent: true },
      // Old top-level location URLs → /locations/<city>.
      { source: "/daytona-beach", destination: "/locations/daytona-beach", permanent: true },
      { source: "/ormond-beach", destination: "/locations/ormond-beach", permanent: true },
      { source: "/port-orange", destination: "/locations/port-orange", permanent: true },
      { source: "/ponce-inlet", destination: "/locations/ponce-inlet", permanent: true },
      { source: "/new-smyrna-beach", destination: "/locations/new-smyrna-beach", permanent: true },
    ];
  },
};

export default nextConfig;
