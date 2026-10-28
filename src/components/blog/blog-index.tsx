"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { track } from "@/lib/analytics"
import { TOPICS, type Topic } from "@/data/images"
import { BlogCard, type BlogCardData } from "@/components/blog/blog-card"

type Filter = Topic | "All"

/**
 * Blog index: featured comparison posts, then every post grouped by topic.
 * Topic chips and search filter client-side; only card data is sent to the browser.
 */
export function BlogIndex({ posts }: { posts: BlogCardData[] }) {
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState<Filter>("All")

  // #topic-<slug> (linked from article headers) preselects a topic; ?topic=<slug> still works for old links.
  useEffect(() => {
    const hash = window.location.hash.match(/^#topic-(.+)$/)?.[1]
    const t = hash ?? new URLSearchParams(window.location.search).get("topic")
    const match = TOPICS.find((x) => x.slug === t)
    if (match) setTopic(match.name)
  }, [])

  // Report a search once the visitor pauses typing (GA4 recommended "search" event).
  useEffect(() => {
    const term = query.trim()
    if (term.length < 3) return
    const t = setTimeout(() => track("search", { search_term: term.toLowerCase(), page_type: "blog_index" }), 1200)
    return () => clearTimeout(t)
  }, [query])

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (topic === "All" || p.topic === topic) &&
          (!q || p.title.toLowerCase().includes(q) || p.h1.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
      ),
    [posts, topic, q],
  )
  const browsing = topic === "All" && !q
  const featured = posts.filter((p) => p.featured)

  const choose = (t: Filter) => {
    setTopic(t)
    track("blog_filter", { filter_value: t })
  }

  return (
    <div className="fw-container">
      {browsing && featured.length > 0 ? (
        <section aria-labelledby="start-here" className="b13-start">
          <div className="p13-head">
            <h2 id="start-here" className="p13-h2">
              Start here
            </h2>
            <p className="h13-lead">The comparisons most readers come for: which wardrobe app suits you, and what to use on Android.</p>
          </div>
          <div className="b13-featured">
            {featured.map((p, i) => (
              <BlogCard key={p.slug} post={p} sizes={i === 0 ? "(min-width: 1024px) 56vw, 92vw" : "(min-width: 1024px) 40vw, 92vw"} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="b13-toolbar" id="all-guides">
        <div className="b13-chips" role="group" aria-label="Filter by topic">
          {(["All", ...TOPICS.map((t) => t.name)] as Filter[]).map((t) => (
            <button key={t} type="button" aria-pressed={topic === t} onClick={() => choose(t)}>
              {t === "All" ? "All guides" : t}
            </button>
          ))}
        </div>
        <label className="b13-search">
          <span className="fw-sr-only">Search the guides</span>
          <Search size={17} strokeWidth={1.75} aria-hidden="true" />
          <input type="search" placeholder="Search the guides" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>

      <div aria-live="polite">
        {browsing ? (
          TOPICS.map((t) => {
            const list = posts.filter((p) => p.topic === t.name && !p.featured)
            if (!list.length) return null
            return (
              <section key={t.slug} className="b13-topic" aria-labelledby={`topic-${t.slug}`}>
                <div className="b13-topic__head">
                  <h2 id={`topic-${t.slug}`} className="b13-topic__title">
                    {t.name}
                  </h2>
                  <p className="b13-topic__desc">{t.description}</p>
                </div>
                <div className="b13-grid">
                  {list.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            )
          })
        ) : filtered.length ? (
          <div className="b13-grid">
            {filtered.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <div className="b13-empty">
            <p>No guides match that search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setTopic("All")
              }}
            >
              Show all guides
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
