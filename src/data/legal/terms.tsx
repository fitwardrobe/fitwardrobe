import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import React from "react";

export const termsData: LegalPageData = {
  title: "Terms of Service",
  organization: "FitWardrobe",
  effectiveDate: "February 24, 2026",
  lastUpdated: "February 24, 2026",
  version: "1.1",
  toc: [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "eligibility", title: "2. Eligibility" },
    { id: "accounts", title: "3. User Accounts" },
    { id: "acceptable-use", title: "4. Acceptable Use Policy" },
    { id: "intellectual-property", title: "5. Intellectual Property Rights" },
    { id: "user-content", title: "6. User-Generated Content" },
    { id: "ai-services", title: "7. AI Features and Disclaimers" },
    { id: "service-availability", title: "8. Service Availability" },
    { id: "fees", title: "9. Fees and Payment" },
    { id: "termination", title: "10. Termination" },
    { id: "disclaimers", title: "11. Disclaimers and Limitations of Liability" },
    { id: "indemnification", title: "12. Indemnification" },
    { id: "governing-law", title: "13. Governing Law and Dispute Resolution" },
    { id: "modifications", title: "14. Modifications to Terms" },
    { id: "contact", title: "15. Contact Information" },
  ],
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p>
            These Terms of Service ("Terms") constitute a legally binding
            agreement between you ("User", "you", or "your") and FitWardrobe ("we",
            "us", or "our").
          </p>
          <p>
            By accessing or using the FitWardrobe application (available as an
            Android APK, Progressive Web App, or future iOS app), you acknowledge
            that you have read, understood, and agree to be bound by these Terms
            and our <a href="/privacy">Privacy Policy</a>.
          </p>
          <div className="warning-box">
            <p>
              <strong>If you do not agree to these Terms, you must immediately
              cease using FitWardrobe.</strong>
            </p>
          </div>
        </>
      ),
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      content: (
        <p>
          FitWardrobe is intended for users who are at least 13 years of age. By
          using the service, you represent and warrant that you have the legal
          capacity to enter into this agreement.
        </p>
      ),
      subsections: [
        {
          title: "2.1 Age Requirement",
          content: (
            <p>
              If you are between 13-18 years old, you represent that you have
              obtained parental or guardian consent to use the service.
            </p>
          ),
        },
        {
          title: "2.2 Geographic Restrictions",
          content: (
            <p>
              FitWardrobe is primarily designed for users in India but is
              accessible globally. You are responsible for ensuring that your use
              complies with local laws in your jurisdiction.
            </p>
          ),
        },
      ],
    },
    {
      id: "accounts",
      title: "3. User Accounts",
      content: (
        <>
          <p>To use FitWardrobe, you must create an account by providing:</p>
          <ul>
            <li>A valid email address</li>
            <li>A secure password (managed via Supabase authentication)</li>
          </ul>
        </>
      ),
      subsections: [
        {
          title: "3.1 Account Security",
          content: (
            <p>
              You are responsible for maintaining the confidentiality of your login
              credentials and all activities that occur under your account.
            </p>
          ),
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use Policy",
      content: (
        <>
          <p>You agree not to use FitWardrobe to:</p>
          <ul>
            <li>Upload or transmit any content that is unlawful or offensive</li>
            <li>Attempt to reverse-engineer or hack our systems</li>
            <li>Use the AI features to generate harmful or malicious content</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property Rights",
      content: (
        <p>
          The FitWardrobe application, including its logos, designs, and original
          code, is the property of FitWardrobe and protected by copyright and
          trademark laws.
        </p>
      ),
    },
    {
      id: "user-content",
      title: "6. User-Generated Content",
      content: (
        <p>
          You retain ownership of the photos you upload to FitWardrobe. Use of the
          app grants us a limited, non-exclusive license to process that data
          strictly for the purpose of providing you with styling services.
        </p>
      ),
    },
    {
      id: "ai-services",
      title: "7. AI Features and Disclaimers",
      content: (
        <>
          <p>
            FitWardrobe integrates two advanced AI systems to deliver intelligent
            fashion assistance:
          </p>
          <ul>
            <li><strong>Image Analysis:</strong> Google Gemini 2.0 Flash</li>
            <li><strong>Conversational AI & Styling:</strong> Groq</li>
          </ul>
          <div className="warning-box">
            <p><strong>⚠️ AI Accuracy Disclaimer (Critical)</strong></p>
            <p>
              AI-generated suggestions are informational only and may not be
              accurate or appropriate for your specific needs. FitWardrobe is NOT
              a professional fashion consultant.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "service-availability",
      title: "8. Service Availability",
      content: (
        <p>
          While we strive for 100% uptime, FitWardrobe is currently in Beta. We
          do not guarantee that our services will always be available or
          uninterrupted.
        </p>
      ),
    },
    {
      id: "fees",
      title: "9. Fees and Payment",
      content: (
        <p>
          FitWardrobe is currently free during its Beta testing phase. We reserve
          the right to introduce paid features or subscription models in the
          future.
        </p>
      ),
    },
    {
      id: "termination",
      title: "10. Termination",
      content: (
        <p>
          We reserve the right to suspend or terminate your account at our sole
          discretion if you violate these Terms or if the service is discontinued.
        </p>
      ),
    },
    {
      id: "disclaimers",
      title: "11. Disclaimers and Limitations of Liability",
      content: (
        <p>
          FitWardrobe is provided "AS IS" without any warranties. We are not
          liable for any damages arising from your use of the app or its AI
          suggestions.
        </p>
      ),
    },
    {
      id: "indemnification",
      title: "12. Indemnification",
      content: (
        <p>
          You agree to indemnify and hold FitWardrobe harmless from any claims or
          damages resulting from your violation of these Terms or your use of
          the app.
        </p>
      ),
    },
    {
      id: "governing-law",
      title: "13. Governing Law and Dispute Resolution",
      content: (
        <p>
          These Terms are governed by the laws of India. Any disputes will be
          resolved in the courts of New Delhi, India.
        </p>
      ),
    },
    {
      id: "modifications",
      title: "14. Modifications to Terms",
      content: (
        <p>
          We may update these Terms at any time. Your continued use of the app
          after such changes constitutes your acceptance of the new Terms.
        </p>
      ),
    },
    {
      id: "contact",
      title: "15. Contact Information",
      content: (
        <>
          <p>
            For questions, concerns, or legal inquiries regarding these Terms,
            please contact:
          </p>
          <p>
            <strong>FitWardrobe Legal Team</strong>
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
