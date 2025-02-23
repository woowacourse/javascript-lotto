import ERROR_MESSAGE from "../src/constant/error.js";
import { LOTTO } from "../src/constant/lotto.js";
import PRICE from "../src/constant/price.js";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestart,
  validateWinningNumbers,
} from "../src/util/validate.js";

describe("validate", () => {
  describe("PurchaseAmount", () => {
    describe("예외 케이스", () => {
      test("숫자가 아닌 경우", () => {
        const str = "aaa";

        expect(() =>
          validatePurchaseAmount(str).toThrow(ERROR_MESSAGE.NOT_A_NUMBER),
        );
      });

      test(`${PRICE.UNIT} 미만인 경우`, () => {
        const price = 500;

        expect(() =>
          validatePurchaseAmount(price).toThrow(ERROR_MESSAGE.UNDER_MIN_PRICE),
        );
      });

      test(`${PRICE.MAX} 초과인 경우`, () => {
        const price = 100001;

        expect(() =>
          validatePurchaseAmount(price).toThrow(ERROR_MESSAGE.EXCEED_MAX_PRICE),
        );
      });

      test(`${PRICE.UNIT}으로 나누어 떨이지지 않는 경우`, () => {
        const price = 1001;

        expect(() =>
          validatePurchaseAmount(price).toThrow(ERROR_MESSAGE.NOT_DIVIDED_1000),
        );
      });
    });

    describe("정상 케이스", () => {
      test("정상적인 구입 금액이 입력된 경우", () => {
        const price = 3000;

        expect(() => validatePurchaseAmount(price)).not.toThrow();
      });
    });
  }),
    describe("restart", () => {
      describe("예외 케이스", () => {
        test.each([["우디"], ["k"], ["에리얼"], ["오거스"], [1], [""]])(
          "y or n이 아니면 에러가 발생한다.",
          (input) => {
            expect(() => validateRestart(input)).toThrow(
              ERROR_MESSAGE.YES_OR_NO,
            );
          },
        );
      });

      describe("정상 케이스", () => {
        test.each([["y"], ["Y"], ["n"], ["N"]])(
          "y or n이 입력되면 에러가 발생하지 않는다.",
          (input) => {
            expect(() => validateRestart(input)).not.toThrow();
          },
        );
      });
    });

  describe("BonusNumber", () => {
    describe("예외 케이스", () => {
      test(`숫자가 아닌 값인 경우`, () => {
        const numbers = "1, 2, 3, 4, 5, 6";
        const str = "에리얼";

        expect(() =>
          validateBonusNumber(str, numbers).toThrow(ERROR_MESSAGE.NOT_A_NUMBER),
        );
      });

      test(`${LOTTO.MIN_RANDOM_VALUE}~${LOTTO.MAX_RANDOM_VALUE} 사이의 숫자가 아닌 경우`, () => {
        const numbers = "1, 2, 3, 4, 5, 6";
        const outOfRangeNumber = "46";

        expect(() => validateBonusNumber(outOfRangeNumber, numbers)).toThrow(
          ERROR_MESSAGE.NUMBER_OUT_OF_RANGE,
        );
      });

      test(`중복된 번호가 있는 경우`, () => {
        const numbers = "1, 2, 3, 4, 5, 6";
        const duplicatedNumber = "6";

        expect(() => validateBonusNumber(duplicatedNumber, numbers)).toThrow(
          ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER,
        );
      });
    });

    describe("정상 케이스", () => {
      const numbers = "1, 2, 3, 4, 5, 6";

      test.each([["7"], ["10"]])(
        "당첨 번호와 중복되지 않는 올바른 숫자가 입력된 경우",
        (bonus) => {
          expect(() => validateBonusNumber(bonus, numbers)).not.toThrow();
        },
      );
    });
  });

  describe("Lotto ", () => {
    describe("예외 케이스", () => {
      test(`당첨 번호의 길이는 ${LOTTO.LENGTH}이다`, () => {
        const numbers = "1,2,3,4,5";

        expect(() => validateWinningNumbers(numbers)).toThrow(
          ERROR_MESSAGE.LOTTO_LENGTH,
        );
      });

      test(`중복되는 번호가 있는 경우`, () => {
        const numbers = "1,2,3,4,5,5";

        expect(() => validateWinningNumbers(numbers)).toThrow(
          ERROR_MESSAGE.DUPLICATE_WINNING_NUMBER,
        );
      });

      test(`1~45 사이의 숫자가 아닌 값이 포함되어 있는 경우`, () => {
        const numbers = "1,2,3,4,5,66";

        expect(() => validateWinningNumbers(numbers)).toThrow(
          ERROR_MESSAGE.NUMBER_OUT_OF_RANGE,
        );
      });

      test(`숫자가 아닌 값이 포함되어 있는 경우`, () => {
        const numbers = "1,a,3,4,5,6";

        expect(() => validateWinningNumbers(numbers)).toThrow(
          ERROR_MESSAGE.NOT_A_NUMBER,
        );
      });
    });

    describe("정상 케이스", () => {
      test("정상 당첨 번호인 경우", () => {
        const numbers = "1,2,3,4,5,6";

        expect(() => validateWinningNumbers(numbers)).not.toThrow();
      });
    });
  });
});
