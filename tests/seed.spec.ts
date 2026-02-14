import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("Test group", () => {
  test("seed", async ({ page }) => {
    await allure.feature("Seed from Playwright Agents");
    await allure.story(
      "This test is used as a seed for Playwright Agents to generate new tests",
    );
    await page.goto("https://the-internet.herokuapp.com/");
  });
});
