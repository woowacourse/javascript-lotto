import { ERROR_MESSAGES } from '../src/constants';
import { Lotto, LottoNumber } from '../src/domains';

describe('로또에 대한 테스트', () => {
  test('로또 번호가 정수가 아닐 경우 오류가 발생한다.', () => {
    const NUMBERS = [2.5, 'one'];

    NUMBERS.forEach((number) => {
      expect(() => new LottoNumber(number)).toThrow(ERROR_MESSAGES.notInteger);
    });
  });
  test('로또 번호가 1이상 45이하의 숫자여야 하며 그렇지 않을 경우 오류가 발생한다.', () => {
    const NUMBERS = [-1, 0, 46];

    NUMBERS.forEach((number) => {
      expect(() => new LottoNumber(number)).toThrow(
        ERROR_MESSAGES.invalidLottoNumberRange,
      );
    });
  });

  test('로또 번호의 개수는 6개 여야한다. 그렇지 않을 경우 오류가 발생한다.', () => {
    const LOTTOS = [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6, 7],
    ];

    LOTTOS.forEach((numbers) => {
      expect(() => new Lotto(numbers)).toThrow(
        ERROR_MESSAGES.invalidLottoNumberCount,
      );
    });
  });

  test('로또 번호는 중복되지 않아야 하고 , 그렇지 않을 경우 오류가 발생한다.', () => {
    const LOTTO_NUMBER = [1, 2, 3, 4, 5, 5];

    expect(() => new Lotto(LOTTO_NUMBER)).toThrow(
      ERROR_MESSAGES.duplicatedLottoNumber,
    );
  });

  test('로또 번호가 유효하면,숫자배열을 반환한다.', () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const { numbers } = new Lotto(LOTTO_NUMBERS);

    expect(numbers).toEqual(LOTTO_NUMBERS);
  });
});
