import Lotto from "../src/Lotto.js";

describe("로또 테스트", () => {
  test("로또는 번호를 가질수 있다.", () => {
    // given
    const numbers = [1, 2, 3, 4, 5, 6];
    // when
    const lotto = new Lotto(numbers);
    // then
    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test.each([
    [[7, 8, 9, 10, 11, 12], 0],
    [[6, 7, 8, 9, 10, 11], 1],
  ])(
    "로또는 당첨번호와 몇개가 일치하는지 확인할수 있다.",
    (targetNumber, result) => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const lotto = new Lotto(numbers);

      const corretNumber = lotto.getCorretNumber(targetNumber);
      expect(corretNumber).toBe(result);
    },
  );
});
