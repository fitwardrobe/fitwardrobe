"use client"

import Link from "next/link"

export function HowItWorks() {
  return (
    <section className="section" id="how-it-works" aria-labelledby="howHeading">
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal">How It Works</span>
          <h2 id="howHeading" className="reveal reveal--delay-1">
            Three Steps to<br />Better Style
          </h2>
          <p className="reveal reveal--delay-2">
            Getting started takes less than a minute. Quick sign-in, no
            subscriptions, no hidden trackers.
          </p>
        </div>
        <div className="steps">
          <div className="step reveal">
            <div className="step__number">1</div>
            <div className="step__content">
              <h3>Snap Your Clothes</h3>
              <p>
                Take photos of your clothing items. Our smart AI
                <span className="ai-info-tooltip" tabIndex={0}>
                  ⓘ
                  <span className="tooltip-text">
                    AI recognition is powered by Google Gemini. 
                    <Link href="/ai-transparency">Learn more about AI accuracy</Link>
                  </span>
                </span>
                automatically recognises the type, colour, and style so you
                don&apos;t have to tag anything manually.
              </p>
            </div>
          </div>
          <div className="step reveal reveal--delay-1">
            <div className="step__number">2</div>
            <div className="step__content">
              <h3>Get Smart Suggestions</h3>
              <p>
                Tell FitWardrobe where you&apos;re going — work, dinner, weekend —
                and it&apos;ll suggest complete outfits from your own wardrobe that
                match the occasion.
              </p>
            </div>
          </div>
          <div className="step reveal reveal--delay-2">
            <div className="step__number">3</div>
            <div className="step__content">
              <h3>Style with Privacy</h3>
              <p>
                Enjoy better style every day knowing your wardrobe stays
                on your device. Local storage and private data — without compromise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
