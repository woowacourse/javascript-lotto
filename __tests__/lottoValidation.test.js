import { ERROR_MESSAGE } from '../src/constants/message';
import NUMBER from '../src/constants/number';
import Lotto from '../src/domain/Lotto';

describe('로또 번호 유효성 테스트', () => {
  const TOO_SMALL_NUMBER = 0;
  const TOO_LARGE_NUMBER = 46;
  const PAIR_COUNT = 1;

  test.each([[[1, 2, 3, 4, 5, TOO_LARGE_NUMBER]], [[TOO_SMALL_NUMBER, 1, 2, 3, 4, 5]]])(
    `${NUMBER.LOTTO_START_NUMBER} ~ ${NUMBER.LOTTO_END_NUMBER}범위의 정수가 아니면 에러를 발생시킨다.`,
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.NUMBERS_RANGE);
    }
  );

  test.each([[[1, 2, 3, 4, 5, 6, 7]], [[1, 2, 3, 4, 5]]])(
    `입력받은 숫자가 ${NUMBER.LOTTO_LENGTH}개가 아니면 에러를 발생시킨다.`,
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.NUMBERS_LENGTH);
    }
  );

  test('중복된 수가 있는 경우 있을 때 에러를 발생시킨다.', () => {
    expect(() => new Lotto([PAIR_COUNT, PAIR_COUNT, 2, 3, 4, 5])).toThrow(ERROR_MESSAGE.NUMBERS_DUPLICATION);
  });
});
