/**
 * The FitWardrobe mark: an arched wardrobe opening, two open doors and a hanger, drawn as
 * exact geometry (Oct 2026 redraw, replacing a trace of an AI-generated sketch).
 * Colour follows `currentColor`.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="16 25 68 58"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
    >
      <path d="M34 77V44a16 16 0 0 1 32 0V77Z" strokeWidth="4.6" />
      <path d="M30.2 40.5V80.5L18.5 74.5V46.5Z" fill="currentColor" strokeWidth="1.6" />
      <path d="M69.8 40.5V80.5L81.5 74.5V46.5Z" fill="currentColor" strokeWidth="1.6" />
      <path d="M47.2 47.6a2.9 2.9 0 1 1 2.8 3.4V53.4" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M50 53.6 39.6 61.4H60.4Z" strokeWidth="2.8" />
    </svg>
  )
}

/** Mark + serif wordmark. Live text in the brand serif, so it stays crisp and selectable. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`fw-logo ${className ?? ""}`}>
      <LogoMark className="fw-logo__mark" />
      <span className="fw-logo__word">
        <span className="fw-logo__fit">Fit</span>Wardrobe
      </span>
    </span>
  )
}
