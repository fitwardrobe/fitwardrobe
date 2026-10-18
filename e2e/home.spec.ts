import { test, expect, brokenImages } from "./fixtures"

test.describe("home page", () => {
  test("hero, keywords and sections render", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle("FitWardrobe: AI Outfit Planner & Digital Wardrobe App")
    const h1 = page.getByRole("heading", { level: 1 })
    await expect(h1).toContainText("Dress smarter")
    await expect(page.locator(".h13-hero__lead")).toContainText("digital wardrobe app and AI outfit planner")
    for (const id of ["features", "styles", "how-it-works", "privacy", "faq", "join"]) {
      await expect(page.locator(`#${id}`), `section #${id}`).toHaveCount(1)
    }
  })

  test("style cards show a mixed cast with every image loaded", async ({ page }) => {
    await page.goto("/")
    const cards = page.locator(".h13-looks .h13-look")
    await expect(cards).toHaveCount(6)
    const alts = await cards.locator("img").evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).alt))
    expect(alts.filter((a) => a.startsWith("A woman")).length).toBeGreaterThanOrEqual(2)
    expect(alts.filter((a) => a.startsWith("A man")).length).toBeGreaterThanOrEqual(3)
    expect(await brokenImages(page)).toEqual([])
  })

  test("guides and FAQ links work", async ({ page }) => {
    await page.goto("/")
    const guides = page.locator(".h13-guides__list a")
    await expect(guides).toHaveCount(6)
    const hrefs = await guides.evaluateAll((as) => as.map((a) => a.getAttribute("href")))
    expect(hrefs).toEqual(expect.arrayContaining(["/outfit-planner/", "/capsule-wardrobe/", "/blog/stylebook-alternative-android/"]))

    const work = page.locator("details.h13-faq__item", { hasText: "what to wear to work" })
    await work.locator("summary").click()
    const link = work.locator(".h13-faq__more a")
    await expect(link).toBeVisible()
    const href = await link.getAttribute("href")
    expect(href).toMatch(/^\/(outfit-planner|what-to-wear-to-work)\/$/)
    await link.click()
    await expect(page).toHaveURL(new RegExp(`${href}$`))
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })
})

test.describe("consent banner for European visitors", () => {
  test.use({ consent: "unset", timezoneId: "Europe/London" })

  test("asks once, and Decline is remembered", async ({ page }) => {
    await page.goto("/")
    const banner = page.getByRole("region", { name: "Analytics cookies" })
    await expect(banner).toBeVisible()
    await banner.getByRole("button", { name: "Decline" }).click()
    await expect(banner).toBeHidden()
    expect(await page.evaluate(() => localStorage.getItem("fw-consent"))).toBe("denied")
    await page.reload()
    await expect(page.getByRole("region", { name: "Analytics cookies" })).toBeHidden()
  })
})

test.describe("consent banner elsewhere", () => {
  test.use({ consent: "unset", timezoneId: "Asia/Kolkata" })

  test("is not shown automatically, but Cookie settings opens it", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await expect(page.getByRole("region", { name: "Analytics cookies" })).toBeHidden()
    await page.getByRole("button", { name: "Cookie settings" }).click()
    await expect(page.getByRole("region", { name: "Analytics cookies" })).toBeVisible()
  })
})
