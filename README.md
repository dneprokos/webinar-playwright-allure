# Playwright + Allure Integration Demo

A demonstration project showcasing Playwright and Allure test reporting capabilities. This project tests the login functionality of [The Internet](https://the-internet.herokuapp.com/login) website to demonstrate modern web testing practices with comprehensive test reporting.

## 📋 Overview

This project is designed to showcase:

- Playwright for web automation and testing
- Allure for test reporting and analytics
- Organized test structure with clear test grouping
- Comprehensive test coverage with multiple scenarios

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Valid Test Credentials

- **Username:** `tomsmith`
- **Password:** `SuperSecretPassword!`

## 🧪 Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in a specific file

```bash
npx playwright test tests/auth/01-authentication-happy-path.spec.ts
```

### Run tests for a specific section

```bash
# Run all authentication happy path tests
npx playwright test 01-authentication-happy-path

# Run all invalid credentials tests
npx playwright test 02-authentication-invalid-credentials
```

### Run tests in UI mode (interactive)

```bash
npx playwright test --ui
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

### Run tests with headed browser (see browser window)

```bash
npx playwright test --headed
```

### Generate and view test report

```bash
npx playwright show-report
```

## 📊 Test Reports

Playwright generates comprehensive test reports after each test execution:

```bash
# View the Playwright HTML report
npx playwright show-report
```

The generated reports include:

- Test execution timeline
- Pass/fail status details
- Screenshots and videos of failed tests
- Browser console logs
- Network activity

---

This project was created to demonstrate Playwright and Allure testing capabilities.
