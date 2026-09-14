import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("keeps the Home identity strip and Profile usable on small mobile viewports", async ({
  page,
}) => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 375, height: 667 },
  ] as const;

  await page.goto("/");

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const profile = page.getByRole("region", { name: "Profile" });
    await expect(profile).toBeVisible();
    await expect(profile).not.toContainText(/Karachi/);

    const x = page.getByRole("link", { name: "X (Twitter)", exact: true });
    await expect(x).toBeVisible();
    const chromeFits = await x.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.left >= 0 &&
        rect.right <= document.documentElement.clientWidth &&
        document.documentElement.scrollWidth <= document.documentElement.clientWidth
      );
    });
    expect(chromeFits).toBe(true);

    const workIndex = page.getByRole("region", { name: "Selected work" }).getByRole("list");
    await expect(workIndex).toBeAttached();
    await workIndex.scrollIntoViewIfNeeded();
    await expect(workIndex.locator("li").first()).toBeVisible();
  }
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
