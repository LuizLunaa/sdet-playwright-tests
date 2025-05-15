import { Page, expect } from '@playwright/test';
import { UserCredentials } from '../static-data/test-data';

export class LoginPage {
    private page: Page;

    private readonly usernameInput = '[data-test="username"]';
    private readonly passwordInput = '[data-test="password"]';
    private readonly loginButton = '[data-test="login-button"]';
    private readonly errorMessage = '[data-test="error"]';
    private readonly burgerMenu = '#react-burger-menu-btn';
    private readonly logoutLink = '#logout_sidebar_link';

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(credentials: UserCredentials) {
        await this.page.fill(this.usernameInput, credentials.username);
        await this.page.fill(this.passwordInput, credentials.password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        const error = await this.page.locator(this.errorMessage);
        return error.textContent();
    }

    async isErrorVisible() {
        const error = await this.page.locator(this.errorMessage);
        return await error.isVisible();
    }

    async logout() {
        await this.page.click(this.burgerMenu);
        await this.page.click(this.logoutLink);
    }
}
