import { validateCharge, validateWinnerNumbers } from '../validation';
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
describe('당첨 번호 유효성 검사 테스트', () => {
  it('당첨 번호 중 정수인 숫자가 아닌 것이 있는 경우 에러 메세지를 띄워준다.', () => {
    const notIntegerValueSet = new Set([1, 2, 3, 4, 5, 6, 'a']);
    expect(() => validateWinnerNumbers(notIntegerValueSet)).toThrow(ERROR_MESSAGE.INTEGER_WINNER_NUMBER);
  });
  it(`1 ~ 45 범위 밖의 숫자를 입력했을 경우 에러 메세지를 띄워준다.`, () => {
    const outOfRangeWinnerNumbers = new Set([0, 2, 3, 4, 5, 6, 100]);
    expect(() => validateWinnerNumbers(outOfRangeWinnerNumbers)).toThrow(ERROR_MESSAGE.RANGE_OF_WINNER_NUMBER);
  });
  it('당첨 번호 중 중복된 번호가 있을 경우 에러 메세지를 띄워준다.', () => {
    const duplicateWinnerNumbers = new Set([1, 2, 3, 4, 5, 6, 6]);
    expect(() => validateWinnerNumbers(duplicateWinnerNumbers)).toThrow(ERROR_MESSAGE.NON_DUPLICATE_WINNER_NUMBERS);
  });
});
