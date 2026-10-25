import fs from "node:fs"
import path from "node:path"
import type { PostFile } from "../src/types/blog"
import { test, expect, SITE, decode } from "./fixtures"

/**
 * Checks every published post against its source file in src/content/posts, so a blog wave can be
 * verified locally before release and on the live site after it (E2E_BASE_URL=https://fitwardrobe.me).
 * Set E2E_EXTERNAL=1 to also check that the outside sources the posts cite are still reachable.
 */
const DIR = path.join(process.cwd(), "src", "content", "posts")
const posts: PostFile[] = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
const slugs = new Set(posts.map((p) => p.slug))

/** Today's date as YYYY-MM-DD on this machine. */
const today = new Date().toLocaleDateString("en-CA")

const text = (html: string) => decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
const hrefs = (html: string) => [...html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>/g)].map((m) => ({ href: m[1], tag: m[0] }))
const schemas = (html: string): Record<string, unknown>[] =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))

test.describe("each post page matches its source file", () => {
  for (const post of posts) {
    test(post.slug, async ({ request }) => {
      const url = `/blog/${post.slug}/`
      const res = await request.get(url)
      expect(res.status(), `${url} status`).toBe(200)
      const html = await res.text()
      const page = decode(html)

      expect.soft(decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""), "title").toBe(post.title)
      expect.soft(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ""), "h1").toBe(post.h1)
      expect.soft(decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ""), "meta description").toBe(post.excerpt)
      expect.soft(page.includes(post.tldr), "quick answer is on the page").toBe(true)

      for (const [, id] of post.body.matchAll(/<h2[^>]*\sid="([^"]+)"/g)) {
        expect.soft(html.includes(`id="${id}"`), `section #${id} is on the page`).toBe(true)
      }
      for (const f of post.faq) {
        expect.soft(page.includes(f.q), `FAQ question "${f.q}" is on the page`).toBe(true)
        expect.soft(page.includes(f.a), `FAQ answer to "${f.q}" is on the page`).toBe(true)
      }

      const all = schemas(html)
      const article = all.find((s) => s["@type"] === "BlogPosting")
      expect.soft(article?.url, "BlogPosting url").toBe(`${SITE}${url}`)
      expect.soft(article?.datePublished, "BlogPosting datePublished").toBe(post.date)
      expect.soft(article?.dateModified, "BlogPosting dateModified").toBe(post.updated)
      const faq = all.find((s) => s["@type"] === "FAQPage") as { mainEntity?: unknown[] } | undefined
      expect.soft(faq?.mainEntity?.length ?? 0, "FAQPage questions").toBe(post.faq.length)

      expect.soft(html.includes(`Published <time dateTime="${post.date}">`), "published date is shown").toBe(true)
      expect.soft(/Updated <time dateTime=/.test(html), "Updated label only when the post was rewritten").toBe(Boolean(post.updated))
      if (post.updated) expect.soft(html.includes(`Updated <time dateTime="${post.updated}">`), "updated date is shown").toBe(true)

      for (const slug of post.related) {
        expect.soft(html.includes(`href="/blog/${slug}/"`), `related post ${slug} is linked`).toBe(true)
      }
    })
  }
})

test("updated dates are honest and match the sitemap", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text()
  const lastmod = new Map([...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2].slice(0, 10)]))

  for (const post of posts) {
    // Publish dates never move; an Updated date is the day its wave went live, so it can't be in the future.
    if (post.updated) {
      expect.soft(post.updated > post.date, `${post.slug}: updated ${post.updated} is after published ${post.date}`).toBe(true)
      expect.soft(post.updated <= today, `${post.slug}: updated ${post.updated} is not later than today (${today}); release on that date or change it`).toBe(true)
    }
    expect.soft(lastmod.get(`${SITE}/blog/${post.slug}/`), `${post.slug} sitemap lastmod`).toBe(post.updated ?? post.date)
  }
})

test("posts link only to posts that exist, in the canonical form", () => {
  for (const post of posts) {
    for (const slug of post.related) {
      expect.soft(slugs.has(slug) && slug !== post.slug, `${post.slug}: related "${slug}" is another existing post`).toBe(true)
    }
    for (const { href } of hrefs(post.body + post.faq.map((f) => f.a).join(" "))) {
      if (/^https?:/.test(href)) {
        expect.soft(href.includes("fitwardrobe.me"), `${post.slug}: own pages use relative links, not ${href}`).toBe(false)
        continue
      }
      const [pathname] = href.split("#")
      if (!pathname) continue
      expect.soft(pathname.endsWith("/"), `${post.slug}: ${href} ends with a slash`).toBe(true)
      const target = pathname.match(/^\/blog\/([^/]+)\/$/)?.[1]
      if (target) expect.soft(slugs.has(target), `${post.slug}: links to existing post ${target}`).toBe(true)
    }
  }
})

test("outside sources use https and open safely in a new tab", () => {
  for (const post of posts) {
    for (const { href, tag } of hrefs(post.body)) {
      if (!/^https?:/.test(href)) continue
      expect.soft(href.startsWith("https://"), `${post.slug}: ${href} uses https`).toBe(true)
      expect.soft(/target="_blank"/.test(tag) && /rel="[^"]*noopener/.test(tag), `${post.slug}: ${href} opens in a new tab with noopener`).toBe(true)
    }
  }
})

test("outside sources are still reachable at the linked address", async ({ request }) => {
  test.skip(!process.env.E2E_EXTERNAL, "set E2E_EXTERNAL=1 to check outside sources")
  test.setTimeout(300_000)
  const sources = new Map<string, string>() // url -> first post that cites it
  for (const post of posts) {
    for (const { href } of hrefs(post.body)) if (href.startsWith("https://") && !sources.has(href)) sources.set(href, post.slug)
  }
  const headers = { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" }
  for (const [url, slug] of sources) {
    const res = await request.get(url, { headers, maxRedirects: 0, failOnStatusCode: false, timeout: 30_000 }).catch(() => null)
    const status = res?.status() ?? 0
    // Some publishers refuse automated requests; those need a check in a real browser, not a failing build.
    if ([401, 403, 429].includes(status)) {
      test.info().annotations.push({ type: "blocked", description: `${status} ${url} (${slug}): check in a browser` })
      continue
    }
    // A redirect still reaches the source (store slugs, www hosts, sign-in bounces), so it's a note, not a failure.
    if (status >= 300 && status < 400) {
      test.info().annotations.push({ type: "redirect", description: `${url} (${slug}) -> ${res?.headers().location}` })
      continue
    }
    expect.soft(status, `${url} (${slug})`).toBe(200)
  }
})
