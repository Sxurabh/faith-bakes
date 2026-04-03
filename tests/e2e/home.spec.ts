import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Faith Bakes/i);
  });

  test('shows navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('hero section renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('section').first()).toBeVisible();
  });
});
