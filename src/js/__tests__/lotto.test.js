import { isPositiveInteger } from '../app.js';

test('구입 금액은 양의 정수이다. 실패 케이스', () => {
  const payment = -1;

  expect(() => {
    isPositiveInteger(payment);
  }).toThrowError();
});

test('구입 금액은 양의 정수이다. 성공 케이스', () => {
  const payment = 3;

  expect(isPositiveInteger(payment)).toBe(true);
});
