import Lotto from "../../src/domain/Lotto.js";
import WinningNumber from "../../src/domain/WinningNumber.js";
import LottoResult from "../../src/domain/LottoResult.js";

describe("등수 계산", () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
  const winningNumber = new WinningNumber(winningLotto, 7);

  test.each([
    { numbers: [1, 2, 3, 4, 5, 6], expectedPrize: 2_000_000_000 },
    { numbers: [1, 2, 3, 4, 5, 7], expectedPrize: 30_000_000 },
    { numbers: [1, 2, 3, 4, 5, 8], expectedPrize: 1_500_000 },
    { numbers: [1, 2, 3, 4, 9, 10], expectedPrize: 50_000 },
    { numbers: [1, 2, 3, 9, 10, 11], expectedPrize: 5_000 },
  ])("$numbers 의 상금은 $expectedPrize원", ({ numbers, expectedPrize }) => {
    const lotto = new Lotto(numbers);
    const result = new LottoResult([lotto], winningNumber);
    const matched = result.getPrizeList().find((r) => r.count > 0);
    expect(matched.prize).toBe(expectedPrize);
  });

  test("MISS는 집계되지 않는다", () => {
    const lotto = new Lotto([9, 10, 11, 12, 13, 14]);
    const result = new LottoResult([lotto], winningNumber);
    const totalCount = result
      .getPrizeList()
      .reduce((sum, r) => sum + r.count, 0);
    expect(totalCount).toBe(0);
  });
});
