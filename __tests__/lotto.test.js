/* eslint-disable no-undef */
import { ERROR_MESSAGE, LOTTO_CONSTANT } from '../src/data/constants';
import Lotto from '../src/domain/Lotto';

test('로또 만들기 ', () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(numbers);
  numbers.forEach((number) => {
    expect(lotto.includes(number)).toBe(true);
  });
});

test.each([[[1, 2, 3, 4, 5, 6]], [[11, 12, 31, 41, 44, 45]]])(
  '로또 번호에 대한 전체 성공 case',
  (numbers) => {
    const errorMessage = [
      ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.LOTTO_NUMBER),
      ERROR_MESSAGE.LOTTO_NUMBER_RANGE(LOTTO_CONSTANT.LOTTO_NUMBER),
      LOTTO_CONSTANT.LOTTO_NUMBER,
      ERROR_MESSAGE.LOTTO_LENGTH_LIMIT,
    ];

    errorMessage.forEach((message) => {
      expect(() => {
        new Lotto(numbers);
      }).not.toThrow(message);
    });
  }
);

test.each([[[1, '가', 3, 4, 5, 6]], [[1, '', 3, 4, 5, 6]]])('로또 번호는 숫자이다', (numbers) => {
  expect(() => {
    new Lotto(numbers);
  }).toThrow(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.LOTTO_NUMBER));
});

test.each([[[0, 2, 3, 4, 5, 6]], [[1, -1, 2, 3, 4, 5]], [[10, 20, 30, 40, 45, 46]]])(
  '로또 번호는 1~45 사이의 수이다',
  (numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow(ERROR_MESSAGE.LOTTO_NUMBER_RANGE(LOTTO_CONSTANT.LOTTO_NUMBER));
  }
);

test.each([[[1, 1, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 5]], [[1, 2, 4, 4, 5, 5]]])(
  '로또 번호는 중복될 수 없다',
  (numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE(LOTTO_CONSTANT.LOTTO_NUMBER));
  }
);

test.each([[[1, 2, 3, 4, 5]], [[2]], [[]]])('로또 번호는 6개이다.', (numbers) => {
  expect(() => {
    new Lotto(numbers);
  }).toThrow(ERROR_MESSAGE.LOTTO_LENGTH_LIMIT);
});
