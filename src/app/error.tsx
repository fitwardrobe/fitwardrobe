"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global boundary caught error:", error);
  }, [error]);

  return (
    <div className="fw h13 p13 fw-page fw-status-page">
      <div className="fw-container fw-page__narrow">
        <p className="fw-kicker">Something went wrong</p>
        <h1 className="fw-display fw-page__title">This page didn&apos;t load properly.</h1>
        <p className="fw-lead">
          An unexpected error stopped this page from displaying. Try again, or head back to the
          homepage.
        </p>
        <div className="fw-status-page__actions">
          <button type="button" onClick={() => reset()} className="h13-btn h13-btn--gold">
            Try again
          </button>
          <Link href="/" className="fw-link">
            Back to the homepage
          </Link>
        </div>
        {error.digest && <p className="fw-caption">Error ID: {error.digest}</p>}
      </div>
    </div>
  );
}
