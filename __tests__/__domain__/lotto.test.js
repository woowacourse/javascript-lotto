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
});
