import { posts, formatDate } from "@/data/posts"
import { BlogIndex } from "@/components/blog/blog-index"
import type { BlogCardData } from "@/components/blog/blog-card"
import { PageHero } from "@/components/site/page-hero"
import { JoinBand } from "@/components/site/join-band"
import { HERO_IMAGES } from "@/data/images"
import { getBreadcrumbSchema } from "@/lib/seo"

// Server component: only the fields the cards need are sent to the browser.
const cards: BlogCardData[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  h1: p.h1,
  excerpt: p.excerpt,
  topic: p.topic,
  date: p.date,
  dateLabel: formatDate(p.date),
  updated: p.updated,
  updatedLabel: p.updated ? formatDate(p.updated) : undefined,
  readMinutes: p.readMinutes,
  featured: p.featured,
}))

export default function BlogPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog/" },
  ])
  return (
    <div className="fw h13 p13">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero
        eyebrow="The FitWardrobe guides"
        title="Wardrobe guides: apps, capsules and outfit rules."
        lead="Plain answers on choosing a wardrobe app, building a capsule wardrobe and the rules that make getting dressed easier. Written for anyone, anywhere."
        image={HERO_IMAGES.blog}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        meta={
          <>
            <span className="p13-chip">{posts.length} guides</span>
            <span className="p13-chip">5 topics</span>
            <span className="p13-chip">By Aryan Panwar</span>
          </>
        }
      >
        <a href="#start-here" className="h13-btn h13-btn--gold">Start with the comparisons</a>
        <a href="#all-guides" className="h13-btn h13-btn--line">Browse by topic</a>
      </PageHero>
      <div className="b13-page">
        <BlogIndex posts={cards} />
      </div>
      <JoinBand location="blog_index" />
    </div>
  )
}
