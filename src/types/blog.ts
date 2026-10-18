import type { Topic } from "@/data/images"

export type { Topic }

export interface PostFAQ {
  q: string
  a: string
}

/** One post as stored in src/content/posts/<slug>.json */
export interface PostFile {
  slug: string
  /** Full SEO title, 60 characters or fewer (posts do not get the " | FitWardrobe" suffix) */
  title: string
  h1: string
  /** Meta description and card text */
  excerpt: string
  topic: Topic
  /** First published (ISO date). Never changes. */
  date: string
  /** Set only when the post was substantially rewritten (ISO date of that release). */
  updated?: string
  tldr: string
  /** Article HTML: h2 (with ids), h3, p, lists, tables (wrapped in .t13), blockquote, aside.note */
  body: string
  faq: PostFAQ[]
  related: string[]
}

export interface Post extends PostFile {
  readMinutes: number
  words: number
  featured: boolean
}
