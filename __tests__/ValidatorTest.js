import Validator from "../src/Validator.js";

describe("유효성 검사 테스트", () => {
  const validator = new Validator();

  describe("구입 금액 테스트", () => {
    test.each([
      ["1000단위가 아닌 경우", 7500],
      ["양수 아닌 경우", -1],
      ["0인 경우 경우", 0],
      ["숫자가 아닌 경우", "ab"],
    ])("%s, 예외가 발생해야 한다.", (description, price) => {
      expect(() => validator.validatePrice(price)).toThrow("가격 예외 발생");
    });
  });

  describe("당첨 로또 테스트", () => {
    test.each([
      ["번호가 6개가 아닌 경우", [1, 2, 3, 4, 5]],
      ["모든 번호가 1~45 사이의 정수가 아닌 경우", [1, 2, 3, 4, 5, 50]],
      ["모든 번호가 숫자가 아닌 경우", [1, 2, 3, 4, 5, "a"]],
      ["중복된 숫자가 존재하는 경우", [1, 2, 3, 4, 5, 5]],
    ])("%s, 예외가 발생해야 한다.", (description, WinningNumbers) => {
      expect(() => validator.validateLottoNumbers(WinningNumbers)).toThrow(
        "번호 예외 발생",
      );
    });
  });

  describe("보너스 번호 테스트", () => {
    test.each([
      ["번호가 1~45 사이의 정수가 아닌 경우", [1, 2, 3, 4, 5, 6], 50],
      ["번호가 숫자가 아닌 경우", [1, 2, 3, 4, 5, 6], "a"],
      ["로또 번호와 보너스 번호가 중복된 경우", [1, 2, 3, 4, 5, 6], 6],
    ])(
      "%s, 예외가 발생해야 한다.",
      (description, lottoNumbers, bonusNumber) => {
        expect(() =>
          validator.validateBonusNumber(lottoNumbers, bonusNumber),
        ).toThrow("번호 예외 발생");
      },
    );
  });
});
