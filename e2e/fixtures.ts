import { test as base, expect, type APIRequestContext, type Page } from "@playwright/test"

/** The canonical origin every canonical tag, sitemap entry and structured-data URL must use. */
export const SITE = "https://fitwardrobe.me"

/** True when the tests run against the local static export rather than the live site. */
export const isLocal = !process.env.E2E_BASE_URL

/** Analytics and tracking hosts. Tests never let these through, so test runs are never counted. */
const TRACKERS = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|clarity\.ms|c\.bing\.com|\/_vercel\/insights/

/** Blocks trackers and the Google Form endpoint (nothing is ever submitted to the real form). */
export async function guardNetwork(page: Page) {
  await page.route(TRACKERS, (route) => route.abort())
  await page.route(/docs\.google\.com\/forms\//, (route) => route.fulfill({ status: 200, body: "" }))
}

export const test = base.extend<{ consent: "denied" | "unset" }>({
  consent: ["denied", { option: true }],
  page: async ({ page, consent }, use) => {
    await guardNetwork(page)
    if (consent === "denied") {
      await page.addInitScript(() => {
        try {
          localStorage.setItem("fw-consent", "denied")
        } catch {}
      })
    }
    await use(page)
  },
})

export { expect }

/** Every page path listed in the sitemap, as a path on the site under test (for example "/blog/"). */
export async function sitemapPaths(request: APIRequestContext): Promise<string[]> {
  const res = await request.get("/sitemap.xml")
  expect(res.status()).toBe(200)
  const xml = await res.text()
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  expect(locs.length).toBeGreaterThan(10)
  for (const loc of locs) expect(loc.startsWith(`${SITE}/`), `sitemap entry on the canonical host: ${loc}`).toBe(true)
  return locs.map((loc) => new URL(loc).pathname)
}

/** Decodes the HTML entities React writes into text and attributes. */
export const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")

/**
 * Brings every image into view (including ones inside sideways-scrolling rows, which lazy-load only
 * when visible), waits for it, and returns the address of any image that failed to load.
 */
export async function brokenImages(page: Page): Promise<string[]> {
  const images = page.locator("img")
  const count = await images.count()
  for (let i = 0; i < count; i++) {
    await images.nth(i).evaluate(async (img: HTMLImageElement) => {
      if (!img.checkVisibility()) return // hidden by the layout at this size, so never requested
      img.scrollIntoView({ block: "center", inline: "center" })
      if (img.complete && img.naturalWidth > 0) return
      await new Promise<void>((resolve) => {
        const done = () => resolve()
        img.addEventListener("load", done, { once: true })
        img.addEventListener("error", done, { once: true })
        setTimeout(done, 8000)
      })
    })
  }
  return page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.checkVisibility() && (!img.complete || img.naturalWidth === 0))
      .map((img) => img.currentSrc || img.src),
  )
}
