#!/bin/sh
set -e

RESULTS_DIR="${ALLURE_RESULTS_DIR:-/data/allure-results}"
REPORT_DIR="${ALLURE_REPORT_DIR:-/data/allure-report}"
PORT="${ALLURE_PORT:-5050}"

# Preserve history: copy from previous report into results so next report has trends
if [ -d "$REPORT_DIR/history" ]; then
  mkdir -p "$RESULTS_DIR/history"
  cp -r "$REPORT_DIR/history/"* "$RESULTS_DIR/history/" 2>/dev/null || true
  echo "History copied to results (for trends)."
fi

# Generate report from results (with history)
if [ -d "$RESULTS_DIR" ] && [ -n "$(ls -A $RESULTS_DIR 2>/dev/null)" ]; then
  echo "Generating Allure report..."
  allure generate "$RESULTS_DIR" --clean -o "$REPORT_DIR"
  echo "Serving Allure report at http://0.0.0.0:$PORT"
  exec serve -s "$REPORT_DIR" -l "$PORT"
else
  echo "No allure-results found. Mount a volume with allure-results (e.g. -v ./allure-results:/data/allure-results -v ./allure-report:/data/allure-report)"
  exit 1
fi
