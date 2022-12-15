import { test, expect } from '@playwright/test';
import * as fsPromises from 'fs/promises';

test('Homepage has correct title', async ({ page }) => {
  await page.goto('http://localhost:4500');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/The App/);
});

test('Homepage download works', async ({ page }) => {
  await page.goto('http://localhost:4500');

  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-qa=btn-download]').click()
  ]);

  const path = await download.path();
  expect(typeof path).toEqual('string');
  expect(path).toBeTruthy();

  const data = await fsPromises.readFile(path as string, { encoding: 'utf8' });
  console.log('data', data);
  expect(typeof data).toEqual('string');
  expect(data).toEqual('Download test');
});
