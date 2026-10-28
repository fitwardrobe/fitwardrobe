import { test, expect, brokenImages } from "./fixtures"

test("blog index filters by topic and search", async ({ page }) => {
  await page.goto("/blog/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Wardrobe guides")
  const chips = page.getByRole("group", { name: "Filter by topic" }).getByRole("button")
  expect(await chips.count()).toBeGreaterThanOrEqual(5)

  const search = page.getByPlaceholder("Search the guides")
  await search.fill("Stylebook")
  await expect(page.getByRole("link", { name: /Stylebook on Android/i }).first()).toBeVisible()
  await search.fill("")

  const capsule = page.getByRole("button", { name: /Capsule/ })
  await capsule.click()
  await expect(capsule).toHaveAttribute("aria-pressed", "true")
  expect(await brokenImages(page)).toEqual([])
})

test("a post's topic breadcrumb opens the blog on that topic", async ({ page }) => {
  await page.goto("/blog/what-is-a-capsule-wardrobe/")
  const crumb = page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: /Capsule/ })
  await expect(crumb).toHaveAttribute("href", /^\/blog\/#topic-[a-z-]+$/)
  await crumb.click()
  await expect(page).toHaveURL(/\/blog\/#topic-/)
  await expect(page.getByRole("button", { name: /Capsule/ })).toHaveAttribute("aria-pressed", "true")
})

test("a post has its quick answer, contents, FAQ and cover", async ({ page }) => {
  await page.goto("/blog/stylebook-alternative-android/")
  await expect(page).toHaveTitle("Stylebook for Android? The Best Alternatives (2026)")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Stylebook")
  await expect(page.getByText("Quick answer", { exact: true })).toBeVisible()

  const tocTargets = await page.locator("a[href^='#']").evaluateAll((as) =>
    as.map((a) => a.getAttribute("href")!.slice(1)).filter((id) => id && id !== "main"),
  )
  expect(tocTargets.length).toBeGreaterThan(2)
  for (const id of new Set(tocTargets)) {
    expect.soft(await page.locator(`[id="${id}"]`).count(), `#${id} exists`).toBeGreaterThan(0)
  }

  const faq = page.locator("details").filter({ hasText: "Stylebook APK" }).first()
  await faq.locator("summary").click()
  await expect(faq).toHaveAttribute("open", "")
  expect(await brokenImages(page)).toEqual([])
})
