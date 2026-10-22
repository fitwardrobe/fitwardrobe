"use client"

import { useEffect, useState } from "react"
import { SITE_CONFIG } from "@/lib/config"
import { readActionLink, runEmailAction, type EmailAction } from "@/lib/email-actions"

type State = "loading" | "ready" | "working" | "done" | "already" | "invalid" | "failed" | "not-configured"

const COPY: Record<EmailAction, { intro: string; button: string; done: string; already: string }> = {
  unsubscribe: {
    intro: "Press the button and we'll stop emailing this address. You can join the list again whenever you like.",
    button: "Unsubscribe",
    done: "Done. You won't get any more emails from FitWardrobe.",
    already: "This address is already unsubscribed. You won't get any more emails from us.",
  },
}

/**
 * The unsubscribe link in our emails lands here. Nothing happens until the visitor presses
 * the button, so a mail security scanner that opens every link in an email can't unsubscribe
 * anyone.
 */
export function EmailActionPanel({ action }: { action: EmailAction }) {
  const [state, setState] = useState<State>("loading")
  const [link, setLink] = useState<{ contact: string; token: string } | null>(null)
  const copy = COPY[action]

  useEffect(() => {
    const read = () => {
      const parsed = readActionLink(window.location.hash)
      setLink(parsed)
      setState(parsed ? "ready" : "invalid")
    }
    read()
    window.addEventListener("hashchange", read)
    return () => window.removeEventListener("hashchange", read)
  }, [])

  async function run() {
    if (!link) return
    setState("working")
    const result = await runEmailAction(action, link.contact, link.token)
    if (result.ok) setState(result.state)
    else setState(result.reason === "invalid-link" ? "invalid" : result.reason)
  }

  const contact = (
    <a href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a>
  )

  return (
    <div className="fw-email-action" aria-live="polite">
      {(state === "loading" || state === "ready" || state === "working") && (
        <>
          <p>{copy.intro}</p>
          <button
            type="button"
            className="h13-btn h13-btn--gold"
            onClick={run}
            disabled={state !== "ready"}
          >
            {state === "working" ? "One moment…" : copy.button}
          </button>
        </>
      )}
      {state === "done" && <p className="fw-email-action__result">{copy.done}</p>}
      {state === "already" && <p className="fw-email-action__result">{copy.already}</p>}
      {state === "invalid" && (
        <p className="fw-email-action__result">
          This link looks incomplete or has expired. Open it straight from the email, or write to {contact} and
          we&apos;ll sort it out.
        </p>
      )}
      {(state === "failed" || state === "not-configured") && (
        <p className="fw-email-action__result">
          That didn&apos;t go through. Try again in a minute, or reply to our email or write to {contact} and
          we&apos;ll do it for you.
        </p>
      )}
      {state === "failed" && (
        <button type="button" className="h13-btn h13-btn--line" onClick={run}>
          Try again
        </button>
      )}
    </div>
  )
}
