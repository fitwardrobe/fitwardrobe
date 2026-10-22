import { Metadata } from "next"
import { PageHero } from "@/components/site/page-hero"
import { EmailActionPanel } from "@/components/site/email-action-panel"

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving emails from FitWardrobe.",
  robots: { index: false, follow: false },
}

export default function UnsubscribePage() {
  return (
    <div className="fw h13 p13 fw-page">
      <PageHero compact eyebrow="Emails" title="Unsubscribe.">
        <EmailActionPanel action="unsubscribe" />
      </PageHero>
    </div>
  )
}
