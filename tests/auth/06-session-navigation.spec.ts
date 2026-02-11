// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Session & Navigation", () => {
  test("6.1 Cannot access secure area without authentication", async ({
    page,
  }) => {
    // Navigate directly to https://the-internet.herokuapp.com/secure without logging in
    await page.goto("https://the-internet.herokuapp.com/secure");

    // Verify that user should be redirected to login page OR receive unauthorized message
    // The page should not display secure content
    const pageURL = page.url();
    const isRedirectedToLogin = pageURL.includes("/login");
    const secureHeading = page.getByRole("heading", { name: "Secure Area" });

    // Either redirected to login or secure content is not accessible
    if (isRedirectedToLogin) {
      await expect(page).toHaveURL(/login/);
      await expect(
        page.getByRole("heading", { name: "Login Page" }),
      ).toBeVisible();
    } else {
      await expect(secureHeading).not.toBeVisible();
    }
  });

  test("6.2 Session persists after login", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login and login with valid credentials
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("SuperSecretPassword!");
    await page.getByRole("button", { name: /Login/i }).click();

    // Verify redirected to secure area
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");

    // Verify success message is displayed
    await expect(
      page.getByText("You logged into a secure area!"),
    ).toBeVisible();

    // Refresh the page (or navigate within secure area)
    await page.reload();

    // Verify user remains logged in
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");

    // Verify secure content is still accessible
    await expect(
      page.getByRole("heading", { name: "Secure Area", exact: true }),
    ).toBeVisible();
  });

  test("6.3 Fork me on GitHub link is accessible", async ({ page }) => {
    // Navigate to https://the-internet.herokuapp.com/login
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(
      page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();

    // Verify the 'Fork me on GitHub' link is present
    const githubLink = page.getByRole("link", { name: /Fork me on GitHub/i });

    // Verify GitHub link exists in the page
    // and Link points to https://github.com/tourdedave/the-internet
    await expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/tourdedave/the-internet",
    );
  });
});
