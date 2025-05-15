import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { CartPage } from '../../page-objects/CartPage';
import { TEST_USERS } from '../../static-data/test-data';

test.describe('Cart Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.navigate();
        await loginPage.login(TEST_USERS.STANDARD);
    });

    test('Add item to cart', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.navigate();
        expect(await cartPage.getCartItems()).toBe(1);
    });

    test('Remove item from cart', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.navigate();
        await cartPage.removeItem(0);
        expect(await cartPage.getCartItems()).toBe(0);
    });

    test('Continue shopping after viewing cart', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.navigate();
        await cartPage.continueShopping();
        await expect(await inventoryPage.getCurrentUrl()).toMatch(
            /.*inventory.html/
        );
    });

    test('Keep items in cart after logout and login', async () => {
        const productName = 'Sauce Labs Backpack';
        await inventoryPage.addToCart(productName);
        expect(await inventoryPage.getCartItemsCount()).toBe(1);

        await loginPage.logout();
        await loginPage.login(TEST_USERS.STANDARD);

        expect(await inventoryPage.getCartItemsCount()).toBe(1);
        await cartPage.navigate();
        expect(await cartPage.getCartItems()).toBe(1);
    });

    test('Complete checkout process successfully', async ({ page }) => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.navigate();
        await cartPage.checkout();

        await page.fill('[data-test="firstName"]', 'Luiz');
        await page.fill('[data-test="lastName"]', 'Luna');
        await page.fill('[data-test="postalCode"]', '13212448');
        await page.click('[data-test="continue"]');
        await page.click('[data-test="finish"]');

        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.locator('[data-test="complete-header"]')).toHaveText(
            'Thank you for your order!'
        );
    });

    test('Show error on empty checkout form', async ({ page }) => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await cartPage.navigate();
        await cartPage.checkout();
        await page.click('[data-test="continue"]');

        await expect(page.locator('[data-test="error"]')).toHaveText(
            'Error: First Name is required'
        );
    });
});
