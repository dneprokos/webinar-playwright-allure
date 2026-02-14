# Run the Test container: execute Playwright tests, generate Allure report, and serve it.
# Optionally persist results so next run keeps report history.
# Usage: .\run-docker-test.ps1

$ErrorActionPreference = "Stop"

$ImageName = "webinar-playwright-allure-test"
$ReportPort = 5050
$DataDir = Join-Path $PSScriptRoot "docker-allure-data"

# Always rebuild image with no cache so it picks up latest files from the repo
Write-Host "Building test image (no cache; this may take a few minutes)..."
docker build --no-cache -f docker/Dockerfile.test -t $ImageName .

$ResultsPath = Join-Path $DataDir "allure-results"
$ReportPath = Join-Path $DataDir "allure-report"
New-Item -ItemType Directory -Force -Path $ResultsPath | Out-Null
New-Item -ItemType Directory -Force -Path $ReportPath | Out-Null

# Mount data dir so allure-results and allure-report persist (history for next run)
# Set executor env vars so the report shows "Docker" instead of "Local Machine"
Write-Host "Running tests, then starting Allure report at http://localhost:$ReportPort"
docker run --rm -p "${ReportPort}:5050" `
    -v "${DataDir}:/app/allure-data" `
    -e ALLURE_RESULTS_DIR=/app/allure-data/allure-results `
    -e ALLURE_REPORT_DIR=/app/allure-data/allure-report `
    -e ALLURE_PORT=5050 `
    -e ALLURE_EXECUTOR_NAME="Docker" `
    -e ALLURE_EXECUTOR_TYPE="docker" `
    -e ALLURE_BUILD_NAME="Playwright Docker Run" `
    -e ALLURE_ENVIRONMENT="Docker" `
    $ImageName

# Copy results and report from Docker volume to project folder so we keep local history too
$LocalResults = Join-Path $PSScriptRoot "allure-results"
$LocalReport = Join-Path $PSScriptRoot "allure-report"
New-Item -ItemType Directory -Force -Path $LocalResults | Out-Null
New-Item -ItemType Directory -Force -Path $LocalReport | Out-Null
Copy-Item -Path "$ResultsPath\*" -Destination $LocalResults -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path "$ReportPath\*" -Destination $LocalReport -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Results and report copied to ./allure-results and ./allure-report"
