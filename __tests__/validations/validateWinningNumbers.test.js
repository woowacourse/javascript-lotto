import { ERROR_MESSAGE } from "../../src/constants/error.js";
import {
  validateLength,
  validateRange,
  validateDuplicate,
  validateBonusNumber,
} from "../../src/validations/validateWinningNumbers.js";

describe("validations/validateWinningNumbers", () => {
  describe("validateWinningNumbers()", () => {
    test("입력받은 배열이 모두 1~45 사이의 숫자여야 한다.", () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      numbers.forEach((number) => {
        expect(() => validateRange(number)).not.toThrow();
      });
    });

    test.each([[[0]], [[46]], ["a"]])(
      "입력받은 배열이 범위를 벗어나면 에러를 출력한다.",
      (input) => {
        expect(() => validateRange(input)).toThrow(
          ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE
        );
      }
    );

    test("입력받은 배열의 길이는 6이어야 한다.", () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      expect(() => validateLength(numbers)).not.toThrow();
    });

    test("입력받은 배열의 길이는 6이 아니면 에러를 출력한다.", () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7];
      expect(() => validateLength(numbers)).toThrow(
        ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH
      );
    });

    test("입력받은 배열은 중복된 숫자를 포함하지 않아야 한다.", () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      expect(() => validateDuplicate(numbers)).not.toThrow();
    });

    test("입력받은 배열이 중복된 숫자를 포함하면 에러를 출력한다.", () => {
      const numbers = [1, 2, 3, 4, 5, 5];
      expect(() => validateDuplicate(numbers)).toThrow(
        ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER
      );
    });
  });

  describe("validateBonusNumber()", () => {
    test("보너스 번호는 당첨 번호와 중복되어서는 안된다.", () => {
      const bonusNumber = 7;
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      expect(() =>
        validateBonusNumber(bonusNumber, winningNumbers)
      ).not.toThrow();
    });

    test("보너스 번호가 당첨 번호와 중복되면 에러를 출력한다.", () => {
      const bonusNumber = 6;
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      expect(() => validateBonusNumber(bonusNumber, winningNumbers)).toThrow(
        ERROR_MESSAGE.INVALID_BONUS_NUMBER
      );
    });
  });
});
