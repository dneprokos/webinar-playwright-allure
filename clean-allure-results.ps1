$resultsDir = "allure-results"

# Files we want to keep in allure-results
$keepFiles = @(
    "categories.json",
    "environment.properties",
    "environment.xml",
    "executor.json"
)

# Folders we want to keep (history can be kept or removed depending on your flow)
$keepDirs = @("history")

if (Test-Path $resultsDir) {

    # Remove all files except keepFiles
    Get-ChildItem $resultsDir -File -Force |
    Where-Object { $keepFiles -notcontains $_.Name } |
    Remove-Item -Force

    # Remove all directories except keepDirs
    Get-ChildItem $resultsDir -Directory -Force |
    Where-Object { $keepDirs -notcontains $_.Name } |
    Remove-Item -Recurse -Force

}
else {
    New-Item -ItemType Directory -Path $resultsDir | Out-Null
}
