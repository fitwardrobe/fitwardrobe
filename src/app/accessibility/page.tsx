import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/accessibility/", "Accessibility statement", "How FitWardrobe makes its website and upcoming app usable for everyone, the standards we follow and how to report a barrier.");

const accessibilityData: LegalPageData = {
  title: "Accessibility Statement",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "October 17, 2026",
  version: "1.2",
  toc: [
    { id: "commitment", title: "Our Commitment" },
    { id: "standards", title: "Standards" },
    { id: "features", title: "What We Do Today" },
    { id: "ongoing-work", title: "Known Limitations and Plans" },
    { id: "feedback", title: "Feedback & Assistance" },
  ],
  sections: [
    {
      id: "commitment",
      title: "Our Commitment",
      content: (
        <p>
          We want everyone to be able to use FitWardrobe, whatever their ability or the device
          they use. Accessibility is part of how we design and build the website and the app.
        </p>
      ),
    },
    {
      id: "standards",
      title: "Standards",
      content: (
        <p>
          We aim to meet the <strong>Web Content Accessibility Guidelines (WCAG) 2.2</strong> at
          level <strong>AA</strong>. We have not had an independent audit yet, so if something
          doesn&apos;t work for you, please tell us.
        </p>
      ),
    },
    {
      id: "features",
      title: "What We Do Today",
      content: (
        <ul>
          <li><strong>Readable contrast:</strong> text and buttons are designed to meet WCAG AA contrast ratios.</li>
          <li><strong>Clear structure:</strong> each page has one main heading, a logical heading order and labelled page regions.</li>
          <li><strong>Keyboard access:</strong> menus, links, forms and questions can be reached with the Tab key, with a visible focus outline and a &quot;Skip to main content&quot; link.</li>
          <li><strong>Images:</strong> meaningful images have text descriptions; decorative ones are hidden from screen readers.</li>
          <li><strong>Forms:</strong> fields have labels, and errors and confirmations are announced to screen readers.</li>
          <li><strong>Zoom:</strong> pages adapt to browser zoom and narrow screens.</li>
        </ul>
      ),
    },
    {
      id: "ongoing-work",
      title: "Known Limitations and Plans",
      content: (
        <>
          <p>We know some things still need work:</p>
          <ul>
            <li>Some older blog articles use long tables that are harder to read on small screens.</li>
            <li>The app is still being built. We are designing it with labelled controls, screen-reader support and text that follows your device&apos;s size settings, and we will test it before launch.</li>
          </ul>
        </>
      ),
    },
    {
      id: "feedback",
      title: "Feedback & Assistance",
      content: (
        <>
          <p>If you find an accessibility barrier or have a suggestion, please email us. We aim to reply within 2 working days.</p>
          <p><strong>Email:</strong> <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a></p>
        </>
      ),
    },
  ],
};

export default function AccessibilityPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Accessibility", item: "/accessibility/" },
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
