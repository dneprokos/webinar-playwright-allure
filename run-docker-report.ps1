# Run the Allure Report container: generate report from allure-results and serve with history.
# Requires existing allure-results (e.g. from a previous test run).
# Usage: .\run-docker-report.ps1

$ErrorActionPreference = "Stop"

$ImageName = "webinar-playwright-allure-report"
$ReportPort = 5050
$ResultsDir = "allure-results"
$ReportDir = "allure-report"

# Ensure we have results to generate from
if (-not (Test-Path $ResultsDir)) {
    Write-Host "Folder '$ResultsDir' not found. Run tests first (e.g. npm test) or run the test Docker container." -ForegroundColor Yellow
    exit 1
}

# Always rebuild image so it includes the latest allure-results
Write-Host "Building report image (with current allure-results)..."
docker build -f docker/Dockerfile.report -t $ImageName .

# Use a single data dir so history is preserved between runs
$DataDir = Join-Path $PSScriptRoot "docker-allure-data"
$ResultsPath = Join-Path $DataDir "allure-results"
$ReportPath = Join-Path $DataDir "allure-report"

New-Item -ItemType Directory -Force -Path $ResultsPath | Out-Null
New-Item -ItemType Directory -Force -Path $ReportPath | Out-Null

# Sync current results and existing report history into data dir (for persistence)
if (Test-Path $ResultsDir) {
    Copy-Item -Path "$ResultsDir\*" -Destination $ResultsPath -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "$ReportDir\history") {
    New-Item -ItemType Directory -Force -Path "$ReportPath\history" | Out-Null
    Copy-Item -Path "$ReportDir\history\*" -Destination "$ReportPath\history" -Recurse -Force
}

Write-Host "Starting Allure report server (with history) at http://localhost:$ReportPort"
docker run --rm -p "${ReportPort}:5050" `
    -v "${DataDir}:/data" `
    -e ALLURE_RESULTS_DIR=/data/allure-results `
    -e ALLURE_REPORT_DIR=/data/allure-report `
    -e ALLURE_PORT=5050 `
    $ImageName
