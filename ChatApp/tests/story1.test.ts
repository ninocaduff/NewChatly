import { test, expect } from '@playwright/test';

test('Header, Footer, und Content vorhanden', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('.footer')).toBeVisible();
  await expect(page.locator('.chat-page')).toBeVisible();
});

function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  return (
    '#' +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toLowerCase()
  );
}

test('Footer hat Farbe grün (#00802f)', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const footer = await page.locator('.footer');

  const backgroundColor = await footer.evaluate((el) =>
    window.getComputedStyle(el).backgroundColor
  );

  const hexColor = rgbToHex(backgroundColor);
  expect(hexColor).toBe('#00802f');
});

/*test('Page is in German by default', async ({ page }) => {
    await page.goto('http://localhost:4200');
  
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBe('de');
  });
*/

test.describe('Responsives Design', () => {
    const viewports = [
      { name: 'Desktop', width: 1280, height: 800 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Smartphone', width: 375, height: 667 }
    ];
  
    for (const vp of viewports) {
      test(`lädt korrekt auf ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('http://localhost:4200');
  
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('.footer')).toBeVisible();
      });
    }
  });

  test('Website lädt in unter 2 Sekunden', async ({ page }) => {
    const start = Date.now();
    await page.goto('http://localhost:4200', { waitUntil: 'load' });
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000);
  });