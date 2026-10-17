import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { getBreadcrumbSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { JoinBand } from "@/components/site/join-band";

export const metadata: Metadata = pageMetadata(
  "/support/",
  "Support and contact",
  "Get help with FitWardrobe, report a bug or ask a question. Email hello@fitwardrobe.me, write to privacy@fitwardrobe.me or reach us on Telegram.",
);

export default function SupportPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Support", item: "/support/" },
  ]);

  return (
    <div className="fw h13 p13 fw-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageHero
        compact
        eyebrow="Support"
        title="Support and contact."
        lead="Have a question, found a bug, or want to share feedback? Write to us. FitWardrobe is built by one founder, so you'll hear back from a person."
        crumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
      >
        <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="h13-btn h13-btn--gold">Email {SITE_CONFIG.contactEmail}</a>
        <a href={SITE_CONFIG.telegramUrl} rel="noopener" className="h13-btn h13-btn--line">Message us on Telegram</a>
      </PageHero>

      <section className="fw-section fw-page__section" aria-labelledby="contact-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="contact-title" className="fw-h2">How to reach us</h2>
          <div className="fw-page__contact">
            <div>
              <h3 className="fw-sans">General and bugs</h3>
              <p>Questions, feedback and bug reports.</p>
              <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a>
            </div>
            <div>
              <h3 className="fw-sans">Privacy and data</h3>
              <p>Access, correction or deletion requests, and privacy questions.</p>
              <a href="mailto:privacy@fitwardrobe.me">privacy@fitwardrobe.me</a>
            </div>
            <div>
              <h3 className="fw-sans">Community</h3>
              <p>Ideas, feedback and early previews with the founder.</p>
              <a href={SITE_CONFIG.discordUrl} rel="noopener">
                Discord server
              </a>
              {" · "}
              <a href={SITE_CONFIG.telegramUrl} rel="noopener">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="fw-section fw-page__section fw-page__band" aria-labelledby="times-title">
        <div className="fw-container fw-page__narrow">
          <h2 id="times-title" className="fw-h2">Response times</h2>
          <table className="fw-page__table">
            <tbody>
              <tr>
                <th scope="row">Questions and support</th>
                <td>Within 48 hours</td>
              </tr>
              <tr>
                <th scope="row">Bug reports</th>
                <td>Confirmed within 72 hours</td>
              </tr>
              <tr>
                <th scope="row">Privacy and legal requests</th>
                <td>Within 7 business days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="fw-section fw-page__section" aria-labelledby="grievance-title">
        <div className="fw-container fw-page__narrow fw-page__prose">
          <h2 id="grievance-title" className="fw-h2">Grievance officer</h2>
          <p>
            For privacy concerns or legal enquiries under India&apos;s Digital Personal Data
            Protection Act, 2023, write to our Grievance Officer, Aryan Panwar, at{" "}
            <a href="mailto:privacy@fitwardrobe.me" className="fw-link">
              privacy@fitwardrobe.me
            </a>
            . Our <Link href="/privacy/" className="fw-link">privacy policy</Link> explains how your
            data is handled.
          </p>
        </div>
      </section>

      <JoinBand location="support" title={<>FitWardrobe isn&apos;t <span className="h13-gold">available yet.</span></>} text="It is coming soon to Android and the web. Join the early-access list and we will email you the day it opens." />
    </div>
  );
}
