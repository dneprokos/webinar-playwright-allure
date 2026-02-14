$ErrorActionPreference = "Stop"

$resultsDir = "allure-results"
$reportDir = "allure-report"

if (!(Test-Path $resultsDir)) {
    Write-Host "Folder '$resultsDir' not found."
    exit 1
}

# 1) If previous report exists, copy its history into current results
if (Test-Path "$reportDir\history") {
    New-Item -ItemType Directory -Force -Path "$resultsDir\history" | Out-Null
    Copy-Item -Recurse -Force "$reportDir\history\*" "$resultsDir\history\"
    Write-Host "History copied to allure-results\history"
}
else {
    Write-Host "No previous history found (first run)."
}

# 2) Generate fresh report (this will delete allure-report because of --clean)
Write-Host "Generating Allure report..."
allure generate $resultsDir --clean -o $reportDir

# 3) Open
Write-Host "Opening Allure report..."
allure open $reportDir
