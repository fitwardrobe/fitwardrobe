import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import React from "react";

export const termsData: LegalPageData = {
  title: "Terms of Service",
  organization: "FitWardrobe",
  effectiveDate: "February 24, 2026",
  lastUpdated: "October 17, 2026",
  version: "1.3",
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
            By accessing or using the FitWardrobe website (fitwardrobe.me), its
            early-access list or the FitWardrobe application (on Android or the
            web), you acknowledge
            that you have read, understood, and agree to be bound by these Terms
            and our <a href="/privacy/">Privacy Policy</a>.
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
          FitWardrobe is for people aged 18 and over. By using the service,
          you confirm that you are at least 18 and have the legal capacity to
          enter into this agreement.
        </p>
      ),
      subsections: [
        {
          title: "2.1 Age Requirement",
          content: (
            <p>
              You must be at least 18 years old to use FitWardrobe or join the
              early-access list.
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
            <li>A way to sign in, handled by our authentication provider, Supabase</li>
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
            FitWardrobe uses two cloud AI services:
          </p>
          <ul>
            <li><strong>Tagging clothing photos:</strong> Google&apos;s Gemini API</li>
            <li><strong>Outfit suggestions:</strong> Groq</li>
          </ul>
          <div className="warning-box">
            <p><strong>AI Accuracy Disclaimer (Critical)</strong></p>
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
          While we strive for 100% uptime, FitWardrobe is in early access. We
          do not guarantee that our services will always be available or
          uninterrupted.
        </p>
      ),
    },
    {
      id: "fees",
      title: "9. Fees and Payment",
      content: (
        <>
          <p>
            FitWardrobe is free during early access and beta testing. We may
            introduce paid features or subscription plans in the future. If we
            do, we will tell you before any charge applies, and nothing will be
            charged without your agreement.
          </p>
          <h3 id="early-access-benefits">9.1 Early access</h3>
          <p>
            FitWardrobe is free for everyone during early access. If we introduce
            paid plans later, we will tell early-access users well before anything
            changes, and nothing will be charged without your clear agreement.
          </p>
        </>
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
          resolved in the courts of Meerut, Uttar Pradesh, India.
        </p>
      ),
    },
    {
      id: "modifications",
      title: "14. Modifications to Terms",
      content: (
        <p>
          We may update these Terms as FitWardrobe changes. We will post the new
          version on this page and update the &quot;Last updated&quot; date, and for
          significant changes we will also email the people on the early-access
          list. Your continued use of FitWardrobe after a change means you accept
          the new Terms.
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
            <strong>Aryan Panwar, Founder, FitWardrobe</strong>
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
