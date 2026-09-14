import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navigates from Home work-index to a Case Study", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /EcoBuiltConnect/ }).click();
  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/);
  await expect(page).toHaveTitle("EcoBuiltConnect case study - Shayan");
});

test("unknown Case Study slug shows a clear not-found experience", async ({ page }) => {
  await page.goto("/work/does-not-exist");

  await expect(page.getByRole("heading", { name: /No case study/ })).toBeVisible();
  await expect(page.getByText(/does-not-exist/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(page).toHaveTitle("Case study not found - Shayan");
});

test("Case Study page has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/work/ecobuiltconnect");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
