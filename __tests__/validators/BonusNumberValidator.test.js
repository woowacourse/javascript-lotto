import { KEY, LOTTO } from '../../src/constants/CONFIGURATIONS';
import { ERROR_MESSAGE } from '../../src/constants/MESSAGES';
import {
  BonusNumberValidator,
  validateDuplicate,
} from '../../src/validators/BonusNumberValidator';
import { validateRange, validateType } from '../../src/validators/validate';

describe('보너스 번호 검증 테스트', () => {
  describe('정상 케이스', () => {
    test('보너스 번호는 숫자여야 하고, 당첨 번호와 중복되지 않으며, 1 ~ 45 사이에 있어야 한다.', () => {
      const bonusNumber = 7;
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      expect(() =>
        BonusNumberValidator.validate(bonusNumber, winningNumbers),
      ).not.toThrow();
    });
  });

  describe('예외 케이스', () => {
    test.each(['^', NaN, undefined, {}])(
      '보너스 번호는 숫자가 아니면 에러가 발생한다. (입력 값 : %p)',
      (bonusNumber) => {
        expect(() => validateType(KEY.BONUS_NUMBER, bonusNumber)).toThrow(
          ERROR_MESSAGE.COMMON.INVALID_TYPE(KEY.BONUS_NUMBER),
        );
      },
    );

    test.each([-Infinity, 0, 46, Infinity])(
      '보너스 번호의 범위가 1~45 사이가 아니면 에러가 발생한다. (입력 값 : %p)',
      (bonusNumber) => {
        expect(() =>
          validateRange({
            key: KEY.BONUS_NUMBER,
            value: bonusNumber,
            min: LOTTO.MIN_NUMBER,
            max: LOTTO.MAX_NUMBER,
          }),
        ).toThrow(
          ERROR_MESSAGE.COMMON.INVALID_RANGE({
            key: KEY.BONUS_NUMBER,
            min: LOTTO.MIN_NUMBER,
            max: LOTTO.MAX_NUMBER,
          }),
        );
      },
    );

    test('보너스 번호가 당첨 번호와 중복되면 에러가 발생한다.', () => {
      const bonusNumber = 1;
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      expect(() => validateDuplicate(bonusNumber, winningNumbers)).toThrow(
        ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE,
      );
    });
  });
});
