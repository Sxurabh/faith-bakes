import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('renders contact section', async ({ page }) => {
    await page.goto('/#contact');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('can fill and submit form', async ({ page }) => {
    await page.goto('/#contact');
    
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'Hello!');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Message Sent!')).toBeVisible({ timeout: 5000 });
  });
});
