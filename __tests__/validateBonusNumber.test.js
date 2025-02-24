import {
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../src/constants/validateConstants.js";
import { BONUS_NUMBER_ERROR_MESSAGES } from "../src/constants/errorConstants.js";
import validateBonusNumber from "../src/validations/validateBonusNumber.js";

describe("보너스 번호 유효성 테스트", () => {
  const winningNumbers = [11, 12, 13, 14, 15, 16];

  describe("잘못된 입력값에 대한 검증", () => {
    test.each([
      {
        description: "숫자가 아닌 경우",
        input: "숫자아님",
        expectedErrorMessage: BONUS_NUMBER_ERROR_MESSAGES.NOT_A_NUMBER,
      },
      {
        description: "정수가 아닌 경우",
        input: "1.1",
        expectedErrorMessage: BONUS_NUMBER_ERROR_MESSAGES.NOT_AN_INTEGER,
      },
    ])(
      "보너스 번호가 $description 에러가 발생한다.",
      ({ input, expectedErrorMessage }) => {
        expect(() => {
          validateBonusNumber(input, winningNumbers);
        }).toThrow(expectedErrorMessage);
      }
    );

    test.each([
      {
        description: `${MIN_LOTTO_NUMBER} 미만인 경우`,
        input: `${MIN_LOTTO_NUMBER - 1}`,
      },
      {
        description: `${MAX_LOTTO_NUMBER} 초과인 경우`,
        input: `${MAX_LOTTO_NUMBER + 1}`,
      },
    ])("보너스 번호가 $description 에러가 발생한다.", ({ input }) => {
      expect(() => {
        validateBonusNumber(input, winningNumbers);
      }).toThrow(BONUS_NUMBER_ERROR_MESSAGES.OUT_OF_RANGE);
    });

    test("당첨 번호와 중복된 경우 에러가 발생한다.", () => {
      expect(() => {
        validateBonusNumber("11", winningNumbers);
      }).toThrow(BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE_NUMBER);
    });
  });

  describe("정상적인 입력값 검증", () => {
    test.each([
      {
        description: "최소값 경계인 경우",
        input: `${MIN_LOTTO_NUMBER}`,
      },
      {
        description: "최대값 경계인 경우",
        input: `${MAX_LOTTO_NUMBER}`,
      },
    ])("보너스 번호가 $description 정상적으로 통과해야 한다.", ({ input }) => {
      expect(() => {
        validateBonusNumber(input, winningNumbers);
      }).not.toThrow();
    });
  });
});
