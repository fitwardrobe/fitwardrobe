import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import React from "react";

const PRIVACY_EMAIL = "privacy@fitwardrobe.me";

export const privacyData: LegalPageData = {
  title: "Privacy Policy",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "October 23, 2026",
  version: "1.4",
  toc: [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "how-we-use", title: "3. How We Use Your Information" },
    { id: "data-sharing", title: "4. Data Sharing and Third Parties" },
    { id: "data-retention", title: "5. Data Retention" },
    { id: "user-rights", title: "6. Your Rights" },
    { id: "security", title: "7. Security Measures" },
    { id: "children", title: "8. Children's Privacy" },
    { id: "international", title: "9. International Users" },
    { id: "changes", title: "10. Changes to This Policy" },
    { id: "contact", title: "11. Contact and Grievance Officer" },
  ],
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
          <p>
            FitWardrobe is a digital wardrobe app that suggests outfits from the clothes you
            already own. It is built and run by Aryan Panwar in Meerut, Uttar Pradesh, India,
            who is responsible for your personal data under this policy (the &quot;data
            fiduciary&quot; under India&apos;s Digital Personal Data Protection Act, 2023).
          </p>
          <p>
            This policy covers the website fitwardrobe.me, the early-access list, and the
            FitWardrobe app on Android and the web once it opens. The app is not available yet;
            the parts of this policy about the app describe how it will work at launch.
          </p>
          <div className="highlight-box">
            <p>
              <strong>In short:</strong> your wardrobe (photos, items and outfits) is stored on
              your own device, not on our servers. To tag a piece or suggest an outfit, the photo
              or item details are sent to a cloud AI service (Google&apos;s Gemini API or Groq).
              We don&apos;t sell your data and we don&apos;t show ads.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: (
        <p>
          We collect only what we need to run the early-access list, the website and the app.
        </p>
      ),
      subsections: [
        {
          title: "2.1 When you join the early-access list",
          content: (
            <ul>
              <li>
                <strong>Your email address</strong> (required).
              </li>
              <li>
                <strong>Optional answers</strong>, if you choose to give them after joining: which
                phone you use (Android, iPhone or both), what you would most like help with, how
                you describe yourself (woman, man, non-binary or prefer not to say), your age
                band and the country you live in. We use these only in total, to understand who
                FitWardrobe is useful for and what to build first; they are never used for
                advertising and never shared beyond the providers listed below.
              </li>
              <li>
                <strong>Whether you want updates:</strong> an optional box, unticked unless you
                tick it, for early-access updates and FitWardrobe news. We record your choice, the
                date and the version of the wording you saw.
              </li>
              <li>
                <strong>Where you signed up:</strong> the part of the page and the page address,
                plus any campaign tags in the link you followed (such as utm_source). This is filled
                in automatically by the website.
              </li>
            </ul>
          ),
        },
        {
          title: "2.2 When you visit the website",
          content: (
            <ul>
              <li>
                <strong>Google Analytics 4:</strong> records which pages are visited, how visitors
                arrive, approximate location (country or city) and device type. Advertising
                features are off, and we never send your email address or wardrobe data to Google
                Analytics.
              </li>
              <li>
                <strong>Microsoft Clarity:</strong> shows us heatmaps and recordings of how visitors
                scroll, click and move through our pages, so we can find and fix confusing parts.
                Text typed into forms, including your email address, is masked and never recorded.
              </li>
              <li>
                <strong>Vercel Web Analytics:</strong> counts page views without cookies. Visitors
                are counted from an anonymous value derived from the request, which is discarded
                within 24 hours; it records the page, referring site, approximate location,
                browser, operating system and device type.
              </li>
              <li>
                <strong>Your choice:</strong> in the EEA, UK and Switzerland, Google Analytics and
                Clarity cookies are used only after you accept them. Everywhere else they are on by
                default, and you can turn them off at any time with &quot;Cookie settings&quot; at the
                bottom of every page. Details are in our <a href="/cookies/">Cookie Policy</a>.
              </li>
              <li>
                <strong>Server logs:</strong> our hosting provider, Vercel, processes technical
                data such as your IP address and browser type to deliver the site and keep it
                secure.
              </li>
            </ul>
          ),
        },
        {
          title: "2.3 When you use the app (once it opens)",
          content: (
            <ul>
              <li>
                <strong>Account details:</strong> your email address and the information needed
                to sign you in, handled by our authentication provider, Supabase. We also keep
                simple usage counts so that daily AI limits can be applied.
              </li>
              <li>
                <strong>Your wardrobe:</strong> photos of your clothes, the tags and items created
                from them, saved outfits, and the outfits you keep or skip. These are stored on
                your device.
              </li>
              <li>
                <strong>Your style preferences:</strong> the styles and colours you like or avoid,
                and any optional details you choose to add to your profile (for example body
                type, height, skin tone, age range or gender expression). These are stored on
                your device and are only used to make outfit suggestions.
              </li>
            </ul>
          ),
        },
        {
          title: "2.4 When you contact us",
          content: (
            <p>
              If you email us or message us on Telegram or Discord, we receive your message and
              the contact details you use.
            </p>
          ),
        },
      ],
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      content: (
        <>
          <ul>
            <li>To email you about your sign-up (a welcome that says what happens next) and when early access opens</li>
            <li>If you ticked the updates box, to send early-access updates, FitWardrobe news and invitations to help shape the app, about once a month. Every email has an unsubscribe link</li>
            <li>To decide what to build first, using the optional answers from the early-access list</li>
            <li>To understand which pages and campaigns bring visitors, and where people get stuck on the website, using analytics, Clarity recordings and sign-up sources</li>
            <li>To tag your clothes and suggest outfits from them in the app</li>
            <li>To sign you in, keep your account secure and apply fair-use limits</li>
            <li>To answer your questions and requests, and to meet our legal obligations</li>
          </ul>
          <p>
            We process your data on the basis of your consent (for example when you join the
            list or use the app), and for the legitimate uses the law allows, such as keeping the
            service secure. You can withdraw your consent at any time (see section 6).
          </p>
          <p>
            We do not use your wardrobe to train AI models, and we do not sell, rent or trade your
            personal data.
          </p>
        </>
      ),
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing and Third Parties",
      content: (
        <>
          <p>
            We share data only with the service providers we need to run FitWardrobe. Each
            processes it on our behalf for the purpose described:
          </p>
          <ul>
            <li>
              <strong>Google (Forms and Sheets):</strong> stores the early-access list: your email
              address, optional answers and sign-up source.
            </li>
            <li>
              <strong>Resend:</strong> sends our emails, from its EU (Ireland) sending region, and
              keeps the list we send to: your email address, your updates choice, optional answers
              and sign-up source, and whether you have unsubscribed.
            </li>
            <li>
              <strong>Zoho Mail:</strong> hosts our mailboxes, so if you reply to one of our emails or
              write to us, your message is stored there.
            </li>
            <li>
              <strong>Google (Gemini API):</strong> receives a compressed photo of a clothing item
              when you ask the app to tag it, and returns its type, colour, pattern, formality and
              season.
            </li>
            <li>
              <strong>Groq:</strong> receives the details of your items, the occasion you choose
              and your style preferences when you ask for an outfit, and returns a suggestion. Groq
              states that it does not retain these requests by default.
            </li>
            <li>
              <strong>Supabase:</strong> provides sign-in for the app and stores your account
              details and usage counts.
            </li>
            <li>
              <strong>Vercel:</strong> hosts the website and provides cookieless Web Analytics.
            </li>
            <li>
              <strong>Google Analytics 4:</strong> provides aggregate website analytics, as
              described in section 2.2.
            </li>
            <li>
              <strong>Microsoft (Clarity):</strong> provides heatmaps and session recordings of the
              website, as described in section 2.2.
            </li>
          </ul>
          <div className="highlight-box">
            <p>
              <strong>About Google&apos;s Gemini API:</strong> how Google handles the photos we
              send depends on the Gemini plan in use. Under Google&apos;s terms, content sent to
              its unpaid service may be used to improve Google&apos;s products and may be read by
              human reviewers; on its paid service it is not used for that and is kept only for a
              limited time to detect abuse. Please photograph clothes only, and keep people, faces
              and documents out of the frame.
            </p>
          </div>
          <p>
            We may also disclose information if the law requires it, or to protect the rights and
            safety of our users and FitWardrobe.
          </p>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "5. Data Retention",
      content: (
        <ul>
          <li>
            <strong>Early-access list:</strong> kept until you unsubscribe or ask us to remove
            it, or until we close the list. If you unsubscribe, we keep only your address on a
            do-not-email list, so you are not emailed again by mistake.
          </li>
          <li>
            <strong>Email delivery records:</strong> Resend keeps logs of the emails we send (such
            as whether one was delivered) for 30 days.
          </li>
          <li>
            <strong>Website analytics:</strong> Google Analytics data is kept for the retention
            period we set, no longer than 14 months. Clarity keeps recordings for 30 days and
            heatmap and click data for 13 months. Vercel Web Analytics keeps only aggregated
            statistics, with no visitor identifier kept beyond 24 hours.
          </li>
          <li>
            <strong>Your wardrobe and style preferences:</strong> stored on your device until you
            delete them, delete the app, or clear the site&apos;s data in your browser. We have
            no copy on our servers.
          </li>
          <li>
            <strong>Account details:</strong> kept while your account is open, and deleted within
            30 days after you ask us to close it, unless the law requires us to keep something
            longer.
          </li>
          <li>
            <strong>Requests to AI services:</strong> handled under each provider&apos;s own terms,
            as described in section 4.
          </li>
          <li>
            <strong>Emails to us:</strong> kept as long as needed to deal with your request.
          </li>
        </ul>
      ),
    },
    {
      id: "user-rights",
      title: "6. Your Rights",
      content: (
        <>
          <p>
            Under India&apos;s Digital Personal Data Protection Act, 2023, and wherever you live,
            you can ask us to:
          </p>
          <ul>
            <li>
              <strong>Access</strong> a summary of the personal data we hold about you and how we
              use it.
            </li>
            <li>
              <strong>Correct, complete or update</strong> it.
            </li>
            <li>
              <strong>Erase</strong> it, including removing you from the early-access list.
            </li>
            <li>
              <strong>Withdraw your consent</strong> at any time. This does not affect processing
              that happened before.
            </li>
            <li>
              <strong>Nominate</strong> another person to exercise these rights for you in the
              event of death or incapacity.
            </li>
            <li>
              <strong>Raise a grievance</strong> with our Grievance Officer (section 11). We aim to
              reply within 30 days and in any case within 90 days. If you are not satisfied, you
              can complain to the Data Protection Board of India.
            </li>
          </ul>
          <p>
            To use any of these rights, email{" "}
            <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. We may ask you to confirm
            the request from the email address we hold.
          </p>
        </>
      ),
    },
    {
      id: "security",
      title: "7. Security Measures",
      content: (
        <p>
          All data travels over encrypted connections (HTTPS/TLS). Sign-in is handled by
          Supabase, and the app sends the AI services only what each request needs. Because your
          wardrobe is stored on your device, its security also depends on your device: use a
          screen lock and keep your browser and operating system up to date.
        </p>
      ),
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      content: (
        <p>
          FitWardrobe is for people aged 18 and over. We do not knowingly collect personal data
          from anyone under 18. If you believe a child has given us their data, email{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> and we will delete it.
        </p>
      ),
    },
    {
      id: "international",
      title: "9. International Users",
      content: (
        <p>
          FitWardrobe is run from India. Our service providers (Google, Microsoft, Groq, Supabase,
          Vercel, Resend and Zoho) may process data in India, the United States and other countries where they
          operate. Wherever your data is processed, we protect it as this policy describes.
        </p>
      ),
    },
    {
      id: "changes",
      title: "10. Changes to This Policy",
      content: (
        <p>
          We may update this policy as FitWardrobe changes. We will post the new version on this
          page and update the &quot;Last updated&quot; date. If a change is significant, we will
          also email the people on the early-access list.
        </p>
      ),
    },
    {
      id: "contact",
      title: "11. Contact and Grievance Officer",
      content: (
        <>
          <p>For questions, requests or complaints about your privacy, contact:</p>
          <p>
            <strong>Grievance Officer:</strong> Aryan Panwar, Founder, FitWardrobe
            <br />
            Meerut, Uttar Pradesh, India
          </p>
          <p>
            <strong>Privacy requests:</strong>{" "}
            <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          </p>
          <p>
            <strong>General questions:</strong>{" "}
            <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a>
          </p>
        </>
      ),
    },
  ],
};
