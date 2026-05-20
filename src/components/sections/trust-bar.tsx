"use client"

export function TrustBar() {
  return (
    <section className="trust" aria-label="Trust indicators">
      <div className="container">
        <div className="trust__grid">
          <div className="trust__item reveal">
            <div className="trust__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="trust__label">Private AI Styling</span>
          </div>
          <div className="trust__item reveal reveal--delay-1">
            <div className="trust__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </div>
            <span className="trust__label">Photos Stay on Device</span>
          </div>
          <div className="trust__item reveal reveal--delay-2">
            <div className="trust__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="trust__label">Local-First Storage</span>
          </div>
          <div className="trust__item reveal reveal--delay-3">
            <div className="trust__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <span className="trust__label">Free Forever</span>
          </div>
        </div>
      </div>
    </section>
  )
}
