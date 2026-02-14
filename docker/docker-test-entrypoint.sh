#!/bin/sh
set -e

RESULTS_DIR="${ALLURE_RESULTS_DIR:-/app/allure-results}"
REPORT_DIR="${ALLURE_REPORT_DIR:-/app/allure-report}"
PORT="${ALLURE_PORT:-5050}"

mkdir -p "$RESULTS_DIR" "$REPORT_DIR"
# Point Playwright's allure-results to our (possibly mounted) dir so history persists
rm -rf /app/allure-results
ln -sf "$RESULTS_DIR" /app/allure-results

# Preserve history from previous run if present (for trends)
if [ -d "$REPORT_DIR/history" ]; then
  mkdir -p "$RESULTS_DIR/history"
  cp -r "$REPORT_DIR/history/"* "$RESULTS_DIR/history/" 2>/dev/null || true
  echo "History restored for report trends."
fi

# Run Playwright tests (allure-results written by reporter)
echo "Running Playwright tests..."
npx playwright test || true

# Generate Allure report
echo "Generating Allure report..."
allure generate "$RESULTS_DIR" --clean -o "$REPORT_DIR"

echo "Serving Allure report at http://0.0.0.0:$PORT"
exec serve -s "$REPORT_DIR" -l "$PORT"
