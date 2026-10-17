import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import React from "react";

export const cookiesData: LegalPageData = {
  title: "Cookie Policy",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "October 17, 2026",
  version: "1.2",
  toc: [
    { id: "introduction", title: "1. Introduction" },
    { id: "what-are-cookies", title: "2. What are Cookies and Local Storage?" },
    { id: "types-of-storage", title: "3. How We Use Storage" },
    { id: "your-control", title: "4. Your Control over Cookies" },
    { id: "contact", title: "5. Contact Us" },
  ],
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <p>
          This Cookie Policy explains how FitWardrobe (&quot;we&quot;, &quot;us&quot;) uses cookies and
          similar storage on the website fitwardrobe.me and in the FitWardrobe app. We use no
          advertising cookies, and we never sell your data. For everything else about your data, see
          our <a href="/privacy/">Privacy Policy</a>.
        </p>
      ),
    },
    {
      id: "what-are-cookies",
      title: "2. What are Cookies and Local Storage?",
      content: (
        <p>
          Cookies are small text files stored by your browser. Similar technologies such as{" "}
          <strong>local storage</strong> and <strong>IndexedDB</strong> keep data on your own device;
          the FitWardrobe web app uses them to store your wardrobe without uploading it to our
          servers.
        </p>
      ),
    },
    {
      id: "types-of-storage",
      title: "3. How We Use Storage",
      content: (
        <>
          <h3>3.1 Essential storage on the website</h3>
          <p>Needed for the site to work and to remember your choices. Always on.</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>fw-consent</strong> (local storage)
                </td>
                <td>Remembers whether you accepted or declined analytics cookies</td>
                <td>Until you clear it</td>
              </tr>
              <tr>
                <td>
                  <strong>fw-internal</strong> (local storage)
                </td>
                <td>Set only on the site owner&apos;s own browser, to leave the owner&apos;s visits out of analytics</td>
                <td>Until cleared</td>
              </tr>
            </tbody>
          </table>

          <h3>3.2 Essential storage in the app (once it opens)</h3>
          <table>
            <thead>
              <tr>
                <th>Storage</th>
                <th>Purpose</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>IndexedDB / local storage</strong>
                </td>
                <td>Your wardrobe items, photos, outfits and preferences, kept on your device</td>
                <td>FitWardrobe app</td>
              </tr>
              <tr>
                <td>
                  <strong>Local storage or cookie</strong>
                </td>
                <td>Keeps you signed in</td>
                <td>Supabase</td>
              </tr>
            </tbody>
          </table>

          <h3>3.3 Analytics cookies (with your consent where required)</h3>
          <p>
            <strong>Google Analytics 4</strong> tells us which pages are useful, how visitors find us
            and whether the early-access form works. Ad storage, ad personalisation and Google
            Signals are switched off, and we never send your email address or wardrobe data to
            Google Analytics.
          </p>
          <p>
            <strong>Microsoft Clarity</strong> shows heatmaps and recordings of how visitors use our
            pages, so we can fix what confuses people. Text typed into forms is masked and never
            recorded.
          </p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>_ga</strong>
                </td>
                <td>Distinguishes visitors (Google Analytics)</td>
                <td>Up to 2 years</td>
              </tr>
              <tr>
                <td>
                  <strong>_ga_&lt;ID&gt;</strong>
                </td>
                <td>Keeps session state (Google Analytics)</td>
                <td>Up to 2 years</td>
              </tr>
              <tr>
                <td>
                  <strong>_clck</strong>
                </td>
                <td>Keeps a pseudonymous Clarity visitor ID for this site</td>
                <td>Up to 1 year</td>
              </tr>
              <tr>
                <td>
                  <strong>_clsk</strong>
                </td>
                <td>Joins page views into one Clarity session</td>
                <td>1 day</td>
              </tr>
              <tr>
                <td>
                  <strong>CLID, MUID, MR, SM, ANONCHK</strong>
                </td>
                <td>
                  Set by Microsoft on its own domains to identify browsers across sites that use
                  Clarity (third-party cookies; Clarity does not use them for advertising)
                </td>
                <td>Up to 1 year</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Visitors in the EEA, UK and Switzerland:</strong> these cookies are set only after
            you accept them. Until then, Google Consent Mode sends limited, cookieless signals, and
            Clarity runs without cookies, using a new ID for every page view.{" "}
            <strong>Everywhere else</strong>, they are on by default and you can turn them off at
            any time with &quot;Cookie settings&quot; at the bottom of every page. Declining deletes
            Clarity&apos;s cookies and ends its recording.
          </p>

          <h3>3.4 Cookieless analytics</h3>
          <p>
            <strong>Vercel Web Analytics</strong> counts page views without setting any cookies or
            storing anything on your device. Visitors are counted from an anonymous value derived
            from the request, which is discarded within 24 hours.
          </p>
        </>
      ),
    },
    {
      id: "your-control",
      title: "4. Your Control over Cookies",
      content: (
        <>
          <p>
            Use &quot;Cookie settings&quot; at the bottom of any page to accept or decline analytics
            cookies at any time. You can also block or delete cookies and local data in your browser
            settings.
          </p>
          <div className="warning-box">
            <p>
              <strong>Warning:</strong> deleting local storage or IndexedDB data for the FitWardrobe
              web app permanently removes the wardrobe stored on that device.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "contact",
      title: "5. Contact Us",
      content: (
        <p>
          If you have questions about our use of cookies, email{" "}
          <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a>.
        </p>
      ),
    },
  ],
};
