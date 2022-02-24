import validateCharge from '../validation';
import ValidationError from '../utils/ValidationError';

describe('로또 구입 금액 유효성 검사 테스트', () => {
  it('구입 금액은 정수인 숫자로 입력해야한다.', () => {
    const notIntegerValue = 'abc';
    expect(() => validateCharge(notIntegerValue)).toThrow(ValidationError);
  });

  it('구입 금액은 1000원 이상이여야 한다.', () => {
    const lessThanMinimumValue = 500;
    expect(() => validateCharge(lessThanMinimumValue)).toThrow(ValidationError);
  });
});
