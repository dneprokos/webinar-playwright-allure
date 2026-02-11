// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Case Sensitivity & Edge Cases", () => {
  test("4.1 Username is case-sensitive", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username 'TomSmith' (incorrect case) and correct password
    await page.getByRole("textbox", { name: "Username" }).fill("TomSmith");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "TomSmith",
    );
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "SuperSecretPassword!",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on login page
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message shows 'Your username is invalid!'
    await expect(page.getByText("Your username is invalid!")).toBeVisible();

    // This confirms username validation is case-sensitive
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
  });

  test("4.2 Password is case-sensitive", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username 'tomsmith' and password 'supersecretpassword!' (incorrect case)
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("supersecretpassword!");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "tomsmith",
    );
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "supersecretpassword!",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on login page
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message shows 'Your password is invalid!'
    await expect(page.getByText("Your password is invalid!")).toBeVisible();

    // This confirms password validation is case-sensitive
    await expect(page.getByText("Your password is invalid!")).toBeVisible();
  });

  test("4.3 Whitespace in fields is treated as invalid", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username ' tomsmith ' (with leading/trailing spaces) and correct password
    await page.getByRole("textbox", { name: "Username" }).fill(" tomsmith ");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      " tomsmith ",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on login page
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message shows 'Your username is invalid!' (spaces treated as part of username)
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
  });

  test("4.4 Login with extra whitespace in password", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Enter username 'tomsmith' and password 'SuperSecretPassword! ' (with trailing space)
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword! ");
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(
      "tomsmith",
    );
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "SuperSecretPassword! ",
    );

    // Click the Login button
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify page remains on login page
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");

    // Verify error message shows 'Your password is invalid!' (space treated as part of password)
    await expect(page.getByText("Your password is invalid!")).toBeVisible();
  });
});
