
import { test, expect } from '@playwright/test';

test.describe('로또 구입 금액 입력 테스트하기', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('올바른 로또 구입 금액을 입력하면 발급 로또 리스트, 당첨 번호와 보너스 번호 입력칸, 결과 확인하기 버튼이 나온다.', async({ page }) => {
    await page.getByPlaceholder('금액').fill('3000');

    await page.getByRole('button', { name: '구입' }).click();

    const testList = [
      page.getByText('총 3개를 구매하였습니다.'),
      page.getByText('지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.'),
      page.getByText('당첨 번호'),
      page.getByText('보너스 번호'),
      page.getByRole('button', { name: '결과 확인하기' }),
    ];

    for (const element of testList) {
      await expect.soft(element).toBeVisible();
    }
  });
})
