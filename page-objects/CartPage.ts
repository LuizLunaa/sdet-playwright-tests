import { Page, expect } from '@playwright/test';

export class CartPage {
    private page: Page;
    private readonly checkoutButton = '[data-test="checkout"]';
    private readonly continueShoppingButton = '[data-test="continue-shopping"]';
    private readonly removeButton = '[data-test="remove-sauce-labs-backpack"]';
    private readonly cartItem = '.cart_item';

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.click('.shopping_cart_link');
    }

    async getCartItems() {
        return await this.page.locator(this.cartItem).count();
    }

    async removeItem(index: number) {
        const removeButtons = await this.page.locator(this.removeButton).all();
        if (removeButtons[index]) {
            await removeButtons[index].click();
        }
    }

    async checkout() {
        await this.page.click(this.checkoutButton);
    }

    async continueShopping() {
        await this.page.click(this.continueShoppingButton);
    }
}
