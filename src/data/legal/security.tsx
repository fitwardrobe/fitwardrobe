import { LegalPageData } from "@/types/legal";
import React from "react";

export const securityData: LegalPageData = {
  title: "Security at FitWardrobe",
  organization: "FitWardrobe",
  effectiveDate: "February 3, 2026",
  lastUpdated: "February 3, 2026",
  version: "1.0",
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
          At FitWardrobe, we believe the most secure data is the data we don't
          store. Our <strong>Local-First Architecture</strong> ensures that your
          wardrobe photos and inventory details stay on your device, not on our
          servers.
        </p>
      ),
    },
    {
      id: "how-we-secure",
      title: "How We Protect You",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Local Data Storage</h3>
            <p>
              Your wardrobe data is stored directly on your phone or computer.
              It is never uploaded to our cloud. This means even if someone
              tried to hack us, they couldn't find your photos—they simply aren't
              there.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">2. Secure Login</h3>
            <p>
              We use industry-standard security for your account. We don't store
              your password in a way that can be read by anyone, and we support
              "Magic Links" so you can log in securely using just your email.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">3. Safe AI Processing</h3>
            <p>
              When you use our AI features, images are sent through a secure,
              private tunnel for analysis.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your photos are only used for a few seconds to "see" your clothes.</li>
              <li>They are NOT used to train anyone's AI models.</li>
              <li>They are NOT saved or stored anywhere once the analysis is finished.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">4. Encrypted Communication</h3>
            <p>
              All data sent between your device and our services is protected by
              industry-standard encryption, ensuring that no one can "listen in"
              on your activity.
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
          <p>Since your data is stored locally, security also depends on you:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Device Security:</strong> Use a passcode, PIN, or biometric
              lock on your phone or computer.
            </li>
            <li>
              <strong>Browser Security:</strong> Keep your browser updated and
              avoid untrusted extensions.
            </li>
            <li>
              <strong>Backups:</strong> Regularly export your wardrobe data using
              the built-in "Export JSON" feature to prevent loss if your device
              is damaged.
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
          We welcome reports from security researchers. If you find a potential
          vulnerability in FitWardrobe, please email us at{" "}
          <a href="mailto:fitwardrobee@gmail.com" className="text-sage font-medium hover:underline">
            fitwardrobee@gmail.com
          </a>
          . We will investigate and respond as quickly as possible.
        </p>
      ),
    },
  ],
};
