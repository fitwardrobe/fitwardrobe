"use client"

export function Privacy() {
  return (
    <section className="section" id="privacy" aria-labelledby="privacyHeading">
      <div className="container">
        <div className="privacy__grid">
          <div className="privacy__content">
            <span className="section-label reveal">Why Privacy Matters</span>
            <h2 id="privacyHeading" className="reveal reveal--delay-1">
              Private Wardrobe App —<br />Your Data Stays on Device
            </h2>
            <p className="reveal reveal--delay-2">
              Most fashion apps upload your photos to the cloud, build
              profiles, and share data with advertisers. FitWardrobe is
              different — your clothing photos and wardrobe data are stored
              locally on your device. When our AI
              <span className="ai-info-tooltip" tabIndex={0}>
                ⓘ
                <span className="tooltip-text">
                  We use Google Gemini to identify clothing items. Your images are processed temporarily and are never stored on our servers.
                </span>
              </span>
              analyses your clothes,
              only a temporary request is sent and nothing is stored on
              external servers.
            </p>
            <p className="reveal reveal--delay-3">
              We built FitWardrobe with a privacy-first approach because we believe personal data
              should stay personal. Your wardrobe is never stored on our
              servers, there are no profiles to sell, and no data to mine.
              Just intelligent fashion advice with privacy in mind.
            </p>
          </div>
          <div className="privacy__visual reveal">
            <div className="privacy__comparison">
              <div className="privacy__comparison-header">
                <span className="privacy__comparison-label privacy__comparison-label--other">Other Apps</span>
                <span className="privacy__comparison-label privacy__comparison-label--fw">FitWardrobe</span>
              </div>
              <div className="privacy__comparison-body">
                <div className="privacy__comparison-row">
                  <span className="privacy__comparison-cell"><span className="icon-bad">✗</span> Usually uploaded</span>
                  <span className="privacy__comparison-cell"><span className="icon-good">✓</span> Stays on device</span>
                </div>
                <div className="privacy__comparison-row">
                  <span className="privacy__comparison-cell"><span className="icon-bad">✗</span> Cloud processing</span>
                  <span className="privacy__comparison-cell"><span className="icon-good">✓</span> On-device AI</span>
                </div>
                <div className="privacy__comparison-row">
                  <span className="privacy__comparison-cell"><span className="icon-bad">✗</span> Shared styling data</span>
                  <span className="privacy__comparison-cell"><span className="icon-good">✓</span> Local-only storage</span>
                </div>
                <div className="privacy__comparison-row">
                  <span className="privacy__comparison-cell"><span className="icon-bad">✗</span> Targeted advertising</span>
                  <span className="privacy__comparison-cell"><span className="icon-good">✓</span> Zero tracking</span>
                </div>
                <div className="privacy__comparison-row">
                  <span className="privacy__comparison-cell"><span className="icon-bad">✗</span> External server storage</span>
                  <span className="privacy__comparison-cell"><span className="icon-good">✓</span> You own your data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
