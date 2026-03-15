import { test, expect } from "@playwright/test";

test("금액 입력 후 구매 시 로또 리스트와 당첨 번호 입력창이 나타난다", async ({
  page,
}) => {
  await page.goto("/");

  const $input = page.locator(".purchase-amount-input");
  await $input.fill("3000");
  await page.click(".purchase-button");

  const lottoItems = page.locator(".lotto-item");
  await expect(lottoItems).toHaveCount(3);

  const winningSection = page.locator(".winning-section");
  await expect(winningSection).toBeVisible();

  const winningInputs = page.locator(".winning-number-input");
  const winningNumbers = ["1", "2", "3", "4", "5", "6"];

  for (let i = 0; i < winningNumbers.length; i++) {
    await winningInputs.nth(i).fill(winningNumbers[i]);
  }

  const bonusInput = page.locator(".bonus-number-input");
  await bonusInput.fill("7");

  await page.click(".open-result-button");

  const lottoResult = page.locator(".lotto-result");
  await expect(lottoResult.first()).toBeVisible();

  const profitRate = page.locator(".lotto-profitRate");
  await expect(profitRate).toContainText("수익률");
});
