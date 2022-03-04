import { ERROR_MESSAGE } from '../constants';
import { validateWinningNumberList } from '../view/validator.js';

describe('당첨 금액 입력 기능 테스트', () => {
  it('당첨 금액을 모두 입력해야 한다', () => {
    //당첨 금액을 미 입력시, 명시적으로 null처리했습니다.
    const winningNumbers = [1, 5, null, 35, 45, 20, 12];

    expect(() => validateWinningNumberList(winningNumbers)).toThrow(
      ERROR_MESSAGE.EMPTY_WINNING_NUMBER,
    );
  });

  it('당첨 금액으로 숫자 타입을 입력해야 한다.', () => {
    const winningNumbers = [1, 5, 35, 45, 20, 'a', 12];

    expect(() => validateWinningNumberList(winningNumbers)).toThrow(
      ERROR_MESSAGE.INVALID_WINNING_NUMBER_TYPE,
    );
  });

  it('당첨 금액으로 1 ~ 45 사이의 번호를 입력해야 한다', () => {
    const winningNumbers = [1, 5, 60, 35, 45, 20, 12];

    expect(() => validateWinningNumberList(winningNumbers)).toThrow(
      ERROR_MESSAGE.OUT_WINNING_NUMBER_RANGE,
    );
  });

  it('당첨 금액으로 중복없이 번호를 입력해야 한다.', () => {
    const winningNumbers = [1, 5, 20, 35, 45, 20, 12];

    expect(() => validateWinningNumberList(winningNumbers)).toThrow(
      ERROR_MESSAGE.DUPLICATE_WINNING_NUMBER,
    );
  });
});
