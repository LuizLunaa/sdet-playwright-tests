import { Page, expect } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    private readonly sortSelect = '[data-test="product-sort-container"]';
    private readonly productPrice = '.inventory_item_price';
    private readonly productName = '.inventory_item_name';
    private readonly addToCartButton = (name: string) =>
        `[data-test="add-to-cart-${name.toLowerCase().replace(/ /g, '-')}"]`;
    private readonly removeButton = (name: string) =>
        `[data-test="remove-${name.toLowerCase().replace(/ /g, '-')}"]`;
    private readonly cartBadge = '.shopping_cart_badge';

    constructor(page: Page) {
        this.page = page;
    }

    async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.page.selectOption(this.sortSelect, option);
    }

    async addToCart(productName: string) {
        await this.page.locator(this.addToCartButton(productName)).click();
    }

    async removeFromCart(productName: string) {
        await this.page.locator(this.removeButton(productName)).click();
    }

    async getCartItemsCount() {
        const badge = await this.page.locator(this.cartBadge);
        if (await badge.isVisible()) {
            return parseInt((await badge.textContent()) || '0');
        }
        return 0;
    }

    async getAllProductPrices() {
        return await this.page.$$eval(this.productPrice, (elements) =>
            elements.map((e) =>
                parseFloat(e.textContent?.replace('$', '') || '0')
            )
        );
    }

    async getAllProductNames() {
        return await this.page.$$eval(this.productName, (elements) =>
            elements.map((e) => e.textContent || '')
        );
    }

    async clickProduct(productName: string) {
        await this.page
            .locator(this.productName)
            .filter({ hasText: productName })
            .click();
    }

    async getCurrentUrl() {
        return this.page.url();
    }
}
