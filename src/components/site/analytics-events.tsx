"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useReportWebVitals } from "next/web-vitals"
import { pageType, track } from "@/lib/analytics"

const COMMUNITY: Record<string, string> = {
  "t.me": "telegram",
  "telegram.me": "telegram",
  "instagram.com": "instagram",
  "x.com": "x",
  "twitter.com": "x",
  "github.com": "github",
  "discord.gg": "discord",
  "discord.com": "discord",
}

/** Where on the page an element sits, for the cta_location parameter. */
function locationOf(el: Element): string {
  const explicit = el.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation
  if (explicit) return explicit
  if (el.closest(".fw-header, .fw-menu")) return "header"
  if (el.closest(".fw-sticky")) return "sticky"
  if (el.closest(".fw-footer")) return "footer"
  if (el.closest(".fw-hero")) return "hero"
  if (el.closest("#join")) return "join"
  if (el.closest(".blog-cta")) return "blog_post_end"
  if (el.closest(".fw-page__cta")) return "guide_page_end"
  if (el.closest(".blog-content, .blog-wrapper")) return "blog_post_body"
  return "body"
}

/**
 * Site-wide GA4 events through delegated listeners, so markup only needs data attributes
 * where the default guess isn't specific enough. Mounted once in the root layout.
 */
export function AnalyticsEvents() {
  const pathname = usePathname()
  const type = pageType(pathname)

  // Real-user Core Web Vitals (CLS sent x1000 so it can be summed as an integer metric).
  useReportWebVitals((m) => {
    track("web_vitals", {
      metric_name: m.name,
      metric_value: Math.round(m.name === "CLS" ? m.value * 1000 : m.value),
      metric_rating: m.rating,
      page_type: pageType(window.location.pathname),
      non_interaction: true,
    })
  })

  // Content group for client-side navigations (first load is set in the inline config).
  useEffect(() => {
    window.gtag?.("set", { content_group: type, page_type: type })
    if (document.title.toLowerCase().includes("not found") || document.querySelector(".fw-404-mark")) {
      track("page_not_found", { page_path: pathname })
    }
  }, [pathname, type])

  // Clicks: CTAs, community links, email links, homepage guides.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a")
      if (!a) return
      const href = a.getAttribute("href") || ""
      const text = (a.textContent || "").trim().replace(/\s+/g, " ")
      const where = locationOf(a)

      if (href.startsWith("mailto:")) {
        // Only the mailbox name (hello, privacy): GA4 redacts full email addresses anyway.
        const mailbox = href.slice(7).split("?")[0].split("@")[0]
        track("contact_click", { contact_method: `email_${mailbox}`, cta_location: where })
        return
      }
      let host = ""
      try {
        host = new URL(href, window.location.href).hostname.replace(/^www\./, "")
      } catch {
        /* not a URL */
      }
      if (COMMUNITY[host]) {
        track("join_community", { platform: COMMUNITY[host], cta_location: where })
        return
      }
      if (a.matches(".fw-guide, .h13-guide")) {
        track("guide_click", { guide_title: text, link_url: href })
        return
      }
      const isCta =
        href.includes("#join") || a.matches(".fw-btn, .btn, .fw-link, [data-cta]") || a.closest(".fw-page__cta, .blog-cta")
      if (isCta) track("cta_click", { cta_text: text, cta_location: where, link_url: href, page_type: type })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [type])

  // FAQ opens (native <details> on the homepage).
  useEffect(() => {
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement
      if (d.tagName !== "DETAILS" || !d.open) return
      const q = d.querySelector("summary")?.textContent?.trim()
      track("faq_open", { faq_question: q, page_type: type })
    }
    document.addEventListener("toggle", onToggle, { capture: true })
    return () => document.removeEventListener("toggle", onToggle, { capture: true })
  }, [type])

  // Scroll depth 25 / 50 / 75 / 100, once each per page view.
  useEffect(() => {
    const sent = new Set<number>()
    let ticking = false
    const check = () => {
      ticking = false
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = (window.scrollY / max) * 100
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark - 1 && !sent.has(mark)) {
          sent.add(mark)
          track("scroll_depth", { percent_scrolled: mark, page_type: type })
        }
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(check)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname, type])

  // Which homepage sections are actually seen: counted when a section crosses the middle
  // of the screen (a % threshold never fires for sections taller than the viewport).
  useEffect(() => {
    if (type !== "home" || !("IntersectionObserver" in window)) return
    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const id = (en.target as HTMLElement).id
          if (en.isIntersecting && id && !seen.has(id)) {
            seen.add(id)
            track("section_view", { section_name: id, non_interaction: true })
            io.unobserve(en.target)
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [type])

  return null
}
