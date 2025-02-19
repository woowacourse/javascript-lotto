import Lotto from "../src/domain/Lotto.js";

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

  test("로또는 보너스 번호를 가지고 있는 지 확인할 수 있다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);
    const bonusNumber1 = 6;
    const bonusNumber2 = 7;
    expect(lotto.hasBonusNumber(bonusNumber1)).toBe(true);
    expect(lotto.hasBonusNumber(bonusNumber2)).toBe(false);
  });
});
