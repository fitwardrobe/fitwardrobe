import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Post pages override all of it via generateMetadata.
export const metadata: Metadata = pageMetadata(
  "/blog/",
  "Wardrobe guides: apps, capsules, outfit rules",
  "Plain guides on digital wardrobe apps compared, Stylebook alternatives for Android, capsule wardrobes and wardrobe rules like 3-3-3 and 70/30.",
);

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
