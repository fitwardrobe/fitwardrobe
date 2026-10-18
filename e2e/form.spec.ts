import { test, expect } from "./fixtures"

/**
 * The early-access form posts to a Google Form. guardNetwork() answers those requests locally,
 * so this test never adds a row to the real sign-up sheet.
 */
test("early-access sign-up validates, submits and asks the optional questions", async ({ page }) => {
  const posted: string[] = []
  page.on("request", (req) => {
    if (req.url().includes("docs.google.com/forms/") && req.method() === "POST") posted.push(req.postData() ?? "")
  })

  await page.goto("/#join")
  const form = page.locator("#join form").first()
  const email = form.getByLabel("Email address")
  const submit = form.getByRole("button", { name: /Join early access/ })

  await email.fill("not-an-email")
  await submit.click()
  await expect(form.getByText("Enter an email address like name@example.com.")).toBeVisible()
  expect(posted).toHaveLength(0)

  await email.fill("e2e-test@example.com")
  await submit.click()
  const done = page.locator("#join .fw-form__done")
  await expect(done.getByText("You're on the list.")).toBeVisible()
  await expect.poll(() => posted.length).toBe(1)
  expect(posted[0]).toContain("entry.27954179=e2e-test%40example.com")
  expect(posted[0]).toContain("entry.235993561=")

  // Optional questions
  await done.getByText("Android", { exact: true }).click()
  await done.getByText("Outfits for work", { exact: true }).click()
  if (await done.getByText("How do you describe yourself?").count()) {
    await done.getByText("Prefer not to say", { exact: true }).click()
  }
  await done.getByRole("button", { name: "Send answers" }).click()
  await expect(done.getByText("Thank you. That helps us decide what to build first.")).toBeVisible()
  await expect.poll(() => posted.length).toBe(2)
  expect(posted[1]).toContain("entry.1919821622=Android")
  expect(posted[1]).toContain("entry.1603544156=Outfits+for+work")
})
