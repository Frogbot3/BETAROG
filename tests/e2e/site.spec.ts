import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdirSync } from "node:fs";
const qa = process.env.BETAROG_QA_DIR || join(tmpdir(), "betarog-qa");
mkdirSync(qa, { recursive: true });

test("confirmation and reset UI with a mocked acceptance response", async ({
  page,
}) => {
  // This verifies the rendered state only; it is not a live email delivery test.
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      json: {
        message:
          "Your inquiry was accepted for delivery. Thank you for sharing your idea.",
      },
    }),
  );
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Synthetic QA Visitor");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("Project type").selectOption("Web Development");
  await page
    .getByLabel("Tell us about your idea")
    .fill("This is a mocked UI test. No email is being sent.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "A new conversation begins." }),
  ).toBeVisible();
  await expect(page.locator(".contact-success")).toContainText("Reference:");
  await page.getByRole("button", { name: "Start another inquiry" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await expect(page.getByLabel("Tell us about your idea")).toHaveValue("");
});

test("homepage, project filters, case studies, official social account", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/BETAROG/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "WE BUILDWHAT’S NEXT.",
  );
  await page.screenshot({ path: join(qa, "desktop.png") });
  await page.getByRole("button", { name: "Research", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(page.locator(".project-card").first()).toContainText(
    "Experimental",
  );
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page
    .getByRole("link", { name: "View TECH AI project", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work\/tech-ai/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("TECH AI");
  await expect(
    page.getByRole("link", { name: "Explore the live site" }),
  ).toHaveAttribute("href", "https://techai-theta.vercel.app");
  await expect(
    page.getByRole("link", { name: "Instagram", exact: true }).first(),
  ).toHaveAttribute("href", "https://www.instagram.com/betarog/");
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("service dialog has keyboard dismissal and preselects the inquiry", async ({
  page,
}) => {
  await page.goto("/services");
  const trigger = page.getByRole("button", {
    name: "AI & Machine Learning",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("link", { name: "Let’s explore your idea" }).click();
  await expect(page.locator("#projectType")).toHaveValue(
    "AI & Machine Learning",
  );
});
test("form validation, unavailable delivery, input preservation", async ({
  page,
}) => {
  await page.goto("/contact");
  const started = Date.now();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();
  await page.getByLabel("Your name").fill("Synthetic QA Visitor");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("Project type").selectOption("Web Development");
  await page
    .getByLabel("Tell us about your idea")
    .fill("This is a local automated test of the inquiry form.");
  await page.getByRole("checkbox").check();
  await expect
    .poll(() => Date.now() - started, { timeout: 4000 })
    .toBeGreaterThan(2200);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByRole("form", { name: "Project inquiry" }).getByRole("alert"),
  ).toContainText("not been sent");
  await expect(page.locator("#message")).toHaveValue(
    "This is a local automated test of the inquiry form.",
  );
});
test("mobile navigation, focus loop, theme persistence, and responsive widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Work/ })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: join(qa, "mobile.png"), fullPage: true });
});
test("accessibility checks in both themes and reduced-motion fallback", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await expect(page.locator(".orbital-canvas")).toHaveCount(0);
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.goto("/contact");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test("all internal routes, draft protection, metadata and error page", async ({
  request,
  page,
}) => {
  for (const route of [
    "/",
    "/services",
    "/work",
    "/about",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
    "/work/tech-ai",
    "/work/mosque-suite",
    "/work/cybersecurity-dashboard",
    "/work/ai-ml-experiments",
    "/sitemap.xml",
    "/robots.txt",
    "/opengraph-image",
    "/twitter-image",
    "/icon.svg",
  ]) {
    expect((await request.get(route)).status(), route).toBe(200);
  }
  expect(
    (await request.get("/insights/designing-for-life-offline")).status(),
  ).toBe(404);
  expect(
    (await request.get("/insights/practical-intelligent-products")).status(),
  ).toBe(404);
  expect((await request.get("/missing-page")).status()).toBe(404);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("designing-for-life-offline");
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  await page.goto("/missing-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Some things are",
  );
});
