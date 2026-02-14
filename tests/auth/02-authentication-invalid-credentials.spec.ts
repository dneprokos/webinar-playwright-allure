// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("Authentication - Invalid Credentials", () => {
  test.beforeEach(async ({ page }) => {
    await allure.feature("Authentication");
  });

  //   test.afterEach(async ({ page }, testInfo) => {
  //     if (testInfo.status === testInfo.expectedStatus) return;

  //     await testInfo.attach("Screenshot", {
  //       body: await page.screenshot({ fullPage: true }),
  //       contentType: "image/png",
  //     });
  //   });

  test("2.1 Login fails with invalid username", async ({ page }) => {
    await allure.story(
      "As an active user, I want to see an error message when entering an invalid username",
    );
    await allure.tag("test-bug");
    await allure.label("defectType", "test");
    await allure.tag("test-bug");
    await allure.label("owner", "QA");
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username 'invaliduser' in the Username field
    await page.getByRole("textbox", { name: "Username" }).fill("invaliduser");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "invaliduser",
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

    // Verify page remains on https://the-internet.herokuapp.com/login
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error alert is displayed at the top of the page
    const errorAlert = page.getByText("Your username is invalid!");
    await expect(errorAlert).toBeVisible();

    // Click the X button to dismiss the error message
    await page.getByRole("link", { name: "×" }).click();

    // Verify error message is dismissed
    await expect(errorAlert).not.toBeVisible();

    // Verify form remains visible and ready for retry
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Login/i })).toBeVisible();
  });

  test.skip("2.2 Login fails with invalid password", async ({ page }) => {
    await allure.story(
      "As an active user, I want to see an error message when entering an invalid password",
    );
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username 'tomsmith' in the Username field
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "tomsmith",
    );

    // Enter password 'wrongpassword' in the Password field
    await page.getByRole("textbox", { name: "Password" }).fill("wrongpassword");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "wrongpassword1",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on https://the-internet.herokuapp.com/login
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error alert is displayed at the top of the page
    const errorAlert = page.getByText("Your password is invalid!");
    await expect(errorAlert).toBeVisible();

    // Click the X button to dismiss the error message
    await page.getByRole("link", { name: "×" }).click();

    // Verify error message is dismissed
    await expect(errorAlert).not.toBeVisible();

    // Verify form is ready for another login attempt
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Login/i })).toBeVisible();
  });

  test("2.3 Login fails with both credentials invalid", async ({ page }) => {
    await allure.story(
      "As an active user, I want to see an error message when both username and password are invalid",
    );
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username 'wronguser' and password 'wrongpass'
    await page.getByRole("textbox", { name: "Username" }).fill("wronguser");
    await page.getByRole("textbox", { name: "Password" }).fill("wrongpass");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "wronguser",
    );
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "wrongpass",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on login page
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message is displayed as 'Your username is invalid!' (username is checked first)
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
  });
});
