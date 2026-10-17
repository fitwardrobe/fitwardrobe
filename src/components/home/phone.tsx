import { Home, Plus, Shirt, Sparkles, UserRound } from "lucide-react"
import { GARMENTS } from "@/data/home"

/**
 * HTML design previews of the upcoming app (not screenshots). Garments are the
 * transparent cut-outs in /images/home/g-<id>-cut-240.webp. Decorative: the
 * surrounding copy says what the app does, so the frame is hidden from screen readers.
 */
type Variant = "today" | "wardrobe" | "idea"

function Tile({ id }: { id: string }) {
  return (
    <span className="h13-tile">
      <img src={`/images/home/g-${id}-cut-240.webp`} alt="" width={120} height={120} loading="lazy" decoding="async" />
    </span>
  )
}

function Chips({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <span className="h13-ph__chips">
      {items.map((c, i) => (
        <span key={c} className={i === active ? "is-on" : undefined}>
          {c}
        </span>
      ))}
    </span>
  )
}

function Screen({ variant }: { variant: Variant }) {
  if (variant === "wardrobe") {
    return (
      <>
        <span className="h13-ph__title">Your wardrobe</span>
        <span className="h13-ph__sub">{GARMENTS.length} pieces</span>
        <Chips items={["All", "Tops", "Bottoms", "Shoes"]} />
        <span className="h13-ph__grid h13-ph__grid--3">
          {GARMENTS.map((g) => (
            <Tile key={g.id} id={g.id} />
          ))}
        </span>
      </>
    )
  }
  if (variant === "idea") {
    return (
      <>
        <span className="h13-ph__title">Outfit ideas</span>
        <Chips items={["Client meeting", "Dinner", "Weekend"]} />
        <span className="h13-ph__card">
          <span className="h13-ph__grid">
            {["blazer", "oxford", "trousers", "loafers"].map((id) => (
              <Tile key={id} id={id} />
            ))}
          </span>
          <span className="h13-ph__why">
            <b>Why it works</b>
            Navy over pale blue looks sharp without a tie.
          </span>
        </span>
        <span className="h13-ph__actions">
          <span>Skip</span>
          <span className="is-on">Keep</span>
        </span>
      </>
    )
  }
  return (
    <>
      <span className="h13-ph__hello">Good morning</span>
      <span className="h13-ph__sub">Friday · Office, then dinner</span>
      <Chips items={["For you", "Work", "Casual", "Travel"]} />
      <span className="h13-ph__card">
        <span className="h13-ph__label">Today&apos;s outfit</span>
        <span className="h13-ph__grid">
          {["overshirt", "tee", "trousers", "sneakers"].map((id) => (
            <Tile key={id} id={id} />
          ))}
        </span>
        <span className="h13-ph__why">
          <b>Why it works</b>
          Olive and cream keep it relaxed but put together.
        </span>
      </span>
      <span className="h13-ph__actions">
        <span>Skip</span>
        <span className="is-on">Keep</span>
      </span>
    </>
  )
}

export function PhonePreview({ variant = "today", className }: { variant?: Variant; className?: string }) {
  return (
    <figure className={`h13-phone ${className ?? ""}`}>
      <span className="h13-ph" aria-hidden="true">
        <span className="h13-ph__notch" />
        <span className="h13-ph__status">
          <span>9:41</span>
          <span className="h13-ph__dots" />
        </span>
        <span className="h13-ph__body">
          <Screen variant={variant} />
        </span>
        <span className="h13-ph__tabs">
          <Home size={16} strokeWidth={1.75} />
          <Shirt size={16} strokeWidth={1.75} />
          <span className="h13-ph__plus">
            <Plus size={16} strokeWidth={2} />
          </span>
          <Sparkles size={16} strokeWidth={1.75} />
          <UserRound size={16} strokeWidth={1.75} />
        </span>
      </span>
      <figcaption className="h13-phone__cap">Design preview</figcaption>
    </figure>
  )
}
