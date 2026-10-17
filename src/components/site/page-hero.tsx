import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { Picture } from "@/components/home/picture"

export type HeroImage = {
  name: string
  dir?: string
  widths: number[]
  width: number
  height: number
  /** CSS object-position, e.g. "70% 40%" */
  position?: string
}

export type Crumb = { label: string; href?: string }

/**
 * Dark page header used by every inner page, in the homepage style: gold eyebrow,
 * ivory serif headline, optional photograph on the right (below the text on phones).
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  meta,
  children,
  compact = false,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  image?: HeroImage
  crumbs?: Crumb[]
  meta?: ReactNode
  children?: ReactNode
  compact?: boolean
}) {
  return (
    <section className={`p13-hero${image ? " p13-hero--photo" : ""}${compact ? " p13-hero--compact" : ""}`}>
      {image ? (
        <div className="p13-hero__bg" style={image.position ? ({ "--p13-pos": image.position } as CSSProperties) : undefined}>
          <Picture
            name={image.name}
            dir={image.dir}
            widths={image.widths}
            sizes="100vw"
            width={image.width}
            height={image.height}
            alt=""
            priority
          />
        </div>
      ) : null}
      <div className="fw-container p13-hero__inner">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="p13-crumbs">
            <ol>
              {crumbs.map((c) => (
                <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="h13-eyebrow">{eyebrow}</p>
        <h1 className="p13-hero__title">{title}</h1>
        {lead ? <p className="p13-hero__lead">{lead}</p> : null}
        {meta ? <div className="p13-hero__meta">{meta}</div> : null}
        {children ? <div className="p13-hero__actions">{children}</div> : null}
      </div>
    </section>
  )
}
