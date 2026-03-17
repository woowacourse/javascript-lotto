import { test, expect } from '@playwright/test';

test.describe('로또 결과 테스트하기', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('결과 확인하기 버튼을 누르면 로또 당첨 결과가 나온다.', async({ page }) => {
    await page.getByPlaceholder('금액').fill('3000');
    
    await page.getByRole('button', { name: '구입' }).click();

    const winningNumbersInput = page.locator(".winning-numbers-input");
    const allWinningInputs = await winningNumbersInput.all();
    for (let i = 0; i < allWinningInputs.length; i++) {
      await allWinningInputs[i].fill(`${i + 1}`);
    }

    await page.locator('#bonus-number-input').fill('7');

    await page.getByRole('button', { name: '결과 확인하기'}).click();

    const testList = [
      page.getByText('🏆 당첨 통계 🏆'),
      page.getByText('일치 갯수'),
      page.getByText('당첨금'),
      page.getByText('당첨 갯수'),
      page.getByText('당신의 총 수익률'),
      page.getByRole('button', { name: "다시 시작하기" }),
    ];

    for (const element of testList) {
      await expect.soft(element).toBeVisible();
    }
  })
})
