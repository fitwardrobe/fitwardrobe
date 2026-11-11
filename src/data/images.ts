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
  capsule: home("hero-capsule-guide", "70% 12%"),
  outfitPlanner: home("hero-outfit-planner-w", "75% 8%"),
  minimalist: blog("topic-capsule-v2", "55% 16%"),
  work: home("hero-work-guide", "66% 30%"),
} as const

/** Photographs inside guide pages (decorative to the text around them, so each has its own alt). */
export const INLINE_IMAGES = {
  workWeek: home("work-week"),
  tenPieces: home("minimalist-ten-pieces"),
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
  "Capsule & minimalism": blog("topic-capsule-v2"),
  "Wardrobe rules": blog("topic-rules"),
  Sustainability: blog("topic-sustainability"),
}

/** What each cover photo shows, for the alt text of the large image at the top of a post. */
export const COVER_ALT: Record<string, string> = {
  "post-best-digital-wardrobe-apps-v2": "An open wooden drawer with folded knitwear, rolled belts, socks and a watch, sorted into compartments",
  "post-best-outfit-planning-apps-compared-v2": "A camel trench coat, a green cardigan and a grey blazer hanging side by side on a brass rail",
  "post-disadvantages-digital-fashion": "A phone and a small brass padlock resting on a folded charcoal jumper on a wooden table",
  "post-free-ai-wardrobe-tools": "Two outfits laid out on a bed: a navy blazer with cream trousers and loafers, and an olive overshirt with jeans and white trainers",
  "post-smart-casual-vs-business-casual": "Two outfits side by side: a navy polo with chinos and white trainers, and a navy blazer with a blue shirt, grey trousers and loafers",
  "post-stylebook-alternative-android-v2": "A phone beside a cream cable-knit cardigan, tan ballet flats, a watch and gold earrings in warm sunlight",
  "post-what-is-a-digital-wardrobe": "Hands photographing a folded green jumper with a phone, surrounded by stacks of folded clothes",
  "post-work-capsule-wardrobe": "A clothes rail of work shirts, knitwear and trousers, with loafers, boots, trainers and a tan bag below",
  "topic-capsule-v2": "A small capsule wardrobe on a brass rail: a trench coat, blazer, shirts, knitwear and jeans, with three pairs of shoes",
  "topic-digital-wardrobe": "Clothes laid out in a neat grid of squares: shirts, knitwear, jeans, a blazer, trainers and a belt",
  "topic-rules": "Folded tops, trousers and jeans stacked on a table with loafers, trainers, boots and a tape measure",
  "topic-sustainability": "A denim jacket with a green patch on the elbow next to thread, scissors and a mending kit",
  "topic-wardrobe-apps": "A phone, a folded green overshirt and cream knit, brown loafers and a watch on a wooden table",
  "topic-work": "Five work outfits laid out in a row, each with a top, trousers or a skirt, and shoes",
}

/** Posts with their own cover photo. */
export const POST_COVERS: Partial<Record<string, HeroImage>> = {
  "best-outfit-planning-apps-compared": blog("post-best-outfit-planning-apps-compared-v2"),
  "stylebook-alternative-android": blog("post-stylebook-alternative-android-v2"),
  "what-is-a-digital-wardrobe": blog("post-what-is-a-digital-wardrobe"),
  "best-digital-wardrobe-apps": blog("post-best-digital-wardrobe-apps-v2"),
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
