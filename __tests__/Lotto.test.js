/* eslint-disable max-lines-per-function */
import { VARIABLE_ALIAS, ERROR_MESSAGE } from '../src/constant/Messages.js';
import OPTIONS from '../src/constant/Options.js';
import Lotto from '../src/domain/Lotto.js';

describe('Lotto 단위테스트', () => {
  test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
    '로또 번호(%s)가 6개가 아니면 에러를 발생한다.',
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(
        `${ERROR_MESSAGE.prefix}${ERROR_MESSAGE.hasNotLength(VARIABLE_ALIAS.lottoNumbers, OPTIONS.LOTTO.combination)}`
      );
    }
  );

  test.each([[['a', 2, 3, 4, 5, 6]], [[1.1, 2, 3, 4, 5, 6]]])(
    '로또 번호(%s) 중 정수 이외의 값이 있다면 에러를 발생한다.',
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow();
    }
  );

  test.each([[[1, 2, 3, 4, 5, 46]], [[0, 1, 2, 3, 4, 5]]])(
    '로또 번호(%s)의 범위가 1부터 45 사이가 아니라면 에러를 발생한다.',
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow();
    }
  );

  test('로또 번호에 중복되는 수가 있다면 에러를 발생한다.', () => {
    const numbers = [1, 1, 2, 3, 4, 5];

    expect(() => new Lotto(numbers)).toThrow();
  });

  test.each([[[3, 2, 4, 5, 6, 1]], [[13, 12, 14, 15, 16, 11]]])(
    '로또 번호는 오름차순으로 정렬된다.',
    (numbers) => {
      const lotto = new Lotto(numbers);

      expect(lotto.getNumbers()).toStrictEqual(numbers.sort());
    }
  );
});
