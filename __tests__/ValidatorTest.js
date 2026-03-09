import Validator from "../src/Validator.js";
import { ERROR_MESSAGE } from "../src/constants/errorMessage.js";

describe("유효성 검사 테스트", () => {
  const validator = new Validator();

  describe("구입 금액 테스트", () => {
    test.each([
      ["1000단위가 아닌 경우", 7500, ERROR_MESSAGE.INVALID_AMOUNT],
      ["양수 아닌 경우", -1, ERROR_MESSAGE.INVALID_AMOUNT],
      ["0인 경우 경우", 0, ERROR_MESSAGE.INVALID_AMOUNT],
      ["숫자가 아닌 경우", "ab", ERROR_MESSAGE.NOT_NUMBER],
    ])("%s, 예외가 발생해야 한다.", (description, price, errorMessage) => {
      expect(() => validator.validatePrice(price)).toThrow(errorMessage);
    });
  });

  describe("당첨 로또 테스트", () => {
    test.each([
      [
        "번호가 6개가 아닌 경우",
        [1, 2, 3, 4, 5],
        ERROR_MESSAGE.INVALID_NUMBER_LENGTH,
      ],
      [
        "모든 번호가 1~45 사이의 정수가 아닌 경우",
        [1, 2, 3, 4, 5, 50],
        ERROR_MESSAGE.INVALID_NUMBER_RANGE,
      ],
      [
        "모든 번호가 숫자가 아닌 경우",
        [1, 2, 3, 4, 5, "a"],
        ERROR_MESSAGE.NOT_NUMBER,
      ],
      [
        "중복된 숫자가 존재하는 경우",
        [1, 2, 3, 4, 5, 5],
        ERROR_MESSAGE.MUST_BE_NOT_DUPLICATE,
      ],
    ])(
      "%s, 예외가 발생해야 한다.",
      (description, WinningNumbers, errorMessage) => {
        expect(() => validator.validateLottoNumbers(WinningNumbers)).toThrow(
          errorMessage
        );
      }
    );
  });

  describe("보너스 번호 테스트", () => {
    test.each([
      [
        "번호가 1~45 사이의 정수가 아닌 경우",
        [1, 2, 3, 4, 5, 6],
        50,
        ERROR_MESSAGE.INVALID_NUMBER_RANGE,
      ],
      [
        "번호가 숫자가 아닌 경우",
        [1, 2, 3, 4, 5, 6],
        "a",
        ERROR_MESSAGE.NOT_NUMBER,
      ],
      [
        "로또 번호와 보너스 번호가 중복된 경우",
        [1, 2, 3, 4, 5, 6],
        6,
        ERROR_MESSAGE.MUST_BE_NOT_DUPLICATE_WITH_WINNINGNUMBER,
      ],
    ])(
      "%s, 예외가 발생해야 한다.",
      (description, lottoNumbers, bonusNumber, errorMessage) => {
        expect(() =>
          validator.validateBonusNumber(lottoNumbers, bonusNumber)
        ).toThrow(errorMessage);
      }
    );
  });
});
