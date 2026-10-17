"use client"

import { Analytics } from "@vercel/analytics/next"
import { INTERNAL_KEY } from "@/lib/analytics"

/**
 * Vercel Web Analytics: cookieless and anonymous (visitors are counted from a hash of the
 * request that is discarded after 24 hours), so it runs for everyone without a consent prompt.
 * The founder's own visits (?internal=1 sets the flag) are dropped before sending.
 */
export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        try {
          if (localStorage.getItem(INTERNAL_KEY) === "1") return null
        } catch {
          /* storage blocked: send as normal */
        }
        return event
      }}
    />
  )
}
