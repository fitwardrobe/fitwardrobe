"use client"

import { SITE_CONFIG } from "@/lib/config"

export function BetaDownload() {
  return (
    <section className="section section--dark beta-download" id="download-beta">
      <div className="container">
        <div className="beta-badge reveal">
          <span>🚀</span>
          <span>Beta Now Available</span>
        </div>

        <h2 className="reveal reveal--delay-1">Try FitWardrobe Today</h2>

        <p className="beta-subheading reveal reveal--delay-2">
          Download our Android beta and help shape the future of privacy-first
          personal styling.
        </p>

        <div className="download-button-container reveal reveal--delay-3">
          <a
            href={SITE_CONFIG.apkDownloadUrl}
            className="btn-download-apk"
            download
          >
            <span className="download-icon">📱</span>
            <span className="download-text">
              <span className="download-main">Download Beta APK</span>
              <span className="download-sub">Android 8.0+</span>
            </span>
          </a>

          <p className="download-info">
            Version 1.0.1 | ~3 MB | Updated Feb 16, 2026
          </p>
        </div>

        <div className="installation-notice reveal reveal--delay-4">
          <details className="notice-expandable">
            <summary>ℹ️ First time installing an APK?</summary>
            <div className="notice-content">
              <p><strong>Quick Installation Guide:</strong></p>
              <ol>
                <li>Download the APK file above</li>
                <li>Open your Android Settings &rarr; Security</li>
                <li>
                  Enable &quot;Install from Unknown Sources&quot; or &quot;Install Unknown
                  Apps&quot;
                </li>
                <li>Open the downloaded APK file</li>
                <li>Tap &quot;Install&quot; and allow necessary permissions</li>
              </ol>
              <p className="notice-security">
                ✅ <strong>This APK is safe:</strong> No malware, no trackers,
                same encryption as banking apps. We&apos;re distributing directly
                during beta before Play Store launch.
              </p>
            </div>
          </details>
        </div>

        <div className="coming-soon-platforms reveal reveal--delay-4">
          <p className="coming-soon-label">Coming Soon:</p>
          <div className="platform-badges">
            <div className="platform-badge">
              <span className="platform-icon">🍎</span>
              <span className="platform-text">
                <span className="platform-name">iOS App Store</span>
                <span className="platform-date">March 2026</span>
              </span>
            </div>
            <div className="platform-badge">
              <span className="platform-icon">📱</span>
              <span className="platform-text">
                <span className="platform-name">Google Play Store</span>
                <span className="platform-date">March 2026</span>
              </span>
            </div>
          </div>
          <p className="coming-soon-cta">
            Want iOS updates?{" "}
            <a
              href={SITE_CONFIG.telegramUrl}
              className="coming-soon-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Telegram
            </a>
          </p>
        </div>

        <div className="beta-perks reveal">
          <h3 className="perks-heading">Beta Tester Exclusive Perks</h3>
          <div className="perks-grid">
            <div className="perk-item">
              <span className="perk-icon">✨</span>
              <h4>Free Forever</h4>
              <p>
                Beta testers get all future premium features unlocked for
                free.
              </p>
            </div>
            <div className="perk-item">
              <span className="perk-icon">💬</span>
              <h4>Direct Dev Access</h4>
              <p>
                Chat directly with our team on Telegram and help prioritize
                features.
              </p>
            </div>
            <div className="perk-item">
              <span className="perk-icon">🛠️</span>
              <h4>Shape the Product</h4>
              <p>
                Your feedback directly impacts our roadmap and design
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
