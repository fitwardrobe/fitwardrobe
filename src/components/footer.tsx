import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link
              href="/"
              className="nav__logo"
              style={{ color: "var(--color-cream)", marginBottom: "var(--space-2)" }}
              aria-label="FitWardrobe home"
            >
              <Image
                className="nav__logo-icon"
                src="/assets/logo.png"
                alt="FitWardrobe Logo"
                width={36}
                height={36}
              />
              <span>FitWardrobe</span>
            </Link>
            <p className="footer__brand-description">
              FitWardrobe helps you fit your wardrobe to your lifestyle with
              privacy-first AI. Your clothing photos and wardrobe data stay on
              your device — no cloud uploads, no data mining, just smart outfit
              suggestions.
            </p>
          </div>

          <div>
            <h3 className="footer__heading">Product</h3>
            <Link href="/#features" className="footer__link">Features</Link>
            <Link href="/#how-it-works" className="footer__link">How It Works</Link>
            <Link href="/#download-beta" className="footer__link">Download</Link>
            <Link href="/capsule-wardrobe" className="footer__link">Capsule Wardrobe</Link>
            <Link href="/outfit-planner" className="footer__link">Outfit Planner</Link>
            <Link href="/minimalist-wardrobe" className="footer__link">Minimalist Wardrobe</Link>
            <Link href="/blog/" className="footer__link">Blog</Link>
            <a
              href="https://fitwardrobe.vercel.app"
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web App
            </a>
          </div>

          <div>
            <h3 className="footer__heading">Legal</h3>
            <Link href="/privacy" className="footer__link">Privacy Policy</Link>
            <Link href="/terms" className="footer__link">Terms of Service</Link>
            <Link href="/ai-transparency" className="footer__link">AI Transparency</Link>
            <Link href="/cookies" className="footer__link">Cookie Policy</Link>
            <Link href="/accessibility" className="footer__link">Accessibility</Link>
          </div>

          <div>
            <h3 className="footer__heading">Connect</h3>
            <a href="mailto:fitwardrobee@gmail.com" className="footer__link">
              fitwardrobee@gmail.com
            </a>
            <Link href="/support" className="footer__link">Support</Link>
            <Link href="/security" className="footer__link">Security</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; 2026 FitWardrobe. All rights reserved.</span>
          <div className="footer__social">
            <a
              href="https://github.com/fitwardrobe"
              aria-label="FitWardrobe on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="24" height="24">
                <path
                  d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
