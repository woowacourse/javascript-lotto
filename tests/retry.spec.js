import { test, expect } from '@playwright/test';

test.describe('재시작 버튼 테스트하기', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('다시 시작하기 버튼을 누르면 첫 화면이 나온다.', async({ page }) => {
    await page.getByPlaceholder('금액').fill('3000');
    
    await page.getByRole('button', { name: '구입' }).click();

    const winningNumbersInput = page.locator(".winning-numbers-input");
    const allWinningInputs = await winningNumbersInput.all();
    for (let i = 0; i < allWinningInputs.length; i++) {
      await allWinningInputs[i].fill(`${i + 1}`);
    }

    await page.locator('#bonus-number-input').fill('7');

    await page.getByRole('button', { name: '결과 확인하기'}).click();

    await page.getByRole('button', { name: '다시 시작하기'}).click();

    const visible = page.locator("#purchase-form");

    const hidden = [
      page.locator("#myLotto-section"),
      page.locator("#winning-bonus-section"),
      page.locator("#result-button"),
      page.locator('#result-modal'),
    ];

    await expect(visible).toBeVisible();
    
    for (const element of hidden) {
      await expect.soft(element).toBeHidden();
    }
  });
})
