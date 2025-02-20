import BonusNumberValidator from "../src/validation/BonusNumberValidator";

describe("보너스 번호 유효성 검사를 진행한다", () => {
  test("로또 번호중에 보너스 번호와 중복된 숫자가 있으면 오류를 발생시킨다.", () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 9];
    const bonusNumber = 9;
    const bonusValidator = new BonusNumberValidator();

    expect(() =>
      bonusValidator.validateBonusNumber(lottoNumbers, bonusNumber)
    ).toThrow("[ERROR]");
  });
});
