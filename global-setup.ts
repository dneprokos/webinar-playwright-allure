import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { FullConfig } from "@playwright/test";
import { version as playwrightVersion } from "@playwright/test/package.json";

const env = (key: string, fallback: string): string =>
  process.env[key]?.trim() || fallback;

export default async function globalSetup(config: FullConfig) {
  const resultsDir = path.resolve(process.cwd(), "allure-results");
  fs.mkdirSync(resultsDir, { recursive: true });

  // Browser name(s) from Playwright config projects (e.g. "chromium" or "chromium, firefox")
  const browserFromConfig = config.projects.map((p) => p.name).join(", ") || "chromium";

  // environment.properties (from env with defaults)
  const environmentName = env("ALLURE_ENVIRONMENT", "Local");
  const browser = env("ALLURE_BROWSER", browserFromConfig);
  fs.writeFileSync(
    path.join(resultsDir, "environment.properties"),
    [
      `Environment=${environmentName}`,
      `Browser=${browser}`,
      `OS=${os.platform()} ${os.release()}`,
      `NodeVersion=${process.version}`,
      `PlaywrightVersion=${playwrightVersion}`,
      "",
    ].join("\n"),
    { encoding: "utf8" },
  );

  // executor.json (from env with defaults)
  const executor = {
    name: env("ALLURE_EXECUTOR_NAME", "Local Machine"),
    type: env("ALLURE_EXECUTOR_TYPE", "local"),
    buildName: env("ALLURE_BUILD_NAME", "Playwright Local Run"),
    buildOrder: parseInt(env("ALLURE_BUILD_ORDER", String(Date.now())), 10),
    buildUrl: env("ALLURE_BUILD_URL", env("BUILD_URL", "")),
    reportUrl: env("ALLURE_REPORT_URL", ""),
    reportName: env("ALLURE_REPORT_NAME", "Allure Report"),
  };

  fs.writeFileSync(
    path.join(resultsDir, "executor.json"),
    JSON.stringify(executor, null, 2),
    { encoding: "utf8" },
  );

  // Copy categories from project so "Ignored tests" and others apply every run
  const categoriesPath = path.resolve(process.cwd(), "allure-categories.json");
  if (fs.existsSync(categoriesPath)) {
    fs.copyFileSync(categoriesPath, path.join(resultsDir, "categories.json"));
  }
}
