import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import React from "react";

export const privacyData: LegalPageData = {
  title: "Privacy Policy",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "February 25, 2026",
  version: "1.1",
  toc: [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "how-we-use", title: "3. How We Use Your Information" },
    { id: "data-sharing", title: "4. Data Sharing and Third Parties" },
    { id: "data-retention", title: "5. Data Retention" },
    { id: "user-rights", title: "6. Your Rights (DPDP Act Compliant)" },
    { id: "security", title: "7. Security Measures" },
    { id: "children", title: "8. Children's Privacy" },
    { id: "international", title: "9. International Users" },
    { id: "changes", title: "10. Changes to This Policy" },
    { id: "contact", title: "11. Contact Information" },
  ],
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
          <p>
            Welcome to FitWardrobe, your AI-powered personal styling assistant. We
            are committed to protecting your privacy and ensuring the security of
            your personal data.
          </p>
          <div className="highlight-box">
            <p>
              <strong>Core Privacy Principle:</strong> FitWardrobe is a
              "Local-First" application. This means we prioritize keeping your
              wardrobe photographs and fashion data on your own device rather than
              our servers.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: (
        <>
          <p>
            We collect minimal information necessary to provide and improve our
            styling services.
          </p>
        </>
      ),
      subsections: [
        {
          title: "2.1 Information You Provide to Us",
          content: (
            <ul>
              <li>
                <strong>Email Address:</strong> Used for account creation,
                authentication (via Supabase), and occasional service updates.
              </li>
              <li>
                <strong>Wardrobe Data:</strong> Photographs of clothing items and
                descriptions (processed via Gemini API but stored locally).
              </li>
              <li>
                <strong>Account Profile:</strong> Basic information you choose to
                add to your profile.
              </li>
            </ul>
          ),
        },
        {
          title: "2.2 Information Automatically Collected",
          content: (
            <ul>
              <li>
                <strong>Device Information:</strong> Basic analytics such as device
                model and OS version to improve app stability.
              </li>
              <li>
                <strong>Analytics:</strong> Anonymous usage data (via Vercel
                Analytics) to understand feature engagement.
              </li>
            </ul>
          ),
        },
      ],
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      content: (
        <ul>
          <li>To provide personalized outfit suggestions and styling advice</li>
          <li>To authenticate your identity and secure your account</li>
          <li>To process wardrobe images via Google Gemini AI API</li>
          <li>To respond to your support requests and legal inquiries</li>
          <li>To improve the performance and features of our AI models</li>
        </ul>
      ),
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing and Third Parties",
      content: (
        <>
          <p>
            We do NOT sell your personal data. We only share information with
            trusted service providers who are essential for our operations:
          </p>
          <ul>
            <li>
              <strong>Supabase:</strong> For secure database management and user
              authentication.
            </li>
            <li>
              <strong>Google Gemini API:</strong> For temporary image analysis
              (images are processed and then discarded, not stored by Google).
            </li>
            <li>
              <strong>Vercel:</strong> For application hosting and basic website
              analytics.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "5. Data Retention",
      content: (
        <ul>
          <li>
            <strong>Account Data:</strong> Retained as long as your account is
            active.
          </li>
          <li>
            <strong>Wardrobe Data:</strong> Stored locally on your device; remains
            until you delete the app or clear cache.
          </li>
          <li>
            <strong>Temporary AI Data:</strong> Images sent for AI processing are
            deleted immediately after analysis.
          </li>
        </ul>
      ),
    },
    {
      id: "user-rights",
      title: "6. Your Rights (DPDP Act Compliant)",
      content: (
        <>
          <p>
            Under the Digital Personal Data Protection Act (DPDP Act) of India,
            you have the following rights:
          </p>
          <ul>
            <li>
              <strong>Right to Access:</strong> See what data we have about you.
            </li>
            <li>
              <strong>Right to Correction:</strong> Update inaccurate information.
            </li>
            <li>
              <strong>Right to Erasure:</strong> Delete your account and associated
              data.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Revoke our ability to
              process your data at any time.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "security",
      title: "7. Security Measures",
      content: (
        <p>
          We employ industry-standard encryption and security protocols to protect
          your data, including SSL/TLS for all data transmission and secure
          authentication via Supabase.
        </p>
      ),
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      content: (
        <p>
          FitWardrobe is not intended for children under 13. We do not
          knowingly collect or solicit personal data from anyone under the age
          of 13. If we learn that we have collected personal data from a child
          under 13, we will delete that information as quickly as possible.
        </p>
      ),
    },
    {
      id: "international",
      title: "9. International Users",
      content: (
        <p>
          Your personal data is stored and processed according to Indian laws.
          By using our services, you consent to the transfer of your
          information to facilities located in India or other locations where
          our providers operate.
        </p>
      ),
    },
    {
      id: "changes",
      title: "10. Changes to This Policy",
      content: (
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the "Last Updated" date.
        </p>
      ),
    },
    {
      id: "contact",
      title: "11. Contact Information",
      content: (
        <>
          <p>
            For questions or requests regarding your privacy, please contact:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${SITE_CONFIG.contactEmail}`}>
              {SITE_CONFIG.contactEmail}
            </a>
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={SITE_CONFIG.landingUrl}>{SITE_CONFIG.landingUrl}</a>
          </p>
        </>
      ),
    },
  ],
};
