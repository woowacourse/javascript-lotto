import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
  validateRestartInput,
} from '../src/utils/validator';

describe('유효성 검사에 대한 테스트', () => {
  test.each([
    NaN,
    undefined,
    null,
    8500,
    '에디',
    '301@)11',
    ' ',
    '',
    '0',
    -1000,
  ])('구입 금액 입력에 대한 유효성 검사를 한다.', (input) => {
    expect(() => validatePurchaseAmount(input)).toThrow();
  });
  test.each([
    [0, 1, 2, 3, 4, 5],
    [46, 45, 44, 43, 42, 41],
    [12, 12, 12, 12, 12, 12],
    [NaN, undefined, 1, 2, 3, 4],
    ['클린', 1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5],
  ])('당첨 번호 입력에 대한 테스트를 한다.', (input) => {
    expect(() => validateWinningNumbers(input)).toThrow();
  });
  test.each(['에디', NaN, '$*&*!@#^', 0, 46, 3])(
    '보너스 번호에 입력에 대한 유효성 검사를 한다.',
    (input) => {
      const winningNumber = [3, 34, 14, 20, 44, 1];

      expect(() => validateBonusNumber(input, winningNumber)).toThrow();
    }
  );
  test.each([123, undefined, null, NaN, [], '가나다라', 'Y', 'YES', 'N', 'NO'])(
    '재시작 입력에 대한 유효성 검사를 한다.',
    (input) => {
      expect(() => validateRestartInput(input)).toThrow();
    }
  );
});
