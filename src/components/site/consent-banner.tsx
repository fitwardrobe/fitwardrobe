"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CONSENT_KEY, setConsent } from "@/lib/analytics"

/** Opt-in is needed in the EEA, UK and Switzerland; timezone is a cookieless proxy for region. */
function needsConsentPrompt(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    return tz.startsWith("Europe/") || /^Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe)$/.test(tz)
  } catch {
    return false
  }
}

export const OPEN_CONSENT_EVENT = "fw:open-consent"

/**
 * Small analytics-consent card. Shown automatically to European visitors who haven't chosen;
 * anyone can reopen it from the footer ("Cookie settings"). Until a European visitor accepts,
 * Consent Mode keeps GA cookieless (set in the inline config in layout.tsx).
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(CONSENT_KEY)
    } catch {
      /* storage blocked */
    }
    if (!stored && needsConsentPrompt()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  if (!open) return null

  const choose = (granted: boolean) => {
    setConsent(granted)
    setOpen(false)
  }

  return (
    <section className="fw-consent" aria-label="Analytics cookies" role="region">
      <p className="fw-consent__text">
        We&apos;d like to use Google Analytics and Microsoft Clarity cookies to see which pages
        help people and where they get stuck. No ads, no selling data.{" "}
        <Link href="/cookies/">Cookie policy</Link>
      </p>
      <div className="fw-consent__actions">
        <button type="button" className="fw-btn fw-btn--primary fw-btn--sm" onClick={() => choose(true)}>
          Accept
        </button>
        <button type="button" className="fw-btn fw-btn--ghost fw-btn--sm" onClick={() => choose(false)}>
          Decline
        </button>
      </div>
    </section>
  )
}

/** Footer link that reopens the consent card for anyone who wants to change their choice. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="fw-footer__cookie"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      Cookie settings
    </button>
  )
}
