import { LOTTO } from '../../src/constants/CONFIGURATIONS';
import { ERROR_MESSAGE } from '../../src/constants/MESSAGES';
import Lotto from '../../src/domains/Lotto';

describe('로또 클래스 테스트', () => {
  describe('정상 케이스', () => {
    const numbers = [1, 2, 3, 4, 5, 45];

    test('로또 한 장의 번호는 6개이다.', () => {
      const lotto = new Lotto(numbers);
      expect(lotto.numbers).toHaveLength(LOTTO.NUMBER_LENGTH);
    });

    test('로또 번호의 범위는 1~45 사이이다.', () => {
      const lotto = new Lotto(numbers);

      lotto.numbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(LOTTO.MIN_NUMBER);
        expect(number).toBeLessThanOrEqual(LOTTO.MAX_NUMBER);
      });
    });
  });

  describe('예외 케이스', () => {
    test.each([
      {
        description: '로또 번호가 숫자가 아니면',
        numbers: [null, 1, 2, 3, 4, 5],
        expectedError: ERROR_MESSAGE.LOTTO.INVALID_TYPE,
      },
      {
        description: '로또 번호가 6개가 아니면',
        numbers: [1, 2, 3, 4, 5],
        expectedError: ERROR_MESSAGE.LOTTO.INVALID_LENGTH,
      },
      {
        description: '로또 번호의 범위가 1~45 사이가 아니면',
        numbers: [0, 2, 3, 4, 5, 46],
        expectedError: ERROR_MESSAGE.LOTTO.INVALID_RANGE,
      },
      {
        description: '로또 번호가 중복되면',
        numbers: [1, 2, 3, 4, 5, 5],
        expectedError: ERROR_MESSAGE.LOTTO.DUPLICATE,
      },
    ])('$description 에러가 발생한다', ({ numbers, expectedError }) => {
      expect(() => new Lotto(numbers)).toThrow(expectedError);
    });
  });
});
