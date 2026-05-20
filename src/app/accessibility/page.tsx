import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Accessibility Statement | FitWardrobe",
  description: "Our commitment to providing an inclusive and accessible personal styling experience for everyone.",
};

const accessibilityData: LegalPageData = {
  title: "Accessibility Statement",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "March 26, 2026",
  version: "1.1",
  toc: [
    { id: "commitment", title: "Our Commitment" },
    { id: "standards", title: "Standards Compliance" },
    { id: "features", title: "Accessibility Features" },
    { id: "ongoing-work", title: "Ongoing Improvements" },
    { id: "feedback", title: "Feedback & Assistance" },
  ],
  sections: [
    {
      id: "commitment",
      title: "Our Commitment",
      content: (
        <p>
          FitWardrobe is dedicated to providing an inclusive and accessible
          experience for all style enthusiasts. We believe that professional
          wardrobe management and style advice should be available to everyone,
          regardless of ability.
        </p>
      ),
    },
    {
      id: "standards",
      title: "Standards Compliance",
      content: (
        <p>
          We strive to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong> at the <strong>AA level</strong>. While we are still in beta, accessibility is a core pillar of our development process.
        </p>
      ),
    },
    {
      id: "features",
      title: "Accessibility Features",
      content: (
        <ul>
          <li><strong>High Contrast:</strong> We use accessible color ratios for all text and UI elements.</li>
          <li><strong>Screen Reader Friendly:</strong> Our app uses semantic HTML and ARIA labels.</li>
          <li><strong>Keyboard Navigation:</strong> All features are accessible via keyboard shortcuts and tab navigation.</li>
          <li><strong>Dynamic Text:</strong> The app respects system-level text size and zoom settings.</li>
          <li><strong>AI Descriptions:</strong> Our AI generates alt-text descriptions for wardrobe photos.</li>
        </ul>
      ),
    },
    {
      id: "ongoing-work",
      title: "Ongoing Improvements",
      content: (
        <>
          <p>As a beta product, we are actively working to improve:</p>
          <ul>
            <li>Voice command support for wardrobe organization.</li>
            <li>Enhanced navigation for complex outfit grids.</li>
            <li>Haptic feedback for common actions in the mobile app.</li>
          </ul>
        </>
      ),
    },
    {
      id: "feedback",
      title: "Feedback & Assistance",
      content: (
        <>
          <p>If you encounter any accessibility barriers or have suggestions for improvement, please contact us. We aim to respond within 48 hours.</p>
          <p><strong>Email:</strong> <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a></p>
        </>
      ),
    },
  ],
};

export default function AccessibilityPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Accessibility", item: "/accessibility" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalLayout data={accessibilityData} />
    </>
  );
}
