/**
 * Early-access sign-up, backed by the Google Form "FitWardrobe early access"
 * (owned by aryanpanwar10005@gmail.com, responses in the linked Google Sheet).
 *
 * The ids below are public (they appear in the form's own URL and markup), so they
 * ship as defaults; the NEXT_PUBLIC_EARLY_ACCESS_* variables override them.
 * Find them again from the form's pre-filled link: the form id sits between /d/e/
 * and /viewform, and each field is an entry.NNNN key.
 *
 * Google Forms does not send CORS headers, so the request goes out in `no-cors`
 * mode: the browser confirms the request was delivered, but the response body (and
 * status) cannot be read. Multiple-choice and checkbox values must match the
 * form's options exactly, or Google drops the whole response.
 */

const env = (value: string | undefined, fallback: string) => value?.trim() || fallback

const FORM_ID = env(
  process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_ID,
  "1FAIpQLScl3tnxETbI0xMuClrD4Waw3fznKW7BHToAXcV1WpZnpTjVyg",
)
const ENTRY = {
  email: env(process.env.NEXT_PUBLIC_EARLY_ACCESS_EMAIL_ENTRY, "entry.27954179"),
  phone: env(process.env.NEXT_PUBLIC_EARLY_ACCESS_PHONE_ENTRY, "entry.1919821622"),
  help: env(process.env.NEXT_PUBLIC_EARLY_ACCESS_HELP_ENTRY, "entry.1603544156"),
  source: env(process.env.NEXT_PUBLIC_EARLY_ACCESS_SOURCE_ENTRY, "entry.235993561"),
  // Optional profile questions. Empty until the questions exist in the Google Form; each one
  // is shown on the site only once its entry id is set.
  gender: env(process.env.NEXT_PUBLIC_EARLY_ACCESS_GENDER_ENTRY, ""),
  age: env(process.env.NEXT_PUBLIC_EARLY_ACCESS_AGE_ENTRY, ""),
  country: env(process.env.NEXT_PUBLIC_EARLY_ACCESS_COUNTRY_ENTRY, ""),
}

/** Options exactly as written in the Google Form. */
export const PHONE_OPTIONS = ["Android", "iPhone", "Both"] as const
export const HELP_OPTIONS = [
  "Deciding what to wear each day",
  "Outfits for work",
  "Outfits for events and dates",
  "Wearing clothes I forget I own",
  "Building a smaller wardrobe",
  "Something else",
] as const

export const GENDER_OPTIONS = ["Woman", "Man", "Non-binary", "Prefer not to say"] as const
/** FitWardrobe is for people aged 18 and over (Terms 2.1), so there is no under-18 band. */
export const AGE_OPTIONS = ["18-24", "25-34", "35-44", "45+"] as const
export const COUNTRY_OPTIONS = [
  "United Kingdom",
  "India",
  "United States",
  "Germany",
  "Netherlands",
  "Canada",
  "Australia",
  "Other",
] as const

export type Phone = (typeof PHONE_OPTIONS)[number]
export type Help = (typeof HELP_OPTIONS)[number]
export type Gender = (typeof GENDER_OPTIONS)[number]
export type Age = (typeof AGE_OPTIONS)[number]
export type Country = (typeof COUNTRY_OPTIONS)[number]

export const isEarlyAccessConfigured = FORM_ID !== "" && ENTRY.email !== ""

/** Which optional profile questions the Google Form currently accepts. */
export const PROFILE_QUESTIONS = {
  gender: ENTRY.gender !== "",
  age: ENTRY.age !== "",
  country: ENTRY.country !== "",
}

export type EarlyAccessResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "network" }

export type EarlyAccessDetails = {
  phone?: Phone
  help?: Help[]
  gender?: Gender
  age?: Age
  country?: Country
  /** Where the sign-up came from, e.g. "join · / · utm_source=instagram". */
  source?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

/** Form location, page path and any utm_* tags of the current visit. */
export function signupSource(location: string): string {
  if (typeof window === "undefined") return location
  const params = new URLSearchParams(window.location.search)
  const utm = ["utm_source", "utm_medium", "utm_campaign"]
    .filter((k) => params.get(k))
    .map((k) => `${k}=${params.get(k)}`)
  return [location, window.location.pathname, ...utm].join(" · ").slice(0, 300)
}

/**
 * Sends one response. Called once with the email (and source) when someone joins,
 * and again if they answer the optional questions; each call is a row in the Sheet.
 */
export async function submitEarlyAccess(
  email: string,
  details: EarlyAccessDetails = {},
): Promise<EarlyAccessResult> {
  if (!isEarlyAccessConfigured) return { ok: false, reason: "not-configured" }

  const body = new URLSearchParams({ [ENTRY.email]: email.trim() })
  if (details.phone && PHONE_OPTIONS.includes(details.phone)) body.append(ENTRY.phone, details.phone)
  for (const h of details.help ?? []) if (HELP_OPTIONS.includes(h)) body.append(ENTRY.help, h)
  if (ENTRY.gender && details.gender && GENDER_OPTIONS.includes(details.gender)) body.append(ENTRY.gender, details.gender)
  if (ENTRY.age && details.age && AGE_OPTIONS.includes(details.age)) body.append(ENTRY.age, details.age)
  if (ENTRY.country && details.country && COUNTRY_OPTIONS.includes(details.country)) body.append(ENTRY.country, details.country)
  if (details.source) body.append(ENTRY.source, details.source)

  try {
    await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
      method: "POST",
      mode: "no-cors",
      body,
    })
    return { ok: true }
  } catch {
    return { ok: false, reason: "network" }
  }
}
