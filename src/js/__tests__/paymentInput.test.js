import { MONEY } from '../constants';
import {
  isNegativeInteger,
  isEqualToZero,
  isString,
  hasRemainder,
} from '../utils';

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

describe('구입할 금액에 문자열을 입력하진 않았는지 확인한다.', () => {
  test('구입할 금액에 문자열을 입력한 경우. 입력: "asd"', () => {
    const payment = 'asd';

    expect(isString(payment)).toBe(true);
  });

  test('구입할 금액에 숫자를 입력한 경우. 입력: 3000', () => {
    const payment = 3000;

    expect(isString(payment)).toBe(false);
  });
});

describe('구입할 금액에 0을 입력하진 않았는지 확인한다.', () => {
  test('구입할 금액에 0을 입력한 경우. 입력: 0', () => {
    const payment = 0;

    expect(isEqualToZero(payment)).toBe(true);
  });
  test('구입할 금액에 양의 정수를 입력한 경우. 입력: 3000', () => {
    const payment = 3000;

    expect(isEqualToZero(payment)).toBe(false);
  });
});

describe('구입할 금액에 음의 정수를 입력하진 않았는지 확인한다', () => {
  test('구입할 금액에 음의 정수를 입력한 경우. 입력: -1', () => {
    const payment = -1;

    expect(isNegativeInteger(payment)).toBe(true);
  });

  test('구입할 금액에 양의 정수를 입력한 경우. 입력: 3000', () => {
    const payment = 3000;

    expect(isNegativeInteger(payment)).toBe(false);
  });
});

describe(`구입할 금액에 입력한 값이 ${MONEY.STANDARD}으로 나누어 떨어지는지 확인한다.`, () => {
  test(`구입할 금액에 입력한 값이 ${MONEY.STANDARD}으로 나누어 떨어지지 않는 경우. 입력: 33`, () => {
    const payment = 33;

    expect(hasRemainder(payment, MONEY.STANDARD)).toBe(true);
  });

  test(`구입 금액에 입력한 값이 ${MONEY.STANDARD}으로 나누어 떨어지는 경우. 입력: 3000`, () => {
    const payment = 3000;

    expect(hasRemainder(payment, MONEY.STANDARD)).toBe(false);
  });
});
