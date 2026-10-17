import { LegalLayout } from "@/components/legal/legal-layout";
import { privacyData } from "@/data/legal/privacy";
import type { Metadata } from "next";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/privacy/", "Privacy policy", "How FitWardrobe handles your data: what stays on your device, what is sent to cloud AI services for tagging and outfits, and your rights.");

export default function PrivacyPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Privacy Policy", item: "/privacy/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalLayout data={privacyData} />
    </>
  );
}
