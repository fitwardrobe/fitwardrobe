"use client"

import Link from "next/link"

export function UseCases() {
  return (
    <section className="section section--alt" id="use-cases" aria-labelledby="useCasesHeading">
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal">Use Cases</span>
          <h2 id="useCasesHeading" className="reveal reveal--delay-1">What You Can Do With FitWardrobe</h2>
        </div>
        <ul className="use-cases-list reveal reveal--delay-2">
          <li>Plan work outfits for the entire week in one go</li>
          <li>Build a capsule wardrobe that works for every occasion</li>
          <li>Discover outfit combinations from clothes you already own</li>
          <li>Track cost per wear and make smarter shopping decisions</li>
          <li>Organise seasonal wardrobes digitally — no more forgotten items</li>
          <li>Get AI outfit suggestions tailored to where you are going</li>
        </ul>
        <div className="reveal reveal--delay-3" style={{ marginTop: "var(--space-8)", textAlign: "center" }}>
          <Link href="/capsule-wardrobe" className="btn btn--secondary">
            Learn How to Build a Capsule Wardrobe &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
