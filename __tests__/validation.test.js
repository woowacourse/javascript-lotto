import { ERROR } from '../src/constants/errors';
import { hasEmptyString, isValueInteger } from '../src/utils/validaition';

describe('유효성 검사 테스트', () => {
  test('구입 금액은 빈 값일 수 없다.', () => {
    expect(() => hasEmptyString('').toThrow(ERROR.IS_PURCHASE_PRICE_EMPTY));
  });
  test.each(['a', 2.1])('구입 금액은 문자와 실수가 아니여야 한다.', (value) => {
    expect(() => isValueInteger(value).toThrow(ERROR.IS_NOT_POSITIVE_INTEGER));
  });

  test.each([1, 4, 3])('구입 금액은 양의 정수여야 한다.', (value) => {
    expect(() => isValueInteger(value).not.toThrow());
  });

  test.each(['a', '', -111, 999, 9.9, 0, undefined, NaN, []])('구입 금액은 1000원 이상이여야 한다.', () => {
    expect(() => validatePurchasePrice(999).toThrow());
  });

  test('구입 금액은 1000원 이상이여야 한다.', () => {
    expect(() => validatePurchasePrice(1000).not.toThrow());
  });
});
