import Lotto from '../src/domain/Lotto';

test('로또 만들기 ', () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(numbers);

  expect(lotto.numbers).toBe(numbers);
});

test('로또 번호는 숫자이다', () => {
  const numbers = [1, '가', 3, 4, 5, 6];

  expect(() => {
    const lotto = new Lotto(numbers);
  }).toThrow('로또 번호는 숫자여야 합니다.');
});

test('로또 번호는 1~45 사이의 수이다', () => {
  const numbers = [1, 2, 3, 4, 5, 60];

  expect(() => {
    const lotto = new Lotto(numbers);
  }).toThrow('로또 번호는 1~45 사이의 숫자여야 합니다.');
});

test('로또 번호는 중복될 수 없다', () => {
  const numbers = [1, 1, 2, 3, 3, 4];

  expect(() => {
    const lotto = new Lotto(numbers);
  }).toThrow('로또 번호는 중복될 수 없습니다.');
});
