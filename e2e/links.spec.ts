import fs from "node:fs"
import path from "node:path"
import { test, expect, SITE, sitemapPaths } from "./fixtures"

type Redirect = { source: string; destination: string }
const redirects: Redirect[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "vercel.json"), "utf8")).redirects ?? []
const redirectSources = new Set(redirects.filter((r) => !/[:(]/.test(r.source)).map((r) => r.source.replace(/\/$/, "")))

test("internal links, anchors and assets all resolve", async ({ request }) => {
  test.setTimeout(240_000)
  const pages = await sitemapPaths(request)
  const html = new Map<string, string>()
  for (const p of pages) html.set(p, await (await request.get(p)).text())

  const targets = new Map<string, string>() // url -> first page that uses it
  const anchors: { from: string; page: string; id: string }[] = []

  for (const [from, body] of html) {
    const urls = [
      ...[...body.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
      ...[...body.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(/\s+/)[0])),
    ]
    for (const raw of urls) {
      const url = raw.replace(/&amp;/g, "&")
      if (/^(mailto:|tel:|data:|javascript:)/.test(url)) continue
      let local: string
      if (url.startsWith("#")) local = from + url
      else if (url.startsWith(SITE)) local = url.slice(SITE.length) || "/"
      else if (url.startsWith("/") && !url.startsWith("//")) local = url
      else continue
      const [pathPart, hash] = local.split("#")
      const clean = pathPart.split("?")[0] || from
      if (!targets.has(clean)) targets.set(clean, from)
      if (hash) anchors.push({ from, page: clean, id: decodeURIComponent(hash) })
      expect.soft(redirectSources.has(clean.replace(/\/$/, "")), `${from} links to a redirected URL ${clean}`).toBe(false)
    }
  }

  for (const [url, from] of targets) {
    if (url.startsWith("/_next/") && html.size > 0 && url.endsWith(".js")) continue // build chunks are covered by page loads
    const res = await request.get(url)
    expect.soft(res.status(), `${url} (linked from ${from})`).toBe(200)
  }

  for (const a of anchors) {
    const body = html.get(a.page) ?? (await (await request.get(a.page)).text())
    html.set(a.page, body)
    expect.soft(body.includes(`id="${a.id}"`), `#${a.id} exists on ${a.page} (linked from ${a.from})`).toBe(true)
  }
})
