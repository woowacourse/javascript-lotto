import { isInvalidMoneyInput, isInvalidWinningNumberInput } from '../validator/validator';

describe('예외 테스트', () => {
  test('구입 금액은 1000원 이상 10000원 이하이다.', () => {
    expect(isInvalidMoneyInput(999)).toBe(true);
    expect(isInvalidMoneyInput(1000)).toBe(false);
    expect(isInvalidMoneyInput(10000)).toBe(false);
    expect(isInvalidMoneyInput(10001)).toBe(true);
  });

  test('입력된 당첨 번호는 1~45 사이의 중복되지 않는 숫자이다', () => {
    expect(isInvalidWinningNumberInput([1, 2, 3, 4, 5, 6, 6])).toBe(true);
    expect(isInvalidWinningNumberInput([1, 2, 3, 4, 5, 6, 7])).toBe(false);
    expect(isInvalidWinningNumberInput([45, 34, 12, 40, 42, 20, 23])).toBe(false);
    expect(isInvalidWinningNumberInput([45, 45, 12, 40, 42, 20, 23])).toBe(true);
  });
});
