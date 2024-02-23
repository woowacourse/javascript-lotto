import ERROR from '../src/constant/Error.js';
import Lotto from '../src/domain/entity/Lotto.js';

describe('로또 테스트', () => {
  test('성공 케이스', () => {
    const LOTTO_NUMBERS = ['1', '2', '3', '4', '5', '6'];
    const EXPECTED_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(Lotto.fromString(LOTTO_NUMBERS).getNumbers()).toEqual(EXPECTED_NUMBERS);
  });

  test('로또 번호에 중복이 있을 때, 에러를 발생시킨다.', () => {
    const LOTTO_NUMBERS = ['1', '2', '3', '4', '6', '6'];

    expect(() => Lotto.fromString(LOTTO_NUMBERS)).toThrow(ERROR.messageStartWith);
  });

  test('로또 번호에 중복이 있을 때, 에러를 발생시킨다.', () => {
    const LOTTO_NUMBERS = ['1', '2', '4', '3', '5', '6'];

    expect(Lotto.fromString(LOTTO_NUMBERS).getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
