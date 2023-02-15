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

test('로또 번호는 숫자이다', () => {
  const numbers = [1, '가', 3, 4, 5, 6];

  expect(() => {
    new Lotto(numbers);
  }).toThrow(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.LOTTO_NUMBER));
});

test('로또 번호는 1~45 사이의 수이다', () => {
  const numbers = [1, 2, 3, 4, 5, 60];

  expect(() => {
    new Lotto(numbers);
  }).toThrow(ERROR_MESSAGE.LOTTO_NUMBER_RANGE(LOTTO_CONSTANT.LOTTO_NUMBER));
});

test('로또 번호는 중복될 수 없다', () => {
  const numbers = [1, 1, 2, 3, 3, 4];

  expect(() => {
    new Lotto(numbers);
  }).toThrow(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE(LOTTO_CONSTANT.LOTTO_NUMBER));
});
