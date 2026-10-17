/**
 * Google Analytics 4 for fitwardrobe.me.
 *
 * The measurement ID is public (it appears in every page's HTML), so it is set here as a
 * default. NEXT_PUBLIC_GA_ID can override it; the value is trimmed because a trailing
 * line break pasted into Vercel once made gtag reject the ID and GA4 recorded almost nothing.
 */
const DEFAULT_GA_ID = "G-Q1S59Q1ZFC"
const fromEnv = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? ""
export const GA_ID = /^G-[A-Z0-9]+$/.test(fromEnv) ? fromEnv : DEFAULT_GA_ID

/**
 * Microsoft Clarity project ID (heatmaps and session recordings). Empty = Clarity is off.
 * Public like the GA ID: set NEXT_PUBLIC_CLARITY_ID or fill in the default once the project exists.
 */
const DEFAULT_CLARITY_ID = ""
const clarityFromEnv = process.env.NEXT_PUBLIC_CLARITY_ID?.trim() ?? ""
export const CLARITY_ID = /^[a-z0-9]{6,16}$/i.test(clarityFromEnv) ? clarityFromEnv : DEFAULT_CLARITY_ID

/** localStorage keys */
export const CONSENT_KEY = "fw-consent" // "granted" | "denied"
export const INTERNAL_KEY = "fw-internal" // "1" marks the founder's own visits

/**
 * Regions where analytics cookies need opt-in consent (EEA, UK, Switzerland).
 * Used for Consent Mode's region-specific default.
 */
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT",
  "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH",
]

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    gtag?: Gtag
    dataLayer?: unknown[]
    clarity?: (...args: unknown[]) => void
  }
}

export type EventParams = Record<string, string | number | boolean | undefined>

/** Send a GA4 event. Safe to call before gtag loads, on the server, or with analytics blocked. */
export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  const clean: EventParams = {}
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue
    clean[k] = typeof v === "string" ? v.slice(0, 100) : v // GA4 truncates parameter values at 100 chars
  }
  window.gtag("event", event, clean)
}

/** Record the visitor's consent choice and tell GA and Clarity (no ads, so ad storage stays denied). */
export function setConsent(granted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied")
  } catch {
    /* storage blocked: the choice still applies for this page view */
  }
  const state = granted ? "granted" : "denied"
  window.gtag?.("consent", "update", { analytics_storage: state })
  // Clarity's Consent API v2: "denied" deletes its cookies and ends the recorded session.
  window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: state })
}

/**
 * Page type for reports (sent as GA4's built-in content_group). Mirrors the
 * inline copy in layout.tsx that runs before gtag config on first load.
 */
export function pageType(path: string): string {
  if (path === "/" || path === "") return "home"
  if (path === "/blog/" || path === "/blog") return "blog_index"
  if (path.startsWith("/blog/")) return "blog_post"
  if (/^\/(capsule-wardrobe|outfit-planner|minimalist-wardrobe)\/?$/.test(path)) return "guide"
  if (/^\/(privacy|terms|cookies|security|accessibility)\/?$/.test(path)) return "legal"
  if (/^\/(support|ai-transparency|about)\/?$/.test(path)) return "info"
  return "other"
}
