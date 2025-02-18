import { getTotalPrizeMoney } from "./getTotalPrizeMoney.js";

describe("generateLottoNumberSets 테스트", () => {
  test("3000원으로 로또 번호를 3개 구매한다.", () => {
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
