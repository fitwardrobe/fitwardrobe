import fs from "node:fs"
import path from "node:path"
import type { Post, PostFile } from "@/types/blog"
import { TOPICS } from "@/data/images"

/**
 * Blog posts, read at build time from src/content/posts/*.json (one file per post).
 * Server-only: never import this from a client component.
 */
const DIR = path.join(process.cwd(), "src", "content", "posts")

/** Lead posts on the blog index (the comparison posts that bring most search traffic). */
export const FEATURED = ["best-outfit-planning-apps-compared", "stylebook-alternative-android", "best-digital-wardrobe-apps"]

/** Order inside each topic: most-searched first (Google Search Console, 2025-2026). */
const PRIORITY = [
  "best-outfit-planning-apps-compared",
  "best-digital-wardrobe-apps",
  "stylebook-alternative-android",
  "free-ai-wardrobe-tools",
  "are-wardrobe-apps-worth-it",
  "what-is-a-digital-wardrobe",
  "disadvantages-digital-fashion",
  "how-to-use-outfit-app",
  "smart-wardrobe-vs-app",
  "what-is-a-capsule-wardrobe",
  "how-many-items-capsule-wardrobe",
  "333-wardrobe-method",
  "capsule-wardrobe-rules-explained",
  "capsule-wardrobe-essentials-checklist",
  "capsule-wardrobe-mistakes",
  "capsule-wardrobe-packing-guide",
  "how-to-build-a-capsule-wardrobe",
  "minimalist-wardrobe-essentials",
  "90-90-rule-decluttering",
  "fashion-outfit-rules-formulas",
  "70-30-wardrobe-rule",
  "7-rule-for-outfits",
  "obscure-fashion-rules-explained",
  "30-wear-rule-guide",
  "7-rs-sustainable-fashion",
  "rs-of-fashion-sustainable-planning",
]

function load(): Post[] {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
  const topicRank = new Map(TOPICS.map((t, i) => [t.name, i]))
  const rank = (slug: string) => {
    const i = PRIORITY.indexOf(slug)
    return i === -1 ? PRIORITY.length : i
  }
  return files
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as PostFile
      const words = data.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length
      return { ...data, words, readMinutes: Math.max(1, Math.round(words / 230)), featured: FEATURED.includes(data.slug) }
    })
    .sort((a, b) => (topicRank.get(a.topic) ?? 9) - (topicRank.get(b.topic) ?? 9) || rank(a.slug) - rank(b.slug))
}

export const posts: Post[] = load()

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

/** Related posts: the ones the post names, then others from the same topic. */
export function relatedTo(post: Post, count = 3): Post[] {
  const named = post.related.map(getPost).filter((p): p is Post => !!p && p.slug !== post.slug)
  const sameTopic = posts.filter((p) => p.topic === post.topic && p.slug !== post.slug && !named.includes(p))
  return [...named, ...sameTopic].slice(0, count)
}

/** "17 Feb 2026" */
export function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
}
