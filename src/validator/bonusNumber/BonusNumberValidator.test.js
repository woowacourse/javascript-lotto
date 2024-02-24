import AppError from '../../errors/AppError/AppError.js';
import BonusNumberValidator from './BonusNumberValidator.js';

describe('보너스 번호 유효성 검사', () => {
  // given
  const validateBonusNumber = (inputValue, winningNumbers) =>
    BonusNumberValidator.check(inputValue, winningNumbers);

  const ERROR_CASES = [
    {
      input: 'a',
      expectedErrorMessage: BonusNumberValidator.validationTypes.isTypeOfNumber.errorMessage,
    },
    {
      input: 0,
      expectedErrorMessage: BonusNumberValidator.validationTypes.isValidRange.errorMessage,
    },
    {
      input: 1,
      expectedErrorMessage: BonusNumberValidator.validationTypes.isUniqueBonusNumber.errorMessage,
    },
  ];

  const WINNING_NUMBER = [1, 2, 3, 4, 5, 6];

  describe('예외 테스트', () => {
    test.each(ERROR_CASES)(
      '입력값 "$input"에 대해 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
      ({ input, expectedErrorMessage }) => {
        // when - then
        expect(() => validateBonusNumber(input, WINNING_NUMBER)).toThrow(
          new AppError(expectedErrorMessage),
        );
      },
    );
  });

  describe('정상 작동 테스트', () => {
    // given
    const SUCCESS_CASES = [
      {
        input: 7,
      },
      {
        input: 8,
      },
    ];

    test.each(SUCCESS_CASES)('입력값 "$input"에 대해 에러가 발생하지 않아야 한다.', ({ input }) => {
      // when - then
      expect(() => validateBonusNumber(input, WINNING_NUMBER)).not.toThrow();
    });
  });
});
