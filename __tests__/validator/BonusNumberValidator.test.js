import { LOTTO_NUMBER_RANGE } from "../../src/constants/lotto-constants";
import bonusNumberValidator from "../../src/validator/BonusNumberValidator";

describe("bonusNumberValidator 객체 테스트", () => {
  const WINNING_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

  test("보너스 번호와 당첨 번호가 중복되면 오류를 던진다.", () => {
    const duplicatedBonusNumber = WINNING_LOTTO_NUMBERS[0];

    expect(() =>
      bonusNumberValidator.validateDuplication({
        winningLottoNumbers: WINNING_LOTTO_NUMBERS,
        bonusNumber: duplicatedBonusNumber,
      }),
    ).toThrow();
  });

  describe(`보너스 번호가 ${LOTTO_NUMBER_RANGE.MIN} ~ ${LOTTO_NUMBER_RANGE.MAX}이 아니면 오류를 던진다.`, () => {
    test.each([LOTTO_NUMBER_RANGE.MIN, LOTTO_NUMBER_RANGE.MAX])(
      "엣지 ) 보너스 번호가 %d이면 오류를 던지지 않는다.",
      (bonusNumber) => {
        expect(() =>
          bonusNumberValidator.validateRange(bonusNumber),
        ).not.toThrow();
      },
    );

    test.each([LOTTO_NUMBER_RANGE.MIN - 1, LOTTO_NUMBER_RANGE.MAX + 1])(
      "예외 ) 보너스 번호가 %d이면 오류를 던진다.",
      (bonusNumber) => {
        expect(() => bonusNumberValidator.validateRange(bonusNumber)).toThrow();
      },
    );
  });

  test(`보너스 번호는 숫자만 입력 할 수 있다.`, () => {
    const isNaNInput = "1번";

    expect(() => bonusNumberValidator.validateIsNumber(isNaNInput)).toThrow();
  });
});
