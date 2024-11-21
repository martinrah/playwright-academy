const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {

    await page.goto('https://todomvc.com/examples/react/dist/');

});

test('SCENARIO: User should be able to add a new todo.', async ({ page }) => {

    await test.step('GIVEN: User has opened the todomvc todos page.', async () => {

    });

    await test.step('WHEN: User types a new todo and submits it. ', async () => {

        await page.getByTestId("text-input").fill("buy milk");
        await page.getByTestId("text-input").press("Enter");

    });

    await test.step('THEN: User should see the new todo got added.', async () => {

        await expect(page.getByTestId("todo-item-label")).toContainText("milk")
        await expect(page.getByTestId("todo-item-label")).toBeVisible();

    });

    // Different locators to target the 'needs to be done' input box
    // await page.getByPlaceholder("What needs to be done?");
    // await page.getByLabel("New Todo Input");
    // await page.locator("[class='new-todo']");
    // await page.locator("#todo-input");
    // await page.locator("input");
    // await page.locator("xpath=/html/body/section/header/div/input")
});

test('SCENARIO: User should be able to see the completed tasks when “Completed” filter is selected.', async ({ page }) => {

    await test.step('GIVEN: User is on the todo page and has entered one todo that has been completed.', async () => {

        await page.getByTestId("text-input").fill("buy milk");
        await page.getByTestId("text-input").press("Enter");
        await page.getByTestId('todo-item-toggle').click();
        await expect(page.getByTestId('todo-item-toggle')).toBeChecked();

    });

    await test.step('WHEN: User selects the “Completed” filter from the menu.', async () => {

        await page.getByRole('link', { name: 'Completed' }).click();

    });

    await test.step('THEN: User is able to see the completed todo task.', async () => {

        await expect(page).toHaveURL(/.*completed/)
        await expect(page.getByTestId("todo-item-label")).toBeVisible();

    });

});

test('SCENARIO: User should be able to edit existing todo item and change the name to a new one.', async ({ page }) => {

    await test.step('GIVEN: User has entered a task "buy milk" on the todo page.', async () => {

        await page.getByTestId("text-input").fill("buy milk");
        await page.getByTestId("text-input").press("Enter");
        await expect(page.getByTestId("todo-item-label")).toContainText("milk")

    });

    await test.step('WHEN: User double clicks on the task and changes the task name into "buy bread"', async () => {

        await page.getByTestId("todo-item-label").click({ clickCount: 2 })
        await page.getByTestId('todo-item').getByTestId('text-input').click({ clickCount: 3 })
        await page.keyboard.press("Backspace");
        await page.getByTestId('todo-item').getByTestId('text-input').fill("buy bread");
        await page.keyboard.press("Enter");
    });

    await test.step('THEN: The task name should get updated accordingly', async () => {

        await expect(page.getByTestId("todo-item-label")).toHaveText("buy bread");

    });

});