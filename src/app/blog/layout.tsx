import "../globals.css";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// The blog index is a client component, so its metadata lives here.
// Post pages override all of it via generateMetadata.
export const metadata: Metadata = pageMetadata(
  "/blog/",
  "Wardrobe app, capsule wardrobe and outfit guides",
  "Plain guides from FitWardrobe on wardrobe apps compared, capsule wardrobes, wardrobe rules and what to wear for any occasion.",
);

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
