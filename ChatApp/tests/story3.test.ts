import { test, expect } from '@playwright/test';

test.describe('Story 3 & 4 - Chatfunktionen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://chatlyhsg.onrender.com');

    const nicknameDialog = page.locator('.nickname-dialog-overlay');
    const nicknameInput = page.locator('#nicknameInput');
    const startButton = page.locator('button:has-text("Starten")');

    if (await nicknameDialog.isVisible({ timeout: 3000 })) {
      const randomName = 'Testuser' + Math.floor(Math.random() * 100000);
      await nicknameInput.fill(randomName);
      await startButton.click();
    }

    await page.waitForSelector('.chat-bar', { timeout: 10000 });
  });

  test('Button ist erst aktiv, wenn das Eingabefeld nicht leer ist', async ({ page }) => {
    const messageInput = page.locator('#messageInput');
    const sendButton = page.locator('.chat-send-button');

    await messageInput.fill('');
    await expect(sendButton).toBeDisabled();

    await messageInput.fill('Hallo Welt');
    await expect(sendButton).toBeEnabled();

    await messageInput.fill('');
    await expect(sendButton).toBeDisabled();
  });

  test('Eingabefeld ist zentriert', async ({ page }) => {
    const textareaBox = await page.locator('.textarea-wrapper').boundingBox();
    const containerBox = await page.locator('.chat-bar').boundingBox();

    const textareaCenter = textareaBox.x + textareaBox.width / 2;
    const containerCenter = containerBox.x + containerBox.width / 2;

    expect(Math.abs(textareaCenter - containerCenter)).toBeLessThan(5);
  });

  test('UI bleibt stabil bei schnellem Eingeben', async ({ page }) => {
    const messageInput = page.locator('#messageInput');

    for (let i = 0; i < 10; i++) {
      await messageInput.type('Schneller Text ' + i + ' ', { delay: 10 });
    }

    await expect(page.locator('.chat-bar')).toBeVisible();
    await expect(page.locator('.char-counter-text')).toBeVisible();
  });

  test('Zeichenzähler wird korrekt aktualisiert', async ({ page }) => {
    const messageInput = page.locator('#messageInput');

    await messageInput.fill('');
    await expect(page.locator('.char-counter-text')).toContainText('0/500');

    await messageInput.fill('Hallo Welt');
    await expect(page.locator('.char-counter-text')).toContainText('10/500');

    await messageInput.fill('a'.repeat(100));
    await expect(page.locator('.char-counter-text')).toContainText('100/500');
  });

  test('Neue Nachricht wird korrekt in der Historie angezeigt', async ({ page }) => {
    const messageInput = page.locator('#messageInput');
    const sendButton = page.locator('.chat-send-button');
    const chatMessages = page.locator('app-chat-message');
  
    await messageInput.fill('Nachricht 1');
    await sendButton.click();
  
    await expect(chatMessages.nth(0)).toContainText('Nachricht 1');
  
    await messageInput.fill('Nachricht 2');
    await sendButton.click();
  
    await expect(chatMessages.nth(1)).toContainText('Nachricht 2');
  });
  
  test('Chatverlauf ist scrollbar bei vielen Nachrichten', async ({ page }) => {
    const messageInput = page.locator('#messageInput');
    const sendButton = page.locator('.chat-send-button');
    const chatMessages = page.locator('app-chat-message');
    const chatHistory = page.locator('.chat-history-container');
  
    const userPrefix = `User${Date.now()}`;
  
    for (let i = 0; i < 20; i++) {
      const text = `${userPrefix} – Testnachricht ${i}`;
      await messageInput.fill(text);
      await sendButton.click();
      await expect(chatMessages.filter({ hasText: text })).toHaveCount(1);
    }
  
    const matchingMessages = await chatMessages.filter({ hasText: userPrefix }).count();
    expect(matchingMessages).toBe(20);
  
    const scrollHeight = await chatHistory.evaluate(e => e.scrollHeight);
    const clientHeight = await chatHistory.evaluate(e => e.clientHeight);
    expect(scrollHeight).toBeGreaterThan(clientHeight);
  });   
});
