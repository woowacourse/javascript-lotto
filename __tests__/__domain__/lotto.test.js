import Lotto from "../../src/domain/Lotto.js";

describe("로또 테스트", () => {
  const luckyNumbers = [1, 2, 3, 12, 20, 43];
  const bonusNumber = 7;

  test.each([
    [
      [1, 2, 3, 4, 5, 7],
      [2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8],
    ],
  ])(
    "로또번호에 보너스 번호가 포함되어 있으면 true를 리턴한다.",
    (lottoNumbers) => {
      const lotto = new Lotto(lottoNumbers);

      expect(lotto.hasBonusNumber(bonusNumber)).toBeTruthy();
    }
  );

  test("로또번호에 보너스 번호가 포함되어 있지 않으면 false를 리턴한다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.hasBonusNumber(bonusNumber)).toBeFalsy();
  });

  test("로또번호와 당첨번호가 모두 일치하는 경우 1을 리턴한다.", () => {
    const lotto = new Lotto([1, 2, 3, 12, 20, 43]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(1);
  });

  test("로또번호와 당첨번호가 5개 일치하고, 보너스 숫자가 일치하는 경우 2를 리턴한다.", () => {
    const lotto = new Lotto([1, 2, 3, 12, 20, 7]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(2);
  });

  test("로또번호와 당첨번호가 5개 일치하고, 보너스 숫자가 일치하지 않는 경우 3을 리턴한다.", () => {
    const lotto = new Lotto([1, 2, 3, 12, 20, 45]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(3);
  });

  test("로또번호와 당첨번호가 4개 일치하는 경우 4를 리턴한다.", () => {
    const lotto = new Lotto([1, 2, 3, 12, 21, 45]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(4);
  });

  test("로또번호와 당첨번호가 3개 일치하는 경우 5를 리턴한다.", () => {
    const lotto = new Lotto([1, 2, 4, 12, 21, 45]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(5);
  });

  test("로또번호와 당첨번호가 2개 일치하는 경우 0을 리턴한다.", () => {
    const lotto = new Lotto([1, 2, 4, 13, 21, 45]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(0);
  });

  test("로또번호와 당첨번호가 1개 일치하는 경우 0을 리턴한다.", () => {
    const lotto = new Lotto([1, 5, 4, 13, 21, 45]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(0);
  });

  test("로또번호와 당첨번호가 0개 일치하는 경우 0을 리턴한다.", () => {
    const lotto = new Lotto([23, 5, 4, 13, 21, 45]);

    expect(lotto.getRank(luckyNumbers, bonusNumber)).toBe(0);
  });
});
