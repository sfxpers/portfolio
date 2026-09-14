import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navigates among Home, Resume, and a Case Study via chrome", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Resume" })
    .click();
  await expect(page).toHaveURL(/\/resume$/);
  await expect(page).toHaveTitle("Shayan - Resume");

  await page.getByRole("link", { name: "Shayan" }).click();
  await expect(page).toHaveURL("/");
  await expect(page).toHaveTitle("Shayan - Product Engineer");

  await page.getByRole("link", { name: /EcoBuiltConnect/ }).click();
  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/);

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Resume" })
    .click();
  await expect(page).toHaveURL(/\/resume$/);
});

test("Resume page has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/resume");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("About route is gone", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
});

test("Resume PDF download is served and the old ATS page is gone", async ({ request }) => {
  const response = await request.get("/resume/download.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"] ?? "").toMatch(/application\/pdf/);
  const body = await response.body();
  expect(body.subarray(0, 5).toString("utf8")).toBe("%PDF-");

  const gone = await request.get("/resume/ats.html");
  expect(gone.ok()).toBeFalsy();
});
