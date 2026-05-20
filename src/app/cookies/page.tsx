import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { cookiesData } from "@/data/legal/cookies";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy | FitWardrobe",
  description: "Learn how FitWardrobe uses cookies and similar technologies to provide and improve our services.",
};

export default function CookiesPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Cookies", item: "/cookies" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalLayout data={cookiesData} />
    </>
  );
}
