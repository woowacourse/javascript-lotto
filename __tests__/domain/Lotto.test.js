import Lotto from "../../src/domain/lotto.js";

test("로또 번호와 당첨 번호가 몇 개가 일치하는지 계산한다.", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  expect(lotto.matchCount([3, 4, 5, 6, 7, 8])).toBe(4);
});
