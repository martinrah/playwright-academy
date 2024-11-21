// @ts-check
const { test, expect } = require('@playwright/test');

test.skip('Google Playwright getting started', async ({ page }) => {

    await page.goto('https://google.pl');

    // await page.getByRole("button", { name: "Keeldu kõigist" }).click();
    await page.locator("#L2AGLb").click();
});