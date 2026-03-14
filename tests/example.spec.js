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
});
