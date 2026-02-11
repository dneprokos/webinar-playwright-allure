// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("Authentication - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await allure.feature("Authentication");
    await allure.story("Authentication - Happy Path");
  });

  test.afterEach(async ({ page }) => {
    // if test failed, capture screenshot and attach to Allure report
    if (test.info().status === test.info().expectedStatus) {
      return; // test passed, no need to capture
    }
    await allure.attachment("Screenshot", await page.screenshot(), "image/png");
  });

  test("1.1 Successful login with valid credentials", async ({ page }) => {
    await allure.story(
      "As an active user, I want to successfully sign in using a valid password",
    );
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Login/i })).toBeVisible();

    // Enter username 'tomsmith' in the Username field
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "tomsmith",
    );

    // Enter password 'SuperSecretPassword!' in the Password field
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "SuperSecretPassword!",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
    await expect(
      page.getByText("You logged into a secure area!"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Secure Area", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();

    // Click the Logout link
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByText("You logged out of the secure area!"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();
  });

  test("1.2 Login form displays correct instructions", async ({ page }) => {
    await allure.story(
      "As an active user, I want to see correct login instructions",
    );
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");

    // Verify page title contains 'Login Page'
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Verify instructions text contains 'tomsmith' as the valid username
    const instructions = page.getByRole("heading", { level: 4 });
    await expect(instructions).toContainText("tomsmith");

    // Verify instructions text contains 'SuperSecretPassword!' as the valid password
    await expect(instructions).toContainText("SuperSecretPassword!");

    // Verify instructions mention error messages for wrong information
    await expect(instructions).toContainText("error messages");
  });
});
