import fs from "node:fs"
import path from "node:path"
import { SITE_CONFIG } from "@/lib/config"
import { posts } from "@/data/posts"
import { TOPICS } from "@/data/images"

export const dynamic = "force-static"

/** Guide and info pages, listed only when the page exists in this release. */
const PAGES: [string, string][] = [
  ["", "Home"],
  ["outfit-planner", "Outfit planner"],
  ["what-to-wear-to-work", "What to wear to work"],
  ["capsule-wardrobe", "Capsule wardrobe"],
  ["minimalist-wardrobe", "Minimalist wardrobe"],
  ["blog", "Blog"],
  ["ai-transparency", "AI transparency"],
  ["about", "About FitWardrobe and its founder"],
  ["support", "Support and contact"],
  ["privacy", "Privacy policy"],
  ["terms", "Terms"],
]

const exists = (slug: string) => fs.existsSync(path.join(process.cwd(), "src", "app", slug, "page.tsx"))

/** Plain-text summary for AI assistants (https://llmstxt.org), built from the site's own data. */
export function GET() {
  const base = SITE_CONFIG.landingUrl.replace(/\/$/, "")
  const url = (p: string) => `${base}/${p ? `${p}/` : ""}`

  const pages = PAGES.filter(([slug]) => exists(slug)).map(([slug, label]) => `- ${label}: ${url(slug)}`)
  const articles = TOPICS.flatMap((t) => {
    const list = posts.filter((p) => p.topic === t.name)
    if (list.length === 0) return []
    return [`### ${t.name}`, ...list.map((p) => `- ${p.h1}: ${url(`blog/${p.slug}`)}`), ""]
  })

  const text = [
    "# FitWardrobe",
    "",
    "> FitWardrobe is a digital wardrobe app and AI outfit planner. It suggests outfits only from the clothes you already own, each with a one-line reason. It is not available yet: it is coming soon on Android and the web.",
    "",
    "## What FitWardrobe is",
    "FitWardrobe is being built by Aryan Panwar, a solo founder in Meerut, India. You photograph your clothes and the AI tags each piece by type, colour, pattern, season and formality, and you can correct any tag. Choose an occasion, such as work or a job interview, or a piece you want to wear, and it suggests an outfit using only clothes you own, with a short reason, and learns from the outfits you keep or skip. It is free during early access. There is no shop and there are no ads.",
    "",
    "## Status",
    "- Not available yet. There is no public app, download or beta at the moment.",
    "- Coming soon on Android and the web first.",
    "- There is no iPhone app. iPhone users will be able to use the web version in the browser.",
    `- Early-access list: ${base}/#join`,
    "",
    "## How the AI works",
    "- The AI runs in the cloud. To tag a piece, a compressed photo is sent to Google's Gemini API; to suggest an outfit, the item details are sent to Groq. The AI features need an internet connection.",
    "- The wardrobe itself (photos, items and outfits) is stored on the user's device or in their browser. We don't keep copies on our servers.",
    `- More detail: ${url("ai-transparency")}`,
    "",
    "## Key pages",
    ...pages,
    `- Community: Telegram ${SITE_CONFIG.telegramUrl} and Discord ${SITE_CONFIG.discordUrl}`,
    "",
    "## Articles",
    ...articles,
    "## Contact",
    `- Email: ${SITE_CONFIG.contactEmail}`,
    `- Sitemap: ${base}/sitemap.xml`,
    "",
  ].join("\n")

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
