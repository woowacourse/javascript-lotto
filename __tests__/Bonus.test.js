import { ERROR_MESSAGES } from '../src/constants';
import Bonus from '../src/domains/Bonus';

describe('Bonus에 대한 테스트', () => {
  describe('보너스 번호 유효성 검사', () => {
    test('보너스 번호 입력값이 없으면 오류가 발생한다.', () => {
      expect(() => new Bonus()).toThrow(ERROR_MESSAGES.isUndefinedInputValue);
    });

    test('보너스 번호가 정수여하며 그렇지 않을 경우 오류가 발생한다.', () => {
      const BONUS_NUMBER_INPUTS = ['2.4', 'one'];

      BONUS_NUMBER_INPUTS.forEach((input) => {
        expect(() => new Bonus(input)).toThrow(ERROR_MESSAGES.notInteger);
      });
    });

    test('보너스 번호가 1이상 45이하의 숫자여야 하며 그렇지 않을 경우 오류가 발생한다.', () => {
      const BONUS_NUMBER_INPUTS = ['0', '46'];

      BONUS_NUMBER_INPUTS.forEach((input) => {
        expect(() => new Bonus(input)).toThrow(
          ERROR_MESSAGES.invalidLottoNumberRange,
        );
      });
    });

    test('보너스 번호가 유효한 경우 오류가 발생하지 않는다.', () => {
      const BONUS_NUMBER_INPUTS = ['1', '45'];

      BONUS_NUMBER_INPUTS.forEach((input) => {
        expect(() => new Bonus(input)).not.toThrow();
      });
    });
  });
  describe('Bonus 기능 테스트', () => {
    const BONUS_NUMBER = '7';
    const bonus = new Bonus(BONUS_NUMBER);
    test('비교 대상인 로또 번호들에 보너스 번호가 없으면, false를 반환한다.', () => {
      const NOT_MATCHING_NUMBERS = [1, 2, 3, 4, 5, 6];

      expect(bonus.isMatchingNumber(NOT_MATCHING_NUMBERS)).toBeFalsy();
    });
    test('비교 대상인 로또 번호들에 보너스 번호가 있으면, true를 반환한다.', () => {
      const MATCHING_NUMBERS = [1, 2, 3, 4, 5, Number(BONUS_NUMBER)];

      expect(bonus.isMatchingNumber(MATCHING_NUMBERS)).toBeTruthy();
    });
  });
});
