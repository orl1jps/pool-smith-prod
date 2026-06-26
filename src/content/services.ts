// Services overview page content.

import type { IconName } from "@/components/Icon";

export const servicesIntro =
  "Our team of highly trained technicians makes thousands of poolside visits each year. Pool Smith is the safe, reliable, professional and trustworthy choice for all your pool service, repair and remodeling needs across the Daytona Beach area.";

export const maintenanceBoxes: {
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    icon: "handshake",
    title: "Advice By Phone",
    description:
      "Our friendly, experienced office staff is ready to help answer your questions — from water chemistry issues to maintenance and service.",
  },
  {
    icon: "wrench",
    title: "Pool Inspections",
    description:
      "A thorough visual and operational inspection of your pool and equipment, so you know exactly where things stand before service begins.",
  },
  {
    icon: "sweep",
    title: "Drain & Clean",
    description:
      "When your pool needs more than a routine clean, we drain, scrub and refresh it back to a sparkling, swim-ready state.",
  },
  {
    icon: "test-tube",
    title: "Water Analysis",
    description:
      "Precise testing and balancing keeps your water safe, clear and comfortable — no guesswork, no fluctuating chemistry.",
  },
];

export const featuredServices: { title: string; description: string; image: string }[] = [
  { title: "Repairs", description: "Fix any leak, valve replacement or pump malfunction.", image: "/images/uploads/2016/11/category-img-01.jpg" },
  { title: "Renovations", description: "Design and restore old pools to look brand new.", image: "/images/uploads/2016/11/category-img-02.jpg" },
  { title: "Equipment Install", description: "Expert technicians make installing new equipment easy.", image: "/images/uploads/2016/11/category-img-03.jpg" },
  { title: "Interior Pool Surface", description: "The right interior finish for your pool's design.", image: "/images/uploads/2016/11/category-img-04.jpg" },
  { title: "Pressure Wash", description: "An effective way to remove dirt, rust and algae.", image: "/images/uploads/2016/11/category-img-05.jpg" },
  { title: "Pool Tile", description: "A wide variety of ceramic, glass and natural tile.", image: "/images/uploads/2016/11/category-img-06.jpg" },
  { title: "Pool Maintenance", description: "Prolong your fun in the sun with accurate maintenance.", image: "/images/uploads/2016/11/category-img-07.jpg" },
  { title: "Pool Automation", description: "Modern controls to automate cleaning and chemistry.", image: "/images/uploads/2016/11/category-img-08.jpg" },
  { title: "Pool Inspections", description: "Confirm your equipment meets proper safety parameters.", image: "/images/uploads/2016/11/category-img-09.jpg" },
  { title: "Openings & Closings", description: "Take the headache out of getting your pool ready.", image: "/images/uploads/2016/11/category-img-10.jpg" },
  { title: "General Pool Service", description: "Trained technicians for all of your pool needs.", image: "/images/uploads/2016/11/category-img-11.jpg" },
  { title: "Pool Lighting", description: "Troubleshoot lights and recommend the best fix.", image: "/images/uploads/2016/11/category-img-12.jpg" },
];
