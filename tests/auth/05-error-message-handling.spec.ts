// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("UI/UX - Error Message Handling", () => {
  test("5.1 Error messages can be dismissed", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login and trigger an error by entering invalid username
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).fill("invaliduser");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify error message is displayed
    await expect(page.getByText("Your username is invalid!")).toBeVisible();

    // Click the X button on the error alert
    await page.getByRole("link", { name: "×" }).click();

    // Verify error message is dismissed
    await expect(page.getByText("Your username is invalid!")).not.toBeVisible();

    // Verify form remains visible and functional
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Login/i })).toBeVisible();

    // User can attempt login again
    await expect(
      page.getByRole("textbox", { name: "Username" }),
    ).toBeEditable();
  });

  test("5.2 Multiple failed login attempts show consistent error messages", async ({
    page,
  }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Attempt login with invalid username 'user1' and click Login
    await page.getByRole("textbox", { name: "Username" }).fill("user1");
    await page.getByRole("textbox", { name: "Password" }).fill("pass");
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify error message 'Your username is invalid!' is displayed
    await expect(page.getByText("Your username is invalid!")).toBeVisible();

    // Dismiss the error and attempt login with invalid password for 'tomsmith'
    await page.getByRole("link", { name: "×" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page.getByRole("textbox", { name: "Password" }).fill("wrongpass");
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify error message 'Your password is invalid!' is displayed
    await expect(page.getByText("Your password is invalid!")).toBeVisible();

    // Dismiss the error and attempt login again with invalid username
    await page.getByRole("link", { name: "×" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("invaliduser");
    await page.getByRole("textbox", { name: "Password" }).fill("pass");
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify error message 'Your username is invalid!' is displayed again
    await expect(page.getByText("Your username is invalid!")).toBeVisible();

    // Error handling is consistent across multiple attempts
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
  });
});
