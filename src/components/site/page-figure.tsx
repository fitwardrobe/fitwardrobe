import { Picture } from "@/components/home/picture"
import type { HeroImage } from "@/components/site/page-hero"

/** A rounded photograph inside a guide page, with an optional caption. */
export function PageFigure({ image, alt, caption }: { image: HeroImage; alt: string; caption?: string }) {
  return (
    <figure className="fw-page__figure">
      <Picture
        name={image.name}
        dir={image.dir}
        widths={image.widths}
        sizes="(min-width: 960px) 880px, 100vw"
        width={image.width}
        height={image.height}
        alt={alt}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
