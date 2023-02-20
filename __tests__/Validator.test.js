const Validator = require('../src/domain/validation/validator');

describe('Validator 테스트(구입 금액, 당첨 번호, 보너스 번호, 다시 시작 명령어 입력값에 대한 유효성 검사 기능 테스트)', () => {
  const INPUT_PRICE_CHECK_NUMBER = [
    { purchasePriceInput: '우테코', expected: false },
    { purchasePriceInput: '1000', expected: true },
  ];
  const INPUT_PRICE_CHECK_BLANK = [
    { purchasePriceInput: ' ', expected: true },
    { purchasePriceInput: '1000', expected: false },
  ];
  const INPUT_PRICE_CHECK_EMPTY = [
    { purchasePriceInput: '', expected: true },
    { purchasePriceInput: '1000', expected: false },
  ];
  const INPUT_PRICE_CHECK_POSITIVE_INTEGER = [
    { purchasePriceInput: '-1000', expected: true },
    { purchasePriceInput: '0', expected: true },
    { purchasePriceInput: '1000', expected: false },
  ];
  const INPUT_PRICE_CHECK_UNIT = [
    { purchasePriceInput: '700', expected: false },
    { purchasePriceInput: '1200', expected: false },
    { purchasePriceInput: '3000', expected: true },
  ];

  const INPUT_PRICE = [
    { purchasePriceInput: ' ', expected: false },
    { purchasePriceInput: '-1000', expected: false },
    { purchasePriceInput: '0', expected: false },
    { purchasePriceInput: '700', expected: false },
    { purchasePriceInput: '1200', expected: false },
    { purchasePriceInput: 'k', expected: false },
    { purchasePriceInput: '3000', expected: true },
  ];

  const INPUT_WINNING_NUMBERS = [
    { winningNumbersInput: '', expected: false },
    { winningNumbersInput: '1, 2, 3, 4, 5, 6', expected: false },
    { winningNumbersInput: '1,2,3,4,5', expected: false },
    { winningNumbersInput: '1,1,2,3,4,5', expected: false },
    { winningNumbersInput: '0,1,2,3,4,5', expected: false },
    { winningNumbersInput: '1,2,3,4,5,46', expected: false },
    { winningNumbersInput: '1,2,3,4,5,6', expected: true },
  ];

  const INPUT_BONUS_NUMBER = [
    { bonusNumberInput: '', expected: false },
    { bonusNumberInput: 'k', expected: false },
    { bonusNumberInput: '0', expected: false },
    { bonusNumberInput: '46', expected: false },
    { bonusNumberInput: '6', expected: false },
    { bonusNumberInput: '7', expected: true },
  ];

  const INPUT_RESTART_COMMAND = [
    { restartCommandInput: '', expected: false },
    { restartCommandInput: 'yk', expected: false },
    { restartCommandInput: 'y ', expected: false },
    { restartCommandInput: 'y', expected: true },
    { restartCommandInput: 'n', expected: true },
  ];

  test.each(INPUT_PRICE_CHECK_NUMBER)(
    '입력된 구입 금액은 숫자이다.',
    ({ purchasePriceInput, expected }) => {
      expect(Validator.isNumber(purchasePriceInput)).toBe(expected);
    }
  );

  test.each(INPUT_PRICE_CHECK_BLANK)(
    '입력된 구입 금액은 공백을 포함하지 않는다.',
    ({ purchasePriceInput, expected }) => {
      expect(Validator.isBlankIncluded(purchasePriceInput)).toBe(expected);
    }
  );

  test.each(INPUT_PRICE_CHECK_EMPTY)(
    '입력된 구입 금액이 빈 문자열이 아니다.',
    ({ purchasePriceInput, expected }) => {
      expect(Validator.isEmpty(purchasePriceInput)).toBe(expected);
    }
  );

  test.each(INPUT_PRICE_CHECK_POSITIVE_INTEGER)(
    '입력된 구입 금액이 0 또는 음수가 아니다.',
    ({ purchasePriceInput, expected }) => {
      expect(Validator.isSmallerOrEqualThanZero(purchasePriceInput)).toBe(
        expected
      );
    }
  );

  test.each(INPUT_PRICE_CHECK_UNIT)(
    '입력된 구입 금액이 1000원 단위여야 한다.',
    ({ purchasePriceInput, expected }) => {
      expect(Validator.isValidUnit(purchasePriceInput)).toBe(expected);
    }
  );

  test.each(INPUT_PRICE)(
    '구입 금액 입력값은 1000원 단위의 숫자 값이다.',
    ({ purchasePriceInput, expected }) => {
      expect(Validator.isPurchasePriceValid(purchasePriceInput)).toBe(expected);
    }
  );

  test.each(INPUT_WINNING_NUMBERS)(
    '당첨 번호 입력값은 1부터 45까지의 6개 숫자를 쉼표로 구별한 문자열 값이다.',
    ({ winningNumbersInput, expected }) => {
      expect(Validator.isWinningNumbersValid(winningNumbersInput)).toBe(
        expected
      );
    }
  );

  test.each(INPUT_BONUS_NUMBER)(
    '보너스 번호 입력값은 당첨 번호와 중복되지 않는, 1부터 45까지의 숫자 값이다.',
    ({ bonusNumberInput, expected }) => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      expect(
        Validator.isBonusNumberValid(winningNumbers, bonusNumberInput)
      ).toBe(expected);
    }
  );

  test.each(INPUT_RESTART_COMMAND)(
    '다시 시작 명령어 입력값은 y 또는 n 이어야 한다.',
    ({ restartCommandInput, expected }) => {
      expect(Validator.isRestartCommandValid(restartCommandInput)).toBe(
        expected
      );
    }
  );
});
