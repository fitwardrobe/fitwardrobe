import Link from "next/link";
import { LogoMark } from "@/components/site/logo";

export default function NotFound() {
  return (
    <div className="fw h13 p13 fw-page fw-status-page">
      <div className="fw-container fw-page__narrow">
        <div className="fw-status-page__mark">
          <LogoMark className="fw-404-mark" title="An open, empty wardrobe" />
        </div>
        <p className="fw-kicker">Error 404</p>
        <h1 className="fw-display fw-page__title">This page has gone missing.</h1>
        <p className="fw-lead">
          Like a sock that never came back from the wash, the page you were looking for isn&apos;t
          here. It may have moved, or the link may be wrong.
        </p>
        <div className="fw-status-page__actions">
          <Link href="/" className="h13-btn h13-btn--gold">
            Back to the homepage
          </Link>
          <Link href="/blog/" className="fw-link">
            Browse the guides
          </Link>
        </div>
      </div>
    </div>
  );
}
