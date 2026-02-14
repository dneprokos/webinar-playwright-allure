// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("Case Sensitivity & Edge Cases", () => {
  test.beforeEach(async ({}) => {
    await allure.feature("Authentication");
  });

  //   test.afterEach(async ({ page }, testInfo) => {
  //     if (testInfo.status === testInfo.expectedStatus) return;

  //     await testInfo.attach("Screenshot", {
  //       body: await page.screenshot({ fullPage: true }),
  //       contentType: "image/png",
  //     });
  //   });

  test("4.1 Username is case-sensitive", async ({ page }) => {
    await allure.story(
      "As an active user, I want to see an error message when entering an incorrect case username",
    );
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
    await allure.story(
      "As an active user, I want to see an error message when entering an incorrect case password",
    );
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
    await allure.story(
      "As an active user, I want to see an error message when whitespace is present in either field",
    );
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
    await allure.story(
      "As an active user, I want to see an error message when whitespace is present in the password field",
    );
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
