import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { securityData } from "@/data/legal/security";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Security & Privacy | FitWardrobe",
  description: "Learn about FitWardrobe's local-first security architecture and how we protect your wardrobe data.",
};

export default function SecurityPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Security", item: "/security" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalLayout data={securityData} />
    </>
  );
}
