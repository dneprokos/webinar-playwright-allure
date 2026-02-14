import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { version as playwrightVersion } from "@playwright/test/package.json";

export default async function globalSetup() {
  const resultsDir = path.resolve(process.cwd(), "allure-results");
  fs.mkdirSync(resultsDir, { recursive: true });

  // environment.properties
  fs.writeFileSync(
    path.join(resultsDir, "environment.properties"),
    [
      "Environment=Local",
      "Browser=chromium",
      `OS=${os.platform()} ${os.release()}`,
      `NodeVersion=${process.version}`,
      `PlaywrightVersion=${playwrightVersion}`,
      "",
    ].join("\n"),
    { encoding: "utf8" },
  );

  // executor.json
  const executor = {
    name: "Local Machine",
    type: "local",
    buildName: "Playwright Local Run",
    buildOrder: Date.now(),
    buildUrl: "",
    reportUrl: "",
    reportName: "Allure Report",
  };

  fs.writeFileSync(
    path.join(resultsDir, "executor.json"),
    JSON.stringify(executor, null, 2),
    { encoding: "utf8" },
  );
}
