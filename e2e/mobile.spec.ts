import { test, expect } from "./fixtures"

const PAGES = ["/", "/blog/", "/outfit-planner/", "/capsule-wardrobe/", "/minimalist-wardrobe/", "/blog/best-outfit-planning-apps-compared/", "/privacy/"]

test("no page scrolls sideways on a phone", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect.soft(overflow, `${path} horizontal overflow (px)`).toBeLessThanOrEqual(1)
  }
})

test("the mobile menu opens, links and closes", async ({ page }) => {
  await page.goto("/")
  const toggle = page.getByRole("button", { name: "Open menu" })
  await expect(toggle).toBeVisible()
  await toggle.click()
  const menu = page.getByRole("navigation", { name: "Mobile" })
  await expect(menu).toBeVisible()
  await menu.getByRole("link", { name: "Blog" }).click()
  await expect(page).toHaveURL(/\/blog\/$/)
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden()
})
