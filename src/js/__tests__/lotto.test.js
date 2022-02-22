import { isPositiveInteger, isDivisibleBy } from '../app.js';

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
  const quotient = 1000;

  expect(() => {
    isDivisibleBy(payment, quotient);
  }).toThrowError();
});

test('구입 금액이 1000으로 나누어 떨어진다. 성공 케이스', () => {
  const payment = 3000;
  const quotient = 1000;

  expect(isDivisibleBy(payment, quotient)).toBe(3);
});
