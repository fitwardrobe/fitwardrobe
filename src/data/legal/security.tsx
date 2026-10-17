import { LegalPageData } from "@/types/legal";
import React from "react";

export const securityData: LegalPageData = {
  title: "Security at FitWardrobe",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "October 17, 2026",
  version: "1.1",
  toc: [
    { id: "philosophy", title: "1. Our Security Philosophy" },
    { id: "how-we-secure", title: "2. How We Protect You" },
    { id: "user-responsibilities", title: "3. Your Responsibilities" },
    { id: "reporting", title: "4. Reporting Vulnerabilities" },
  ],
  sections: [
    {
      id: "philosophy",
      title: "Our Security Philosophy",
      content: (
        <p>
          The safest data is data we never hold. Your wardrobe photos and items are stored on
          your own device, not on FitWardrobe&apos;s servers, and the app sends the AI services
          only what each request needs.
        </p>
      ),
    },
    {
      id: "how-we-secure",
      title: "How We Protect You",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Your wardrobe stays on your device</h3>
            <p>
              Photos, items and outfits are saved on your phone or in your browser. To tag a piece
              or suggest an outfit, the photo or item details are sent to a cloud AI service, as
              described in our <a href="/privacy/">Privacy Policy</a>.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">2. Secure sign-in</h3>
            <p>
              Sign-in is handled by Supabase, an established authentication provider. We never
              see or store a readable copy of your sign-in credentials.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">3. Careful AI processing</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Photos are compressed before they are sent, and only for the item you are tagging.</li>
              <li>We don&apos;t keep copies of AI requests on our servers.</li>
              <li>We don&apos;t use your wardrobe to train AI models.</li>
              <li>
                Each AI provider handles requests under its own terms; our Privacy Policy explains
                what that means for Google&apos;s Gemini API and for Groq.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">4. Encrypted connections</h3>
            <p>
              Everything sent between your device, our website and our service providers travels
              over encrypted HTTPS/TLS connections.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "user-responsibilities",
      title: "Your Responsibilities",
      content: (
        <div className="space-y-4">
          <p>Because your wardrobe is stored on your device, its security also depends on you:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Device security:</strong> use a passcode, PIN or biometric lock on your
              phone or computer.
            </li>
            <li>
              <strong>Browser security:</strong> keep your browser updated and avoid untrusted
              extensions.
            </li>
            <li>
              <strong>Photos:</strong> photograph clothes only, and keep people, faces and
              documents out of the frame.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "reporting",
      title: "Reporting Vulnerabilities",
      content: (
        <p>
          We welcome reports from security researchers. If you find a potential vulnerability in
          FitWardrobe, please email{" "}
          <a href="mailto:hello@fitwardrobe.me" className="text-sage font-medium hover:underline">
            hello@fitwardrobe.me
          </a>
          . We will investigate and respond as quickly as possible.
        </p>
      ),
    },
  ],
};
