type PictureProps = {
  /** Base name inside `dir`, e.g. "hero" → hero-640.avif / hero-640.webp */
  name: string
  /** Folder under /public (default /images/home). */
  dir?: string
  widths: number[]
  sizes: string
  alt: string
  /** Intrinsic ratio of the source files (all home images are 1122 × 1402). */
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

/** AVIF with WebP fallback. The site is a static export, so next/image optimisation is off. */
export function Picture({
  name,
  dir = "/images/home",
  widths,
  sizes,
  alt,
  width = 1122,
  height = 1402,
  priority = false,
  className,
}: PictureProps) {
  const srcSet = (ext: string) => widths.map((w) => `${dir}/${name}-${w}.${ext} ${w}w`).join(", ")
  const fallback = `${dir}/${name}-${widths[widths.length - 1]}.webp`

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  )
}

export function GarmentImage({ id, alt = "" }: { id: string; alt?: string }) {
  return (
    <Picture
      name={`g-${id}`}
      widths={[360]}
      sizes="120px"
      alt={alt}
      className="fw-garment-img"
    />
  )
}
