import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { securityData } from "@/data/legal/security";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/security/", "Security at FitWardrobe", "How FitWardrobe protects your wardrobe data: what is stored on your device, what is sent to cloud AI services, and how to report a security issue.");

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
