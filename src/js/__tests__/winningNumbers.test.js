import {
  isOverRangeLottoNumber,
  isOverRangeLottoNumbers,
  isOverlapped,
  isInvalidCount,
  isIncludedWinningNumbers,
} from '../validation/index.js';

describe('지난 주 당첨 번호는 중복되지 않는 1 ~ 45 사이의 6개의 숫자여야 한다.', () => {
  const winningNumber = [7, 15, 30, 37, 39, 44];

  test('지난주 당첨 번호 숫자들은 1 ~ 45 사이의 숫자여야 한다.', () => {
    expect(isOverRangeLottoNumbers(winningNumber)).toBeFalsy();
  });

  test('지난주 당첨 번호에는 중복된 숫자가 있으면 안된다.', () => {
    const overlappedCase = [7, 7, 30, 37, 39, 44];

    expect(isOverlapped(overlappedCase)).toBeTruthy();
  });

  test('지난주 당첨 번호의 숫자 개수는 6개여야 한다.', () => {
    expect(isInvalidCount(winningNumber)).toBeFalsy();
  });
});

describe('보너스 당첨 번호는 지난주 당첨 번호에 속해있지 않는 1 ~ 45 사이의 숫자여야 한다.', () => {
  const bonusNumber = 18;

  test('보너스 당첨 번호는 지난주 당첨 번호에 속해있으면 안된다.', () => {
    const winningNumber = [7, 15, 30, 37, 39, 44];

    expect(isIncludedWinningNumbers(winningNumber, bonusNumber)).toBeFalsy();
  });

  test('보너스 당첨 번호는 1 ~ 45 사이의 숫자여야 한다.', () => {
    expect(isOverRangeLottoNumber(bonusNumber)).toBeFalsy();
  });
});
