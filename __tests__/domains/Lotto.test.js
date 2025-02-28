import { KEY, LOTTO } from '../../src/common/constants/Configurations';
import { ERROR_MESSAGE } from '../../src/common/constants/Messages';
import Lotto from '../../src/common/domains/Lotto';

describe('로또 클래스 테스트', () => {
  describe('정상 케이스', () => {
    const numbers = [1, 2, 3, 4, 5, 45];

    test(`로또 한 장의 번호는 ${LOTTO.LENGTH}개이다.`, () => {
      const lotto = new Lotto(numbers);
      expect(lotto.numbers).toHaveLength(LOTTO.LENGTH);
    });

    test(`로또 번호의 범위는 ${LOTTO.MIN_NUMBER}~${LOTTO.MAX_NUMBER} 사이이다.`, () => {
      const lotto = new Lotto(numbers);

      lotto.numbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(LOTTO.MIN_NUMBER);
        expect(number).toBeLessThanOrEqual(LOTTO.MAX_NUMBER);
      });
    });
  });

  describe('예외 케이스', () => {
    test('로또 번호가 숫자가 아니면 에러가 발생한다.', () => {
      const numbers = [null, 1, 2, 3, 4, 5];
      expect(() => new Lotto(numbers)).toThrow(
        ERROR_MESSAGE.COMMON.INVALID_TYPE(KEY.LOTTO_NUMBERS),
      );
    });

    test(`로또 번호가 ${LOTTO.LENGTH}개가 아니면 에러가 발생한다.`, () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(() => new Lotto(numbers)).toThrow(
        ERROR_MESSAGE.COMMON.INVALID_COUNT(KEY.LOTTO_NUMBERS),
      );
    });

    test(`로또 번호의 범위가 ${LOTTO.MIN_NUMBER}~${LOTTO.MAX_NUMBER} 사이가 아니면 에러가 발생한다.`, () => {
      const numbers = [0, 2, 3, 4, 5, 46];
      expect(() => new Lotto(numbers)).toThrow(
        ERROR_MESSAGE.COMMON.INVALID_RANGE({
          key: KEY.LOTTO_NUMBERS,
          min: LOTTO.MIN_NUMBER,
          max: LOTTO.MAX_NUMBER,
        }),
      );
    });

    test('로또 번호가 중복되면 에러가 발생한다.', () => {
      const numbers = [1, 2, 3, 4, 5, 5];
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.LOTTO.DUPLICATE);
    });
  });
});
