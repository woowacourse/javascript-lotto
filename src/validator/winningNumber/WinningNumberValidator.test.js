import WinningNumberValidator from './WinningNumberValidator.js';
import AppError from '../../errors/AppError/AppError.js';

describe('당첨 번호 유효성 검사', () => {
  // given
  const validateWinningNumber = (inputValue) => WinningNumberValidator.check(inputValue);

  const ERROR_CASES = [
    {
      input: 'a,b,c,d,e,f',
      expectedErrorMessage: WinningNumberValidator.validationTypes.isValidType.errorMessage,
    },
    {
      input: '1.2,3,4,5,6',
      expectedErrorMessage: WinningNumberValidator.validationTypes.isValidType.errorMessage,
    },
    {
      input: '1,2,3,4,5,-6',
      expectedErrorMessage: WinningNumberValidator.validationTypes.isValidType.errorMessage,
    },
    {
      input: '1,2',
      expectedErrorMessage: WinningNumberValidator.validationTypes.isValidLength.errorMessage,
    },
    {
      input: '33',
      expectedErrorMessage: WinningNumberValidator.validationTypes.isValidLength.errorMessage,
    },
    {
      input: '1,2,3,4,5,60',
      expectedErrorMessage: WinningNumberValidator.validationTypes.isValidRange.errorMessage,
    },
    {
      input: '1,1,2,3,4,5',
      expectedErrorMessage: WinningNumberValidator.validationTypes.isUnique.errorMessage,
    },
  ];

  describe('예외 테스트', () => {
    test.each(ERROR_CASES)(
      '입력값 "$input"에 대해 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
      ({ input, expectedErrorMessage }) => {
        // when - then
        expect(() => validateWinningNumber(input)).toThrow(new AppError(expectedErrorMessage));
      },
    );
  });

  describe('정상 작동 테스트', () => {
    // given
    const SUCCESS_CASES = [{ input: '1,2,3,4,5,6' }];

    test.each(SUCCESS_CASES)('입력값 "$input"에 대해 에러가 발생하지 않아야 한다.', ({ input }) => {
      // when - then
      expect(() => validateWinningNumber(input)).not.toThrow();
    });
  });
});
