"use client"

import { useId, useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"
import { SITE_CONFIG } from "@/lib/config"
import {
  HELP_OPTIONS,
  PHONE_OPTIONS,
  isValidEmail,
  signupSource,
  submitEarlyAccess,
  type Help,
  type Phone,
} from "@/lib/early-access"
import { track } from "@/lib/analytics"

type Status = "idle" | "submitting" | "success" | "error" | "not-configured"
type Step = "ask" | "sending" | "thanks" | "skipped"

export function EarlyAccessForm({
  tone = "light",
  location,
}: {
  tone?: "light" | "dark" | "glass"
  /** Reported to GA4 as form_location; defaults to join (dark) or hero. */
  location?: string
}) {
  const id = useId()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [fieldError, setFieldError] = useState("")
  const [step, setStep] = useState<Step>("ask")
  const [phone, setPhone] = useState<Phone | "">("")
  const [help, setHelp] = useState<Help[]>([])
  const formLocation = location ?? (tone === "dark" ? "join" : "hero")
  // Never send the email address itself to analytics.

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setFieldError("Enter an email address like name@example.com.")
      track("form_error", { form_location: formLocation, error_type: "invalid_email" })
      return
    }
    setFieldError("")
    setStatus("submitting")
    const result = await submitEarlyAccess(email, { source: signupSource(formLocation) })
    if (result.ok) {
      setStatus("success")
      track("generate_lead", { form_location: formLocation, method: "early_access_form", lead_source: "website" })
    } else {
      const reason = result.reason === "not-configured" ? "not-configured" : "error"
      setStatus(reason)
      track("form_error", {
        form_location: formLocation,
        error_type: reason === "not-configured" ? "not_configured" : "network",
      })
    }
  }

  async function onDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!phone && help.length === 0) {
      setStep("skipped")
      return
    }
    setStep("sending")
    await submitEarlyAccess(email, { phone: phone || undefined, help, source: signupSource(`${formLocation}-details`) })
    setStep("thanks")
    track("early_access_details", { form_location: formLocation, phone_given: phone !== "", help_count: help.length })
  }

  if (status === "success") {
    const asking = step === "ask" || step === "sending"
    return (
      <div className={`fw-form fw-form--${tone} fw-form__done`} data-clarity-mask="true">
        <span className="fw-form__tick" aria-hidden="true">
          <Check size={18} strokeWidth={2} />
        </span>
        <div className="fw-form__done-body">
          <div role="status">
            <p className="fw-form__done-title">You&apos;re on the list.</p>
            <p className="fw-form__done-text">
              Thanks for joining FitWardrobe. We&apos;ll email you when early access opens.
            </p>
            {step === "thanks" && (
              <p className="fw-form__done-text fw-more__thanks">
                Thank you. That helps us decide what to build first.
              </p>
            )}
          </div>

          {asking && (
            <form className="fw-more" onSubmit={onDetails}>
              <p className="fw-more__title">Two quick questions (optional)</p>
              <fieldset className="fw-more__set">
                <legend>Which phone do you use?</legend>
                <div className="fw-more__chips">
                  {PHONE_OPTIONS.map((p) => (
                    <label key={p} className="fw-chip">
                      <input
                        type="radio"
                        name={`${id}-phone`}
                        value={p}
                        checked={phone === p}
                        onChange={() => setPhone(p)}
                      />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="fw-more__set">
                <legend>What would you most like help with?</legend>
                <div className="fw-more__chips">
                  {HELP_OPTIONS.map((h) => (
                    <label key={h} className="fw-chip">
                      <input
                        type="checkbox"
                        value={h}
                        checked={help.includes(h)}
                        onChange={(e) =>
                          setHelp((cur) => (e.target.checked ? [...cur, h] : cur.filter((x) => x !== h)))
                        }
                      />
                      <span>{h}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="fw-more__actions">
                <button type="submit" className="fw-btn fw-btn--primary fw-btn--sm" disabled={step === "sending"}>
                  {step === "sending" ? "Sending…" : "Send answers"}
                </button>
                <button type="button" className="fw-more__skip" onClick={() => setStep("skipped")}>
                  Skip
                </button>
              </div>
            </form>
          )}

          <p className="fw-form__done-text fw-form__next">
            While you wait, follow updates on{" "}
            <a href={SITE_CONFIG.telegramUrl} rel="noopener">
              Telegram
            </a>{" "}
            or share ideas on{" "}
            <a href={SITE_CONFIG.discordUrl} rel="noopener">
              Discord
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  const errorId = `${id}-error`
  const noteId = `${id}-note`

  return (
    <form className={`fw-form fw-form--${tone}`} onSubmit={onSubmit} noValidate data-clarity-mask="true">
      <label htmlFor={`${id}-email`} className="fw-form__label">
        Email address
      </label>
      <div className="fw-form__row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="fw-form__input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (fieldError) setFieldError("")
          }}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError || status === "error" ? errorId : noteId}
          required
        />
        <button type="submit" className="fw-btn fw-btn--primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Joining…" : "Join early access"}
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="fw-btn__arrow" />
        </button>
      </div>
      <div aria-live="polite">
        {fieldError ? (
          <p id={errorId} className="fw-form__error">
            {fieldError}
          </p>
        ) : status === "error" ? (
          <p id={errorId} className="fw-form__error">
            That didn&apos;t go through. Check your connection and try again.
          </p>
        ) : status === "not-configured" ? (
          <p id={noteId} className="fw-form__note fw-form__note--strong">
            Sign-ups open in a few days. Until then, email{" "}
            <a href={`mailto:${SITE_CONFIG.contactEmail}?subject=Early%20access`}>
              {SITE_CONFIG.contactEmail}
            </a>{" "}
            and we&apos;ll add you.
          </p>
        ) : (
          <p id={noteId} className="fw-form__note">
            Free during early access. One email when it opens, and you can unsubscribe any time.
          </p>
        )}
      </div>
    </form>
  )
}
