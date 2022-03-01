import { validateCharge, validateWinningNumbers } from '../validation';
import { ERROR_MESSAGE } from '../constants/constants';

describe('로또 구입 금액 유효성 검사 테스트', () => {
  it('구입 금액은 정수인 숫자로 입력해야한다.', () => {
    const notIntegerValue = 'abc';
    expect(() => validateCharge(notIntegerValue))
      .toThrow(ERROR_MESSAGE.CHARGE_INPUT_NOT_INTEGER);
  });

  it('구입 금액은 1000원 이상이어야 한다.', () => {
    const lessThanMinimumValue = 500;
    expect(() => validateCharge(lessThanMinimumValue))
      .toThrow(ERROR_MESSAGE.CHARGE_INPUT_NOT_IN_RANGE);
  });

  it('구입 금액은 5000원 이하여야 한다.', () => {
    const biggerThanMaximumValue = 5500;
    expect(() => validateCharge(biggerThanMaximumValue))
      .toThrow(ERROR_MESSAGE.CHARGE_INPUT_NOT_IN_RANGE);
  });
});

describe('당첨 번호 유효성 검사 테스트', () => {
  it('당첨 번호는 보너스 번호 1개까지 총 7개를 입력해야한다.', () => {
    const insufficientWinningNumbers = [1, 2, 3, 4, 'test'];
    expect(() => validateWinningNumbers(insufficientWinningNumbers))
      .toThrow(ERROR_MESSAGE.WINNING_NUMBERS_INSUFFICIENT);
  });

  it('당첨 번호와 보너스 번호는 모두 정수인 숫자로 입력해야한다', () => {
    const WinningNumbersWithFloat = [1, 2, 3, 4, 12.34, 6, 7];
    expect(() => validateWinningNumbers(WinningNumbersWithFloat))
      .toThrow(ERROR_MESSAGE.WINNING_NUMBERS_NOT_INTEGER);
  });

  it('당첨 번호와 보너스 번호는 모두 1 이상 45 이하 범위 내로 입력해야한다', () => {
    const winningNumbersWithInvalidRange = [0, 1, 2, 3, 4, 5, 67];
    expect(() => validateWinningNumbers(winningNumbersWithInvalidRange))
      .toThrow(ERROR_MESSAGE.WINNING_NUMBERS_NOT_IN_RANGE);
  });
});
