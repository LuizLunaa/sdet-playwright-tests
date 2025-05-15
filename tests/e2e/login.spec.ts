import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { TEST_USERS } from '../../static-data/test-data';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Login with valid credentials', async ({ page }) => {
        await loginPage.login(TEST_USERS.STANDARD);
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Show error with invalid credentials', async () => {
        await loginPage.login({
            username: 'invalid_user',
            password: 'invalid_password',
        });
        await expect(await loginPage.isErrorVisible()).toBeTruthy();
    });

    test('Show error for blocked user', async () => {
        await loginPage.login(TEST_USERS.LOCKED);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('locked out');
    });

    test('Show error when login fields are empty', async ({ page }) => {
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="error"]')).toHaveText(
            'Epic sadface: Username is required'
        );
    });

    test('Logout with success', async ({ page }) => {
        await loginPage.login(TEST_USERS.STANDARD);
        await loginPage.logout();
        await expect(page).toHaveURL(/.*$/);
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });
});
