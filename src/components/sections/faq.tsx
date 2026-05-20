"use client"

export function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal">Support</span>
          <h2 className="reveal reveal--delay-1">Frequently Asked Questions</h2>
        </div>

        <div className="faq-container reveal reveal--delay-2">
          <details className="faq-item">
            <summary>What exactly is a &quot;Beta&quot;?</summary>
            <div className="faq-content">
              <p>
                Beta means the app is in the final stages of testing. Most
                features work perfectly, but you might occasionally encounter
                minor bugs. By joining now, you help us squash those bugs
                before the official store launch.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>Is my data really private?</summary>
            <div className="faq-content">
              <p>
                Absolutely. FitWardrobe is built with a &quot;local-first&quot;
                philosophy. Your clothing photos and personal style
                data remain encrypted on your device. While you sign in to
                access premium AI features, we ensure your personal files
                stay under your control.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>Why do I need to sign in?</summary>
            <div className="faq-content">
              <p>
                Signing in creates a secure identity for you, allowing
                for future features like optional cloud backup and a
                personalised styling experience. Your wardrobe data
                always stays on your device.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>
              Why is it an APK download instead of the Play Store?
            </summary>
            <div className="faq-content">
              <p>
                Direct APK distribution allows us to release updates instantly
                based on tester feedback without waiting for store approval
                cycles. We will be launching on the Google Play Store and
                Apple App Store in March 2026.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>How can I provide feedback or report bugs?</summary>
            <div className="faq-content">
              <p>
                The best way is to join our Telegram channel. You can message
                the developers directly there. Alternatively, you can send an
                email to fitwardrobee@gmail.com.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>When will the iOS version be available?</summary>
            <div className="faq-content">
              <p>
                We are currently polishing the iOS version. We expect to
                launch the iOS TestFlight beta in March 2026. Join our
                Telegram to be the first to know when it drops.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>Will the app remain free after beta?</summary>
            <div className="faq-content">
              <p>
                Yes. The core privacy-first styling features will always be
                free. As a thank you, all beta testers will receive &quot;early
                adopter&quot; status, granting free access to any future premium
                features.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}
