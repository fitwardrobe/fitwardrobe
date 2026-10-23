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

  await submit.click()
  await expect(form.getByText("Type your email address first.")).toBeVisible()
  await expect(email).toBeFocused()

  await email.fill("not-an-email")
  await submit.click()
  await expect(form.getByText("Add the @ and the rest of your address, like name@gmail.com.")).toBeVisible()

  await email.fill("e2e-test@gmial.com")
  await submit.click()
  await expect(form.getByText(/Did you mean/)).toBeVisible()
  await form.getByRole("button", { name: "e2e-test@gmail.com" }).click()
  await expect(email).toHaveValue("e2e-test@gmail.com")
  expect(posted).toHaveLength(0)

  // Autocorrect spaces and a trailing full stop are cleaned up before sending.
  await email.fill(" e2e-test @example. com.")
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

test("an address the browser put in the field without telling React is still sent", async ({ page }) => {
  // Some phone keyboards and autofill fill the field without an input event, so React state
  // stays empty. Before the fix this showed "Enter an email address" for a visible address.
  const posted: string[] = []
  page.on("request", (req) => {
    if (req.url().includes("docs.google.com/forms/") && req.method() === "POST") posted.push(req.postData() ?? "")
  })
  await page.goto("/#join")
  const form = page.locator("#join form").first()
  await form.getByLabel("Email address").evaluate((el: HTMLInputElement) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(el, "autofill-e2e@example.com")
  })
  await form.getByRole("button", { name: /Join early access/ }).click()
  await expect(page.locator("#join .fw-form__done").getByText("You're on the list.")).toBeVisible()
  await expect.poll(() => posted.length).toBe(1)
  expect(posted[0]).toContain("entry.27954179=autofill-e2e%40example.com")
})

test("a suggested spelling can be ignored by pressing Join again", async ({ page }) => {
  const posted: string[] = []
  page.on("request", (req) => {
    if (req.url().includes("docs.google.com/forms/") && req.method() === "POST") posted.push(req.postData() ?? "")
  })
  await page.goto("/#join")
  const form = page.locator("#join form").first()
  const submit = form.getByRole("button", { name: /Join early access/ })
  await form.getByLabel("Email address").fill("e2e-test@gmail.co")
  await submit.click()
  await expect(form.getByText(/Did you mean/)).toBeVisible()
  await submit.click()
  await expect.poll(() => posted.length).toBe(1)
  expect(posted[0]).toContain("entry.27954179=e2e-test%40gmail.co&")
})

test("a Join early access link puts the cursor in the email field", async ({ page }) => {
  await page.goto("/")
  const link = page.locator('a[href="/#join"]:visible').first()
  await link.click()
  await expect(page.locator("#join form").first().getByLabel("Email address")).toBeFocused()
})

test("the mobile menu's Join early access link also puts the cursor in the email field", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "the menu button only shows on small screens")
  await page.goto("/")
  await page.getByRole("button", { name: "Open menu" }).click()
  await page.locator("#fw-mobile-menu").getByRole("link", { name: "Join early access" }).click()
  await expect(page.locator("#join form").first().getByLabel("Email address")).toBeFocused()
})

test("the updates box starts unticked and its choice is sent with the sign-up", async ({ page }) => {
  const posted: string[] = []
  page.on("request", (req) => {
    if (req.url().includes("docs.google.com/forms/") && req.method() === "POST") posted.push(req.postData() ?? "")
  })
  await page.goto("/#join")
  const form = page.locator("#join form").first()
  const box = form.getByLabel(/Also email me early-access updates/)
  await expect(box).not.toBeChecked()
  await box.check()
  await form.getByLabel("Email address").fill("consent-e2e@example.com")
  await form.getByRole("button", { name: /Join early access/ }).click()
  await expect.poll(() => posted.length).toBe(1)
  expect(decodeURIComponent(posted[0].replace(/\+/g, " "))).toContain("updates=yes-2026-10-23")
})

test("without the updates box ticked, no updates consent is sent", async ({ page }) => {
  const posted: string[] = []
  page.on("request", (req) => {
    if (req.url().includes("docs.google.com/forms/") && req.method() === "POST") posted.push(req.postData() ?? "")
  })
  await page.goto("/#join")
  const form = page.locator("#join form").first()
  await form.getByLabel("Email address").fill("no-consent-e2e@example.com")
  await form.getByRole("button", { name: /Join early access/ }).click()
  await expect.poll(() => posted.length).toBe(1)
  expect(posted[0]).not.toContain("updates")
})

test("a filled-in bot trap field marks the sign-up for review instead of blocking it", async ({ page }) => {
  const posted: string[] = []
  page.on("request", (req) => {
    if (req.url().includes("docs.google.com/forms/") && req.method() === "POST") posted.push(req.postData() ?? "")
  })
  await page.goto("/#join")
  const form = page.locator("#join form").first()
  await expect(form.locator('input[name="fw_extra"]')).not.toBeInViewport()
  await form.locator('input[name="fw_extra"]').fill("spam", { force: true })
  await form.getByLabel("Email address").fill("bot-e2e@example.com")
  await form.getByRole("button", { name: /Join early access/ }).click()
  await expect.poll(() => posted.length).toBe(1)
  expect(decodeURIComponent(posted[0].replace(/\+/g, " "))).toContain("hp=1")
})

test("after the optional questions, a follow screen shows Telegram, Discord and Instagram", async ({ page }) => {
  await page.goto("/#join")
  const form = page.locator("#join form").first()
  await form.getByLabel("Email address").fill("follow-e2e@example.com")
  await form.getByRole("button", { name: /Join early access/ }).click()
  const done = page.locator("#join .fw-form__done")
  await expect(done.getByText("Which phone do you use?")).toBeVisible()
  await expect(done.locator(".fw-founding")).toHaveCount(0) // not while the questions are showing
  await done.getByRole("button", { name: "Skip" }).click()
  await expect(done.getByText("You're all set.")).toBeVisible()
  await expect(done.getByText("Follow along to get updates first")).toBeFocused()
  await expect(done.getByRole("link", { name: "Join on Telegram" })).toHaveAttribute("href", "https://t.me/fitwardrobe")
  await expect(done.getByRole("link", { name: "Join on Discord" })).toHaveAttribute("href", "https://discord.gg/dUw5csgje5")
  await expect(done.getByRole("link", { name: "Follow on Instagram" })).toHaveAttribute("href", "https://instagram.com/fitwardrobe.me")
})
