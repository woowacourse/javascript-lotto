import { DECIMAL_PLACES, calculateProfitRate } from "../../src/utils/calculateProfitRate.js";


describe("구입 금액 대비 수익률을 계산해주는 함수 테스트", () => {
  test("구입 금액과 총 상금으로 수익률을 계산해 반환한다.", () => {
    const totalProfit = 5000;
    const money = 8000;
    const expectedProfitRate = 62.5;

    expect(calculateProfitRate(totalProfit, money)).toBe(expectedProfitRate.toFixed(DECIMAL_PLACES));
  });
});
