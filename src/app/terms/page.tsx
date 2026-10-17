import { LegalLayout } from "@/components/legal/legal-layout";
import { termsData } from "@/data/legal/terms";
import type { Metadata } from "next";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/terms/", "Terms of service", "The terms for using FitWardrobe and its website, including early-access tester benefits.");

export default function TermsOfServicePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Terms of Service", item: "/terms/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalLayout data={termsData} />
    </>
  );
}
