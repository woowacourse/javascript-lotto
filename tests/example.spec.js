import { test, expect } from "@playwright/test";

test("금액 입력 후 구매 시 로또 리스트와 당첨 번호 입력창이 나타난다", async ({
  page,
}) => {
  await page.goto("/");

  const $input = page.locator(".purchase-form-input");
  await $input.fill("3000");
  await page.click(".purchase-form-button");

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

  const modal = page.locator(".modal-overlay");
  await expect(modal).toHaveClass(/active/);

  const statisticsTable = page.locator(".statistics-table");
  await expect(statisticsTable).toBeVisible();

  const profitRate = page.locator(".profit-rate");
  await expect(profitRate).toContainText("수익률");
});

// 만든 후
test("로또 구매부터 당첨 통계 확인, 다시 시작까지의 전체 흐름", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.__MOCK_PICKER__ = () => [1, 2, 3, 10, 11, 12];
  });

  await page.goto("/");

  const $purchaseInput = page.locator(".purchase-form-input");
  await $purchaseInput.fill("3000");
  await page.click(".purchase-form-button");

  await expect(page.locator(".lotto-item")).toHaveCount(3);

  const winningNumbers = ["1", "2", "3", "4", "5", "6"];
  const $winningInputs = page.locator(".winning-number-input");
  for (let i = 0; i < 6; i++) {
    await $winningInputs.nth(i).fill(winningNumbers[i]);
  }
  await page.locator(".bonus-number-input").fill("7");

  await page.click(".open-result-button");

  const fifthRankCount = page.locator('[data-rank="5"] [data-field="count"]');
  await expect(fifthRankCount).toHaveText("3개");

  const firstRankCount = page.locator('[data-rank="1"] [data-field="count"]');
  await expect(firstRankCount).toHaveText("0개");

  const profitRate = page.locator(".profit-rate");
  await expect(profitRate).toContainText("500.0");

  await page.click(".retry-button");

  await expect(page.locator(".purchase-form-input")).toHaveValue("");
  await expect(page.locator(".lotto-item")).toHaveCount(0);
  await expect(page.locator(".winning-section")).not.toBeVisible();
});
