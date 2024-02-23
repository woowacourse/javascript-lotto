import { ERROR_MESSAGE } from '../src/constants/message';
import Lotto from '../src/domain/Lotto';

describe.skip('Lotto 클래스 검사', () => {
  const TOO_SMALL_NUMBER = 0;
  const TOO_LARGE_NUMBER = 46;
  const PAIR_COUNT = 1;
  test.each([[[1, 2, 3, 4, 5, TOO_LARGE_NUMBER]], [[TOO_SMALL_NUMBER, 1, 2, 3, 4, 5]]])(
    'Lotto 유효성 검사: 1 ~ 45범위의 정수가 아닐 때, 에러 발생',
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.NUMBERS_RANGE);
    }
  );

  test.each([[[1, 2, 3, 4, 5, 6, 7]], [[1, 2, 3, 4, 5]]])(
    'Lotto 유효성 검사: 입렵받은 숫자가 6개가 아닐 때 에러 발생',
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.NUMBERS_LENGTH);
    }
  );

  test('Lotto 유효성 검사: 중복된 수가 있는 경우 있을 때, 에러 발생', () => {
    expect(() => new Lotto([PAIR_COUNT, PAIR_COUNT, 2, 3, 4, 5])).toThrow(ERROR_MESSAGE.NUMBERS_DUPLICATION);
  });

  test('로또 숫자들이 오름차순으로 정렬', () => {
    const numbers = [3, 1, 5, 2, 4, 6];
    const lotto = new Lotto(numbers);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
