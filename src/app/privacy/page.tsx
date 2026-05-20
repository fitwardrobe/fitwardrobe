import { LegalLayout } from "@/components/legal/legal-layout";
import { privacyData } from "@/data/legal/privacy";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function PrivacyPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Privacy Policy", item: "/privacy" },
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
