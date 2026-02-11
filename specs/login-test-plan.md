# The Internet Login Page Test Plan

## Application Overview

This test plan covers comprehensive testing of the Form Authentication (Login) page on The Internet website (https://the-internet.herokuapp.com/login). The page is a simple login form that requires username and password authentication. Valid credentials are username: tomsmith and password: SuperSecretPassword!. The test plan includes happy path scenarios, validation testing, error handling, edge cases, and security considerations.

## Test Scenarios

### 1. Authentication - Happy Path

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/auth/successful-login.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed with Username and Password fields
    - expect: Login button is visible
    - expect: Instructions show the valid credentials: tomsmith and SuperSecretPassword!
  2. Enter username 'tomsmith' in the Username field
    - expect: Username field contains 'tomsmith'
  3. Enter password 'SuperSecretPassword!' in the Password field
    - expect: Password field contains the entered password (masked)
  4. Click the Login button
    - expect: User is redirected to https://the-internet.herokuapp.com/secure
    - expect: Success message 'You logged into a secure area!' is displayed
    - expect: Secure Area heading is visible
    - expect: Logout link is available
  5. Click the Logout link
    - expect: User is redirected back to https://the-internet.herokuapp.com/login
    - expect: Logout confirmation message 'You logged out of the secure area!' is displayed
    - expect: Login form is reset and ready for new login attempt

#### 1.2. Login form displays correct instructions

**File:** `tests/auth/form-instructions.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Page title contains 'Login Page'
    - expect: Instructions text is visible and contains 'tomsmith' as the valid username
    - expect: Instructions text contains 'SuperSecretPassword!' as the valid password
    - expect: Instructions mention that wrong information will show error messages

### 2. Authentication - Invalid Credentials

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login fails with invalid username

**File:** `tests/auth/invalid-username.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username 'invaliduser' in the Username field
    - expect: Username field contains 'invaliduser'
  3. Enter password 'SuperSecretPassword!' in the Password field
    - expect: Password field is filled
  4. Click the Login button
    - expect: Page remains on https://the-internet.herokuapp.com/login
    - expect: Error alert is displayed at the top of the page
    - expect: Error message shows 'Your username is invalid!'
    - expect: Form fields retain their values
  5. Click the X button to dismiss the error message
    - expect: Error message is dismissed
    - expect: Form remains visible and ready for retry

#### 2.2. Login fails with invalid password

**File:** `tests/auth/invalid-password.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username 'tomsmith' in the Username field
    - expect: Username field contains 'tomsmith'
  3. Enter password 'wrongpassword' in the Password field
    - expect: Password field is filled
  4. Click the Login button
    - expect: Page remains on https://the-internet.herokuapp.com/login
    - expect: Error alert is displayed at the top of the page
    - expect: Error message shows 'Your password is invalid!'
    - expect: Form fields retain their values
  5. Click the X button to dismiss the error message
    - expect: Error message is dismissed
    - expect: Form is ready for another login attempt

#### 2.3. Login fails with both credentials invalid

**File:** `tests/auth/both-credentials-invalid.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username 'wronguser' and password 'wrongpass'
    - expect: Form fields are filled
  3. Click the Login button
    - expect: Page remains on login page
    - expect: Error message is displayed as 'Your username is invalid!' (username is checked first)

### 3. Form Validation - Empty Fields

**Seed:** `tests/seed.spec.ts`

#### 3.1. Login fails when both fields are empty

**File:** `tests/auth/empty-fields.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Do not fill any fields and click the Login button
    - expect: Page remains on https://the-internet.herokuapp.com/login
    - expect: Error message displays 'Your username is invalid!'
    - expect: Error alert is dismissible with X button

#### 3.2. Login fails when only username is empty

**File:** `tests/auth/empty-username.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Leave Username field empty and enter password 'SuperSecretPassword!'
    - expect: Password field is filled
  3. Click the Login button
    - expect: Page remains on login page
    - expect: Error message shows 'Your username is invalid!'

#### 3.3. Login fails when only password is empty

**File:** `tests/auth/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username 'tomsmith' and leave Password field empty
    - expect: Username field is filled
  3. Click the Login button
    - expect: Page remains on login page
    - expect: Error message shows 'Your password is invalid!'

### 4. Case Sensitivity & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 4.1. Username is case-sensitive

**File:** `tests/auth/case-sensitive-username.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username 'TomSmith' (incorrect case) and correct password
    - expect: Form fields are filled with provided values
  3. Click the Login button
    - expect: Page remains on login page
    - expect: Error message shows 'Your username is invalid!'
    - expect: This confirms username validation is case-sensitive

#### 4.2. Password is case-sensitive

**File:** `tests/auth/case-sensitive-password.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username 'tomsmith' and password 'supersecretpassword!' (incorrect case)
    - expect: Form fields are filled with provided values
  3. Click the Login button
    - expect: Page remains on login page
    - expect: Error message shows 'Your password is invalid!'
    - expect: This confirms password validation is case-sensitive

#### 4.3. Whitespace in fields is treated as invalid

**File:** `tests/auth/whitespace-handling.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username ' tomsmith ' (with leading/trailing spaces) and correct password
    - expect: Form fields are filled with values including spaces
  3. Click the Login button
    - expect: Page remains on login page
    - expect: Error message shows 'Your username is invalid!' (spaces treated as part of username)

#### 4.4. Login with extra whitespace in password

**File:** `tests/auth/password-whitespace.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Enter username 'tomsmith' and password 'SuperSecretPassword! ' (with trailing space)
    - expect: Form fields are filled
  3. Click the Login button
    - expect: Page remains on login page
    - expect: Error message shows 'Your password is invalid!' (space treated as part of password)

### 5. UI/UX - Error Message Handling

**Seed:** `tests/seed.spec.ts`

#### 5.1. Error messages can be dismissed

**File:** `tests/auth/error-dismissal.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login and trigger an error by entering invalid username
    - expect: Error message is displayed
  2. Click the X button on the error alert
    - expect: Error message is dismissed
    - expect: Form remains visible and functional
    - expect: User can attempt login again

#### 5.2. Multiple failed login attempts show consistent error messages

**File:** `tests/auth/multiple-attempts.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Attempt login with invalid username 'user1' and click Login
    - expect: Error message 'Your username is invalid!' is displayed
  3. Dismiss the error and attempt login with invalid password for 'tomsmith'
    - expect: Error message 'Your password is invalid!' is displayed
  4. Dismiss the error and attempt login again with invalid username
    - expect: Error message 'Your username is invalid!' is displayed again
    - expect: Error handling is consistent across multiple attempts

### 6. Session & Navigation

**Seed:** `tests/seed.spec.ts`

#### 6.1. Cannot access secure area without authentication

**File:** `tests/auth/unauthorized-access.spec.ts`

**Steps:**
  1. Navigate directly to https://the-internet.herokuapp.com/secure without logging in
    - expect: User should be redirected to login page OR receive unauthorized message
    - expect: Secure content is not accessible without valid credentials

#### 6.2. Session persists after login

**File:** `tests/auth/session-persistence.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login and login with valid credentials
    - expect: Redirected to secure area
    - expect: Success message is displayed
  2. Refresh the page (or navigate within secure area)
    - expect: User remains logged in
    - expect: Secure content is still accessible

#### 6.3. Fork me on GitHub link is accessible

**File:** `tests/auth/github-link.spec.ts`

**Steps:**
  1. Navigate to https://the-internet.herokuapp.com/login
    - expect: Login page is displayed
  2. Verify the 'Fork me on GitHub' link is present
    - expect: GitHub link is visible in the top-right corner
    - expect: Link points to https://github.com/tourdedave/the-internet
