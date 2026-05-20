import { LegalPageData } from "@/types/legal";
import { SITE_CONFIG } from "@/lib/config";
import React from "react";

export const cookiesData: LegalPageData = {
  title: "Cookie Policy",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "February 3, 2026",
  version: "1.0",
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
          This Cookie Policy explains how FitWardrobe ("we", "us", or "our") uses
          cookies and similar local storage technologies when you use our website
          and applications. We are committed to a privacy-first approach, using
          only essential and minimal analytics technologies.
        </p>
      ),
    },
    {
      id: "what-are-cookies",
      title: "2. What are Cookies and Local Storage?",
      content: (
        <p>
          Cookies are small text files stored in your browser. Similar technologies
          like <strong>Local Storage</strong> and <strong>IndexedDB</strong> allow
          us to store larger amounts of data locally on your device to enable core
          app features without uploading them to the cloud.
        </p>
      ),
    },
    {
      id: "types-of-storage",
      title: "3. How We Use Storage",
      content: (
        <>
          <p>
            We use storage technologies primarily to keep your fashion data on
            your own device.
          </p>
          <h3>3.1 Essential Storage (Required)</h3>
          <p>
            These are necessary for the app to function properly. They do not
            track you across the web.
          </p>
          <table>
            <thead>
              <tr>
                <th>Storage Type</th>
                <th>Purpose</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Cookies</strong>
                </td>
                <td>Session management and authentication</td>
                <td>Supabase</td>
              </tr>
              <tr>
                <td>
                  <strong>IndexedDB</strong>
                </td>
                <td>
                  Local storage of your wardrobe items, photos, and outfit history
                </td>
                <td>FitWardrobe App</td>
              </tr>
              <tr>
                <td>
                  <strong>Local Storage</strong>
                </td>
                <td>App preferences (dark mode, layout settings)</td>
                <td>FitWardrobe App</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      id: "your-control",
      title: "4. Your Control over Cookies",
      content: (
        <>
          <p>
            You can manage or delete cookies and local data through your browser
            settings.
          </p>
          <div className="warning-box">
            <p>
              <strong>Warning:</strong> Deleting local storage or IndexedDB data
              will permanently remove your digital wardrobe content from the web
              app version of FitWardrobe.
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
          If you have questions about our use of cookies, please contact us at{" "}
          <a href={`mailto:${SITE_CONFIG.contactEmail}`}>
            {SITE_CONFIG.contactEmail}
          </a>
          .
        </p>
      ),
    },
  ],
};
