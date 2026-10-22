import { Metadata } from "next"
import { PageHero } from "@/components/site/page-hero"
import { EmailActionPanel } from "@/components/site/email-action-panel"

export const metadata: Metadata = {
  title: "Confirm your email",
  description: "Confirm the email address you used to join FitWardrobe early access.",
  robots: { index: false, follow: false },
}

export default function ConfirmPage() {
  return (
    <div className="fw h13 p13 fw-page">
      <PageHero compact eyebrow="Early access" title="Confirm it's you.">
        <EmailActionPanel action="confirm" />
      </PageHero>
    </div>
  )
}
