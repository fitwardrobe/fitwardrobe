import type { HeroImage } from "@/components/site/page-hero"

/**
 * Every page hero and blog cover in one place. Files live in /public/images/home or
 * /public/images/blog as <name>-<width>.avif/.webp. Until a dedicated photo exists,
 * a page points at an existing homepage photo (marked "placeholder").
 */
const landscape = (name: string, position?: string, dir?: string): HeroImage => ({
  name,
  dir,
  widths: [768, 1280],
  width: 1536,
  height: 1024,
  position,
})

export const HERO_IMAGES = {
  blog: landscape("walnut-wardrobe", "60% 50%"),
  about: landscape("dressing-room", "35% 50%"), // placeholder for hero-about
  capsule: landscape("walnut-wardrobe", "30% 50%"), // placeholder for hero-capsule-guide
  outfitPlanner: landscape("hero-dusk", "62% 45%"), // placeholder for hero-outfit-planner
  minimalist: landscape("dressing-room", "25% 50%"), // placeholder for cover-topic-capsule
} as const

export type Topic = "Wardrobe apps" | "Digital wardrobe" | "Capsule & minimalism" | "Wardrobe rules" | "Sustainability"

export const TOPICS: { name: Topic; slug: string; description: string }[] = [
  { name: "Wardrobe apps", slug: "wardrobe-apps", description: "Wardrobe and outfit planner apps compared, from listed features and prices." },
  { name: "Digital wardrobe", slug: "digital-wardrobe", description: "What a digital wardrobe is, how to set one up, and its honest downsides." },
  { name: "Capsule & minimalism", slug: "capsule", description: "Building a smaller wardrobe that still covers your week." },
  { name: "Wardrobe rules", slug: "rules", description: "The 3-3-3 rule, the 70/30 rule and other formulas for getting dressed." },
  { name: "Sustainability", slug: "sustainability", description: "Wearing what you own for longer, and buying less but better." },
]

/** Cover per topic (placeholders until the topic covers are shot). */
export const TOPIC_COVERS: Record<Topic, HeroImage> = {
  "Wardrobe apps": landscape("walnut-wardrobe", "55% 50%"),
  "Digital wardrobe": landscape("dressing-room", "30% 50%"),
  "Capsule & minimalism": landscape("dressing-room", "20% 55%"),
  "Wardrobe rules": landscape("walnut-wardrobe", "20% 50%"),
  Sustainability: landscape("terrace-dusk", "70% 50%"),
}

/** Posts with their own cover photo (filled in when the post covers arrive). */
export const POST_COVERS: Partial<Record<string, HeroImage>> = {}

export function coverFor(slug: string, topic: Topic): HeroImage {
  return POST_COVERS[slug] ?? TOPIC_COVERS[topic]
}
