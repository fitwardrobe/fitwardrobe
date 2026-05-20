"use client"

export function Community() {
  return (
    <section className="section section--alt" id="community">
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal">Community</span>
          <h2 className="reveal reveal--delay-1">Let&apos;s Grow Together</h2>
          <p className="reveal reveal--delay-2">
            Join our small but growing community of fashion enthusiasts and
            privacy advocates.
          </p>
        </div>

        <div className="grid grid--2 reveal reveal--delay-3">
          <div className="community-card">
            <span className="community-icon">📢</span>
            <h3>Telegram Channel</h3>
            <p>
              Get instant updates on new beta releases, design sneak peeks,
              and styling tips.
            </p>
            <a
              href="https://t.me/fitwardrobe"
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Telegram
            </a>
          </div>
          <div className="community-card">
            <span className="community-icon">📸</span>
            <h3>Instagram Profile</h3>
            <p>
              See FitWardrobe in action and find inspiration for your next
              smart outfit.
            </p>
            <a
              href="https://instagram.com/fitwardrobe"
              className="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
