import getTotalPrizeMoney from "./getTotalPrizeMoney.js";

describe("generateLottoNumberSets 테스트", () => {
  test("3개 일치 - 1개, 6개 일치 - 1개이면 2,000,005,000원의 상금을 받는다.", () => {
    const result = new Map([
      [3, 1],
      [4, 0],
      [5, 0],
      ["5B", 0],
      [6, 1],
    ]);

    const prizeMoney = getTotalPrizeMoney(result);
    expect(prizeMoney).toBe(2_000_005_000);
  });
});
