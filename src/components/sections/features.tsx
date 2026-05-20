"use client"

import Link from "next/link"

export function Features() {
  return (
    <section className="section section--alt" id="features" aria-labelledby="featuresHeading">
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal">What You Get</span>
          <h2 id="featuresHeading" className="reveal reveal--delay-1">
            AI Outfit Planning Features
          </h2>
          <p className="reveal reveal--delay-2">
            Everything you need to organize your wardrobe and elevate your
            style — powered by AI that respects your privacy.
          </p>
        </div>
        <div className="grid grid--3">
          <article className="feature-card reveal">
            <div className="feature-card__icon feature-card__icon--sage">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Smart Outfit Suggestions</h3>
            <p>
              Our AI
              <span className="ai-info-tooltip" tabIndex={0}>
                ⓘ
                <span className="tooltip-text">
                  Powered by Groq. Our styling AI is experimental and may provide inaccurate fashion advice. 
                  <Link href="/ai-transparency">Learn how our AI works</Link>
                </span>
              </span>
              learns your style preferences and suggests outfits from
              your own wardrobe that you&apos;ll actually want to wear.
              Personalized to your taste, not trending algorithm.
            </p>
          </article>
          <article className="feature-card reveal reveal--delay-1">
            <div className="feature-card__icon feature-card__icon--terracotta">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <h3>Digital Wardrobe Organisation &amp; Capsule Wardrobe Builder</h3>
            <p>
              Photograph your clothes and build a digital catalogue of your
              entire wardrobe. See everything you own at a glance, organized
              by category, colour, and season.
            </p>
          </article>
          <article className="feature-card reveal reveal--delay-2">
            <div className="feature-card__icon feature-card__icon--navy">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3>Style Learning</h3>
            <p>
              The more you use FitWardrobe, the better it understands your
              style. It learns which combinations you love and tailors
              recommendations just for you.
              <span className="ai-info-tooltip" tabIndex={0}>
                ⓘ
                <span className="tooltip-text">
                  Learning happens 100% locally on your device. Your preferences are never shared or sold.
                  <Link href="/privacy">Read our Privacy Commitment</Link>
                </span>
              </span>
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
