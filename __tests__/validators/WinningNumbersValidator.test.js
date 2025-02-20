import { KEY, LOTTO } from '../../src/constants/CONFIGURATIONS';
import { ERROR_MESSAGE } from '../../src/constants/MESSAGES';
import { validateCount } from '../../src/validators/validate';
import {
  validateTypeAll,
  validateRangeAll,
  WinningNumbersValidator,
} from '../../src/validators/WinningNumbersValidator';

describe('당첨 번호 검증', () => {
  describe('정상 케이스', () => {
    test('당첨 번호는 모두 숫자이며, 6개여야 하고, 1~45 범위 내에 있어야 한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      expect(() =>
        WinningNumbersValidator.validate(winningNumbers),
      ).not.toThrow();
    });
  });

  describe('예외 케이스', () => {
    test('당첨 번호가 숫자가 아니면 에러가 발생한다.', () => {
      const winningNumbers = [null, 1, 2, 3, 4, 5];

      expect(() => validateTypeAll(winningNumbers)).toThrow(
        ERROR_MESSAGE.COMMON.INVALID_TYPE(KEY.WINNING_NUMBERS),
      );
    });

    test('당첨 번호가 6개가 아니면 에러가 발생한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5];

      expect(() => validateCount(KEY.WINNING_NUMBERS, winningNumbers)).toThrow(
        ERROR_MESSAGE.COMMON.INVALID_COUNT(KEY.WINNING_NUMBERS),
      );
    });

    test('당첨 번호의 범위가 1~45 사이가 아니면 에러가 발생한다.', () => {
      const winningNumbers = [0, 2, 3, 4, 5, 46];

      expect(() => validateRangeAll(winningNumbers)).toThrow(
        ERROR_MESSAGE.COMMON.INVALID_RANGE({
          key: KEY.WINNING_NUMBERS,
          min: LOTTO.MIN_NUMBER,
          max: LOTTO.MAX_NUMBER,
        }),
      );
    });
  });
});
