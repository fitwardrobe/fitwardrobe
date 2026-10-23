import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { Picture } from "@/components/home/picture"
import { EarlyAccessForm } from "@/components/home/early-access-form"

const PERKS = ["An email the day it opens", "Early previews of the new app", "A direct line to the team"]

/**
 * The early-access band from the homepage, for the end of inner pages and blog posts:
 * dusk terrace photo, headline and the sign-up form itself (no detour to the homepage).
 */
export function JoinBand({
  title = (
    <>
      Be the first to try <span className="h13-gold">FitWardrobe.</span>
    </>
  ),
  text = "A digital wardrobe that plans outfits from the clothes you own. Coming soon to Android and the web; free during early access.",
  location,
}: {
  title?: ReactNode
  text?: string
  /** Reported to GA4 as form_location / cta_location. */
  location: string
}) {
  return (
    <section className="h13-join p13-join" aria-labelledby={`join-${location}`} data-cta-location={location}>
      <div className="h13-join__bg">
        <Picture name="terrace-dusk" widths={[768, 1280, 1536]} sizes="100vw" width={1536} height={1024} alt="" />
      </div>
      <div className="fw-container h13-join__grid p13-join__grid">
        <div className="h13-join__copy">
          <p className="h13-eyebrow">Get it first</p>
          <h2 id={`join-${location}`} className="h13-h2 h13-h2--light">
            {title}
          </h2>
          <p className="h13-lead h13-lead--light">{text}</p>
          <EarlyAccessForm tone="glass" location={location} />
          <ul className="h13-join__perks">
            {PERKS.map((p) => (
              <li key={p}>
                <Check size={16} strokeWidth={2} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
