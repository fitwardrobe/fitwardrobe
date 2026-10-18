import fs from "node:fs"
import path from "node:path"
import { test, expect, SITE, isLocal, sitemapPaths } from "./fixtures"

type Redirect = { source: string; destination: string; permanent?: boolean }
const allRedirects: Redirect[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "vercel.json"), "utf8")).redirects ?? []
/** Plain one-to-one redirects; pattern rules (":slug") are checked with real examples below. */
const redirects = allRedirects.filter((r) => !/[:(]/.test(r.source))
const PATTERN_EXAMPLES = [
  ["/blog/stylebook-alternative-android.html", "/blog/stylebook-alternative-android/"],
  ["/about.html", "/about/"],
  ["/blog/7-rs-sustainable-fashion/what-is-a-capsule-wardrobe.html", "/blog/what-is-a-capsule-wardrobe/"],
]

test("robots.txt points at the canonical sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt")
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  expect(body).not.toMatch(/Disallow:\s*\/\s*$/m)
})

test("llms.txt lists only pages that exist, on the canonical host", async ({ request }) => {
  const res = await request.get("/llms.txt")
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain("# FitWardrobe")
  expect(body).not.toContain("www.fitwardrobe.me")
  expect(body).not.toMatch(/personal AI stylist/i)
  const listed = [...body.matchAll(new RegExp(`${SITE.replace(/\./g, "\\.")}(/[^\\s#]*)`, "g"))].map((m) => m[1])
  expect(listed.length).toBeGreaterThan(10)
  const inSitemap = new Set(await sitemapPaths(request))
  for (const p of listed) {
    if (p === "/sitemap.xml") continue
    expect.soft(inSitemap.has(p), `llms.txt link ${p} is a live page`).toBe(true)
  }
})

test("security.txt is served with the canonical address", async ({ request }) => {
  const res = await request.get("/.well-known/security.txt")
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain("Contact: mailto:hello@fitwardrobe.me")
  expect(body).toContain(`Canonical: ${SITE}/.well-known/security.txt`)
})

test("unknown pages return the 404 page", async ({ request }) => {
  const res = await request.get("/this-page-does-not-exist-e2e/")
  expect(res.status()).toBe(404)
})

test("every redirect lands on a live page", async ({ request }) => {
  expect(redirects.length).toBeGreaterThan(0)
  const live = new Set(await sitemapPaths(request))
  for (const r of redirects) {
    const dest = r.destination.split("#")[0]
    expect.soft(live.has(dest) || dest === "/", `${r.source} -> ${dest} is in the sitemap`).toBe(true)
    if (!isLocal) {
      // On the live site, follow the chain: every hop must be permanent and it must end on the
      // destination with a 200. Vercel adds the trailing slash first, so some chains take two hops.
      let url = r.source
      let hops = 0
      let res = await request.get(url, { maxRedirects: 0 })
      while ([301, 302, 307, 308].includes(res.status()) && hops < 4) {
        expect.soft([301, 308], `${r.source}: hop ${hops + 1} (${url}) is permanent`).toContain(res.status())
        url = (res.headers()["location"] ?? "").replace(SITE, "")
        hops++
        res = await request.get(url, { maxRedirects: 0 })
      }
      expect.soft(hops, `${r.source} redirects at least once`).toBeGreaterThan(0)
      expect.soft(hops, `${r.source} takes at most two hops`).toBeLessThanOrEqual(2)
      expect.soft(url, `${r.source} ends on ${r.destination}`).toBe(r.destination)
      expect.soft(res.status(), `${r.source} ends on a live page`).toBe(200)
    }
  }
})

test("legacy .html addresses redirect to the clean URL (live site only)", async ({ request }) => {
  test.skip(isLocal, "Vercel redirects only exist on the deployed site")
  for (const [from, to] of PATTERN_EXAMPLES) {
    const res = await request.get(from, { maxRedirects: 0 })
    expect.soft([301, 308], `${from} answers with a permanent redirect`).toContain(res.status())
    expect.soft((res.headers()["location"] ?? "").replace(SITE, ""), `${from} redirects to ${to}`).toBe(to)
  }
})

test("www and http variants redirect to https://fitwardrobe.me (live site only)", async ({ request }) => {
  test.skip(isLocal, "host redirects only exist on the deployed site")
  for (const from of ["https://www.fitwardrobe.me/", "http://fitwardrobe.me/"]) {
    const res = await request.get(from, { maxRedirects: 0 })
    expect.soft([301, 307, 308], `${from} redirects`).toContain(res.status())
    expect.soft(res.headers()["location"] ?? "", `${from} goes to the canonical host`).toMatch(/^https:\/\/fitwardrobe\.me\/?$/)
  }
})
