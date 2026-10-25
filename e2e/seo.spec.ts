import { test, expect, SITE, sitemapPaths, decode } from "./fixtures"

test("every sitemap page has correct SEO basics on the canonical host", async ({ request }) => {
  const paths = await sitemapPaths(request)
  const titles = new Map<string, string>()

  for (const path of paths) {
    const res = await request.get(path)
    expect.soft(res.status(), `${path} status`).toBe(200)
    const html = await res.text()

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
    expect.soft(canonical, `${path} canonical`).toBe(`${SITE}${path}`)

    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "")
    expect.soft(title.length, `${path} title "${title}"`).toBeGreaterThan(10)
    expect.soft(title.length, `${path} title "${title}" is 60 characters or fewer`).toBeLessThanOrEqual(60)
    if (titles.has(title)) expect.soft(title, `${path} duplicates the title of ${titles.get(title)}`).toBe("unique")
    titles.set(title, path)

    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")
    expect.soft(description.length, `${path} description`).toBeGreaterThan(50)
    expect.soft(description.length, `${path} description is 155 characters or fewer`).toBeLessThanOrEqual(155)

    const h1s = html.match(/<h1[\s>]/g) ?? []
    expect.soft(h1s.length, `${path} has exactly one h1`).toBe(1)

    expect.soft(html, `${path} declares the page language`).toMatch(/<html[^>]*lang="en/)
    expect.soft(html.includes("www.fitwardrobe.me"), `${path} has no www addresses`).toBe(false)
    expect.soft(/fitwardrobe\.com(?!\w)/.test(html.replace(/hello@fitwardrobe\.me/g, "")), `${path} never mentions fitwardrobe.com`).toBe(false)

    for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      let parsed: unknown = null
      try {
        parsed = JSON.parse(json)
      } catch {
        parsed = null
      }
      expect.soft(parsed, `${path} JSON-LD parses`).not.toBeNull()
      expect.soft(json.includes("www.fitwardrobe.me"), `${path} JSON-LD uses the canonical host`).toBe(false)
    }
  }
})

test("posts are absolute titles without the site suffix", async ({ request }) => {
  const paths = (await sitemapPaths(request)).filter((p) => p.startsWith("/blog/") && p !== "/blog/")
  expect(paths.length).toBeGreaterThan(5)
  for (const path of paths) {
    const html = await (await request.get(path)).text()
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "")
    expect.soft(title.endsWith("| FitWardrobe"), `${path} title "${title}"`).toBe(false)
  }
})
