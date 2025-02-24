import validateBonusNumber from '../../src/validations/validate/BonusNumberValidate.js';
import { BONUS_NUMBER_ERROR_MESSAGES, LOTTO_CONDITION } from '../../src/constants/constants.js';

const winningNumbers = [1, 2, 3, 4, 5, 6];

describe('보너스 번호 유효성 검사 테스트', () => {
  test.each([1.5, ''])('보너스 번호가 정수가 아니면 에러를 발생시킨다', (input) => {
    expect(() => validateBonusNumber(winningNumbers, input)).toThrow(BONUS_NUMBER_ERROR_MESSAGES.INTIGER);
  });

  test.each([LOTTO_CONDITION.MIN_NUMBER - 1, LOTTO_CONDITION.MAX_NUMBER + 1])(
    `${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER}사이의 숫자가 아닌 경우 에러를 발생시킨다`,
    (input) => {
      expect(() => validateBonusNumber(winningNumbers, input)).toThrow(BONUS_NUMBER_ERROR_MESSAGES.RANGE);
    },
  );

  test.each([1, 2])(`보너스 번호가 당첨 번호와 중복되면 에러를 발생시킨다`, (input) => {
    expect(() => validateBonusNumber(winningNumbers, input)).toThrow(BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE);
  });
});
