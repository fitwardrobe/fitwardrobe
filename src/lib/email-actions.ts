/**
 * The unsubscribe link in our emails opens fitwardrobe.me/unsubscribe/, which asks the email
 * script for the early-access Sheet (a Google Apps Script web app) to record it. The script's URL is public; NEXT_PUBLIC_EMAIL_ACTIONS_URL overrides the default.
 *
 * Each link carries the Resend contact id and a signed token after the # (never sent to a
 * server, a log or analytics), so no email address ever appears in a URL.
 */
const DEFAULT_EMAIL_ACTIONS_URL =
  "https://script.google.com/macros/s/AKfycbxZYQRVfPInJPNegqqcxU1x3QjXToH6GCDqqhGx-pbKDXTs1NuM3bo7hFk9ecQvkV9blQ/exec"
export const EMAIL_ACTIONS_URL = process.env.NEXT_PUBLIC_EMAIL_ACTIONS_URL?.trim() || DEFAULT_EMAIL_ACTIONS_URL

export type EmailAction = "unsubscribe"

export type EmailActionResult =
  | { ok: true; state: "done" | "already" }
  | { ok: false; reason: "invalid-link" | "not-configured" | "failed" }

/** Reads "c=<contact id>&t=<token>" from the page's # part. */
export function readActionLink(hash: string): { contact: string; token: string } | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""))
  const contact = params.get("c") ?? ""
  const token = params.get("t") ?? ""
  return /^[0-9a-f-]{36}$/i.test(contact) && /^[A-Za-z0-9_-]{16,64}$/.test(token) ? { contact, token } : null
}

export async function runEmailAction(action: EmailAction, contact: string, token: string): Promise<EmailActionResult> {
  if (!EMAIL_ACTIONS_URL) return { ok: false, reason: "not-configured" }
  // Apps Script reserves the query names "c" and "sid", so the script reads "id" and "token".
  const url = `${EMAIL_ACTIONS_URL}?${new URLSearchParams({ action, id: contact, token })}`
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" })
    const data = (await res.json()) as { ok?: boolean; state?: string; error?: string }
    if (data.ok && (data.state === "done" || data.state === "already")) return { ok: true, state: data.state }
    return { ok: false, reason: data.error === "invalid-link" ? "invalid-link" : "failed" }
  } catch {
    return { ok: false, reason: "failed" }
  }
}
