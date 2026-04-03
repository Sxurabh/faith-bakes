import { test, expect } from '@playwright/test';

test.describe('Customizer', () => {
  test('renders customizer section', async ({ page }) => {
    await page.goto('/#customizer');
    await expect(page.locator('#customizer')).toBeVisible();
  });

  test('can select options', async ({ page }) => {
    await page.goto('/#customizer');
    
    await page.click('text=Cupcake');
    await expect(page.locator('text=Flavor')).toBeVisible();
  });

  test('updates price', async ({ page }) => {
    await page.goto('/#customizer');
    
    await page.click('text=Cupcake');
    await expect(page.locator('text=$4.50')).toBeVisible();
  });
});
