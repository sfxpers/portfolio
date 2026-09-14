import { expect, test } from "@playwright/test";

test("sparse UI transitions collapse under prefers-reduced-motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const workLink = page.getByRole("link", { name: /EcoBuiltConnect/ });
  await expect(workLink).toBeVisible();

  const transitionDuration = await workLink.evaluate(
    (el) => getComputedStyle(el).transitionDuration,
  );

  const durations = transitionDuration.split(",").map((value) => Number.parseFloat(value.trim()));
  expect(durations.length).toBeGreaterThan(0);
  for (const duration of durations) {
    expect(duration).toBeLessThanOrEqual(0.01);
  }
});
