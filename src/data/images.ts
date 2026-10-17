import type { HeroImage } from "@/components/site/page-hero"

/**
 * Every page hero and blog cover in one place. Files live in /public/images/home or
 * /public/images/blog as <name>-<width>.avif/.webp (480, 768 and 1280 wide for the
 * October 2026 set; 768, 1280 and 1536 for the homepage originals).
 */
const landscape = (name: string, position?: string, dir?: string, widths: number[] = [768, 1280]): HeroImage => ({
  name,
  dir,
  widths,
  width: 1536,
  height: 1024,
  position,
})
const SET = [480, 768, 1280]
const blog = (name: string, position?: string) => landscape(name, position, "/images/blog", SET)
const home = (name: string, position?: string) => landscape(name, position, "/images/home", SET)

export const HERO_IMAGES = {
  blog: landscape("walnut-wardrobe", "60% 50%"),
  about: home("hero-about", "60% 50%"),
  capsule: home("hero-capsule-guide", "62% 40%"),
  outfitPlanner: home("hero-outfit-planner", "62% 45%"),
  minimalist: blog("topic-capsule", "55% 50%"),
} as const

export type Topic = "Wardrobe apps" | "Digital wardrobe" | "Capsule & minimalism" | "Wardrobe rules" | "Sustainability"

export const TOPICS: { name: Topic; slug: string; description: string }[] = [
  { name: "Wardrobe apps", slug: "wardrobe-apps", description: "Wardrobe and outfit planner apps compared, from listed features and prices." },
  { name: "Digital wardrobe", slug: "digital-wardrobe", description: "What a digital wardrobe is, how to set one up, and its honest downsides." },
  { name: "Capsule & minimalism", slug: "capsule", description: "Building a smaller wardrobe that still covers your week." },
  { name: "Wardrobe rules", slug: "rules", description: "The 3-3-3 rule, the 70/30 rule and other formulas for getting dressed." },
  { name: "Sustainability", slug: "sustainability", description: "Wearing what you own for longer, and buying less but better." },
]

export const TOPIC_COVERS: Record<Topic, HeroImage> = {
  "Wardrobe apps": blog("topic-wardrobe-apps"),
  "Digital wardrobe": blog("topic-digital-wardrobe"),
  "Capsule & minimalism": blog("topic-capsule"),
  "Wardrobe rules": blog("topic-rules"),
  Sustainability: blog("topic-sustainability"),
}

/** Posts with their own cover photo. */
export const POST_COVERS: Partial<Record<string, HeroImage>> = {
  "best-outfit-planning-apps-compared": blog("post-best-outfit-planning-apps-compared"),
  "stylebook-alternative-android": blog("post-stylebook-alternative-android"),
  "what-is-a-digital-wardrobe": blog("post-what-is-a-digital-wardrobe"),
  "best-digital-wardrobe-apps": blog("post-best-digital-wardrobe-apps"),
  "disadvantages-digital-fashion": blog("post-disadvantages-digital-fashion"),
  "free-ai-wardrobe-tools": blog("post-free-ai-wardrobe-tools"),
}

export function coverFor(slug: string, topic: Topic): HeroImage {
  return POST_COVERS[slug] ?? TOPIC_COVERS[topic]
}

/** Absolute path of a cover's 1280px WebP, for social cards and structured data. */
export function coverUrl(img: HeroImage): string {
  return `${img.dir ?? "/images/home"}/${img.name}-1280.webp`
}
