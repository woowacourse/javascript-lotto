import {
  isPositiveInteger,
  isDivisibleBy,
  createRandomNumber,
  createRandomNumberList,
} from '../utils.js';

test('구입 금액은 양의 정수이다. 실패 케이스', () => {
  const payment = -1;

  expect(() => {
    isPositiveInteger(payment);
  }).toThrowError();
});

test('구입 금액은 양의 정수이다. 실패 케이스', () => {
  const payment = ' ';

  expect(() => {
    isPositiveInteger(payment);
  }).toThrowError();
});

test('구입 금액은 양의 정수이다. 성공 케이스', () => {
  const payment = 3;

  expect(isPositiveInteger(payment)).toBe(true);
});

test('구입 금액이 1000으로 나누어 떨어진다. 실패 케이스', () => {
  const payment = 33;
  const lottoPrice = 1000;

  expect(() => {
    isDivisibleBy(payment, lottoPrice);
  }).toThrowError();
});

test('구입 금액이 1000으로 나누어 떨어진다. 성공 케이스', () => {
  const payment = 3000;
  const lottoPrice = 1000;

  expect(isDivisibleBy(payment, lottoPrice)).toBe(3);
});

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('구입한 로또의 각각의 번호가 1~45 사이의 숫자이도록 한다. 성공 케이스', () => {
  const randomNumber = createRandomNumber(1, 45);

  expect(randomNumber).toBeWithinRange(1, 45);
});

test('구입한 로또 번호는 서로 다른 랜덤한 숫자 6개로 이루어진 값이다, 성공 케이스', () => {
  const randomNumberList = createRandomNumberList(6);

  expect(randomNumberList.length).toBe(new Set(randomNumberList).size);
});
