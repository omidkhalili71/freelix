import { expect, test } from "@playwright/test";

test("shows only Hello World", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible();
  await expect(page.getByRole("main").locator("> *")).toHaveCount(1);
});
