import { LegalLayout } from "@/components/legal/legal-layout";
import { termsData } from "@/data/legal/terms";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function TermsOfServicePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Terms of Service", item: "/terms" },
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
