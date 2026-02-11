// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Form Validation - Empty Fields", () => {
  test("3.1 Login fails when both fields are empty", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Do not fill any fields and click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on https://the-internet.herokuapp.com/login
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message displays 'Your username is invalid!'
    await expect(page.getByText("Your username is invalid!")).toBeVisible();

    // Verify error alert is dismissible with X button
    await expect(page.getByRole("link", { name: "×" })).toBeVisible();
  });

  test("3.2 Login fails when only username is empty", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Leave Username field empty and enter password 'SuperSecretPassword!'
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "SuperSecretPassword!",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on login page
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message shows 'Your username is invalid!'
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
  });

  test("3.3 Login fails when only password is empty", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username 'tomsmith' and leave Password field empty
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "tomsmith",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on login page
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message shows 'Your password is invalid!'
    await expect(page.getByText("Your password is invalid!")).toBeVisible();
  });
});
