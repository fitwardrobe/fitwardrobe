import { test, expect } from "./fixtures"

/** /unsubscribe/ is opened from the link in our emails; it is never indexed. */
for (const path of ["/unsubscribe/"]) {
  test(`${path} is noindex, waits for a button press, and explains a broken link`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
    await expect(page.getByText(/This link looks incomplete/)).toBeVisible()

    const calls: string[] = []
    await page.route(/script\.google(usercontent)?\.com/, (route) => {
      calls.push(route.request().url())
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, state: "done" }) })
    })
    await page.goto(`${path}#c=00000000-0000-4000-8000-000000000001&t=abcdefghijklmnopqrstuvwxyz012345`)
    const button = page.getByRole("button", { name: "Unsubscribe" })
    await expect(button).toBeVisible()
    expect(calls).toHaveLength(0) // nothing happens until the button is pressed
  })
}
