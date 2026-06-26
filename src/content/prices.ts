// Pricing page content. The source page repeated identical demo "Pool Draining
// $125" filler cells; those are replaced with the real à-la-carte items the
// theme listed (Repairs, Renovations, etc.). Monthly plans are preserved.

import type { Plan } from "@/components/PlanTable";

export const pricesIntro =
  "We provide quality servicing of all pools on an ongoing, regular basis, and we're committed to giving every customer excellent value for money. We don't add unnecessary chemicals — keeping your costs down.";

const sharedPlanFeatures = [
  "Test the pool",
  "Chemically balance the water",
  "Clean the skimmer and pump baskets",
  "Check correct operation of pool cleaner",
  "Overall diagnosis of pool",
  "Brush the tile band and steps",
  "Vacuum pool as necessary",
];

export const monthlyPlans: Plan[] = [
  {
    title: "Chemical Only",
    priceTop: "For",
    price: "$60",
    priceNote: "per month (plus chemicals)",
    features: sharedPlanFeatures,
  },
  {
    title: "Full Pool Service",
    priceTop: "For",
    price: "$75",
    priceNote: "per month (plus chemicals)",
    features: sharedPlanFeatures,
    featured: true,
  },
  {
    title: "Salt Water Service",
    priceTop: "For",
    price: "$72",
    priceNote: "per month (plus chemicals)",
    features: sharedPlanFeatures,
  },
];

export const aLaCarte: {
  title: string;
  from: string;
  image: string;
}[] = [
  { title: "Repairs", from: "$40", image: "/images/uploads/2016/11/category-img-01.jpg" },
  { title: "Renovations", from: "$77", image: "/images/uploads/2016/11/category-img-02.jpg" },
  { title: "Equipment Install", from: "$36", image: "/images/uploads/2016/11/category-img-03.jpg" },
  { title: "Interior Pool Surface", from: "$67", image: "/images/uploads/2016/11/category-img-04.jpg" },
  { title: "Pressure Wash", from: "$78", image: "/images/uploads/2016/11/category-img-05.jpg" },
  { title: "Pool Tile", from: "$80", image: "/images/uploads/2016/11/category-img-06.jpg" },
];
