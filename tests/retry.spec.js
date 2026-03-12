import { test, expect } from '@playwright/test';

test.describe('재시작 버튼 테스트하기', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('다시 시작하기 버튼을 누르면 첫 화면이 나온다.', async({ page }) => {
    await page.getByPlaceholder('금액').fill('3000');
    
    await page.getByRole('button', { name: '구입' }).click();

    const winningInputs = page.locator(".winningInput");
    const allWinningInputs = await winningInputs.all();
    for (let i = 0; i < allWinningInputs.length; i++) {
      await allWinningInputs[i].fill(`${i + 1}`);
    }

    await page.locator('#bonusInput').fill('7');

    await page.getByRole('button', { name: '결과 확인하기'}).click();

    await page.getByRole('button', { name: '다시 시작하기'}).click();

    const visible = page.locator("#purchaseForm");

    const hidden = [
      page.locator("#myLotto"),
      page.locator("#winningDiv"),
      page.locator("#getResultButton"),
      page.locator('#resultModal'),
    ];

    await expect(visible).toBeVisible();
    
    for (const element of hidden) {
      await expect.soft(element).toBeHidden();
    }
  });
})
