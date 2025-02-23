import Lotto from "../../src/models/Lotto.js";

describe("models/Lotto", () => {
  test("로또 객체를 만들 수 있다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);

    expect(lotto.numbers).toEqual(numbers);
  });

  test("당첨 로또와 나의 로또를 비교하여 당첨 번호 수를 반환한다.", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const myLotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(myLotto.getMatchCount(winningNumbers)).toBe(6);
  });

  test.each([
    [45, true],
    [30, false],
  ])(
    "나의 로또에서 보너스 번호와 일치하는 번호가 있으면 true 없으면 false를 반환한다.",
    (bonusNumber, result) => {
      const myLotto = new Lotto([1, 2, 3, 4, 5, 45]);

      expect(myLotto.getBonusMatched(bonusNumber)).toBe(result);
    }
  );
});
