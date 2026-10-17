import Link from "next/link"
import { Picture } from "@/components/home/picture"
import { coverFor, type Topic } from "@/data/images"

export type BlogCardData = {
  slug: string
  title: string
  h1: string
  excerpt: string
  topic: Topic
  date: string
  dateLabel: string
  updated?: string
  updatedLabel?: string
  readMinutes: number
  featured: boolean
}

/** Post card used on the blog index, at the end of posts and on guide pages. */
export function BlogCard({ post, sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" }: { post: BlogCardData; sizes?: string }) {
  const cover = coverFor(post.slug, post.topic)
  return (
    <Link href={`/blog/${post.slug}/`} className="b13-card">
      <span className="b13-card__img">
        <Picture
          name={cover.name}
          dir={cover.dir}
          widths={cover.widths}
          sizes={sizes}
          width={cover.width}
          height={cover.height}
          alt=""
          className="b13-card__imgel"
        />
      </span>
      <span className="b13-card__body">
        <span className="b13-card__topic">{post.topic}</span>
        <span className="b13-card__title">{post.h1}</span>
        <span className="b13-card__excerpt">{post.excerpt}</span>
        <span className="b13-card__meta">
          {post.updated ? (
            <span className="b13-card__updated">Updated {post.updatedLabel}</span>
          ) : (
            <time dateTime={post.date}>{post.dateLabel}</time>
          )}
          <span>{post.readMinutes} min read</span>
        </span>
      </span>
    </Link>
  )
}
