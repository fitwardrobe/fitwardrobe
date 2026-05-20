"use client"

export function WhoItIsFor() {
  return (
    <section className="section" id="who-is-this-for" aria-labelledby="whoHeading">
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal">Who It&apos;s For</span>
          <h2 id="whoHeading" className="reveal reveal--delay-1">Who Is FitWardrobe For?</h2>
          <p className="section-intro">Whether you&apos;re building a minimal wardrobe from scratch or trying to fit your wardrobe to a more intentional lifestyle, FitWardrobe helps you organize clothes, plan outfits, and wear everything you own.</p>
        </div>
        <div className="grid grid--3">
          <article className="feature-card reveal">
            <div className="feature-card__icon feature-card__icon--sage">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3>Capsule Wardrobe Builders</h3>
            <p>Build a curated, intentional wardrobe with AI guidance. Stop buying things that do not work together and start wearing everything you own.</p>
          </article>
          <article className="feature-card reveal reveal--delay-1">
            <div className="feature-card__icon feature-card__icon--terracotta">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <h3>Busy Professionals</h3>
            <p>Plan your outfits for the entire week in minutes. Never waste time deciding what to wear on a Monday morning again.</p>
          </article>
          <article className="feature-card reveal reveal--delay-2">
            <div className="feature-card__icon feature-card__icon--navy">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Privacy-Conscious Users</h3>
            <p>Your wardrobe photos never leave your device. No cloud uploads, no data mining, no advertising profiles — no compromises.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
