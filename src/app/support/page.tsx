import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Support & Contact | FitWardrobe",
  description: "Get in touch with the FitWardrobe team for technical support, bug reports, or styling questions.",
};

export default function SupportPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Support", item: "/support" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <main className="support-page pt-32 container container--narrow">
        <section className="reveal mb-12">
          <h1 className="mb-6">Support & Contact</h1>
          <div className="section-content">
            <p>
              Whether you're experiencing a technical issue, have a style question,
              or just want to share feedback, we're here to help.
            </p>
          </div>

          <div className="grid grid--2 gap-6 mb-12 mt-10">
            <div className="p-6 bg-white border border-mist rounded-xl shadow-sm">
              <span className="section-label" style={{ fontSize: '0.75rem' }}>Direct Email</span>
              <h3 className="text-xl font-semibold mb-3 text-sage">Email Support</h3>
              <p className="text-xs text-muted-foreground mb-4">
                For general inquiries, bug reports, and account help.
              </p>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="text-lg font-bold hover:text-sage transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>

            <div className="p-6 bg-white border border-mist rounded-xl shadow-sm">
              <span className="section-label" style={{ fontSize: '0.75rem' }}>Open Source</span>
              <h3 className="text-xl font-semibold mb-3 text-navy">GitHub Support</h3>
              <p className="text-xs text-muted-foreground mb-4">
                For developers or those who want to report technical issues directly.
              </p>
              <a
                href="https://github.com/fitwardrobe/fitwardrobe/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
              >
                Open an Issue
              </a>
            </div>
          </div>

          <div className="p-8 bg-terracotta/5 rounded-2xl border border-terracotta/10 mb-16">
            <h3 className="text-xl font-semibold mb-3 text-terracotta">Grievance Redressal</h3>
            <div className="section-content text-sm">
              <p className="mb-4">
                For privacy concerns or legal inquiries under the **DPDP Act 2023**, please address your correspondence to our Grievance Officer.
              </p>
              <p className="font-semibold text-navy">
                Attention: Grievance Officer (Aryan Panwar)
              </p>
            </div>
          </div>

          <div className="feature-section">
            <div className="section-header reveal mb-6 text-left" style={{ maxWidth: '100%' }}>
              <h2 className="text-2xl border-bottom border-mist pb-2">Response Times</h2>
            </div>
            <div className="section-content">
              <ul>
                <li><strong>Technical Support:</strong> Within 48 hours</li>
                <li><strong>Bug Reports:</strong> Confirmed within 72 hours</li>
                <li><strong>Legal Inquiries:</strong> Within 7 business days</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
