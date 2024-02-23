import ProfitCalculator, { AMOUNT } from "../src/domain/ProfitCalculator.js";

describe("ProfitCalculator 테스트", () => {
  const testCases = [
    {
      lottoRankResult: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
      budget: 15000,
      expectedProfit: ((2000000000 + 2 * 30000000 + 3 * 1500000 + 4 * 50000 + 5 * 5000) / 15000) * 100,
    },
    {
      lottoRankResult: { 1: 0, 2: 1, 3: 0, 4: 2, 5: 3 },
      budget: 15000,
      expectedProfit: ((1 * 30000000 + 2 * 50000 + 3 * 5000) / 15000) * 100,
    },
    {
      lottoRankResult: { 1: 2, 2: 3, 3: 1, 4: 0, 5: 0 },
      budget: 15000,
      expectedProfit: ((2 * 2000000000 + 3 * 30000000 + 1 * 1500000) / 15000) * 100,
    },
  ];

  test.each(testCases)(
    "lottoRankResult가 '$lottoRankResult'이고 budget이 '$budget'일 때 calculateProfit은 '$expectedProfit'이어야 한다.",
    ({ lottoRankResult, budget, expectedProfit }) => {
      const profit = ProfitCalculator.calculateProfit(lottoRankResult, budget);
      expect(profit).toBe(expectedProfit);
    }
  );
});
