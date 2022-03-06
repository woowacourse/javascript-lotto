import {
  isOverRangeLottoNumber,
  isOverRangeLottoNumbers,
  isOverlapped,
  isInvalidCount,
  isIncludedWinningNumbers,
} from '../validation/index.js';

describe('지난주 당첨 번호는 중복되지 않는 1 이상 45 이하의 6개의 숫자여야 한다.', () => {
  test('지난주 당첨 번호의 숫자들은 모두 1 이상의 숫자여야 한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    expect(isOverRangeLottoNumbers(winningNumbers)).toBeFalsy();
  });

  test('지난주 당첨 번호의 숫자들은 45 이하의 숫자여야 한다.', () => {
    const winningNumbers = [45, 44, 43, 42, 41, 40];

    expect(isOverRangeLottoNumbers(winningNumbers)).toBeFalsy();
  });

  test('지난주 당첨 번호애는 1 미만의 숫자가 있으면 안된다.', () => {
    const winningNumbers = [0, 1, 2, 3, 4, 5];

    expect(isOverRangeLottoNumbers(winningNumbers)).toBeTruthy();
  });

  test('지난주 당첨 번호에는 45를 초과하는 숫자가 있으면 안된다.', () => {
    const winningNumbers = [46, 45, 44, 43, 42, 41];

    expect(isOverRangeLottoNumbers(winningNumbers)).toBeTruthy();
  });

  test('지난주 당첨 번호에는 중복된 숫자가 있으면 안된다.', () => {
    const overlappedCase = [7, 7, 30, 37, 39, 44];

    expect(isOverlapped(overlappedCase)).toBeTruthy();
  });

  test('지난주 당첨 번호의 숫자 개수는 6개여야 한다.', () => {
    const winningNumber = [7, 15, 30, 37, 39, 44];

    expect(isInvalidCount(winningNumber)).toBeFalsy();
  });
});

describe('보너스 당첨 번호는 지난주 당첨 번호에 속해있지 않는 1 이상 ~ 45 이하의 숫자여야 한다.', () => {
  test('보너스 당첨 번호는 지난주 당첨 번호에 속해있으면 안된다.', () => {
    const winningNumber = [7, 15, 30, 37, 39, 44];
    const bonusNumber = 18;

    expect(isIncludedWinningNumbers(winningNumber, bonusNumber)).toBeFalsy();
  });

  test('보너스 당첨 번호는 1 이상의 숫자여야 한다.', () => {
    const bonusNumber = 1;
    expect(isOverRangeLottoNumber(bonusNumber)).toBeFalsy();
  });

  test('보너스 당첨 번호는 45 이하의 숫자여야 한다.', () => {
    const bonusNumber = 45;
    expect(isOverRangeLottoNumber(bonusNumber)).toBeFalsy();
  });

  test('보너스 당첨 번호는 1 미만의 숫자이면 안 된다.', () => {
    const bonusNumber = 0;
    expect(isOverRangeLottoNumber(bonusNumber)).toBeTruthy();
  });

  test('보너스 당첨 번호는 45를 초과하는 숫자이면 안 된다.', () => {
    const bonusNumber = 46;
    expect(isOverRangeLottoNumber(bonusNumber)).toBeTruthy();
  });
});
