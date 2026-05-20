"use client"

import Link from "next/link"

export function Hero() {
  return (
    <section className="hero section" aria-labelledby="heroHeading" id="home">
      <div className="container">
        <div className="hero__content">
          <h1 id="heroHeading" className="reveal reveal--delay-1">
            AI Outfit Planner &amp;<br />
            Capsule Wardrobe App
          </h1>
          <p className="hero__subtitle reveal reveal--delay-2">
            A privacy-first wardrobe AI that runs on your device
            <span className="ai-info-tooltip" tabIndex={0}>
              ⓘ
              <span className="tooltip-text">
                AI suggestions are generated based on patterns and may make mistakes. 
                <Link href="/ai-transparency"> Learn how it works</Link>.
              </span>
            </span>
          </p>
          <div className="btn-group reveal reveal--delay-3">
            <a href="#download-beta" className="btn btn--primary btn--lg">
              Get Started Free
            </a>
            <a href="#how-it-works" className="btn btn--secondary">
              See How It Works
            </a>
          </div>
        </div>
      </div>
      <div className="hero__decor" aria-hidden="true">
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
        <div className="hero__shape hero__shape--3"></div>
      </div>
    </section>
  )
}
