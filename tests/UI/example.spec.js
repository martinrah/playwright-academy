// @ts-check
const { test, expect } = require('@playwright/test');

test('has page title Playwright', async ({ page }) => {

  // Navigating to the playwright website
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Navigate to Playwright API page and validate it got there', async ({ page }) => {

  await page.goto("https://playwright.dev");

  await page.getByRole("link", { name: "API" }).click();

  await expect(page).toHaveURL(/class-playwright/);
  await expect(page).toHaveTitle("Playwright Library | Playwright");
  await expect(page.getByRole("heading", { name: "Playwright Library" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Playwright Library" })).toHaveText("Playwright Library")

});

test('Navigate to the locators Playwright tutorial page using the search functionality', async ({ page }) => {

  await page.goto("https://playwright.dev");  // open the playwright webpage

  await page.getByLabel('Search').click();  // click on the search box at the right top corner - new search field will appear

  await page.getByPlaceholder('Search docs').fill("locators");  // fill the new search field with 'locators' text

  await page.getByRole('link', { name: 'Locators', exact: true }).click();  // click the Locators result from found links

  await expect(page.getByRole('heading', { name: 'Locators', exact: true })).toBeVisible();  // validate the Locators heading is visible and we are on the correct page

});
