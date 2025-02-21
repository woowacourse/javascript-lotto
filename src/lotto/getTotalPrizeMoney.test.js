import getTotalPrizeMoney from "./getTotalPrizeMoney.js";

describe("getTotalPrizeMoney 테스트", () => {
  test("로또 추첨 결과로 총 상금을 계산한다.", () => {
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
