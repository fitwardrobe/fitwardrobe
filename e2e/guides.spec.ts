import { test, expect, brokenImages, sitemapPaths } from "./fixtures"

const GUIDES = ["/outfit-planner/", "/what-to-wear-to-work/", "/capsule-wardrobe/", "/minimalist-wardrobe/", "/about/", "/ai-transparency/", "/support/"]

test("guide and info pages render with their images and sign-up band", async ({ page, request }) => {
  const live = new Set(await sitemapPaths(request))
  for (const path of GUIDES.filter((p) => live.has(p))) {
    await page.goto(path)
    await expect(page.getByRole("heading", { level: 1 }), `${path} h1`).toBeVisible()
    expect(await brokenImages(page), `${path} images`).toEqual([])
    if (!["/ai-transparency/", "/support/"].includes(path)) {
      await expect(page.locator("[data-cta-location]").last(), `${path} sign-up band`).toBeVisible()
    }
  }
})

test("legal pages render", async ({ page }) => {
  for (const path of ["/privacy/", "/terms/", "/cookies/", "/security/", "/accessibility/"]) {
    await page.goto(path)
    await expect(page.getByRole("heading", { level: 1 }), `${path} h1`).toBeVisible()
  }
  await page.goto("/privacy/")
  await expect(page.getByText("how you describe yourself")).toBeVisible()
})
