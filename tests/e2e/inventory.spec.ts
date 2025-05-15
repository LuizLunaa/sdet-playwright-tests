import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { TEST_USERS } from '../../static-data/test-data';

test.describe('Inventory Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.navigate();
        await loginPage.login(TEST_USERS.STANDARD);
    });

    test('Sort products by name (A-Z)', async () => {
        await inventoryPage.sortProducts('az');
        const products = await inventoryPage.getAllProductNames();
        const sortedProducts = [...products].sort((a, b) => a.localeCompare(b));
        expect(products).toEqual(sortedProducts);
    });

    test('Sort products by name (Z-A)', async () => {
        await inventoryPage.sortProducts('za');
        const products = await inventoryPage.getAllProductNames();
        const sortedProducts = [...products].sort((a, b) => b.localeCompare(a));
        expect(products).toEqual(sortedProducts);
    });

    test('Navigate to product page when clicking on it', async ({ page }) => {
        const productName = 'Sauce Labs Backpack';
        await inventoryPage.clickProduct(productName);
        await expect(page).toHaveURL(/.*inventory-item.html/);
        await expect(page.locator('.inventory_details_name')).toHaveText(
            productName
        );
    });

    test('Sort products by price (low to high)', async () => {
        await inventoryPage.sortProducts('lohi');
        const prices = await inventoryPage.getAllProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('Sort products by price (high to low)', async () => {
        await inventoryPage.sortProducts('hilo');
        const prices = await inventoryPage.getAllProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });
});
