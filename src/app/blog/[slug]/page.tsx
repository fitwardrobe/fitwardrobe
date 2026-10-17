import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, Plus, RefreshCw } from "lucide-react"
import { posts, getPost, relatedTo, formatDate } from "@/data/posts"
import { getBlogPostMetadata, getBreadcrumbSchema, BASE_URL } from "@/lib/seo"
import { ArticleView } from "@/components/blog/article-view"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { BlogCard, type BlogCardData } from "@/components/blog/blog-card"
import { PageHero } from "@/components/site/page-hero"
import { JoinBand } from "@/components/site/join-band"
import { Picture } from "@/components/home/picture"
import { LogoMark } from "@/components/site/logo"
import { coverFor, coverUrl, TOPICS } from "@/data/images"
import type { Post } from "@/types/blog"

interface Props {
  params: Promise<{ slug: string }>
}

// A quiet early-access card before the third H2: most readers never reach the end of a post.
const MID_CTA =
  '<aside class="mid-cta" aria-label="Early access"><p class="mid-cta__title">Plan outfits from the clothes you already own</p>' +
  "<p>FitWardrobe is coming soon to Android and the web. Free during early access.</p>" +
  '<a class="mid-cta__link" href="/#join" data-cta-location="blog_post_mid">Join early access</a></aside>'

function withMidArticleCta(html: string): string {
  let count = 0
  return html.replace(/<h2[\s>]/g, (m) => (++count === 3 ? MID_CTA + m : m))
}

function tocOf(html: string) {
  return [...html.matchAll(/<h2[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "’").trim(),
  }))
}

function card(p: Post): BlogCardData {
  return {
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
  }
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return getBlogPostMetadata(slug)
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `${BASE_URL}/blog/${post.slug}/`
  const topic = TOPICS.find((t) => t.name === post.topic)
  const toc = tocOf(post.body)
  const cover = coverFor(post.slug, post.topic)
  const related = relatedTo(post).map(card)

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.h1,
      name: post.title,
      description: post.excerpt,
      url,
      mainEntityOfPage: url,
      datePublished: post.date,
      ...(post.updated ? { dateModified: post.updated } : {}),
      wordCount: post.words,
      articleSection: post.topic,
      inLanguage: "en",
      image: `${BASE_URL}${coverUrl(cover)}`,
      author: { "@type": "Person", name: "Aryan Panwar", url: "https://aryanpanwar.in", jobTitle: "Founder, FitWardrobe" },
      publisher: { "@type": "Organization", name: "FitWardrobe", url: `${BASE_URL}/`, logo: { "@type": "ImageObject", url: `${BASE_URL}/brand/icon-512.png` } },
    },
    getBreadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog/" },
      { name: post.h1, item: `/blog/${post.slug}/` },
    ]),
  ]
  if (post.faq.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    })
  }

  const tocList = (
    <ol>
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`}>{t.text}</a>
        </li>
      ))}
      {post.faq.length ? (
        <li>
          <a href="#questions">Questions</a>
        </li>
      ) : null}
    </ol>
  )

  return (
    <div className="fw h13 p13">
      <ArticleView slug={post.slug} category={post.topic} />
      <ReadingProgress targetId="article" />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <PageHero
        compact
        eyebrow={post.topic}
        title={post.h1}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog/" },
          { label: post.topic, href: `/blog/?topic=${topic?.slug ?? ""}` },
        ]}
        meta={
          <>
            <span className="p13-chip">
              By{" "}
              <a href="https://aryanpanwar.in" rel="author noopener" target="_blank">
                Aryan Panwar
              </a>
            </span>
            <span className="p13-chip">
              <CalendarDays size={14} strokeWidth={1.75} aria-hidden="true" />
              Published <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {post.updated ? (
              <span className="p13-chip">
                <RefreshCw size={14} strokeWidth={1.75} aria-hidden="true" />
                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            ) : null}
            <span className="p13-chip">
              <Clock size={14} strokeWidth={1.75} aria-hidden="true" />
              {post.readMinutes} min read
            </span>
          </>
        }
      />

      <div className="fw-container a13-cover">
        <div className="a13-cover__frame">
          <Picture
            name={cover.name}
            dir={cover.dir}
            widths={cover.widths}
            sizes="(min-width: 1400px) 1320px, 100vw"
            width={cover.width}
            height={cover.height}
            alt=""
            priority
          />
        </div>
      </div>

      <div className="fw-container a13-layout">
        <article className="a13-main" id="article">
          {post.tldr ? (
            <div className="a13-answer">
              <span className="a13-answer__label">Quick answer</span>
              <p>{post.tldr}</p>
            </div>
          ) : null}

          {toc.length > 2 ? (
            <details className="a13-toc a13-toc--inline">
              <summary>On this page</summary>
              {tocList}
            </details>
          ) : null}

          <div className="prose13" dangerouslySetInnerHTML={{ __html: withMidArticleCta(post.body) }} />

          {post.faq.length ? (
            <section className="a13-faq" aria-labelledby="questions">
              <h2 id="questions" className="p13-h2">
                Questions
              </h2>
              <div className="h13-faq__list">
                {post.faq.map((f) => (
                  <details key={f.q} className="h13-faq__item">
                    <summary>
                      <span>{f.q}</span>
                      <Plus size={20} strokeWidth={1.25} aria-hidden="true" className="h13-faq__icon" />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <aside className="a13-author" aria-label="About the author">
            <span className="a13-author__mark" aria-hidden="true">
              <LogoMark />
            </span>
            <div>
              <p className="a13-author__name">Aryan Panwar</p>
              <p>
                Founder of FitWardrobe, a digital wardrobe app coming soon to Android and the web. He writes these guides
                from public sources and checks the facts against them; comparisons use each app&apos;s own listings.
              </p>
              <p className="a13-author__links">
                <Link href="/about/">About FitWardrobe</Link>
                <a href="https://aryanpanwar.in" rel="author noopener" target="_blank">
                  aryanpanwar.in
                </a>
              </p>
            </div>
          </aside>
        </article>

        <aside className="a13-side" aria-label="On this page">
          <div className="a13-side__sticky">
            {toc.length > 2 ? (
              <details className="a13-toc" open>
                <summary>On this page</summary>
                {tocList}
              </details>
            ) : null}
            <div className="a13-sidecard">
              <p className="a13-sidecard__title">Outfits from what you own</p>
              <p>FitWardrobe plans outfits from your own clothes, with a reason for each. Coming soon; free in early access.</p>
              <Link href="#join-blog_post_end" className="h13-btn h13-btn--gold">
                Join early access
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section className="a13-related" aria-labelledby="keep-reading">
          <div className="fw-container">
            <div className="p13-head">
              <h2 id="keep-reading" className="p13-h2">
                Keep reading
              </h2>
              <p className="h13-lead">
                More on {post.topic.toLowerCase()} from the <Link href="/blog/">FitWardrobe guides</Link>.
              </p>
            </div>
            <div className="b13-grid">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <JoinBand location="blog_post_end" />
    </div>
  )
}
