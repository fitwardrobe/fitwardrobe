import Link from "next/link"
import { Logo } from "@/components/site/logo"
import { SocialIcon } from "@/components/site/social-icons"
import { CookieSettingsButton } from "@/components/site/consent-banner"
import { SOCIAL_LINKS } from "@/data/home"
import { SITE_CONFIG } from "@/lib/config"

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#styles", label: "Styles" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#privacy", label: "Privacy" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/blog/", label: "Blog" },
      { href: "/capsule-wardrobe/", label: "Capsule wardrobe" },
      { href: "/outfit-planner/", label: "Outfit planner" },
      { href: "/minimalist-wardrobe/", label: "Minimalist wardrobe" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/support/", label: "Support" },
      { href: "/ai-transparency/", label: "How our AI works" },
      { href: `mailto:${SITE_CONFIG.contactEmail}`, label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy/", label: "Privacy policy" },
      { href: "/terms/", label: "Terms" },
      { href: "/cookies/", label: "Cookies" },
      { href: "/accessibility/", label: "Accessibility" },
      { href: "/security/", label: "Security" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="fw-footer">
      <div className="fw-container">
        <div className="fw-footer__top">
          <div className="fw-footer__brand">
            <Link href="/" aria-label="FitWardrobe home">
              <Logo />
            </Link>
            <p>Dress well with what you already own.</p>
            <ul className="fw-footer__social fw-footer__icons" aria-label="FitWardrobe elsewhere">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`FitWardrobe on ${s.label}`}
                    title={s.label}
                  >
                    <SocialIcon name={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="fw-footer__col">
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("mailto:") ? (
                      <a href={l.href}>{l.label}</a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="fw-footer__bottom">
          <p className="fw-footer__note">
            Images are AI-generated. App screens are design previews.
          </p>
          <p className="fw-footer__copy">
            © 2026 FitWardrobe · <CookieSettingsButton />
          </p>
        </div>
      </div>
    </footer>
  )
}
