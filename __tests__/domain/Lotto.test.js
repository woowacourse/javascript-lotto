import Lotto from "../../src/domain/Lotto.js";

describe("Lotto", () => {
  test("숫자가 포함되어 있으면 true", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.hasNumber(1)).toBe(true);
  });
});
