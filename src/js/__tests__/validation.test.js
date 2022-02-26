import validateCharge from '../validation';
import { ERROR_MESSAGE } from '../constants/constants';

describe('로또 구입 금액 유효성 검사 테스트', () => {
  it('구입 금액이 정수인 숫자가 아닌 경우 에러 메세지를 띄워준다.', () => {
    const notIntegerValue = 'abc';
    expect(() => validateCharge(notIntegerValue)).toThrow(ERROR_MESSAGE.INTEGER_CHARGE_INPUT);
  });

  it('구입 금액이 티켓 금액보다 적은 경우 에러 메세지를 띄워준다.', () => {
    const lessThanMinimumValue = 500;
    expect(() => validateCharge(lessThanMinimumValue)).toThrow(ERROR_MESSAGE.MIN_CHARGE_INPUT);
  });
});
